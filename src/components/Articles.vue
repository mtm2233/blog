<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel>
      <el-carousel-item v-for="item in carouselList" :key="item.id">
        <el-image
          :src="require('../assets/image/carousel/'+item.imgUrl)"
          @click="jumpContent(item.artId)"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'articles',
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
      // 文章列表
      articleList: [],
      // 轮播图列表
      carouselList: [
        { id: 1, imgUrl: 'a.jpeg', artId: 2001 },
        { id: 2, imgUrl: 'b.jpeg', artId: 2002 },
        { id: 3, imgUrl: 'c.jpeg', artId: 2003 },
        { id: 4, imgUrl: 'd.jpeg', artId: 2004 }
      ]
    }
  },
  methods: {
    // 获取符合条件的博客文章
    async getArticleList() {
      const { data: res } = await this.$http.post('article/query', this.query)
      if (res.status !== 200) return this.$message.error('获取博客文章失败')
      this.articleList = res.data
    },
    // 博客文章查看详情
    jumpContent(ArtId) {
      this.changeArtId(ArtId)
    },
    ...mapMutations(['changeArtId'])
  },
  mounted() {
    this.getArticleList()
  },
  watch: {
    // nav搜索框
    search: {
      // immediate: true,
      // 在 watch 里声明了之后，就会立即先去执行里面的 handler 方法
      // handler：其值是一个回调函数。即监听到变化时应该执行的函数
      handler: function(newVal) {
        this.query.search = newVal
      }
    },
    typeId: {
      handler: function(newVal) {
        this.query.typeId = newVal
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
  computed: {
    ...mapState(['search', 'typeId'])
  }
}
</script>
<style scoped>
.el-carousel,
.el-image {
  width: 100%;
  max-width: 860px;
}
</style>
