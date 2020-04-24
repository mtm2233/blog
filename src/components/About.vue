<template>
  <div id="about">
    <div class="navTop">
      <h2>关于</h2>
      <h4>我是谁?</h4>
    </div>
    <h2>个人简介</h2>
    <div class="user">
      <div class="img">
        <img src="../assets/img/eyJhbGciOi.jpg" />
      </div>
      <h3>YouCan</h3>
      <p>1. 精通C、PHP、js、Node等语言 Hello world 的编写</p>
      <p>2.《英雄联盟》万年青铜玩家</p>
      <p>3. 轻度懒癌患者</p>
    </div>
    <h2>个人资料</h2>
    <el-row :gutter="10">
      <el-col :xs="12" :sm="8" :md="6">
        <p>常用昵称</p>
        <p>YouCan</p>
      </el-col>
      <el-col :xs="12" :sm="8" :md="6">
        <p>星座</p>
        <p>双鱼座</p>
      </el-col>
      <el-col :xs="12" :sm="8" :md="6">
        <p>爱好</p>
        <p>GAME</p>
      </el-col>
      <el-col :xs="12" :sm="8" :md="6">
        <p>职业</p>
        <p>学生&前端</p>
      </el-col>
    </el-row>
    <h2>交流相关</h2>
    <el-row :gutter="20">
      <el-col :xs="12" :sm="8" :md="6">
        <a href="https://space.bilibili.com/34011178" target="_black">哔哩哔哩</a>
      </el-col>
      <el-col :xs="12" :sm="8" :md="6">
        <a href="https://gitee.com/youcann" target="_black">码云</a>
      </el-col>
      <el-col :xs="12" :sm="8" :md="6">
        <a
          href="mailto:matianmeng@youcann.club"
          title="matianmeng@youcann.club"
          target="_black"
        >Email</a>
      </el-col>
    </el-row>
    <h2>关于本站</h2>
    <ol>
      <li>云服务器：1核2G(腾讯云)</li>
      <li>前端：Vue+Element-UI</li>
      <li>后端：Node.js</li>
      <li>数据库：Mysql</li>
    </ol>
    <!-- 评论 -->
    <reply artId="2015"></reply>
  </div>
</template>
<script>
// 评论组件
import reply from './reply.vue'
export default {
  name: 'about',
  components: {
    reply
  }
}
</script>
<style scoped>
#about {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 75px;
  padding: 0 15px;
  box-sizing: border-box;
  margin-bottom: 50px;
}
.user p,
h3 {
  margin: 5px;
}
.user {
  position: relative;
  padding-left: 120px;
}
.img {
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  left: 0;
}
img {
  vertical-align: middle;
}
.el-col {
  margin-bottom: 10px;
}
.el-col p:first-child {
  font-size: 12px;
  margin-bottom: 0;
}
.el-col p:last-child {
  font-size: 20px;
}
a {
  text-align: center;
  display: inline-block;
  width: 100%;
  font-size: 25px;
  border-radius: 30px;
  text-decoration: none;
  transition: 0.3s;
  -moz-transition: 0.3s;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  letter-spacing: 1px;
  padding: 5px 0;
  color: #636e72;
  border: 2px solid #636e72;
}
a:hover {
  background-color: #636e72;
  color: white;
}
li {
  margin: 10px 0;
  letter-spacing: 0.6px;
}
@media screen and (max-width: 525px) {
  #about {
    text-align: center;
  }
  .user {
    padding-left: 0;
  }
  .img {
    position: relative;
  }
}
</style>
