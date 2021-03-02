<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	
	/*每个页面公共css */
	img,
	._img,
	image {
		max-width: 100%;
	}

	.ql-syntax {
		background-color: #23241f;
		color: #f8f8f2;
		overflow: visible;
		white-space: pre-wrap;
		box-sizing: border-box;
		margin-bottom: 5px !important;
		margin-top: 5px !important;
		padding: 5px 10px !important;
		border-radius: 3px;
	}

	.ql-editor p {
		margin-bottom: 5px !important;
		letter-spacing: 2px;
	}

	.ql-container.ql-snow {
		border: none;
	}
</style>
