<template>
  <div class="content">
    <Form :model="artForm" :label-width="80" ref="artFormRef">
      <FormItem label="标题" prop="title">
        <Input v-model="artForm.title"></Input>
      </FormItem>
      <FormItem label="上传封面">
        <!-- https://api.youcann.club/ -->
        <!-- 上传图片 -->
        <Upload
          action="https://api.youcann.club/img/add"
          name="test"
          :headers="headerObj"
          :on-success="handleSuccess"
          :on-remove="imgRemove"
          :default-file-list="artForm.imgSrcList"
          :on-preview="onImgsrc"
        >
          <Button icon="ios-cloud-upload-outline" class="upload">Upload files</Button>
        </Upload>
      </FormItem>
      <FormItem label="分类" prop="typeId">
        <Select
          class="selectSearch"
          v-model="artForm.typeId"
          style="width:200px"
          placeholder="请选择分类"
        >
          <Option
            v-for="item in artTypeList"
            :value="item.typeId"
            :key="item.typeId"
          >{{ item.type }}</Option>
        </Select>
      </FormItem>
      <FormItem label="标签" prop="tags">
        <CheckboxGroup v-model="artForm.tagList">
          <Checkbox v-for="item in artTagsList" :key="item.tagId" :label="item.tagName"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="是否评论" prop="isReply">
        <i-switch v-model="artForm.isReply" :true-value="1" :false-value="0" />
      </FormItem>
      <FormItem label="是否轮播" prop="carousel">
        <i-switch
          v-model="artForm.carousel"
          :true-value="1"
          :false-value="0"
          @on-change="carChange"
        />
      </FormItem>
      <FormItem label="轮播图" prop="carImg">
        <Upload
          action="https://api.youcann.club/img/add"
          name="test"
          :headers="headerObj"
          :on-success="uploadCarImg"
          :on-remove="carImgRemove"
          :on-preview="onImgsrc"
          :default-file-list="artForm.carImgList"
        >
          <Button
            icon="ios-cloud-upload-outline"
            class="upload"
            :disabled="artForm.carousel?false:true"
          >Upload files</Button>
        </Upload>
      </FormItem>
      <!-- 添加/修改 -->
      <FormItem label prop="contents">
        <Button type="primary" @click="artOk">添加/修改</Button>
      </FormItem>
      <!-- 富文本编辑器 -->
      <FormItem label="内容" prop="contents">
        <quill-editor v-model="artForm.content" :options="editorOption"></quill-editor>
      </FormItem>
    </Form>
    <!-- 图片预览 -->
    <Modal v-model="modal" title="图片预览">
      <img :src="modalImg" />
    </Modal>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import Quill from 'quill' // 引入编辑器
