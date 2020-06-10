<template>
	<view class="bottomline">
		<slot>--我也是有底线的--</slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.bottomline {
		text-align: center;
		padding-bottom: 35rpx;
		color: #C0C0C0;
	}
</style>
