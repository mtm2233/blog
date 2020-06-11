<template>
	<view class="album">
		<view class="alb" v-for="item in albumList" :key="item.albumId">
			<view class="alb_header" @click="goContenrt(item.albumId)"><img :src="httpBase+'img/'+item.imgSrc" :alt="item.title"></view>
			<view class="alb_body">
				<h3>{{item.title}}</h3>
			</view>
			<view class="alb_footer">
				<span>
					<image src="../../static/fonts/时间.png"></image>{{item.addTime}}
				</span>
				<span>
					<image src="../../static/fonts/点击量.png"></image>{{item.clicks}}
				</span>
				<span>
					<image src="../../static/fonts/图片.png"></image>{{item.num}}
				</span>
			</view>
		</view>
		<bottomline v-if="albumList.length"></bottomline>
		<back-top v-if="scrollTop>=300"></back-top>
	</view>
</template>

<script>
	import backTop from '../../components/backTop.vue'
	import bottomline from '../../components/bottomline.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		name: "album",
		data() {
			return {
				queryFrom: {
					search: '',
					pagesize: 6,
					pagenum: 1
				},
				albumList: [],
				scrollTop: 0
			}
		},
		methods: {
			// 获取相册列表
			getAlbumList() {
				uni.request({
					url: this.httpBase + 'album/querypage',
					data: {
						...this.queryFrom
					},
					method: "POST",
					success: reslove => {
						const {
							data: res
						} = reslove
						this.albumList.push(...res.data)
						this.$nextTick(function() {
							uni.stopPullDownRefresh()
						})
					}
				})
			},
			goContenrt(albumId) {
				uni.navigateTo({
					url: '../pictures/pictures?id=' + albumId
				})
			},
			// 重新加载相册列表
			reset() {
				this.albumList = []
				this.queryFrom.pagenum = 1
				this.getAlbumList()
			}
		},
		computed: {
			...mapState(['httpBase'])
		},
		components: {
			bottomline,
			backTop
		},
		onLoad() {
			this.getAlbumList()
		},
		onPullDownRefresh() {
			this.reset()
		},
		onReachBottom() {
			this.queryFrom.pagenum++
			this.getAlbumList()
		},
		//距离页面顶部距离
		onPageScroll(res) {
			this.scrollTop = res.scrollTop
		}
	}
</script>

<style lang="scss">
	.album {
		image {
			width: 100%;
		}

		.alb {
			margin: 35rpx;
			border-radius: 15rpx;
			border: 1rpx solid #ebeef5;
			background-color: #fff;
			overflow: hidden;
			color: #303133;
			box-shadow: 0 5rpx 15rpx 0 rgba(0, 0, 0, .1);

			.alb_body {
				padding: 20rpx;
				font-size: 40rpx;
				margin-top: 0;
			}

			.alb_footer {
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

		.bottomline {
			text-align: center;
			padding-bottom: 35rpx;
			color: #C0C0C0;
		}
	}
</style>
