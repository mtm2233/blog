<template>
	<view class="backTop" @touchmove="onPageScroll" @click="goTop">
		<slot>
			<image src="../static/fonts/向上三角形.png"></image>
		</slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			goTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: this.duration
				})
			}
		}
	}
</script>

<style lang="scss">
	.backTop {
		background-color: #FFFFFF;
		width: 75rpx;
		height: 75rpx;
		bottom: 45rpx;
		right: 45rpx;
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		box-shadow: 0 5rpx 15rpx 0 rgba(0, 0, 0, .2);

		image {
			width: 50rpx;
			height: 50rpx;
		}
	}
</style>
