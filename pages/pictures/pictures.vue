<template>
	<view class="pictures">
		<view class="pic" v-for="(item,index) in picList" :key="imgId">
			<view class="img_body">
				<span>{{item.title}}</span>
				<image :src="httpBase+'img/'+item.imgSrc" mode="widthFix" @click="previewImg(index)"></image>
			</view>
		</view>
		<bottomline v-if="picList.length"></bottomline>
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
		name: "pictures",
		data() {
			return {
				albId: 0,
				picList: [],
				scrollTop: 0
			}
		},
		methods: {
			getPicList() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				uni.request({
					url: this.httpBase + 'album/pictures/' + this.albId + '/?search=',
					success: reslove => {
						const {
							data: res
						} = reslove
						this.picList = res.data
						uni.hideLoading()
					}
				})
			},
			previewImg(index) {
				uni.previewImage({
					index,
					urls: this.imgList,
					loop: true,
					indicator: "number"
				})
			}

		},
		computed: {
			imgList() {
				return this.picList.map(item => {
					return this.httpBase + 'img/' + item.imgSrc
				})
			},
			...mapState(['httpBase'])
		},
		components: {
			bottomline,
			backTop
		},
		//距离页面顶部距离
		onPageScroll(res) {
			this.scrollTop = res.scrollTop
		},
		onLoad(options) {
			this.albId = options.id
			this.getPicList()
		}
	}
</script>

<style lang="scss">
	.pictures {
		.pic {
			margin: 35rpx;
			border-radius: 15rpx;
			border: 1rpx solid #ebeef5;
			background-color: #fff;
			overflow: hidden;
			color: #303133;
			box-shadow: 0 5rpx 15rpx 0 rgba(0, 0, 0, .1);

			.img_body {

				span {
					z-index: 3;
					box-sizing: border-box;
					padding: 15rpx;
					width: 100%;
				}
			}
		}
	}
</style>