import imageResize from 'quill-image-resize-module'
import { ImageExtend, QuillWatch } from 'quill-image-extend-module'
import hljs from 'highlight.js'
Quill.register('modules/imageResize', imageResize)
Quill.register('modules/ImageExtend', ImageExtend)
// 工具菜单栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  ['blockquote', 'code-block'], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标
  [{ indent: '-1' }, { indent: '+1' }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ['clean'], // 清除文本格式
  ['link', 'image', 'video'] // 链接、图片、视频
]
export default {
  components: { quillEditor },
  data() {
    return {
      artForm: {
        imgSrcList: [],
        carImgList: [],
        artId: '',
        typeId: 27,
        title: '',
        content: '',
        imgSrc: '',
        tagList: [],
        tags: '',
        isReply: 1,
        carousel: 0,
        carImg: ''
      },
      // 分类
      artTypeList: [],
      // 标签
      artTagsList: [],
      // 图片上传请求头
      headerObj: {
        login_token: window.sessionStorage.getItem('token')
      },
      modal: false,
      modalImg: '',
      editorOption: {
        modules: {
          toolbar: {
            // 工具栏
            container: toolbarOptions,
            handlers: {
              image: function() {
                // 触发图片上传的时候返回的信息
                QuillWatch.emit(this.quill.id) // 使用图片上传插件的统一写法
              }
            }
          },
          syntax: {
            highlight: text => {
              let language = text.match(/\/\*\*.{3,12}\*\*\//)
                ? text.match(/\/\*\*.{3,12}\*\*\//)[0]
                : ''
              language = language.slice(3, -3)
              return language
                ? hljs.highlight(language, text).value
                : hljs.highlightAuto(text).value // 这里就是代码高亮需要配置的地方
            }
          },
          // 图片放大缩小
          imageResize: {
            displaySize: true
          },
          ImageExtend: {
            // 使用的图片上传扩展插件
            name: 'test', // 传的参数名
            size: 2, // 单位为M, 1M = 1024KB
            action: 'https://api.youcann.club/img/add', // 后台上传图片的接口地址
            response: res => {
              // 上传成功
              return 'https://api.youcann.club/img/' + res.data.imgSrc
            }
          }
        },
        placeholder: '博客文章', // 提示
        readyOnly: false, // 是否只读
        theme: 'snow', // 主题 snow/bubble
        syntax: true // 语法检测
      }
    }
  },
  methods: {
    // 获取文章详情
    async getart() {
      if (this.$route.params.artId === '0') return
      const { data: res } = await this.$http.get(
        'back/article/query/' + this.$route.params.artId
      )
      if (res.status !== 200) return this.$message.error('获取文章详情失败')
      const data = res.data[0]
      this.artForm.imgSrcList = [
        {
          name: data.imgSrc,
          url: 'https://api.youcann.club/img/' + data.imgSrc
        }
      ]
      if (data.carousel) {
        this.artForm.carImgList = [
          {
            name: data.carImg,
            url: 'https://api.youcann.club/img/' + data.carImg
          }
        ]
      }
      this.artForm.typeId = data.typeId
      this.artForm.title = data.title
      this.artForm.content = data.content
      this.artForm.imgSrc = data.imgSrc
      this.artForm.tagList = data.tags.split(',')
      this.artForm.isReply = data.isReply
      this.artForm.carousel = data.carousel
      this.artForm.carImg = data.carImg
      this.artForm.artId = data.artId
    },
    // 文章封面上传成功
    handleSuccess(res) {
      if (res.status !== 201) return this.$message.error('图片上传失败')
      this.artForm.imgSrc = res.data.imgSrc
      this.artForm.imgSrcList = [
        {
          name: res.data.imgSrc,
          url: 'https://api.youcann.club/img/' + res.data.imgSrc
        }
      ]
      return this.$message.success('图片上传成功')
    },
    // 移除文章封面
    imgRemove() {
      this.artForm.imgSrc = ''
    },
    // 获取分类
    async getTypeList() {
      const { data: res } = await this.$http.get('back/article/type')
      if (res.status !== 200) return this.$message.error('获取文章分类失败')
      this.artTypeList = res.data
    },
    // 获取标签
    async getTagsList() {
      const { data: res } = await this.$http.post('back/tags/query', {
        search: '',
        pagenum: 1,
        pagesize: 999
      })
      if (res.status !== 200) return this.$message.error('获取文章标签失败')
      this.artTagsList = res.data
    },
    // 文章轮播上传成功
    uploadCarImg(res) {
      if (res.status !== 201) return this.$message.error('图片上传失败')
      this.artForm.carImgList = [
        {
          name: res.data.imgSrc,
          url: 'https://api.youcann.club/img/' + res.data.imgSrc
        }
      ]
      this.artForm.carImg = res.data.imgSrc
      return this.$message.success('图片上传成功')
    },
    // 移除轮播图
    carImgRemove() {
      this.artForm.carImg = ''
    },
    // 切换轮播
    carChange(status) {
      this.artForm.carImg = ''
    },
    // 图片预览
    onImgsrc(file) {
      this.modal = true
      this.modalImg = file.url
    },
    // 添加修改
    async artOk() {
      this.artForm.tags = this.artForm.tagList.join()
      // add
      if (this.$route.params.artId === '0') {
        const { data: res } = await this.$http.post(
          'back/article/add',
          this.artForm
        )
        if (res.status !== 201) return this.$message.error('添加失败')
        this.$router.push('/home')
        return this.$message.success('添加成功')
      }
      const { data: res } = await this.$http.post(
        'back/article/edit',
        this.artForm
      )
      if (res.status !== 201) return this.$message.error('修改失败')
      this.$router.push('/home')
      return this.$message.success('修改成功')
    }
  },
  mounted() {
    this.getart()
    this.getTypeList()
    this.getTagsList()
  }
}
</script>
<style scoped>
.ivu-form,
.quill-editor {
  z-index: 9;
  max-width: 870px;
}
.upload {
  margin-left: 0;
}
img {
  width: 100%;
}
.ivu-btn {
  margin-left: 0;
}
</style>
