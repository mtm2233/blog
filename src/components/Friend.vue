<template>
  <div class="friend">
    <!-- 查询框 -->
    <Input
      search
      enter-button
      placeholder="请输入友链标题"
      style="width: 300px"
      @on-search="queryChange()"
      v-model="queryFlink.name"
    ></Input>
    <!-- 下拉菜单 -->
    <Select
      class="selectSearch"
      v-model="queryFlink.urlTypeId"
      style="width:200px"
      clearable
      @on-change="queryChange()"
      placeholder="请选择友链分类"
    >
      <Option
        v-for="item in flinkType"
        :value="item.urlTypeId"
        :key="item.typeName"
      >{{ item.typeName }}</Option>
    </Select>
    <!-- 添加友链 -->
    <Button type="primary" @click="addModal=true">添加友链</Button>
    <!-- table表格 -->
    <Table border :columns="columns" :data="flinkList" stripe>
      <template slot-scope="{ row }" slot="icon">
        <!-- 头像 -->
        <Avatar v-if="row.icon" :src="row.icon" />
      </template>
      <!-- url -->
      <template slot-scope="{ row }" slot="url">
        <a :href="row.url" target="_brank">{{row.url}}</a>
      </template>
      <template slot-scope="{ row }" slot="addtime">{{row.addtime|timefilters}}</template>
      <template slot-scope="{ row }" slot="display">
        <i-switch
          v-model="row.display"
          :true-value="1"
          :false-value="0"
          @on-change="displayBy(row)"
        />
      </template>
    </Table>
    <!-- 分页 -->
    <Page
      :total="total"
      size="small"
      show-elevator
      show-sizer
      show-total
      :page-size="queryFlink.pagesize"
      :page-size-opts="[5,10,15,20]"
      :current="queryFlink.pagenum"
      @on-change="changePagenum"
      @on-page-size-change="changePagesize"
    />
    <!-- 添加友链对话框 -->
    <Modal v-model="addModal" title="添加友链" @on-ok="addFlink" @on-cancel="resetForm">
      <Form :model="addFlinkForm" :label-width="80" ref="addFlinkFormRef">
        <FormItem label="icon" prop="icon">
          <Input v-model="addFlinkForm.icon"></Input>
        </FormItem>
        <FormItem label="分类" prop="urlTypeId">
          <Select v-model="addFlinkForm.urlTypeId" style="width:200px" placeholder="请选择友链分类">
            <Option
              v-for="item in flinkType"
              :value="item.urlTypeId"
              :key="item.typeName"
            >{{ item.typeName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="url" prop="url">
          <Input v-model="addFlinkForm.url"></Input>
        </FormItem>
        <FormItem label="名字" prop="name">
          <Input v-model="addFlinkForm.name"></Input>
        </FormItem>
        <FormItem label="描述" prop="descript">
          <Input v-model="addFlinkForm.descript"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'friend',
  data() {
    return {
      // 友链分类
      flinkType: [],
      // 友链列表
      flinkList: [],
      // 查询友链条件
      queryFlink: {
        urlTypeId: '',
        name: '',
        pagesize: 5,
        pagenum: 1
      },
      // 友链总条数
      total: 0,
      // table配置
      columns: [
        { title: 'icon', slot: 'icon', width: 70, fixed: 'left' },
        { title: 'url', slot: 'url', width: 230 },
        { title: '标题', key: 'name', width: 200 },
        { title: '描述', key: 'descript', width: 260 },
        { title: '创建时间', slot: 'addtime', width: 230 },
        { title: '是否显示', slot: 'display', width: 150, fixed: 'right' }
      ],
      // 添加友链对话框的显示隐藏
      addModal: false,
      // 添加友链
      addFlinkForm: {
        urlTypeId: '',
        url: '',
        icon: '',
        name: '',
        descript: ''
      }
    }
  },
  methods: {
    // 查询友链分类
    async getFlinkType() {
      const { data: res } = await this.$http.get('back/flink/type')
      if (res.status !== 200) return this.$message.error('获取友链分类失败')
      this.flinkType = res.data
    },
    // 查询友链列表
    async getFlinkList() {
      if (!this.queryFlink.urlTypeId) {
        this.queryFlink.urlTypeId = ''
      }
      const { data: res } = await this.$http.post(
        'back/flink/query',
        this.queryFlink
      )
      if (res.status !== 200) return this.$message.error('获取友链列表失败')
      this.flinkList = res.data
      this.total = res.total
    },
    // 友链显示与隐藏
    async displayBy(row) {
      const { data: res } = await this.$http.post(
        'back/flink/display/' + row.friendId
      )
      if (res.status !== 201) {
        return this.$message.error('友链显示与隐藏修改失败')
      }
      if (row.display) {
        return this.$message.success('友链已显示')
      }
      return this.$message.warning('友链已隐藏')
    },
    // 分页--修改页码
    changePagenum(newPagenum) {
      this.queryFlink.pagenum = newPagenum
      this.getFlinkList()
    },
    // 分页--修改每页显示条数
    changePagesize(newPagesize) {
      this.queryFlink.pagesize = newPagesize
      this.getFlinkList()
    },
    // 添加友链
    async addFlink() {
      const { data: res } = await this.$http.post(
        'back/flink/add',
        this.addFlinkForm
      )
      if (res.status !== 201) return this.$message.error('友链添加失败')
      this.getFlinkList()
      this.$refs.addFlinkFormRef.resetFields()
      return this.$message.success('友链添加成功')
    },
    // 关闭对话框重置表单
    resetForm() {
      this.$refs.addFlinkFormRef.resetFields()
    },
    // 友链查询参数发生变化
    queryChange() {
      this.queryFlink.pagenum = 1
      this.getFlinkList()
    }
  },
  mounted() {
    this.getFlinkType()
    this.getFlinkList()
  }
}
</script>
<style scoped>
.selectSearch {
  margin: 15px 0;
}
.ivu-table-wrapper,
.ivu-page {
  max-width: 1143px;
}
</style>
