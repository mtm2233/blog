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
      label-width="60px"
    >
      <!-- 根据cookie显示用户信息 -->
      <div class="userBox" v-if="isToken">
        <!-- 头像 -->
        <div class="userImg">
          <!-- qq头像 -->
          <img
            v-if="addReplyForm.imgSrc"
            :src="addReplyForm.imgSrc"
          />
          <!-- 默认头像 -->
          <svg width="100%" height="100%" v-else>
            <circle cx="50%" cy="50%" r="50%" :fill="addReplyForm.email|hashColor" />
            <text
              x="50%"
              y="50%"
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
      <!-- 是否是第一次登录 -->
      <div v-if="showUserInfo">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="addReplyForm.name" @blur="qq()" placeholder="输入QQ号可快速填写"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addReplyForm.email" @blur="clearInfo()"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="webSite">
          <el-input v-model="addReplyForm.webSite" placeholder="请加上https://"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="webSite">
          <el-input v-model="addReplyForm.imgSrc" placeholder="请加上https://"></el-input>
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
  props: ['artId'],
  data() {
    return {
      // 添加评论
      addReplyForm: {
        name: '',
        email: '',
        content: '',
        qq: '',
        webSite: '',
        imgSrc: ''
      },
      // 是否显示基本信息输入框
      showUserInfo: true,
      isToken: false,
      //   效验表单
      addReplyRules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
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
          artId: this.artId,
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
        this.getEmailToken()
      })
    },
    async getEmailToken() {
      // 获取token
      const token = this.$cookieStore.getCookie('email')
      if (!token) return
      const { data: res } = await this.$http.post('user/token', {
        emailToken: token
      })
      if (res.status !== 200) return
      this.addReplyForm.email = res.data[0].email
      this.addReplyForm.name = res.data[0].name
      this.addReplyForm.imgSrc = res.data[0].imgSrc
      this.addReplyForm.webSite = res.data[0].webSite
      this.showUserInfo = false
      this.isToken = true
    },
    // 根据qq号获取昵称和头像
    async qq() {
      if (!/^[1-9]\d{4,9}$/.test(this.addReplyForm.name)) return
      const { data: res } = await this.$http.get(
        'user/qq?qq=' + this.addReplyForm.name
      )
      this.addReplyForm.qq = this.addReplyForm.name
      this.addReplyForm.name = res.name
      this.addReplyForm.email = this.addReplyForm.qq + '@qq.com'
      this.addReplyForm.imgSrc = res.imgSrc
    },
    clearInfo() {
      this.addReplyForm.imgSrc = ''
      this.addReplyForm.qq = ''
    },
    ...mapMutations(['changeReplyId'])
  },
  computed: {
    ...mapState(['replyId'])
  },
  mounted() {
    this.getEmailToken()
    this.qq()
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
  width: 100%;
  padding: 10px 0;
}
#addReply .el-form-item {
  max-width: 350px;
}
h3 {
  color: #fd5d3c;
  margin: 0;
  font-size: 18px;
  line-height: 35px;
}
a {
  color: #fd5d3c;
  font-size: 13px;
  cursor: pointer;
  margin-left: 5px;
}
.userBox {
  vertical-align: middle;
  margin: 10px;
}
.userImg {
  width: 35px;
  height: 35px;
  float: left;
  margin-right: 8px;
  border-radius: 50%;
  overflow: hidden;
}
img {
  width: 100%;
  height: 100%;
}
</style>
