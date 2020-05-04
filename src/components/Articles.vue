<template>
  <div class="articles">
    <!-- 查询框 -->
    <Input
      search
      enter-button
      placeholder="请输入文章标题"
      style="width: 300px"
      @on-search="queryChange()"
      v-model="queryArtForm.search"
    ></Input>
    <!-- 文章分类下拉菜单 -->
    <Select
      class="selectSearch"
      v-model="queryArtForm.typeId"
      style="width:200px"
      clearable
      @on-change="queryChange()"
      placeholder="请选择分类"
    >
      <Option v-for="item in artTypeList" :value="item.typeId" :key="item.typeId">{{ item.type }}</Option>
    </Select>
    <!-- 文章标签下拉菜单 -->
    <Select
      class="selectSearch"
      v-model="queryArtForm.tags"
      style="width:200px"
      clearable
      @on-change="queryChange()"
      placeholder="请选择标签"
    >
      <Option v-for="item in artTagsList" :value="item.tagName" :key="item.tagId">{{ item.tagName }}</Option>
    </Select>
    <!-- 添加文章 -->
    <p>
      <Button type="primary" @click="addArt()">添加文章</Button>
    </p>
    <!-- Table -->
    <Table border :columns="columns" :data="artList" stripe>
      <template slot-scope="{ row }" slot="imgSrc">
        <img
          :src="'https://api.youcann.club/img/'+row.imgSrc"
          :title="row.content"
          :onerror="errorGoodsImg"
        />
      </template>
      <template slot-scope="{ row }" slot="addTime">{{row.addTime|timefilters}}</template>
      <template slot-scope="{ row }" slot="replys">
        <i-switch v-model="row.isReply" :true-value="1" :false-value="0" @on-change="isReply(row)" />
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="editArt(row.artId)">编辑</Button>
      </template>
    </Table>
    <!-- 分页 -->
    <Page
      :total="total"
      size="small"
      show-elevator
      show-sizer
      show-total
      :page-size="queryArtForm.pagesize"
      :page-size-opts="[4,8,12,20]"
      :current="queryArtForm.pagenum"
      @on-change="changePagenum"
      @on-page-size-change="changePagesize"
    />
  </div>
</template>
<script>
export default {
  name: 'articles',
  data() {
    return {
      // 查询文章参数
      queryArtForm: {
        search: '',
        typeId: '',
        tags: '',
        pagesize: 4,
        pagenum: 1
      },
      // 文章列表
      artList: [],
      // 总条数
      total: 0,
      // 分类
      artTypeList: [],
      // 标签
      artTagsList: [],
      // table配置
      columns: [
        { title: '标题', key: 'title', width: 260, fixed: 'left' },
        { title: '封面', slot: 'imgSrc', width: 200 },
        { title: '点击数', key: 'clicks', width: 100 },
        { title: '评论数', key: 'replys', width: 100 },
        { title: '创建时间', slot: 'addTime', width: 230 },
        { title: '是否可以评论', slot: 'replys', width: 150 },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 140,
          fixed: 'right'
        }
      ],
      // 默认图片
      errorGoodsImg: `this.src='${require('../assets/img/error.jpg')}'`
    }
  },
  methods: {
    // 获取文章列表
    async getArtList() {
      if (!this.queryArtForm.typeId) this.queryArtForm.typeId = ''
      if (!this.queryArtForm.tags) this.queryArtForm.tags = ''
      const { data: res } = await this.$http.post(
        'back/article/query',
        this.queryArtForm
      )
      if (res.status !== 200) return this.$message.error('获取文章列表失败')
      this.artList = res.data
      this.total = res.totalpage
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
    // 分页--修改页码
    changePagenum(newPagenum) {
      this.queryArtForm.pagenum = newPagenum
      this.getArtList()
    },
    // 分页--修改每页显示条数
    changePagesize(newPagesize) {
      this.queryArtForm.pagesize = newPagesize
      this.getArtList()
    },
    // 编辑文章
    editArt(artId) {
      this.$router.push('/content/' + artId)
    },
    // 添加文章
    addArt() {
      this.$router.push('/content/0')
    },
    // 是否可以评论
    async isReply(row) {
      const { data: res } = await this.$http.post(
        'back/article/reply/' + row.artId
      )
      if (res.status !== 201) {
        return this.$message.error('文章是否可以评论修改失败')
      }
      if (row.isReply) {
        return this.$message.success('文章评论已开启')
      }
      return this.$message.warning('文章评论已禁止')
    },
    // 查询文章参数发生变化
    queryChange() {
      this.queryArtForm.pagenum = 1
      this.getArtList()
    }
  },
  mounted() {
    this.getArtList()
    this.getTypeList()
    this.getTagsList()
  }
}
</script>
<style scoped>
.ivu-select {
  margin: 10px 10px 10px 0;
}
img {
  width: 100%;
}
.ivu-table-wrapper,
.ivu-page {
  max-width: 1182px;
}
.ivu-btn {
  margin: 0 0 10px 0;
}
</style>
