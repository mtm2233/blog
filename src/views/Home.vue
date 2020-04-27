<template>
  <div class="home">
    <Layout>
      <Header>
        <span>
          <!-- <img src="../assets/img/logo.png" /> -->
        </span>
        <Button @click="exit">退出</Button>
      </Header>
      <Layout>
        <!-- 侧边栏 -->
        <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
          <Menu
            :active-name="this.$route.path"
            theme="light"
            width="auto"
            :open-names="['1']"
            accordion
          >
            <Submenu name="1">
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
      isCollapsed: false
    }
  },
  methods: {
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
</style>
