<template>
  <div id="articles">
    <!-- 轮播图 -->
    <el-carousel class="hidden-xs-only">
      <el-carousel-item
        v-for="item in carouselList"
        :key="item.artId"
        @click.native="jumpContent(item.artId)"
      >
        <img :src="require('../assets/image/article/'+item.imgSrc)" />
      </el-carousel-item>
    </el-carousel>
    <!-- 博客文章列表 -->
    <el-row :gutter="15">
      <el-col :xs="24" :sm="12" :lg="8" v-for="item in articleList" :key="item.artId">
        <!-- 卡片视图 -->
        <el-card :body-style="{ padding: '0px' }" @click.native="jumpContent(item.artId)">
          <!-- 图片 -->
          <div class="imgBox">
            <img :src="require('../assets/image/article/'+item.imgSrc)" />
          </div>
          <!-- 大致信息 -->
          <div style="padding: 10px;">
            <!-- 标题 -->
            <h3 class="title">{{item.title}}</h3>
            <div class="bottom">
              <!-- 时间 -->
              <span class="time">
                <i class="el-icon-date"></i>
                {{item.addTime}}
              </span>
              <!-- 点击数 -->
              <span>
                <i class="el-icon-view"></i>
                {{item.clicks}}
              </span>
              <!-- 评论数 -->
              <span>
                <i class="el-icon-chat-line-round"></i>
                {{item.replys}}
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.pagenum"
      :page-sizes="[4, 6, 9, 12]"
      :page-size="query.pagesize"
      layout="total,sizes, prev, pager, next, jumper"
      :total="total"
      :pager-count="5"
      class="hidden-xs-only"
    ></el-pagination>
    <el-pagination
      class="mod"
      @current-change="handleCurrentChange"
      :current-page="query.pagenum"
      :page-size="query.pagesize"
      layout="total, prev, pager, next"
      :total="total"
      :pager-count="5"
    ></el-pagination>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'articles',
  data() {
    return {
      // 博客文章的条件
      query: {
        search: '',
        pagesize: 6,
        pagenum: 1,
        typeId: '',
        tags: ''
      },
      total: 0,
      // 文章列表
      articleList: [],
      // 轮播图列表
      carouselList: []
    }
  },
  methods: {
    // 获取符合条件的博客文章
    async getArticleList() {
      const { data: res } = await this.$http.post('article/query', this.query)
      if (res.status !== 200) return this.$message.error('获取博客文章失败')
      this.articleList = res.data
      this.total = res.totalpage
    },
    // 获取需要轮播的博客文章列表
    async getCarouselList() {
      const { data: res } = await this.$http.get('article/carousel')
      if (res.status !== 200) {
        return this.$message.error('获取需要轮播的博客文章失败')
      }
      this.carouselList = res.data
    },
    // 博客文章查看详情
    jumpContent(ArtId) {
      this.$router.push('/content/' + ArtId)
    },
    handleSizeChange(newPagesize) {
      this.query.pagesize = newPagesize
      this.getArticleList()
    },
    handleCurrentChange(newPagenum) {
      this.query.pagenum = newPagenum
      this.getArticleList()
    }
  },
  mounted() {
    this.query.tags = this.tags
    this.query.search = this.search
    this.getArticleList()
    this.getCarouselList()
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
    ...mapState(['search', 'typeId', 'tags'])
  }
}
</script>
<style scoped>
#articles {
  margin-top: 65px;
}
.el-carousel,
img {
  cursor: pointer;
  width: 100%;
}
.el-carousel {
  margin-bottom: 15px;
}
img {
  transition: 0.3s;
  -moz-transition: 0.3s;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
}
.imgBox {
  overflow: hidden;
}
.el-card {
  cursor: pointer;
  margin-bottom: 15px;
}
.el-card:hover img {
  transform: scale(1.3);
}
.title {
  font-size: 18px;
  margin-top: 0;
  height: 50px;
  overflow: hidden;
}
.bottom {
  font-size: 14px;
}
.bottom span {
  margin-right: 15px;
}
.el-pagination,
.mod {
  margin-top: 25px;
  text-align: center;
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
