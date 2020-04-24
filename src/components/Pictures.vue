<template>
  <div id="pictures">
    <div class="imgBox">
      <el-image
        v-for="item in picList"
        :key="item.imgId"
        :src="'https://api.youcann.club/img/'+item.imgSrc"
        :preview-src-list="['https://api.youcann.club/img/'+item.imgSrc]"
        :alt="item.content"
        :title="item.content"
        lazy
      ></el-image>
    </div>
    <sorry v-if="picList.length===0"></sorry>
  </div>
</template>
<script>
import sorry from './sorry.vue'
import { mapState } from 'vuex'
export default {
  name: 'pictures',
  data() {
    return {
      picList: []
    }
  },
  methods: {
    async getPicList() {
      const { data: res } = await this.$http.get(
        'album/pictures/' + this.$route.params.albId + '/?search=' + this.search
      )
      if (res.status !== 200) return this.$message.error('获取图片列表失败')
      this.picList = res.data
    }
  },
  watch: {
    // nav搜索框
    search: {
      handler: function() {
        this.getPicList()
      }
    }
  },
  computed: {
    ...mapState(['search'])
  },
  components: {
    sorry
  },
  mounted() {
    this.getPicList()
  }
}
</script>
<style scoped>
#pictures {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 75px;
  margin-bottom: 30px;
}
.imgBox {
  -moz-column-count: 3;
  -webkit-column-count: 3;
  column-count: 3;
  overflow: auto;
}
.el-image {
  break-inside: avoid;
  width: 100%;
}
@media screen and (max-width: 700px) {
  .imgBox {
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
  }
}
</style>
