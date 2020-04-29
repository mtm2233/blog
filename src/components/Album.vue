<template>
  <div class="album">
    <!-- 查询框 -->
    <Input
      search
      enter-button
      placeholder="请输入相册标题"
      style="width: 300px"
      @on-search="getAlbumList"
      v-model="queryAlbumForm.search"
    ></Input>
    <!-- 添加相册 -->
    <Button type="primary" @click="addModal=true">添加相册</Button>
    <!-- table表格 -->
    <Table border :columns="columns" :data="albumList" stripe>
      <template slot-scope="{ row }" slot="imgSrc">
        <img
          :src="'https://api.youcann.club/img/'+row.imgSrc"
          :title="row.content"
          :onerror="errorGoodsImg"
        />
      </template>
      <template slot-scope="{ row }" slot="addTime">{{row.addTime|timefilters}}</template>
    </Table>
    <!-- 分页 -->
    <Page
      :total="total"
      size="small"
      show-elevator
      show-sizer
      show-total
      :page-size="queryAlbumForm.pagesize"
      :page-size-opts="[3,6,10,15]"
      :current="queryAlbumForm.pagenum"
      @on-change="changePagenum"
      @on-page-size-change="changePagesize"
    />
    <!-- 添加相册对话框 -->
    <Modal v-model="addModal" title="添加相册" @on-ok="addAlbum" @on-cancel="resetForm">
      <Form :model="addAlbumForm" :label-width="80" ref="addAlbumFormRef">
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
        <FormItem label="名称" prop="title">
          <Input v-model="addAlbumForm.title"></Input>
        </FormItem>
        <FormItem label="描述" prop="content">
          <Input v-model="addAlbumForm.content"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'album',
  data() {
    return {
      // 相册查询参数
      queryAlbumForm: {
        search: '',
        pagesize: 3,
        pagenum: 1
      },
      // 相册列表
      albumList: [],
      // 相册总条数
      total: 0,
      // table配置
      columns: [
        { title: '标题', key: 'title', width: 160, fixed: 'left' },
        { title: '描述', key: 'content', width: 230 },
        { title: '封面', slot: 'imgSrc', width: 200 },
        { title: '创建时间', slot: 'addTime', width: 230 },
        { title: '点击数', key: 'clicks', width: 150, fixed: 'right' }
      ],
      // 添加相册对话框显示与隐藏
      addModal: false,
      // 默认图片
      errorGoodsImg: `this.src='${require('../assets/img/error.jpg')}'`,
      // 添加相册
      addAlbumForm: {
        title: '',
        content: '',
        imgSrc: ''
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
      const { data: res } = await this.$http.post(
        'back/album/query',
        this.queryAlbumForm
      )
      if (res.status !== 200) return this.message.error('获取相册列表失败')
      this.albumList = res.data
      this.total = res.total
    },
    // 分页--修改页码
    changePagenum(newPagenum) {
      this.queryAlbumForm.pagenum = newPagenum
      this.getAlbumList()
    },
    // 分页--修改每页显示条数
    changePagesize(newPagesize) {
      this.queryAlbumForm.pagesize = newPagesize
      this.getAlbumList()
    },
    // 图片上传成功
    handleSuccess(res) {
      if (res.status !== 201) return this.$message.error('图片上传失败')
      this.addAlbumForm.imgSrc = res.data.imgSrc
      return this.$message.success('图片上传成功')
    },
    // 移除图片
    imgRemove() {
      this.addAlbumForm.imgSrc = ''
    },
    // 表单确认
    async addAlbum() {
      const { data: res } = await this.$http.post(
        'back/album/add',
        this.addAlbumForm
      )
      if (res.status !== 201) return this.$message.error('相册创建失败')
      this.getAlbumList()
      return this.$message.success('相册创建成功')
    },
    // 关闭对话框重置表单
    resetForm() {
      this.addAlbumForm.imgSrc = ''
      this.$refs.addAlbumFormRef.resetFields()
    }
  },
  mounted() {
    this.getAlbumList()
  }
}
</script>
<style scoped>
.ivu-table-wrapper,
.ivu-page {
  max-width: 972px;
}
.ivu-btn {
  margin: 10px 0;
}
img {
  width: 100%;
}
.upload {
  margin-top: 0;
}
</style>
