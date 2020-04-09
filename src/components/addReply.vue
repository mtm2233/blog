<template>
  <div id="addReply">
    <h3>发表评论</h3>
    <a v-if="replyId!==0" @click="changeReplyId(0)">
      <i class="el-icon-close"></i>取消回复
    </a>
    <hr />
    <el-form
      :model="addReplyForm"
      :rules="addReplyRules"
      ref="addReplyRef"
      size="small"
      label-width="100px"
    >
      <!-- 根据cookie显示用户信息 -->
      <div class="userBox">
        <!-- 默认头像 -->
        <div class="userImg" v-if="addReplyForm.name">
          <svg width="100%" height="100%">
            <circle cx="17" cy="17" r="17" :fill="addReplyForm.email|hashColor" />
            <text
              x="17"
              y="17"
              fill="white"
              text-anchor="middle"
              dominant-baseline="middle"
            >{{addReplyForm.name.slice(0, 1)}}</text>
          </svg>
        </div>
        <div>
          欢迎
          <a>{{ addReplyForm.name }}</a> 再次光临！
          <br />
          <a @click="showUserInfo=!showUserInfo">编辑信息</a>
        </div>
        <div style="clear:both"></div>
      </div>
      <div v-if="showUserInfo">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="addReplyForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addReplyForm.email"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="webSite">
          <el-input v-model="addReplyForm.webSite"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model="addReplyForm.content" placeholder="欢迎留言，广告绕道。随缘回复！ →_→"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="addReply()">提交评论</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'addReply',
  data() {
    return {
      // 添加评论
      addReplyForm: {
        name: '',
        email: '',
        content: '',
        qq: '',
        webSite: ''
      },
      // 是否显示基本信息输入框
      showUserInfo: true,
      //   效验表单
      addReplyRules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '请输入评论内容',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 200,
            message: '长度在 1 到 200 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 点击按钮，发布评论
    addReply() {
      // 效验表单
      this.$refs.addReplyRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('reply/add', {
          ...this.addReplyForm,
          artId: this.$route.params.artId,
          parentId: this.replyId
        })
        if (res.status !== 201) {
          return this.$message.error('评论提交失败')
        }
        // 重置表单
        this.$refs.addReplyRef.resetFields()
        this.$message.success('评论提交成功，等待审核')
        // 存入token，设置有效时间25年
        this.$cookieStore.setCookie('email', res.token, 60 * 60 * 24 * 365 * 25)
        // 关闭评论
        this.changeReplyId(0)
      })
    },
    async getEmailToken() {
      // 获取token
      const token = this.$cookieStore.getCookie('email')
      const { data: res } = await this.$http.post('user/token', {
        emailToken: token
      })
      if (res.status !== 200) return
      this.addReplyForm.email = res.data[0].email
      this.addReplyForm.name = res.data[0].name
      this.showUserInfo = false
    },
    ...mapMutations(['changeReplyId'])
  },
  computed: {
    ...mapState(['replyId'])
  },
  mounted() {
    this.getEmailToken()
  }
}
</script>
<style scoped>
hr {
  border: 0;
  border-bottom: 1px solid #edf0f2;
  padding: 8px 0 0 10px;
}
#addReply {
  padding: 0 50px;
  width: 100%;
  padding: 10px;
}
#addReply .el-form-item {
  max-width: 350px;
}
h3 {
  color: #fd5d3c;
  margin: 0;
  font-size: 18px;
  line-height: 35px;
  margin-bottom: 10px;
}
a {
  color: #fd5d3c;
  font-size: 13px;
  cursor: pointer;
  margin-left: 5px;
}
.userBox {
  vertical-align: middle;
  margin: 10px 0 10px 58px;
}
.userImg {
  width: 35px;
  height: 35px;
  float: left;
  margin-right: 8px;
}
</style>
