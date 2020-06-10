<template>
	<view>
		{{artId}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				artId: 0
			}
		},
		methods: {

		},
		onLoad(options) {
			this.artId = options.id
		}
	}
</script>

<style>

</style>
