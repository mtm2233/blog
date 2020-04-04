<template>
  <div id="home">
    <el-container class="home-container">
      <!--头部区域-->
      <el-header>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="3">
            <!-- logo -->
            <img src="../assets/image/logo.png" alt />
          </el-col>
          <!-- 导航栏 -->
          <el-col :span="15">
            <el-menu :default-active="this.$route.fullPath" mode="horizontal" router>
              <el-menu-item
                :index="'/'+item.path"
                v-for="item in nav"
                :key="item.navId"
              >{{item.name}}</el-menu-item>
            </el-menu>
          </el-col>
          <!-- 搜索框 -->
          <el-col :span="5">
            <el-input
              placeholder="搜索关键字"
              prefix-icon="el-icon-search"
              v-model="value"
              @blur="transfer()"
            ></el-input>
          </el-col>
        </el-row>
      </el-header>
      <!--页面主体区域-->
      <router-view :searchP="search"></router-view>
      <!-- 尾部区域 -->
      <el-footer>
        <a href="http://beian.miit.gov.cn" target="_blank">ICP备案号：苏ICP备19073933号</a> | Copyright © youcann.club
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'blog',
  data() {
    return {
      // 导航栏列表
      nav: [],
      // 搜索框里的值
      value: '',
      // propsHome
      search: ''
    }
  },
  methods: {
    // 获取导航栏
    async getNav() {
      // 解构赋值
      const { data: res } = await this.$http.get('menus/nav')
      if (res.status !== 200) return this.$message.error('获取导航失败')
      this.nav = res.data
    },
    // propsHome
    transfer() {
      this.search = this.value
    }
  },
  mounted() {
    this.getNav()
  }
}
</script>
<style scoped>
.el-header {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.43);
  width: 100%;
  position: fixed;
  background-color: white;
}
#home .el-menu {
  border: none;
}
.el-menu-item {
  padding: 0 30px;
}
.el-input {
  line-height: 60px;
}
.el-footer {
  text-align: center;
  line-height: 60px;
}
.el-footer a {
  text-decoration: none;
  font-size: 14px;
  color: black;
}
</style>
