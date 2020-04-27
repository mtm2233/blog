<template>
  <div class="login">
    <div class="loginBox">
      <!-- 头像 -->
      <div class="userbox">
        <img src="../assets/img/admin.jpg" />
      </div>
      <!-- 输入框 -->
      <div class="userInfo">
        <Form ref="loginFormRef" :model="loginForm" :rules="loginFormRul" :label-width="0">
          <FormItem prop="username">
            <Input v-model="loginForm.username">
              <Icon type="ios-person-outline"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="loginForm.password">
              <Icon type="ios-lock-outline"></Icon>
            </Input>
          </FormItem>
          <!-- 按钮 -->
          <FormItem class="btns">
            <Button type="primary" @click="login">登录</Button>
            <Button @click="resetForm">重置</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      // 登录表单
      loginForm: {
        username: 'root',
        password: '123456'
      },
      // 效验规则
      loginFormRul: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            max: 12,
            message: '密码为6到12位',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 重置
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    },
    // 登录
    login() {
      this.$refs.loginFormRef.validate(async val => {
        if (!val) return this.$message.error('请检查表单是否填写完整')
        const { data: res } = await this.$http.post(
          'back/login',
          this.loginForm
        )
        if (res.status !== 200) return this.$message.error('登陆失败')
        this.$message.success('登陆成功')
        window.sessionStorage.setItem('login_token', res.login_token)
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  width: 100%;
  background-color: #2b85e4;
}
.loginBox {
  width: 400px;
  height: 260px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  .userbox {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    overflow: hidden;
  }
  .userInfo {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    .btns {
      text-align: right;
    }
    .ivu-btn {
      margin: 0 6px;
    }
  }
}
</style>
