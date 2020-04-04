<template>
  <div>
    <el-container class="home-main">
      <el-main>{{articleList}}</el-main>
      <!--侧边栏-->
      <el-aside class="hidden-sm-and-down"></el-aside>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'home',
  // nav搜索框
  props: ['searchP'],
  data() {
    return {
      // 博客文章的条件
      query: {
        search: '',
        pagesize: 9,
        pagenum: 1,
        typeId: '',
        tags: ''
      },
      articleList: []
    }
  },
  methods: {
    // 获取符合条件的博客文章
    async getArticleList() {
      const { data: res } = await this.$http.post('article/query', this.query)
      this.articleList = res.data
    }
  },
  mounted() {
    this.getArticleList()
  },
  watch: {
    searchP: {
      // immediate: true,
      // 在 watch 里声明了之后，就会立即先去执行里面的 handler 方法
      // handler：其值是一个回调函数。即监听到变化时应该执行的函数
      handler: function(newVal) {
        this.query.search = newVal
      }
    },
    query: {
      // 是否深入监听
      deep: true,
      handler: function(newVal) {
        this.getArticleList()
      }
    }
  },
  computed: {}
}
</script>
<style scoped>
.el-aside {
  background-color: pink;
}
.home-main {
  width: 1200px;
  min-height: 750px;
  background-color: yellow;
  margin: 0 auto;
  margin-top: 80px;
}
</style>
