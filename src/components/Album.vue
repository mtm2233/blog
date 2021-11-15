<template>
  <div id="album" class="fade-enter-active">
    <el-row :gutter="15">
      <el-col :xs="24" :sm="12" :lg="8" v-for="item in albumList" :key="item.albumId">
        <!-- 卡片视图 -->
        <el-card :body-style="{ padding: '0px' }" @click.native="jumpPic(item.albumId)">
          <!-- 图片 -->
          <div class="imgBox">
            <img :src="imgUrl+item.imgSrc" :title="item.content" :onerror="errorGoodsImg" />
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
              <!-- 图片数量 -->
              <span>
                <i class="el-icon-picture-outline"></i>
                {{item.num}}
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <sorry v-if="albumList.length===0"></sorry>
  </div>
</template>
<script>
import sorry from './sorry.vue'
import { mapState } from 'vuex'
export default {
  name: 'album',
  data() {
    return {
      queryFrom: {
        search: '',
        pagesize: '6',
        pagenum: '1'
      },
      albumList: [],
      errorGoodsImg: `this.src='${require('../assets/img/error.png')}'`
    }
  },
  methods: {
    // 获取相册列表
    async getAlbumList() {
      const { data: res } = await this.$http.post('album/query', this.queryFrom)
      if (res.status !== 200) return this.$message.error('获取相册列表失败')
      this.albumList = res.data
    },
    jumpPic(val) {
      this.$router.push('pictures/' + val)
    }
  },
  components: {
    sorry
  },
  watch: {
    // nav搜索框
    search: {
      handler: function(newVal) {
        this.queryFrom.search = newVal
      }
    },
    queryFrom: {
      // 是否深入监听
      deep: true,
      handler: function(newVal) {
        this.getAlbumList()
      }
    }
  },
  computed: {
    ...mapState(['search'])
  },
  mounted() {
    this.queryFrom.search = this.search
    this.getAlbumList()
  }
}
</script>
<style scoped>
#album {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 55px;
  padding: 10px;
  box-sizing: border-box;
}
img {
  width: 100%;
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
  transform: scale(1.1);
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
</style>
