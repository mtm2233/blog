<template>
	<view class="search">
		<view class="search_input">
			<input type="text" v-model="value" placeholder="搜索关键字" @blur="goartBySearch">
		</view>
		<view class="search_tags">
			<span v-for="(item,index) in tags" :key="index" :class="{
				success:item.num>5&&item.num<10,
				info:item.num>10&&item.num<15,
				warning:item.num>15&&item.num<25,
				danger:item.num>25
			}"
			 @click="goartByTag(item.tagName)">{{item.tagName}}
				({{item.num}})</span>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: 'search',
		data() {
			return {
				value: '',
				tags: []
			}
		},
		methods: {
			getTags() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				uni.request({
					url: this.httpBase + 'tag/totalTags',
					success: reslove => {
						const {
							data: res
						} = reslove
						this.tags = res.data
						uni.hideLoading()
					}
				})
			},
			goartBySearch() {
				this.changeSearch(this.value)
				this.changeTags("")
				this.value = ""
				uni.switchTab({
					url: '../articles/articles'
				})
			},
			goartByTag(tagName) {
				this.changeTags(tagName)
				this.changeSearch("")
				uni.switchTab({
					url: '../articles/articles'
				})
			},
			...mapMutations(['changeSearch', 'changeTags'])
		},
		computed: {
			...mapState(['httpBase', 'search'])
		},
		onLoad() {
			this.getTags()
		}
	}
</script>

<style lang="scss">
	.search {
		padding: 35rpx;

		.search_input {
			input {
				-webkit-appearance: none;
				background-color: #fff;
				background-image: none;
				border-radius: 10rpx;
				border: 1rpx solid #dcdfe6;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				color: #606266;
				display: inline-block;
				font-size: inherit;
				height: 60rpx;
				line-height: 60rpx;
				outline: 0;
				padding: 0 25rpx;
				-webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
				transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
				width: 100%;
			}
		}

		.search_tags {
			margin-top: 35rpx;
			box-sizing: border-box;
			padding: 15rpx;
			border: 1rpx solid #ebeef5;
			border-radius: 15rpx;
			box-shadow: 0 5rpx 15rpx 0 rgba(0, 0, 0, .1);

			span {
				background-color: #ecf5ff;
				display: inline-block;
				height: 55rpx;
				padding: 0 20rpx;
				line-height: 55rpx;
				font-size: 25rpx;
				color: #409eff;
				border: 1rpx solid #d9ecff;
				border-radius: 6rpx;
				box-sizing: border-box;
				white-space: nowrap;
				margin: 10rpx;
			}

			span.success {
				background-color: #f0f9eb;
				border-color: #e1f3d8;
				color: #67c23a;
			}

			span.info {
				background-color: #f4f4f5;
				border-color: #e9e9eb;
				color: #909399;
			}

			span.warning {
				background-color: #fdf6ec;
				border-color: #faecd8;
				color: #e6a23c;
			}

			span.danger {
				background-color: #fef0f0;
				border-color: #fde2e2;
				color: #f56c6c;
			}
		}
	}
</style>
