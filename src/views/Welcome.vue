<template>
  <div class="welcome">
    <div class="total">
      <h1>Welcome</h1>
      <span v-for="item in totalList " :key="item.name">
        <p>{{item.name}}</p>
        <p>{{item.num}}</p>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'welcome',
  data() {
    return {
      // 统计数据
      totalList: []
    }
  },
  methods: {
    async getTotalList() {
      const { data: res } = await this.$http.get('article/total')
      if (res.status !== 200) return this.$message.error('获取博客数据统计失败')
      this.totalList = res.data
    }
  },
  mounted() {
    this.getTotalList()
  }
}
</script>
<style scoped lang="less">
.total {
  width: 100%;
  margin-top: 15px;
  box-sizing: border-box;
  text-align: center;
  max-width: 750px;
  span {
    margin-top: 15px;
    display: inline-block;
    width: 20%;
    font-size: 25px;
  }
}
</style>
