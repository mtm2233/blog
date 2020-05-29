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
          <img v-if="addReplyForm.imgSrc" :src="addReplyForm.imgSrc" />
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
          <el-input v-model="addReplyForm.email"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="webSite">
          <el-input v-model="addReplyForm.webSite" placeholder="请加上https://"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="webSite">
          <el-input v-model="addReplyForm.imgSrc" placeholder="请加上https://"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="内容" prop="content">
        <el-input
          type="textarea"
          v-model="addReplyForm.content"
          placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
        ></el-input>
        <!-- 表情 -->
        <el-popover placement="bottom-start" width="370" trigger="click" ref="emojiPopover">
          <el-tabs tab-position="bottom" type="border-card">
            <!-- 颜文字 -->
            <el-tab-pane label="颜文字">
              <a class="emoji" v-for="(val,index) in yanEmoji" :key="index" @click="addEmoji(val)">{{val}}</a>
            </el-tab-pane>
            <!-- QQ -->
            <el-tab-pane label="QQ">
              <a class="emoji" v-for="(val,index) in emojiQQ" :key="index" @click="addEmoji('['+val+'.gif]')">
                <img :src="'https://api.youcann.club/emoji/'+val+'.gif'" alt />
              </a>
            </el-tab-pane>
            <!-- 阿鲁 -->
            <el-tab-pane label="阿鲁">
              <a class="emoji" v-for="index in emojiAL" :key="index" @click="addEmoji('['+index+'.png]')">
                <img :src="'https://api.youcann.club/emoji/'+index+'.png'" alt />
              </a>
            </el-tab-pane>
          </el-tabs>
          <el-button
            slot="reference"
            size="mini"
            icon="el-icon-picture-outline-round"
            @click="showEmoji()"
          >表情</el-button>
        </el-popover>
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
      },
      // 颜文字
      yanEmoji: [
        '（⌒▽⌒）',
        '（￣▽￣）',
        '(=・ω・=)',
        '(｀・ω・´)',
        '(〜￣△￣)〜',
        '(･∀･)',
        '(°∀°)',
        'ﾉ(￣3￣)╮',
        '╮(￣▽￣)╭',
        '╭( ´_ゝ｀)',
        '→_→',
        '←_←',
        '(;¬_¬)',
        '(ﾟДﾟ≡ﾟдﾟ)!?',
        'Σ(ﾟдﾟ;)Σ',
        '( ￣□￣||)<',
        '(´；ω；`)',
        '（/TДT)/',
        '(^・ω・^ )',
        '(｡･ω･｡)',
        '(●￣(ｴ)￣●)',
        'ε=ε=(ノ≧∇≦)ノ',
        '(´･_･`)',
        '(-_-#)',
        '（￣へ￣）',
        '(￣ε(#￣) Σ',
        'ヽ(`Д´)ﾉ',
        '(╯°口°)╯(┴—┴]'
      ],
      // QQ
      emojiQQ: [],
      // 阿鲁
      emojiAL: 0
    }
  },
  methods: {
    // 点击按钮，发布评论
    addReply() {
      // 效验表单
      this.$refs.addReplyRef.validate(async valid => {
        if (!valid) return
        let con = this.addReplyForm.content
        con = con.replace(/</g, '《')
        con = con.replace(/>/g, '》')
        this.addReplyForm.content = con.replace(
          /\[(.+?)\]/g,
          '<img src="https://api.youcann.club/emoji/$1" />'
        )
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
    // 显示表情
    showEmoji() {
      this.emojiQQ = [
        '微笑',
        '撇嘴',
        '色',
        '发呆',
        '得意',
        '流泪',
        '害羞',
        '闭嘴',
        '睡',
        '大哭',
        '尴尬',
        '呲牙',
        '发怒',
        '调皮',
        '惊讶',
        '难过',
        '酷',
        '冷汗',
        '抓狂',
        '吐',
        '偷笑',
        '可爱',
        '白眼',
        '傲慢',
        '饥饿',
        '困',
        '惊恐',
        '流汗',
        '憨笑',
        '大兵',
        '奋斗',
        '咒骂',
        '疑问',
        '嘘',
        '晕',
        '折磨',
        '衰',
        '骷髅',
        '敲打',
        '再见',
        '擦汗',
        '抠鼻',
        '鼓掌',
        '嗅大了',
        '坏笑',
        '左哼哼',
        '右哼哼',
        '哈欠',
        '鄙视',
        '委屈',
        '可怜',
        '阴险',
        '亲亲',
        '吓',
        '快哭了',
        '菜刀',
        '西瓜',
        '啤酒',
        '篮球',
        '乒乓',
        '咖啡',
        '饭',
        '猪头',
        '玫瑰',
        '凋谢',
        '心',
        '心碎',
        '蛋糕',
        '闪电',
        '炸弹',
        '刀',
        '足球',
        '瓢虫',
        '便便',
        '夜晚',
        '太阳',
        '礼物',
        '拥抱',
        '强',
        '弱',
        '握手',
        '胜利',
        '抱拳',
        '勾引',
        '拳头',
        '差劲',
        '爱你',
        'NO',
        'OK',
        '爱情',
        '飞吻',
        '发财',
        '帅',
        '雨伞',
        '高铁左车头',
        '车厢',
        '高铁右车头',
        '纸巾',
        '右太极',
        '左太极',
        '献吻',
        '街舞',
        '激动',
        '挥动',
        '跳绳',
        '回头',
        '磕头',
        '转圈',
        '怄火',
        '发抖',
        '跳跳',
        '爆筋',
        '沙发',
        '钱',
        '蜡烛',
        '枪',
        '灯',
        '香蕉',
        '吻',
        '下雨',
        '闹钟',
        '囍',
        '棒棒糖',
        '面条',
        '车',
        '邮件',
        '风车',
        '药丸',
        '奶瓶',
        '灯笼',
        '青蛙',
        '戒指',
        'K歌',
        '熊猫',
        '喝彩',
        '购物',
        '多云',
        '鞭炮',
        '飞机',
        '气球'
      ]
      this.emojiAL = 144
    },
    // 添加表情
    addEmoji(val) {
      this.addReplyForm.content += val
      this.$refs.emojiPopover.doClose()
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
.userImg img {
  width: 100%;
  height: 100%;
}
</style>
