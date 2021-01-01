<template>
  <div id="reward" class="fade-enter-active">
    <div id="zf">
      <div class="navTop">
        <h2>赞助</h2>
        <h4>
          如果哪篇文章对您有帮助且您手头条件充裕，欢迎赞助本站
          <br />您的支持是本站最大的动力，谢谢。
        </h4>
      </div>
      <p>
        总计
        <span class="total">{{totalm}}</span> CNY
      </p>
      <div class="vx">
        <p>
          <img src="../assets/img/wx.png" />
        </p>微信赞助
      </div>
      <div class="zfb">
        <p>
          <img src="../assets/img/zfb.jpg" />
        </p>支付宝赞助
      </div>
      <div class="hint">
        <p>金额小于 1 元的赞助记录将不再进行更新展示。还请谅解！</p>
        <p>榜单前10名，可定制专属称号，可在本博客留言板或发送邮箱说明</p>
        <p>此记录不定期手动更新，可能有延迟。 如果您曾进行过赞助，但未出现在列表里，请发送邮件至 2541817610@qq.com</p>
      </div>
      <!-- 表格 -->
      <el-table :data="rewardList" stripe border style="width: 100%">
        <el-table-column prop="name" label="昵称"></el-table-column>
        <el-table-column prop="money" label="金额(CNY)"></el-table-column>
        <el-table-column prop="reTime" label="时间"></el-table-column>
        <el-table-column prop="message" label="备注"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="rewForm.pagenum"
        :page-sizes="[4, 6, 9, 12]"
        :page-size="rewForm.pagesize"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
        :pager-count="5"
        class="hidden-xs-only"
      ></el-pagination>
      <el-pagination
        class="mod"
        @current-change="handleCurrentChange"
        :current-page="rewForm.pagenum"
        :page-size="rewForm.pagesize"
        layout="total, prev, pager, next"
        :total="total"
        :pager-count="5"
      ></el-pagination>
    </div>
    <!-- 评论 -->
    <reply artId="2014"></reply>
  </div>
</template>
<script>
// 评论组件
import reply from './reply.vue'
export default {
  name: 'reward',
  data() {
    return {
      // 赞助列表
      rewardList: [],
      total: 0,
      totalm: 0,
      rewForm: {
        pagesize: 5,
        pagenum: 1
      }
    }
  },
  methods: {
    async getRewardList() {
      const { data: res } = await this.$http.post('reward/query', this.rewForm)
      if (res.status !== 200) return this.$message.error('获取赞助列表失败')
      this.rewardList = res.data
      this.totalm = res.totalm
      this.total = res.total
    },
    handleCurrentChange(val) {
      this.rewForm.pagenum = val
      this.getRewardList()
    },
    handleSizeChange(val) {
      this.rewForm.pagesize = val
      this.getRewardList()
    }
  },
  components: {
    reply
  },
  mounted() {
    this.getRewardList()
  }
}
</script>
<style scoped>
#reward {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 55px;
  padding: 0 10px;
  box-sizing: border-box;
}
#zf {
  text-align: center;
}
.el-table {
  font-size: 15px;
}
.total {
  color: #fd5d3c;
  font-size: 25px;
  font-weight: bold;
}
.vx,
.zfb {
  max-width: 240px;
  display: inline-block;
  padding: 0 10px 20px 10px;
  font-size: 20px;
}
.vx {
  color: #22ab38;
}
.zfb {
  color: #019fe8;
}
img {
  width: 100%;
}
.hint p {
  font-size: 13px;
  list-style-type: none;
}
.el-table {
  font-size: 13px;
}
.hint p:first-child {
  color: #fd5d3c;
}
.el-pagination{
  padding-top: 15px;
}
.mod {
  display: none;
}
@media screen and (max-width: 767px) {
  .mod {
    display: block;
  }
}
</style>
