<template>
  <div class="reply">
    <!-- 查询框 -->
    <Input
      search
      enter-button
      placeholder="请输入回复内容"
      style="width: 300px"
      @on-search="getReplyList()"
      v-model="queryReplyForm.search"
    ></Input>
    <!-- 评论审核下拉菜单 -->
    <Select
      class="selectSearch"
      v-model="queryReplyForm.display"
      style="width:200px"
      clearable
      @on-change="getReplyList()"
      placeholder="请选择审核进度"
    >
      <Option :value="1">通过审核</Option>
      <Option :value="0">等待审核</Option>
    </Select>
    <!-- Table -->
    <Table border :columns="columns" :data="replyList" stripe>
      <template slot-scope="{ row }" slot="replyTime">{{row.replyTime|timefilters}}</template>
      <template slot-scope="{ row }" slot="display">
        <i-switch
          v-model="row.display"
          :true-value="1"
          :false-value="0"
          @on-change="isDisplay(row)"
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
      :page-size="queryReplyForm.pagesize"
      :page-size-opts="[5,10,15,20]"
      :current="queryReplyForm.pagenum"
      @on-change="changePagenum"
      @on-page-size-change="changePagesize"
    />
  </div>
</template>
<script>
export default {
  name: 'reply',
  data() {
    return {
      // 查询评论列表的参数
      queryReplyForm: {
        search: '',
        pagesize: 5,
        pagenum: 1,
        display: ''
      },
      // 评论列表
      replyList: [],
      // 总条数
      total: 0,
      // table配置
      columns: [
        { title: '评论时间', slot: 'replyTime', width: 230, fixed: 'left' },
        { title: '评论内容', key: 'content', width: 650 },
        { title: '是否显示', slot: 'display', width: 100, fixed: 'right' }
      ]
    }
  },
  methods: {
    // 获取评论列表
    async getReplyList() {
      if (
        this.queryReplyForm.display !== 0 &&
        this.queryReplyForm.display !== 1
      ) {
        this.queryReplyForm.display = ''
      }
      const { data: res } = await this.$http.post(
        'back/reply/query',
        this.queryReplyForm
      )
      if (res.status !== 200) return this.$message.error('获取评论列表失败')
      this.replyList = res.data
      this.total = res.total
    },
    // 是否审核通过
    async isDisplay(row) {
      const { data: res } = await this.$http.post(
        'back/reply/display/' + row.replyId
      )
      if (res.status !== 201) return this.$message.error('审核状态修改失败')
      if (row.display) {
        return this.$message.success('审核通过')
      }
      return this.$message.warning('审核不通过')
    },
    // 分页--修改页码
    changePagenum(newPagenum) {
      this.queryReplyForm.pagenum = newPagenum
      this.getReplyList()
    },
    // 分页--修改每页显示条数
    changePagesize(newPagesize) {
      this.queryReplyForm.pagesize = newPagesize
      this.getReplyList()
    }
  },
  mounted() {
    this.getReplyList()
  }
}
</script>
<style scoped>
.ivu-select {
  margin: 10px 0;
}
.ivu-table-wrapper,
.ivu-page {
  max-width: 982px;
}
</style>
