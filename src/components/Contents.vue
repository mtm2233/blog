<template>
  <div id="contents">
    <!-- 返回上一页· -->
    <el-page-header @back="goBack" content="详情页面"></el-page-header>
    <h2>{{article.title}}</h2>
    <div class="bottom">
      <!-- 发布人 -->
      <span>
        <i class="el-icon-user"></i>
        {{article.name}}
      </span>
      <!-- 时间 -->
      <span class="time">
        <i class="el-icon-date"></i>
        {{article.addTime}}
      </span>
      <!-- 点击数 -->
      <span>
        <i class="el-icon-view"></i>
        {{article.clicks}}
      </span>
      <!-- 评论数 -->
      <span>
        <i class="el-icon-chat-line-round"></i>
        {{article.replys}}
      </span>
    </div>
    <hr />
    <div v-html="article.content"></div>
    <!-- 添加评论 -->
    <div class="addReply"></div>
    <!-- 评论列表 -->
    <div class="replys">
      <replys :repysList="repysList" :pName="''"></replys>
    </div>
  </div>
</template>
<script>
// 评论组件
import replys from './replys.vue'
export default {
  props: ['artId'],
  data() {
    return {
      // 博客文章详情
      article: [],
      // 回复
      repysList: []
    }
  },
  methods: {
    // 获取博客文章
    async getArtById() {
      const { data: res } = await this.$http.get(
        'article/artById/' + this.$route.params.artId
      )
      if (res.status !== 200) {
        return this.$message.error('获取博客文章失败')
      }
      this.article = res.data[0]
    },
    // 获取当前文章的回复
    async getRepysList() {
      const { data: res } = await this.$http.get(
        'reply/query/' + this.$route.params.artId
      )
      if (res.status !== 200) {
        return this.$message.error('获取评论失败')
      }
      this.repysList = res.data
    },
    // 回到上一页
    goBack() {
      this.$router.push('/articles')
    }
  },
  mounted() {
    this.getArtById()
    this.getRepysList()
  },
  components: {
    replys
  }
}
</script>
<style scoped>
h2 {
  margin: 15px 0;
}
.bottom {
  font-size: 13px;
  color: #a5a5a5;
}
.bottom span {
  margin-right: 15px;
}
.addReply{
  width: 100%;
  background-color: pink;
  padding: 10px;
}
</style>
