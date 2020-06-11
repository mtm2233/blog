<template>
	<view class="articles">
		<!-- tag -->
		<view class="tag" v-if="query.tags&&total">
			<h1>标签</h1>
			<h4>找到 {{total}}+ 与『{{query.tags}}』相关的内容</h4>
		</view>
		<!-- search -->
		<view class="s" v-if="query.search&&total">
			<h1>搜索</h1>
			<h4>找到 {{total}}+ 与『{{query.search}}』相关的内容</h4>
		</view>
		<!-- total为0 -->
		<view class="sorry" v-if="!total&&(query.tags||query.search)">
			<view>Sorry 没找到你想要的 ：(</view>
			<view>
				您可以尝试
				<navigator url="/pages/search/search" open-type="switchTab">搜点别的</navigator>或
				<view @click="reset">返回首页</view>
			</view>
		</view>
		<!-- 文章列表 -->
		<view class="art" v-for="item in articleList" :key="item.artId">
			<view class="art_header" @click="goContenrt(item.artId)"><img :src="httpBase+'img/'+item.imgSrc" :alt="item.title"></view>
			<view class="art_body">
				<h3>{{item.title}}</h3>
			</view>
			<view class="art_footer">
				<span>
					<image src="../../static/fonts/时间.png"></image>{{item.addTime}}
				</span>
				<span>
					<image src="../../static/fonts/点击量.png"></image>{{item.clicks}}
				</span>
				<span>
					<image src="../../static/fonts/评论数-10.png"></image>{{item.replys}}
				</span>
			</view>
		</view>
		<bottomline v-if="articleList.length"></bottomline>
		<back-top v-if="scrollTop>=300"></back-top>
	</view>
</template>

<script>
	import bottomline from '../../components/bottomline.vue'
	import backTop from '../../components/backTop.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		name: "articles",
		data() {
			return {
				tt: false,
				// 博客文章的条件
				query: {
					search: '',
					pagesize: 6,
					pagenum: 1,
					typeId: '',
					tags: ''
				},
				total: 0,
				// 博客文章列表
				articleList: [],
				scrollTop: 0
			}
		},
		methods: {
			// 打开详情页
			goContenrt(artId) {
				uni.navigateTo({
					url: '../content/content?id=' + artId
				})
			},
			// 获取符合条件的博客文章
			getArticleList() {
				uni.request({
					url: this.httpBase + 'article/query',
					data: {
						...this.query
					},
					method: "POST",
					success: reslove => {
						const {
							data: res
						} = reslove
						this.total = res.totalpage
						this.articleList.push(...res.data)
						this.$nextTick(function() {
							uni.stopPullDownRefresh()
						})
					}
				})
			},
			reset() {
				this.articleList = []
				this.query = {
					search: '',
					pagesize: 6,
					pagenum: 1,
					typeId: '',
					tags: ''
				}
				this.getArticleList()
			}
		},
		computed: {
			...mapState(['httpBase', 'search', 'tags'])
		},
		components: {
			bottomline,
			backTop
		},
		onLoad() {
			this.query.tags = this.tags
			this.query.search = this.search
			this.getArticleList()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.reset()
		},
		// 滚动条到底加载
		onReachBottom() {
			this.query.pagenum++
			this.getArticleList()
		},
		//距离页面顶部距离
		onPageScroll(res) {
			this.scrollTop = res.scrollTop
		}
	}
</script>

<style lang="scss">
	.articles {

		.tag,
		.s {
			._h1 {
				font-size: 50rpx;
				font-weight: bold;
				margin-bottom: 10rpx;
			}

			padding: 35rpx;
			text-align: center;
			color: #FFFFFF;
			background-color: #4CD964;
		}

		image {
			width: 100%;
		}

		.art {
			margin: 35rpx;
			border-radius: 15rpx;
			border: 1rpx solid #ebeef5;
			background-color: #fff;
			overflow: hidden;
			color: #303133;
			box-shadow: 0 5rpx 15rpx 0 rgba(0, 0, 0, .1);

			.art_body {
				padding: 20rpx;
				font-size: 40rpx;
				margin-top: 0;
			}

			.art_footer {
				span {
					margin-right: 35rpx;

					image {
						width: 35rpx;
						height: 35rpx;
						padding: 0 10rpx;
						vertical-align: middle;
					}
				}

				padding: 20rpx;
			}
		}

		.sorry {
			margin: 35rpx 0;
			text-align: center;
			letter-spacing: 2rpx;
			color: #c1c1c1;

			view:first-child {
				font-size: 55rpx;
				padding: 15rpx;
			}

			view:last-child navigator,
			view:last-child view {
				color: #fd5d3c;
				display: inline-block;
			}
		}
	}
</style>
