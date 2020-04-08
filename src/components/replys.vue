<template>
  <ul class="replys">
    <li class="reply" v-for="item in repysList" :key="item.replyId">
      <!-- 默认头像 -->
      <div class="user">
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
        <div class="userInfor">
          {{item.name}}
          <span
            :class="'level level-'+ item.level"
            v-if="item.level!=='站长'"
          >Lv {{item.level}}</span>
          <span :class="'level level-admin'" v-else>{{item.level}}</span>
          <p>
            <span v-if="pName">@{{pName}}</span>
            {{item.content}}
          </p>
        </div>
        <replys v-if="item.children" :repysList="item.children" :pName="item.name"></replys>
      </div>
      <hr v-if="!pName" />
    </li>
  </ul>
</template>
<script>
export default {
  name: 'replys',
  props: ['repysList', 'pName']
}
</script>
<style scoped>
hr {
  border: 0;
  border-bottom: 1px solid #edf0f2;
  padding: 8px 0 0 10px;
}
ul {
  list-style: none;
}
.user {
  float: left;
  width: 100%;
  /* border-bottom: 1px solid #d0d6d9; */
}
.userImg {
  width: 40px;
  height: 40px;
  float: left;
}
.userInfor {
  margin-left: 5px;
  float: left;
  /* margin: 10px; */
}
.userInfor p {
  margin: 3px 0;
  padding: 0;
  font-size: 14px;
  vertical-align: middle;
  word-break: break-all;
  white-space: pre-wrap;
}
.userInfor p span {
  font-size: 12px;
  color: #eb5055;
  margin-right: 5px;
}
</style>
