<template>
  <div class="type">
    <!-- 添加友链 -->
    <Button type="primary" @click="addModal=true">添加分类</Button>
    <!-- tree -->
    <Menu ref="sideMenu" :open-names="openNames" theme="light" width="auto" accordion>
      <Submenu v-for="item in typeTree" :key="item.typeId" :name="item.typeId">
        <template slot="title">{{item.type}}</template>
        <MenuItem
          v-for="childitem in item.children"
          :key="childitem.typeId"
          :name="childitem.typeId"
        >{{childitem.type}}</MenuItem>
      </Submenu>
    </Menu>
    <!-- 添加友链对话框 -->
    <Modal v-model="addModal" title="添加分类" @on-ok="addType" @on-cancel="resetForm">
      <Form :model="addTypeForm" :label-width="80" ref="addTypeFormRef" :rules="addTypeRule">
        <FormItem label="名称" prop="type">
          <Input v-model="addTypeForm.type"></Input>
        </FormItem>
        <FormItem label="父系" prop="parentId">
          <Select v-model="addTypeForm.parentId" style="width:200px">
            <Option :value="0" :key="0">一级分类</Option>
            <Option v-for="item in typeTree" :value="item.typeId" :key="item.typeId">{{ item.type }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'type',
  data() {
    return {
      // 查询条件
      queryTypeForm: {
        pagesize: 5,
        pagenum: 1,
        allType: 1
      },
      // 分类
      typeTree: [],
      // 默认展开
      openNames: [],
      // 添加分类对话框
      addModal: false,
      // 添加分类表单
      addTypeForm: {
        type: '',
        parentId: 0
      },
      // 效验规则
      addTypeRule: {
        type: [
          {
            required: true,
            message: '分类名不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 获取分类
    async getTypeTree() {
      const { data: res } = await this.$http.get('menus/query')
      if (res.status !== 200) return this.$message.error('获取文章分类失败')
      this.typeTree = res.data
      this.openNames = [20]
      this.$nextTick(() => {
        this.$refs.sideMenu.updateOpened()
        this.$refs.sideMenu.updateActiveName()
      })
    },
    // 添加分类
    addType() {
      this.$refs.addTypeFormRef.validate(async val => {
        if (!val) return this.$message.error('请检查表单是否填写完整')
        const { data: res } = await this.$http.post(
          'back/article/addtype',
          this.addTypeForm
        )
        if (res.status !== 201) return this.$message.error('分类添加失败')
        this.getTypeTree()
        this.$refs.addTypeFormRef.resetFields()
        return this.$message.success('分类添加成功')
      })
    },
    // 关闭对话框重置表单
    resetForm() {
      this.$refs.addTypeFormRef.resetFields()
    }
  },
  mounted() {
    this.getTypeTree()
  }
}
</script>
<style scoped>
</style>
