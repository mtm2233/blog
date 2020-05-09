<template>
  <div id="readers">
    <div class="navTop">
      <h2>读者百强榜</h2>
      <h4>个个都是人才，说话又好听</h4>
    </div>
    <el-row :gutter="5">
      <el-col :xs="4" :sm="3" :md="2" :lg="2" v-for="(item,index) in readersList" :key="item.email">
        <!-- 网站链接 -->
        <a :href="item.webSite?item.webSite:'javascript:;'" target="_blank">
          <div class="user">
            <!-- 头像 -->
            <div class="userImg">
              <img v-if="item.imgSrc" :src="item.imgSrc" />
              <svg width="100%" height="100%" v-if="!item.imgSrc">
                <rect width="100%" height="100%" :fill="item.email|hashColor" />
                <text
                  x="50%"
                  y="50%"
                  fill="white"
                  text-anchor="middle"
                  dominant-baseline="middle"
                >{{item.name.slice(0, 1)}}</text>
              </svg>
            </div>
            <div class="userInfo">
              <span>
                <p>第{{index+1}}名</p>
                <p>{{item.name}}</p>
                <p>{{item.strips}}</p>
              </span>
            </div>
          </div>
        </a>
      </el-col>
    </el-row>
    <br />
    <!-- 评论 -->
    <reply artId="2010"></reply>
  </div>
</template>
<script>
// 评论组件
import reply from './reply.vue'
export default {
  name: 'readers',
  data() {
    return {
      readersList: []
    }
  },
  methods: {
    //  获取读者墙数据
    async getreaders() {
      const { data: res } = await this.$http.get('user/front/100')
      if (res.status !== 200) return this.$message.error('获取读者墙列表失败')
      this.readersList = res.data
    }
  },
  components: {
    reply
  },
  mounted() {
    this.getreaders()
  }
}
</script>
<style scoped>
#readers {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 75px;
  padding: 0 15px;
  box-sizing: border-box;
}
.user {
  margin-top: 5px;
  width: 100%;
  position: relative;
  padding-bottom: 100%;
  transition: 0.3s;
  -moz-transition: 0.3s;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
}
.userImg {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  font-size: 33px;
}
.userInfo {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  display: none;
  opacity: 0.7;
}
.userInfo span {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  text-align: center;
}
.user:hover {
  transform: scale(1.2);
  z-index: 5;
}
.user:hover .userInfo {
  display: block;
}
p {
  margin: 0;
  padding: 0;
  color: white;
}
img {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
