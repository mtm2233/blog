<template>
  <div class="tags">
    <!-- 添加友链 -->
    <Button type="primary" @click="addModal=true">添加友链</Button>
    <!-- table表格 -->
    <Table border :columns="columns" :data="tagsList" stripe>
      <template slot-scope="{ row }" slot="addtime">{{row.addtime|timefilters}}</template>
    </Table>
    <!-- 分页 -->
    <Page
      :total="total"
      size="small"
      show-elevator
      show-sizer
      show-total
      :page-size="queryTagsForm.pagesize"
      :page-size-opts="[5,10,15,20]"
      :current="queryTagsForm.pagenum"
      @on-change="changePagenum"
      @on-page-size-change="changePagesize"
    />
    <!-- 添加友链对话框 -->
    <Modal v-model="addModal" title="添加标签" @on-ok="addTags" @on-cancel="resetForm">
      <Form :model="addTagsForm" :label-width="80" ref="addTagsFormRef" :rules="addTagsRule">
        <FormItem label="标签名" prop="tagName">
          <Input v-model="addTagsForm.tagName"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'tags',
  data() {
    return {
      // 标签查询条件
      queryTagsForm: {
        pagesize: 5,
        pagenum: 1
      },
      // 标签列表
      tagsList: [],
      // 总条数
      total: 0,
      addModal: false,
      // Table配置
      columns: [
        { title: '标题', key: 'tagName' },
        { title: '创建时间', slot: 'addtime' }
      ],
      // 添加标签
      addTagsForm: {
        tagName: ''
      },
      // 效验规则
      addTagsRule: {
        tagName: [
          {
            required: true,
            message: '标签名不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async getTagsList() {
      const { data: res } = await this.$http.post(
        'back/tags/query',
        this.queryTagsForm
      )
      if (res.status !== 200) return this.$message.error('获取标签列表失败')
      this.tagsList = res.data
      this.total = res.total
    },
    // 分页--修改页码
    changePagenum(newPagenum) {
      this.queryTagsForm.pagenum = newPagenum
      this.getTagsList()
    },
    // 分页--修改每页显示条数
    changePagesize(newPagesize) {
      this.queryTagsForm.pagesize = newPagesize
      this.getTagsList()
    },
    // 添加标签
    addTags() {
      this.$refs.addTagsFormRef.validate(async val => {
        if (!val) return this.$message.error('请检查表单是否填写完整')
        const { data: res } = await this.$http.post(
          'back/tags/add',
          this.addTagsForm
        )
        if (res.status !== 201) return this.$message.error('标签添加失败')
        this.getTagsList()
        this.$refs.addTagsFormRef.resetFields()
        return this.$message.success('标签添加成功')
      })
    },
    // 关闭对话框重置表单
    resetForm() {
      this.$refs.addTagsFormRef.resetFields()
    }
  },
  mounted() {
    this.getTagsList()
  }
}
</script>
<style scoped>
.ivu-btn {
  margin: 0 0 10px 0;
}
</style>
