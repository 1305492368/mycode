<script>
export default {
	onLaunch: function() {
		// storage=>vuex
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		// console.log(this.$store.state.cart)
		// vuex=>Storage
		uni.setStorageSync('cart',this.$store.state.cart)
	}
};
</script>

<style>
/*每个页面公共css */
@import url("./css/iconfont.css");
page {
	color: #333;
}
.text-line2 {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>
