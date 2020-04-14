<template>
  <div id="archiv">
    <el-menu unique-opened router :default-active="'content/'+newArtId" active-text-color="black">
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
      newArtId: ''
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
      // console.log(newArtId)
      for (const item in this.archiv[y]) {
        m = item
        break
      }
      this.newArtId = this.archiv[y][m][0].artId
    }
  },
  mounted() {
    this.getArchiv()
  }
}
</script>
<style scoped>
#archiv {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 30px 10px;
}
.el-menu {
  width: 1000px;
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
</style>
