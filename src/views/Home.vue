<template>
  <div class="home">
    <Layout>
      <Header>
        <span>
          <img src="../assets/img/logo.png" />
        </span>
        <Breadcrumb v-if="this.$route.path.slice(0,8)!=='/content'">
          <BreadcrumbItem to="/home">Home</BreadcrumbItem>
          <BreadcrumbItem>{{bread[this.$route.path].pat}}</BreadcrumbItem>
          <BreadcrumbItem>{{bread[this.$route.path].val}}</BreadcrumbItem>
        </Breadcrumb>
        <Breadcrumb v-else-if="this.$route.path.slice(0,10)==='/content/0'">
          <BreadcrumbItem to="/home">Home</BreadcrumbItem>
          <BreadcrumbItem>文章管理</BreadcrumbItem>
          <BreadcrumbItem>发布文章</BreadcrumbItem>
        </Breadcrumb>
        <Breadcrumb v-else>
          <BreadcrumbItem to="/home">Home</BreadcrumbItem>
          <BreadcrumbItem>文章管理</BreadcrumbItem>
          <BreadcrumbItem>编辑文章</BreadcrumbItem>
        </Breadcrumb>
        <Button @click="exit">退出</Button>
      </Header>
      <Layout>
        <!-- 侧边栏 -->
        <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
          <Menu
            :active-name="this.$route.path"
            theme="light"
            width="auto"
            :open-names="[menu[this.$route.path]]"
            accordion
          >
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-contacts" />用户管理
              </template>
              <MenuItem name="/user" to="/user">
                <Icon type="ios-contacts" />用户列表
              </MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-link" />友链管理
              </template>
              <MenuItem name="/friend" to="/friend">
                <Icon type="ios-link" />友链列表
              </MenuItem>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="ios-albums" />相册管理
              </template>
              <MenuItem name="/album" to="/album">
                <Icon type="ios-albums" />相册列表
              </MenuItem>
              <MenuItem name="/pictures" to="/pictures">
                <Icon type="ios-images" />图片列表
              </MenuItem>
            </Submenu>
            <Submenu name="5">
              <template slot="title">
                <Icon type="ios-cash" />赞助管理
              </template>
              <MenuItem name="/reward" to="/reward">
                <Icon type="ios-cash" />赞助列表
              </MenuItem>
            </Submenu>
            <Submenu name="6">
              <template slot="title">
                <Icon type="ios-document" />文章管理
              </template>
              <MenuItem name="/articles" to="/articles">
                <Icon type="ios-document" />文章列表
              </MenuItem>
              <MenuItem name="/tags" to="/tags">
                <Icon type="ios-pricetag" />标签列表
              </MenuItem>
              <MenuItem name="/reply" to="/reply">
                <Icon type="ios-chatbubbles" />评论列表
              </MenuItem>
              <MenuItem name="/type" to="/type">
                <Icon type="ios-keypad" />分类列表
              </MenuItem>
            </Submenu>
          </Menu>
          <!-- 自定义触发器 -->
          <div slot="trigger"></div>
        </Sider>
        <!-- 主体 -->
        <Content>
          <router-view></router-view>
        </Content>
      </Layout>
      <Footer>
        ICP备案号：
        <a href="http://beian.miit.gov.cn" target="_blank">苏ICP备19073933号-1</a>
        <br />Copyright ©
        <a href="https://youcann.club" target="_blank">youcann.club</a>
      </Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      isCollapsed: false,
      // 默认展开
      menu: {
        '/user': '2',
        '/friend': '3',
        '/album': '4',
        '/pictures': '4',
        '/reward': '5',
        '/articles': '6',
        '/tags': '6',
        '/reply': '6',
        '/type': '6'
      },
      bread: {
        '/home': { pat: 'Home', val: 'Welcome' },
        '/user': { pat: '用户管理', val: '用户列表' },
        '/friend': { pat: '友链管理', val: '友链列表' },
        '/album': { pat: '相册管理', val: '相册列表' },
        '/pictures': { pat: '相册管理', val: '图片列表' },
        '/reward': { pat: '赞助管理', val: '赞助列表' },
        '/articles': { pat: '文章管理', val: '文章列表' },
        '/tags': { pat: '文章管理', val: '标签列表' },
        '/reply': { pat: '文章管理', val: '评论列表' },
        '/type': { pat: '文章管理', val: '分类列表' },
        '/content/0': { pat: '文章管理', val: '发布文章' }
      }
    }
  },
  methods: {
    // 退出
    exit() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped>
.home,
.ivu-layout {
  height: 100%;
}
.ivu-layout-header {
  background-color: white;
  -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.43);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.43);
  margin-bottom: 10px;
  .ivu-btn {
    float: right;
    margin-top: 16px;
  }
}
.ivu-layout-sider,
.ivu-layout-footer,
.ivu-layout-content {
  background-color: white;
}
.ivu-layout-footer {
  text-align: center;
}
.ivu-layout-content {
  padding: 10px;
  box-sizing: border-box;
}
.ivu-layout-header {
  display: flex;
  justify-content: space-between;
  padding: 0;
}
@media screen and (max-width: 410px) {
  .ivu-breadcrumb {
    font-size: 10px;
  }
}
</style>
