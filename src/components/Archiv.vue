<template>
  <div id="archiv">
    <div class="navTop">
      <h2>文章归档</h2>
      <h4>最后更新于 {{newArt.addTime[0]}}年{{newArt.addTime[1]}}月{{newArt.addTime[2]}}日</h4>
    </div>
    <div class="total">
      <span v-for="item in total" :key="item.name">
        <p>{{item.num}}+</p>
        <p>{{item.name}}</p>
      </span>
    </div>
    <el-menu
      unique-opened
      router
      :default-active="'content/'+newArt.artId"
      active-text-color="black"
    >
      <el-submenu :index="index+''" v-for="(itemY,index) in archiv" :key="index">
        <template slot="title">
          <h2>#{{index}}年</h2>
        </template>
        <el-submenu :index="index+''" v-for="(itemM,index) in itemY" :key="index">
          <template slot="title">{{index}}月({{itemM.length}}篇文章)</template>
          <el-menu-item :index="'content/'+itemD.artId" v-for="itemD in itemM" :key="itemD.artId">
            <template slot="title">
              <span>{{itemD.addTime[2]}}日：</span>
              <a>{{itemD.title}}</a>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'archiver',
  data() {
    return {
      archiv: {},
      newArt: '',
      total: {}
    }
  },
  methods: {
    // 获取归档数据
    async getArchiv() {
      const { data: res } = await this.$http.get('article/archiver')
      if (res.status !== 200) return this.$message.error('归档数据获取失败')
      this.archiv = res.data
      let y, m
      for (const item in this.archiv) {
        y = item
        break
      }
      for (const item in this.archiv[y]) {
        m = item
        break
      }
      this.newArt = this.archiv[y][m][0]
    },
    async getTotal() {
      const { data: res } = await this.$http.get('article/total')
      if (res.status !== 200) return this.$message.error('博客数据统计获取失败')
      this.total = res.data
    }
  },
  mounted() {
    this.getArchiv()
    this.getTotal()
  }
}
</script>
<style scoped>
#archiv {
  max-width: 850px;
  padding: 30px 10px;
  margin: 0 auto;
  width: 100%;
  margin-top: 50px;
  box-sizing: border-box;
}
.el-menu {
  border-right: 0;
  width: 100%;
}
.el-menu-item span {
  color: #c1c1c1;
}
.el-menu-item span a {
  color: black;
}
.el-menu-item a:hover {
  color: #fd5d3c;
}
.total {
  color: #c1c1c1;
  padding: 0 30px;
  text-align: center;
  font-size: 19px;
}
.total span {
  display: inline-block;
  width: 20%;
}
</style>
