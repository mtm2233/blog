<template>
	<view class="about">
		<!-- 信息 -->
		<view class="info">
			<h2>个人简介</h2>
			<image src="../../static/img/eyJhbGciOi.jpg"></image>
			<h3>YouCan</h3>
			<p>1. 精通C、PHP、js、Node等语言 Hello world 的编写</p>
			<p>2.《英雄联盟》万年青铜玩家</p>
			<p>3. 轻度懒癌患者</p>
		</view>

		<!-- 资料 -->
		<view class="data">
			<h2>个人资料</h2>
			<view class="my">
				<span>
					<p>常用昵称</p>
					<p>YouCan</p>
				</span>
				<span>
					<p>星座</p>
					<p>双鱼座</p>
				</span>
				<span>
					<p>爱好</p>
					<p>GAME</p>
				</span>
				<span>
					<p>职业</p>
					<p>学生&前端</p>
				</span>
			</view>
		</view>

		<!-- 联系 -->

		<view class="contact">
			<h2>交流相关</h2>
			<view class="content_my">
				<view>
					<p>邮箱</p>
					<p>matianmeng@youcann.club</p>
				</view>
				<view>
					<p>哔哩哔哩</p>
					<p>https://space.bilibili.com/34011178</p>
				</view>
				<view>
					<p>码云</p>
					<p>https://gitee.com/youcann</p>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'about',
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.about {
		text-align: center;

		.info,
		.data,
		.contact {
			padding: 35rpx;
			// color: #8a8c8e;
			border-radius: 15rpx;
			margin: 35rpx;
			box-shadow: 0 5rpx 15rpx 0 rgba(0, 0, 0, .1);
			border: 1rpx solid #ebeef5;
		}

		image {
			width: 150rpx;
			height: 150rpx;
		}

		h2 {
			font-size: 50rpx;
			margin: 15rpx 0;
			color: #8a8c8e;
		}

		h3 {
			font-size: 35rpx;
		}

		.my {
			display: flex;
			flex-wrap: wrap;

			span {
				width: 50%;

				p:first-child {
					font-size: 25rpx;
					color: #8a8c8e;
					padding: 15rpx 0;
				}
			}
		}

		.content_my {
			p {
				text-align: left;
			}

			view p:first-child {
				font-size: 30rpx;
				color: #8a8c8e;
			}
		}
	}
</style>
