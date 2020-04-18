<template>
  <div id="reward">
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
        <span class="total">{{total}}</span> CNY
      </p>
      <div class="vx">
        <p>
          <img src="../assets/image/reward/wx.png" />
        </p>微信赞助
      </div>
      <div class="zfb">
        <p>
          <img src="../assets/image/reward/zfb.jpg" />
        </p>支付宝赞助
      </div>
      <!-- 表格 -->
      <el-table :data="rewardList" stripe border style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="reTime" label="时间"></el-table-column>
        <el-table-column prop="money" label="金额(CNY)"></el-table-column>
        <el-table-column prop="message" label="备注"></el-table-column>
      </el-table>
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
      total: 0
    }
  },
  methods: {
    async getRewardList() {
      const { data: res } = await this.$http.get('reward/query')
      if (res.status !== 200) return this.$message.error('获取赞助列表失败')
      this.rewardList = res.data
      this.total = res.total
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
  margin-top: 75px;
  padding: 0 10px;
  box-sizing: border-box;
}
#zf {
  text-align: center;
}
.el-table{
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
</style>
