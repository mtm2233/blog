<template>
  <ul class="replys">
    <li class="reply" v-for="item in repysList" :key="item.replyId">
      <!-- 默认头像 -->
      <div class="user">
        <div class="userImg">
          <img
            v-if="item.imgSrc"
            :src="item.imgSrc"
          />
          <svg width="100%" height="100%" v-if="!item.imgSrc">
            <circle cx="50%" cy="50%" r="50%" :fill="item.email|hashColor" />
            <text
              x="50%"
              y="50%"
              fill="white"
              text-anchor="middle"
              dominant-baseline="middle"
            >{{item.name.slice(0, 1)}}</text>
          </svg>
        </div>
        <!-- 用户信息 -->
        <div class="userInfor">
          <a :href="item.webSite?item.webSite:'javascript:;'" target="_blank">{{item.name}}</a>
          <span :class="'level level-admin'" v-if="item.title" :title="item.supp">{{item.title}}</span>
          <span
            :class="level(item.num)[0]"
            :title="level(item.num)[2]"
            v-else
          >{{level(item.num)[1]}}</span>
          <p>
            <span v-if="pName" class="pReply">@{{pName}}</span>
            {{item.content}}
          </p>
          <p>
            <span class="timeSpan">{{item.replyTime}}</span>
            <span class="repSpan" v-if="addReply" @click="changeReplyId(item.replyId)">回复</span>
            <!-- 添加评论 -->
            <add-reply v-if="addReply&&replyId==item.replyId" :artId="artId"></add-reply>
          </p>
          <replys
            v-if="item.children"
            :repysList="item.children"
            :pName="item.name"
            :addReply="addReply"
            :artId="artId"
          ></replys>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import addReply from './addReply.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'replys',
  props: ['repysList', 'pName', 'addReply', 'artId'],
  components: {
    addReply
  },
  methods: {
    level(num) {
      if (num < 5) {
        return [
          'level level-1',
          'Lv 1',
          '评论等级 Lv.1，共有' +
            num +
            '条评论，还差' +
            (5 - num) +
            '条评论升级至 Lv.2'
        ]
      } else if (num < 15) {
        return [
          'level level-2',
          'Lv 2',
          '评论等级 Lv.2，共有' +
            num +
            '条评论，还差' +
            (15 - num) +
            '条评论升级至 Lv.3'
        ]
      } else if (num < 45) {
        return [
          'level level-3',
          'Lv 3',
          '评论等级 Lv.3，共有' +
            num +
            '条评论，还差' +
            (45 - num) +
            '条评论升级至 Lv.4'
        ]
      } else if (num < 100) {
        return [
          'level level-4',
          'Lv 4',
          '评论等级 Lv.4，共有' +
            num +
            '条评论，还差' +
            (100 - num) +
            '条评论升级至 Lv.5'
        ]
      } else {
        return ['level level-5', 'Lv 5', '评论等级 Lv.5，共有' + num + '条评论']
      }
    },
    ...mapMutations(['changeReplyId'])
  },
  computed: {
    ...mapState(['replyId'])
  }
}
</script>
<style scoped>
ul {
  list-style: none;
  padding: 0;
}
.reply {
  width: 100%;
}
.user {
  width: 100%;
  position: relative;
}
.userImg {
  width: 40px;
  height: 40px;
  float: left;
  top: 3px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
}
img {
  width: 100%;
  height: 100%;
}
.userInfor {
  margin-left: 50px;
  padding-top: 10px;
  border-bottom: 1px solid #edf0f2;
}
.userInfor:hover {
  background-color: #fafafa;
}
.userInfor p {
  margin: 3px 0;
  padding: 0;
  font-size: 14px;
  vertical-align: middle;
  word-break: break-all;
}
.userInfor p .pReply {
  font-size: 12px;
  color: #eb5055;
  margin-right: 5px;
}
a {
  text-decoration: none;
  color: black;
}
.timeSpan,
.repSpan {
  font-size: 12px;
  color: #909399;
  margin-right: 5px;
  cursor: text;
}
.repSpan {
  cursor: pointer;
}
span {
  cursor: pointer;
}
</style>
