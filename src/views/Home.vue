<template>
  <div>
    <el-container class="home-main">
      <el-main>
        <router-view></router-view>
      </el-main>
      <!--侧边栏-->
      <el-aside class="hidden-sm-and-down" min-width="270px">
        <div class="scrollBox">
          <h3>分类</h3>
          <el-menu
            :default-active="$store.state.typeId"
            :unique-opened="true"
            :default-openeds="[typeIdP]"
          >
            <!--一级菜单-->
            <el-submenu :index="item.typeId + ''" v-for="item in rightMenusList" :key="item.typeId">
              <!--一级菜单都模板区域-->
              <template slot="title">
                <!--文本-->
                <span>{{item.type}}</span>
              </template>
              <!--二级菜单-->
              <el-menu-item
                :index="subItem.typeId+''"
                v-for="subItem in item.children"
                :key="subItem.typeId"
                @click="changeTypeIdP(subItem.typeId+'',item.typeId+'')"
              >
                <template slot="title">
                  <!--文本-->
                  <span>{{subItem.type}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
          <!-- 作品集 -->
          <h3>作品集</h3>
          <el-button type="info" plain>点击进入</el-button>
          <!-- 最新评论 -->
          <h3>最新评论</h3>
          <div class="reply" v-for="item in NewReplyList" :key="item.replyId">
            <!-- 默认头像 -->
            <div class="userImg">
              <svg width="100%" height="100%">
                <circle cx="20" cy="20" r="20" :fill="item.email|hashColor" />
                <text
                  x="20"
                  y="20"
                  fill="white"
                  text-anchor="middle"
                  dominant-baseline="middle"
                >{{item.name.slice(0, 1)}}</text>
              </svg>
            </div>
            <!-- 用户信息 -->
            <div class="user">
              <!-- 用户名 -->
              <p>{{item.name}}</p>
              <!-- 评论内容 -->
              <p class="userCon">{{item.content}}</p>
            </div>
          </div>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'home',
  data() {
    return {
      // 右侧菜单列表
      rightMenusList: [],
      typeIdP: '20',
      // 最新评论列表
      NewReplyList: []
    }
  },
  methods: {
    // 获取右侧导航栏
    async getRightMenus() {
      const { data: res } = await this.$http.get('menus/query')
      if (res.status !== 200) return this.$message.error('获取右侧导航栏失败')
      this.rightMenusList = res.data
    },
    // 获取最新的评论
    async getNewReplyList() {
      const { data: res } = await this.$http.get('reply/latest/4')
      if (res.status !== 200) return this.$message.error('获取最新评论失败')
      this.NewReplyList = res.data
    },
    changeTypeIdP(typeId, typeIdP) {
      this.typeIdP = typeIdP
      this.changeTypeId(typeId)
    },
    ...mapMutations(['changeTypeId'])
  },
  mounted() {
    this.getRightMenus()
    this.getNewReplyList()
  }
}
</script>
<style scoped>
.userImg {
  width: 40px;
  height: 40px;
  margin: 10px 10px 10px 0;
  float: left;
}
p {
  margin: 0;
  padding: 0;
  word-break: break-all;
  white-space: pre-wrap;
}
.user {
  width: calc(100% - 60px);
  margin: 10px 0;
  float: left;
}
.reply {
  width: 100%;
  float: left;
  border-bottom: 1px solid #d0d6d9;
}
.userCon {
  font-size: 12px;
}
.el-aside {
  top: 20px;
  height: 100%;
  position: relative;
}
.scrollBox {
  width: 270px;
  height: 85%;
  overflow-y: scroll;
  position: fixed;
}
h3 {
  margin: 0;
  border-bottom: 1px solid #d0d6d9;
  font-size: 18px;
  line-height: 35px;
  margin-bottom: 10px;
}
.el-menu {
  border-right: 0;
}
.home-main {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 60px;
}
.el-main {
  width: 100%;
}
.el-button {
  width: 95%;
  margin: 10px 0;
}
</style>
