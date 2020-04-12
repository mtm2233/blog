<template>
  <div id="friend">
    <el-row :gutter="15" v-for="item in friendList" :key="item.urlTypeId">
      <h3>#{{item.typeName}}</h3>
      <el-col :xs="12" :sm="8" :lg="6" v-for="itemChild in item.children" :key="itemChild.friendId">
        <a :href="itemChild.url" target="_blank">
          <el-card shadow="hover" :body-style="{ padding: '5px' }">
            <img :src="itemChild.icon" :onerror="errorGoodsImg" />
            {{itemChild.name}}
          </el-card>
        </a>
      </el-col>
    </el-row>
    <pre>
      {{friendList}}
      </pre>
  </div>
</template>
<script>
export default {
  name: 'friend',
  data() {
    return {
      friendList: [],
      errorGoodsImg:
        "this.src='https://www.wikimoe.com/content/uploadfile/201710/25e41508377274.png'"
    }
  },
  methods: {
    async getFriends() {
      const { data: res } = await this.$http.get('friend/query')
      if (res.status !== 200) return this.$message.error('获取友链失败')
      this.friendList = res.data
      console.log(res.data)
    }
  },
  mounted() {
    this.getFriends()
  }
}
</script>
<style scoped>
#friend {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 85px;
  padding: 10px;
}
.frChild {
  width: 80%;
  margin: 0 10%;
}
img {
  width: 35px;
  vertical-align: middle;
  margin-right: 5px;
}
a {
  text-decoration: none;
}
.el-card {
  margin: 10px;
}
.el-card:hover {
  color: #fd5d3c;
}
</style>
