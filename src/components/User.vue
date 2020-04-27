<template>
  <div class="user">
    <!-- table表格 -->
    <Table border :columns="columns" :data="userList" stripe>
      <template slot-scope="{ row }" slot="imgsrc">
        <!-- 头像 -->
        <Avatar v-if="row.imgsrc" :src="row.imgsrc" />
        <Avatar v-else :style="row.email|hashColor">{{row.name.slice(0, 1)}}</Avatar>
      </template>
      <template slot-scope="{ row }" slot="addTime">{{row.addTime|timefilters}}</template>
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="addTitle(row)">赋予称号</Button>
      </template>
    </Table>
    <!-- 分页 -->
    <Page
      :total="total"
      size="small"
      show-elevator
      show-sizer
      show-total
      :page-size="queryForm.pagesize"
      :page-size-opts="[5,10,15,20]"
      :current="queryForm.pagenum"
      @on-change="changePagenum"
      @on-page-size-change="changePagesize"
    />
    <!-- 赋予称号对话框 -->
    <Modal v-model="modal" title="赋予称号" @on-ok="modalOk">
      <Form ref="addTitleFormRef" :model="addTitleForm" :label-width="70">
        <FormItem label="邮箱">
          <Input v-model="addTitleForm.email" disabled></Input>
        </FormItem>
        <FormItem label="称号">
          <Input v-model="addTitleForm.title"></Input>
        </FormItem>
        <FormItem label="称号补充">
          <Input v-model="addTitleForm.supp"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'user',
  data() {
    return {
      // 用户表
      userList: [],
      // 查询参数
      queryForm: {
        search: '',
        pagesize: 5,
        pagenum: 1
      },
      // table配置
      columns: [
        { title: '头像', slot: 'imgsrc', width: 70, fixed: 'left' },
        { title: '邮箱', key: 'email', width: 230 },
        { title: '昵称', key: 'name', width: 160 },
        { title: '称号', key: 'title', width: 150 },
        { title: '称号补充', key: 'supp', width: 150 },
        { title: '创建时间', slot: 'addTime', width: 230 },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 100,
          fixed: 'right'
        }
      ],
      // 总条数
      total: 0,
      // 对话框的显示与隐藏
      modal: false,
      // 赋予称号表单
      addTitleForm: {
        email: '',
        title: '',
        supp: ''
      }
    }
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      const { data: res } = await this.$http.post(
        'back/user/query',
        this.queryForm
      )
      if (res.status !== 200) return this.$message.error('获取用户列表失败')
      this.userList = res.data
      this.total = res.total
    },
    // 赋予称号
    addTitle(row) {
      this.modal = true
      this.addTitleForm.email = row.email
      this.addTitleForm.title = row.title
      this.addTitleForm.supp = row.supp
    },
    // 点击对话框确认按钮
    async modalOk() {
      const { data: res } = await this.$http.post(
        'back/user/title',
        this.addTitleForm
      )
      if (res.status !== 201) return this.$message.error('赋予昵称失败')
      this.getUserList()
      return this.$message.success('赋予昵称成功')
    },
    // 改变页码时触发
    changePagenum(newPagenum) {
      this.queryForm.pagenum = newPagenum
      this.getUserList()
    },
    // 改变每页条数时触发
    changePagesize(newPagesize) {
      this.queryForm.pagesize = newPagesize
      this.getUserList()
    }
  },
  mounted() {
    this.getUserList()
  }
}
</script>
<style scoped>
.ivu-page {
  margin-top: 15px;
  text-align: center;
}
.ivu-table-wrapper {
  max-width: 1092px;
}
</style>
