<template>
  <div id="blog">
    <el-container class="home-container">
      <!--头部区域-->
      <el-header>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :xs="20" :sm="5">
            <!-- logo -->
            <img src="../assets/img/logo.png" />
          </el-col>
          <!-- 导航栏 -->
          <el-col :sm="19" :md="15" class="hidden-xs-only">
            <el-menu :default-active="this.$route.fullPath" mode="horizontal" router>
              <el-menu-item
                :index="'/'+item.path"
                v-for="item in nav"
                :key="item.navId"
              >{{item.name}}</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :xs="4" class="hidden-sm-and-up">
            <!-- 显示Drawer 抽屉 -->
            <span @click="drawer=true" class="showDrawer">菜 单</span>
          </el-col>
          <!-- 搜索框 -->
          <el-col :md="5" class="hidden-sm-and-down">
            <el-input
              placeholder="搜索关键字"
              prefix-icon="el-icon-search"
              v-model="value"
              @change="transfer()"
              clearable
              :disabled="!($route.path==='/articles'||$route.path==='/album'||($route.path.slice(0,-2))==='/pictures')"
            ></el-input>
          </el-col>
        </el-row>
      </el-header>
      <!--页面主体区域-->
      <router-view></router-view>
      <!-- 尾部区域 -->
      <!-- 回到首页 -->
      <el-backtop></el-backtop>
      <el-footer height="80px">
        <p>
          <a href="http://beian.miit.gov.cn" target="_blank">ICP备案号 苏ICP备19073933号-1</a>
        </p>
        <p>
          <img src="../assets/img/beian.png" alt="备案" />
          <a
            target="_blank"
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32031202000595"
          >苏公网安备 32031202000595号</a>
        </p>
        <p>Copyright © youcann.club</p>
      </el-footer>
    </el-container>
    <!-- Drawer 抽屉 -->
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <el-menu :default-active="this.$route.fullPath" router>
        <el-menu-item :index="'/'+item.path" v-for="item in nav" :key="item.navId">{{item.name}}</el-menu-item>
      </el-menu>
    </el-drawer>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'blog',
  data() {
    return {
      // 导航栏列表
      nav: [],
      // 搜索框里的值
      value: '',
      // 控制Drawer 抽屉的显示与隐藏
      drawer: false
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
    // props 当搜索框失去焦点，传递search
    transfer() {
      // this.$router.push('/articles')
      this.changeSearch(this.value)
    },
    ...mapMutations(['changeSearch'])
  },
  computed: {
    ...mapState(['search'])
  },
  watch: {
    search: {
      handler: function(newVal) {
        this.value = newVal
      }
    }
  },
  mounted() {
    this.value = this.search
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
  z-index: 5;
}
#blog .el-menu {
  border: none;
}
.el-input {
  line-height: 60px;
}
.showDrawer {
  display: block;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
  color: #303133;
}
.el-footer {
  padding-bottom: 10px;
  text-align: center;
}
.el-footer a {
  text-decoration: none;
  font-size: 14px;
  color: #999;
}
p {
  margin: 2px 0;
  color: #999;
}
p img {
  vertical-align: middle;
}
</style>
