<template>
	<view class="archiv">
		<view class="archiv_header">
			<view class="arh_addTime" v-if="!!newArt">最后更新于 {{newArt.addTime[0]}}年{{newArt.addTime[1]}}月{{newArt.addTime[2]}}日</view>
			<view class="total">
				<span v-for="(item,index) in total" :key="index">
					<p>{{item.num}}+</p>
					<p>{{item.name}}</p>
				</span>
			</view>
		</view>
		<view class="archiv_body">
			<ul v-for="(year,index) in archiv" :key="index" class="archivul">
				<li>
					<h2>#{{index}}年</h2>
					<ul v-for="(month,index) in year" :key="index">
						<li>{{index}}月({{month.length}}篇文章)
							<ul v-for="(day,index) in month" :key="day.artId">
								<li class="day">
									<navigator :url="'../content/content?id='+day.artId">
										<span>{{day.addTime[2]}}日：</span>
										{{day.title}}</navigator>
								</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'archiv',
		data() {
			return {
				archiv: {},
				newArt: '',
				total: {}
			}
		},
		methods: {
			// 获取归档数据
			getArchiv() {
				uni.request({
					url: this.httpBase + 'article/archiver',
					success: reslove => {
						const {
							data: res
						} = reslove
						this.archiv = res.data
					}
				})
			},
			// 数据统计
			getTotal() {
				uni.request({
					url: this.httpBase + 'article/total',
					success: reslove => {
						const {
							data: res
						} = reslove
						this.total = res.data
						let y, m
						for (const item in this.archiv) {
							y = item
							break
						}
						for (const item in this.archiv[y]) {
							m = item
							break
						}
						this.newArt = this.archiv[y][m][0]
					}
				})
			}
		},
		computed: {
			...mapState(['httpBase'])
		},
		onLoad() {
			this.getArchiv()
			this.getTotal()
		}
	}
</script>

<style lang="scss">
	.archiv {
		.archiv_header {
			.arh_addTime {
				font-size: 40rpx;
				text-align: center;
				font-weight: bold;
				margin: 25rpx 0;
			}

			.total {
				display: flex;
				justify-content: space-around;
				color: #999999;
			}
		}

		.archiv_body {
			li:hover ul {
				display: black
			}

			h2 {
				font-weight: bold;
			}

			.archivul {
				margin: 0;
				padding: 0;
			}

			li {
				/* 不换行 */
				list-style: none;
				white-space: nowrap;

				/* 内容超出宽度时隐藏超出部分的内容 */
				overflow: hidden;

				text-overflow: ellipsis;
				margin: 15rpx;
			}

			li.day:hover {
				background-color: #ecf5ff;
			}

			li.day {
				navigator {
					display: inline-block;
				}

				span {
					color: #999999;
				}
			}
		}
	}
</style>
