<template>
  <div class="tags">
    <!-- 查询框 -->
    <Input
      search
      enter-button
      placeholder="请输入标签名称"
      style="width: 300px"
      @on-search="getTagsList()"
      v-model="queryTagsForm.search"
    ></Input>
    <!-- 添加标签 -->
    <Button type="primary" @click="addModal=true">添加标签</Button>
    <!-- table表格 -->
    <Table border :columns="columns" :data="tagsList" stripe>
      <template slot-scope="{ row }" slot="addtime">{{row.addtime|timefilters}}</template>
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="editTags(row)">编辑</Button>
      </template>
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
    <!-- 添加标签对话框 -->
    <Modal v-model="addModal" title="添加标签" @on-ok="addTags" @on-cancel="resetForm">
      <Form :model="addTagsForm" :label-width="80" ref="addTagsFormRef" :rules="addTagsRule">
        <FormItem label="标签名" prop="tagName">
          <Input v-model="addTagsForm.tagName"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- 编辑标签对话框 -->
    <Modal v-model="editModal" title="编辑标签" @on-ok="editTagsOK">
      <Form :model="editTagsForm" :label-width="80" ref="editTagsFormRef" :rules="addTagsRule">
        <FormItem label="标签名" prop="tagName">
          <Input v-model="editTagsForm.tagName"></Input>
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
        search: '',
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
        { title: '创建时间', slot: 'addtime' },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 100
        }
      ],
      // 添加标签
      addTagsForm: {
        tagName: ''
      },
      // 编辑标签
      editTagsForm: {
        tagName: '',
        tagId: ''
      },
      editModal: false,
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
    },
    // 点击编辑按钮
    editTags(row) {
      this.editModal = true
      this.editTagsForm.tagName = row.tagName
      this.editTagsForm.tagId = row.tagId
    },
    // 确认编辑
    async editTagsOK() {
      this.$refs.editTagsFormRef.validate(async val => {
        if (!val) return this.$message.error('请检查表单是否填写完整')
        const { data: res } = await this.$http.post(
          'back/tags/edit',
          this.editTagsForm
        )
        if (res.status !== 201) return this.$message.error('标签编辑失败')
        this.getTagsList()
        return this.$message.success('标签编辑成功')
      })
    }
  },
  mounted() {
    this.getTagsList()
  }
}
</script>
<style scoped>
.ivu-btn {
  margin: 10px 0;
}
</style>
