<template>
  <div id="search">
    <div class="navTop">
      <h2>搜索</h2>
      <h4>找一找你想要的内容</h4>
    </div>
    <el-input
      placeholder="搜索关键字"
      prefix-icon="el-icon-search"
      v-model="value"
      @change="transfer()"
      clearable
    ></el-input>
    <!-- 卡片视图/标签 -->
    <el-card>
      <el-tag
        :type="item.num|tagsLv"
        v-for="item in tags"
        :key="item.tagName"
        @click="jumpArt(item.tagName)"
      >{{item.tagName}} ({{item.num}})</el-tag>
    </el-card>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'search',
  data() {
    return {
      value: '',
      tags: []
    }
  },
  methods: {
    transfer() {
      this.changeSearch(this.value)
      this.$router.push('/articles')
    },
    jumpArt(val) {
      this.changeTags(val)
      this.$router.push('/articles')
    },
    async getTags() {
      const { data: res } = await this.$http.get('tag/totalTags')
      this.tags = res.data
    },
    ...mapMutations(['changeSearch', 'changeTags'])
  },
  filters: {
    tagsLv: function(value) {
      const num = value - 0
      if (num < 5) {
        return ''
      } else if (num < 10) {
        return 'success'
      } else if (num < 15) {
        return 'info'
      } else if (num < 25) {
        return 'warning'
      } else {
        return 'danger'
      }
    }
  },
  mounted() {
    this.getTags()
  }
}
</script>
<style scoped>
#search {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 75px;
  box-sizing: border-box;
  padding: 20px;
}
.el-card {
  margin-top: 25px;
}
.el-tag {
  margin: 5px;
  cursor: pointer;
}
.el-tag:hover {
  transition: 0.4s;
  -moz-transition: 0.4s;
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transform: scale(1.3);
}
</style>
