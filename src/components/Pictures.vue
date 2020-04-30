<template>
  <div class="pictures">
    <!-- 查询框 -->
    <Input
      search
      enter-button
      placeholder="请输入图片标题"
      style="width: 300px"
      @on-search="getPicList"
      v-model="getPicForm.search"
    ></Input>
    <!-- 下拉菜单 -->
    <Select
      class="selectSearch"
      v-model="getPicForm.albumId"
      style="width:200px"
      clearable
      @on-change="getPicList()"
      placeholder="请选择相册"
    >
      <Option v-for="item in albumList" :value="item.albumId" :key="item.title">{{ item.title }}</Option>
    </Select>
    <!-- 添加相册 -->
    <Button type="primary" @click="addModal=true">添加图片</Button>
    <!-- table表格 -->
    <Table border :columns="columns" :data="picList" stripe>
      <template slot-scope="{ row }" slot="imgSrc">
        <img
          :src="'https://api.youcann.club/img/'+row.imgSrc"
          :title="row.content"
          :onerror="errorGoodsImg"
        />
      </template>
      <template slot-scope="{ row }" slot="addTime">{{row.addtime|timefilters}}</template>
    </Table>
    <!-- 分页 -->
    <Page
      :total="total"
      size="small"
      show-elevator
      show-sizer
      show-total
      :page-size="getPicForm.pagesize"
      :page-size-opts="[3,6,10,15]"
      :current="getPicForm.pagenum"
      @on-change="changePagenum"
      @on-page-size-change="changePagesize"
    />
    <!-- 添加相册对话框 -->
    <Modal v-model="addModal" title="添加相册" @on-ok="addPic" @on-cancel="resetForm">
      <Form :model="addPicForm" :label-width="80" ref="addPicFormRef">
        <FormItem label="上传图片" class="uploadImg">
          <!-- https://api.youcann.club/ -->
          <!-- 上传图片 -->
          <Upload
            action="http://127.0.0.1:2541/img/add"
            name="test"
            :headers="headerObj"
            :on-success="handleSuccess"
            :on-remove="imgRemove"
          >
            <Button icon="ios-cloud-upload-outline" class="upload">Upload files</Button>
          </Upload>
        </FormItem>
        <!-- 下拉菜单 -->
        <FormItem label="相册" prop="albumId">
          <Select
            class="selectSearch"
            v-model="addPicForm.albumId"
            style="width:200px"
            placeholder="请选择相册"
          >
            <Option
              v-for="item in albumList"
              :value="item.albumId"
              :key="item.title"
            >{{ item.title }}</Option>
          </Select>
        </FormItem>
        <FormItem label="名称" prop="title">
          <Input v-model="addPicForm.title"></Input>
        </FormItem>
        <FormItem label="描述" prop="content">
          <Input v-model="addPicForm.content"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'pictures',
  data() {
    return {
      // 相册列表
      albumList: [],
      // 图片列表
      picList: [],
      // 查询图片列表的参数
      getPicForm: {
        search: '',
        albumId: '',
        pagesize: 3,
        pagenum: 1
      },
      // 图片总条数
      total: 0,
      // 添加图片对话框
      addModal: false,
      // table配置
      columns: [
        { title: '标题', key: 'title', width: 300, fixed: 'left' },
        { title: '描述', key: 'content', width: 300 },
        { title: '图片', slot: 'imgSrc', width: 200 },
        { title: '创建时间', slot: 'addTime', width: 230, fixed: 'right' }
      ],
      // 默认图片
      errorGoodsImg: `this.src='${require('../assets/img/error.jpg')}'`,
      // 添加图片
      addPicForm: {
        title: '',
        content: '',
        imgSrc: '',
        albumId: ''
      },
      // 图片上传请求头
      headerObj: {
        login_token: window.sessionStorage.getItem('token')
      }
    }
  },
  methods: {
    // 获取相册列表
    async getAlbumList() {
      const { data: res } = await this.$http.post('back/album/query', {
        search: '',
        pagenum: 1,
        pagesize: 99
      })
      if (res.status !== 200) return this.message.error('获取相册列表失败')
      this.albumList = res.data
    },
    // 获取图片列表
    async getPicList(albumId) {
      if (!this.getPicForm.albumId) {
        this.getPicForm.albumId = ''
      }
      const { data: res } = await this.$http.post(
        'back/album/pictures',
        this.getPicForm
      )
      if (res.status !== 200) return this.message.error('获取图片列表失败')
      this.picList = res.data
      this.total = res.total
    },
    // 分页--修改页码
    changePagenum(newPagenum) {
      this.getPicForm.pagenum = newPagenum
      this.getPicList()
    },
    // 分页--修改每页显示条数
    changePagesize(newPagesize) {
      this.getPicForm.pagesize = newPagesize
      this.getPicList()
    },
    // 图片上传成功
    handleSuccess(res) {
      if (res.status !== 201) return this.$message.error('图片上传失败')
      this.addPicForm.imgSrc = res.data.imgSrc
      return this.$message.success('图片上传成功')
    },
    // 移除图片
    imgRemove() {
      this.addPicForm.imgSrc = ''
    },
    // 表单确认
    async addPic() {
      const { data: res } = await this.$http.post(
        'back/album/pictures/add',
        this.addPicForm
      )
      if (res.status !== 201) return this.$message.error('图片添加失败')
      this.getPicList()
      this.$refs.addPicFormRef.resetFields()
      return this.$message.success('图片添加成功')
    },
    // 关闭对话框重置表单
    resetForm() {
      this.addPicForm.imgSrc = ''
      this.$refs.addPicFormRef.resetFields()
    }
  },
  mounted() {
    this.getAlbumList()
    this.getPicList()
  }
}
</script>
<style scoped>
.ivu-table-wrapper,
.ivu-page {
  max-width: 1032px;
}
.ivu-btn {
  margin: 10px 10px;
}
img {
  width: 100%;
}
.upload {
  margin-top: 0;
}
</style>
