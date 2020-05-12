<template>
  <div id="contents">
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
    <div class="ql-snow ql-editor" v-html="article.content"></div>
    <div class="copyr">
      <span>
        本文作者为
        <a href="https://youcann.club/">
          <u>youcan</u>
        </a>，转载请注明。
      </span>
      <span style="float:right">
        <i
          class="el-icon-price-tag"
          v-for="(item,index) in tagList"
          :key="index"
          @click="goByTag(item)"
        >
          <u>{{item}}</u>
        </i>
      </span>
    </div>
    <!-- 评论 -->
    <reply :artId="$route.params.artId"></reply>
  </div>
</template>
<script>
// 评论组件
import reply from './reply.vue'
import { mapMutations } from 'vuex'
export default {
  props: ['artId'],
  data() {
    return {
      // 博客文章详情
      article: [],
      tagList: []
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
      this.tagList = res.data[0].tags.split(',')
    },
    // 点击跳转 tag
    goByTag(tag) {
      this.changeTags(tag)
      this.$router.push('/articles')
    },
    ...mapMutations(['changeTags'])
  },
  mounted() {
    this.getArtById()
  },
  components: {
    reply
  }
}
</script>
<style scoped>
#contents {
  margin-top: 55px;
}
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
.artcon {
  margin-bottom: 70px;
}
.copyr {
  padding: 5px 15px;
  box-sizing: border-box;
}
.copyr i {
  margin-left: 10px;
  cursor: pointer;
}
</style>
