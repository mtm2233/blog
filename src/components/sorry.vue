<template>
  <div id="sorry">
    <p>Sorry 没找到你想要的 ：(</p>
    <p>
      您可以尝试
      <a @click="$router.push('/search')">搜点别的</a> 或
      <a @click="toHome()">返回首页</a>
    </p>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'sorry',
  methods: {
    toHome() {
      this.changeSearch('')
      if (this.$route.path !== '/articles') this.$route.push('/articles')
    },
    ...mapMutations(['changeSearch'])
  }
}
</script>
<style scoped>
#sorry {
  width: 100%;
  margin: 20px 0;
  text-align: center;
  letter-spacing: 1px;
}
#sorry p:first-child {
  font-size: 30px;
  color: #c1c1c1;
}
#sorry p:last-child {
  color: #c1c1c1;
}
a {
  color: #fd5d3c;
  cursor: pointer;
}
</style>
