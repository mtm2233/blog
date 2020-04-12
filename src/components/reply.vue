<template>
  <div id="reply">
    <!-- 添加评论 -->
    <el-alert
      v-if="isReply==='0'?true:false"
      title="博主关闭了这篇内容的评论功能"
      type="warning"
      show-icon
      :closable="false"
    ></el-alert>
    <add-reply v-if="$store.state.replyId===0 && isReply==='1'?true:false"></add-reply>
    <!-- 评论列表 -->
    <div class="replys">
      <replys :repysList="repysList" :pName="''" :addReply="isReply==='0'?false:true"></replys>
    </div>
  </div>
</template>
<script>
import replys from './replys.vue'
import addReply from './addReply.vue'
export default {
  name: 'reply',
  props: ['artId', 'isReply'],
  data() {
    return {
      repysList: []
    }
  },
  methods: {
    // 获取当前文章的回复
    async getRepysList() {
      const { data: res } = await this.$http.get('reply/query/' + this.artId)
      if (res.status !== 200) {
        return this.$message.error('获取评论失败')
      }
      this.repysList = res.data
    }
  },
  components: {
    replys,
    addReply
  },
  mounted() {
    this.$store.commit('changeReplyId', 0)
    this.getRepysList()
  }
}
</script>
<style scoped>
#reply {
  width: 100%;
}
</style>
