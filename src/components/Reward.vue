<template>
  <div id="reward">
    <!-- 查询框 -->
    <Input
      search
      enter-button
      placeholder="请输入赞助人姓名"
      style="width: 300px"
      @on-search="getRewardList"
      v-model="queryRewardForm.search"
    ></Input>
    <!-- 添加 -->
    <Button type="primary" @click="addModal=true">添加赞助</Button>
    <p>
      总金额：
      <span>{{totalm}}</span>
    </p>
    <!-- table表格 -->
    <Table border :columns="columns" :data="rewardList" stripe>
      <!-- 编辑 -->
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="editReward(row)">编辑</Button>
      </template>
    </Table>
    <!-- 分页 -->
    <Page
      :total="total"
      size="small"
      show-elevator
      show-sizer
      show-total
      :page-size="queryRewardForm.pagesize"
      :page-size-opts="[5,10,15,20]"
      :current="queryRewardForm.pagenum"
      @on-change="changePagenum"
      @on-page-size-change="changePagesize"
    />
    <!-- 编辑对话框 -->
    <Modal v-model="editModal" title="编辑" @on-ok="editOk">
      <Form ref="editRewardFormRef" :model="editRewardForm" :label-width="70">
        <FormItem label="昵称">
          <Input v-model="editRewardForm.name"></Input>
        </FormItem>
        <FormItem label="金额">
          <Input v-model="editRewardForm.money"></Input>
        </FormItem>
        <FormItem label="备注">
          <Input v-model="editRewardForm.message"></Input>
        </FormItem>
        <FormItem label="来源">
          <Input v-model="editRewardForm.source"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- 添加对话框 -->
    <Modal v-model="addModal" title="添加" @on-ok="addRewardOk" @on-cancel="resetForm">
      <Form ref="addRewardFormRef" :model="addRewardForm" :label-width="70">
        <FormItem label="昵称" prop="name">
          <Input v-model="addRewardForm.name"></Input>
        </FormItem>
        <FormItem label="金额" prop="money">
          <Input v-model="addRewardForm.money"></Input>
        </FormItem>
        <FormItem label="备注" prop="message">
          <Input v-model="addRewardForm.message"></Input>
        </FormItem>
        <FormItem label="来源" prop="source">
          <Select v-model="addRewardForm.source" style="width:200px">
            <Option :value="'微信'" :key="'微信'">微信</Option>
            <Option :value="'支付宝'" :key="'支付宝'">支付宝</Option>
          </Select>
        </FormItem>
        <FormItem label="时间" prop="reTime">
          <Input v-model="addRewardForm.reTime"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'reward',
  data() {
    return {
      // 查询赞助列表的参数
      queryRewardForm: {
        search: '',
        pagesize: 5,
        pagenum: 1
      },
      // 赞助列表
      rewardList: [],
      // 总条数
      total: 0,
      // 总金额
      totalm: 0,
      // table配置
      columns: [
        { title: '昵称', key: 'name', width: 170, fixed: 'left' },
        { title: '金额(CNY)', key: 'money', width: 120 },
        { title: '备注', key: 'message', width: 300 },
        { title: '来源', key: 'source', width: 260 },
        { title: '时间', key: 'reTime', width: 230 },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 140,
          fixed: 'right'
        }
      ],
      // 编辑
      editRewardForm: {
        message: '',
        money: '',
        name: '',
        reId: '',
        source: ''
      },
      // 编辑对话框
      editModal: false,
      // 添加对话框
      addModal: false,
      // 编辑
      addRewardForm: {
        reTime: '',
        message: '',
        money: '',
        name: '',
        reId: '',
        source: ''
      }
    }
  },
  methods: {
    // 获取赞助列表
    async getRewardList() {
      const { data: res } = await this.$http.post(
        'reward/query',
        this.queryRewardForm
      )
      if (res.status !== 200) this.$message.error('获取赞助列表失败')
      this.rewardList = res.data
      this.total = res.total
      this.totalm = res.totalm
    },
    // 分页--修改页码
    changePagenum(newPagenum) {
      this.queryRewardForm.pagenum = newPagenum
      this.getRewardList()
    },
    // 分页--修改每页显示条数
    changePagesize(newPagesize) {
      this.queryRewardForm.pagesize = newPagesize
      this.getRewardList()
    },
    // 编辑
    editReward(row) {
      this.editModal = true
      this.editRewardForm.reId = row.reId
      this.editRewardForm.name = row.name
      this.editRewardForm.message = row.message
      this.editRewardForm.money = row.money
      this.editRewardForm.source = row.source
    },
    // 确认编辑
    async editOk() {
      const { data: res } = await this.$http.post(
        'back/reward/edit',
        this.editRewardForm
      )
      if (res.status !== 201) return this.$message.error('编辑失败')
      this.getRewardList()
      return this.$message.success('编辑成功')
    },
    // 确认添加
    async addRewardOk() {
      const { data: res } = await this.$http.post(
        'back/reward/add',
        this.addRewardForm
      )
      if (res.status !== 201) return this.$message.error('添加失败')
      this.getRewardList()
      this.$refs.addRewardFormRef.resetFields()
      return this.$message.success('添加成功')
    },
    // 关闭对话框重置表单
    resetForm() {
      this.$refs.addRewardFormRef.resetFields()
    }
  },
  mounted() {
    this.getRewardList()
  }
}
</script>
<style scoped>
.ivu-table-wrapper,
.ivu-page {
  max-width: 1223px;
}
p {
  margin: 10px 0;
}
p span {
  font-size: 25px;
  color: red;
  font-weight: bold;
}
.ivu-btn {
  margin: 15px 0 0 0;
}
</style>
