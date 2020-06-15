<template>
	<view class="contents">
		<view class="con_header">
			<h2>{{article.title}}</h2>
			<view class="con_info" v-if="tagList.length">
				<span>
					<image src="../../static/fonts/user.png">{{article.name}}</image>
				</span>
				<span>
					<image src="../../static/fonts/time1.png">{{article.addTime}}</image>
				</span>
				<span>
					<image src="../../static/fonts/look.png">{{article.clicks}}</image>
				</span>
				<span>
					<image src="../../static/fonts/message.png">{{article.replys}}</image>
				</span>
			</view>
		</view>
		<view class="ql-container ql-snow con_body">
			<view class="ql-editor" v-html="article.content">
			</view>
		</view>
		<view class="con_footer" v-if="tagList.length">
			<view class="copyr">
				<span>
					本文作者为
					<navigator url="https://youcann.club/" target="miniProgram">isDream</navigator>
					，转载请注明。
				</span>
			</view>
			<view class="tags">
				<span @click="goArtByTag(item)" v-for="(item,index) in tagList" :key="index">
					<image src="~@/static/fonts/tag.png" mode=""></image>
					{{item}}
				</span>
			</view>
		</view>
		<back-top v-if="scrollTop>=300"></back-top>
	</view>
</template>

<script>
	import backTop from '../../components/backTop.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: 'contents',
		data() {
			return {
				artId: 0,
				article: {},
				tagList: [],
				scrollTop: 0
			}
		},
		methods: {
			getArtById() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				uni.request({
					url: this.httpBase + 'article/artById/' + this.artId,
					success: reslove => {
						const {
							data: res
						} = reslove
						this.article = res.data[0]
						this.tagList = res.data[0].tags.split(',')
						uni.hideLoading()
					}
				})
				uni.request({
					url: this.httpBase + 'article/isReply/' + this.artId
				})
			},
			goArtByTag(tag) {
				this.changeTags(tag)
				this.changeSearch("")
				uni.switchTab({
					url: '../articles/articles'
				})
			},
			//距离页面顶部距离
			onPageScroll(res) {
				this.scrollTop = res.scrollTop
			},
			...mapMutations(['changeSearch', 'changeTags'])
		},
		computed: {
			...mapState(['httpBase'])
		},
		components: {
			backTop
		},
		onLoad(options) {
			this.artId = options.id
			this.getArtById()
		}
	}
</script>

<style lang="scss">
	@import url("./quill.snow.min.css");
	@import url("./code.light.css");
	.contents {
		.con_header {
			h2 {
				font-size: 35rpx;
				font-weight: bold;
				padding: 15rpx;
			}

			.con_info {
				span {
					image {
						width: 35rpx;
						height: 35rpx;
						padding: 0 10rpx;
						vertical-align: middle;
					}

					color: #999999;
				}
			}
		}

		.con_body {
			box-sizing: border-box;
			padding: 15rpx;
			border-radius: 25rpx;
		}

		.con_footer {
			.copyr {
				padding: 5rpx 15rpx;
				box-sizing: border-box;

				navigator {
					display: inline-block;
					text-decoration: underline;
					color: #007AFF;
				}
			}

			.tags {
				span {
					image {
						width: 35rpx;
						height: 35rpx;
						padding: 0 10rpx;
						vertical-align: middle;
					}

					color: #75715E;
				}

				padding: 15rpx 0;
			}
		}

	}
</style>
