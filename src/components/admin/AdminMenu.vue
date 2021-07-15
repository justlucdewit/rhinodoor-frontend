<template>
	<div id="admin-menu">
		<div :class="{'active': currentPage === 'stats' }" @click="switchPage('stats')">
			<i class="fas fa-chart-bar"></i>
		</div>

		<div :class="{'active': currentPage === 'order' }" @click="switchPage('order')">
			<i class="fas fa-box"></i>
		</div>

		<div :class="{'active': currentPage === 'door' }" @click="switchPage('door')">
			<i class="fas fa-warehouse"></i>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			currentPage: "stats"
		}
	},

	methods: {
		switchPage(page) {
			this.currentPage = page;
			this.$emit("switchpage", page);
		}
	}
};
</script>

<style scoped lang="scss">

#admin-menu {
	position: absolute;
	left: 0;
	border: 1px solid gray;
	top: calc(50vh - 75px);
	height: 150px;
	display: grid;
	padding: 20px 10px;
	row-gap: 20px;
	border-radius: 0px 20px 20px 0px;

	.fas {
		font-size: x-large;
		color: gray;

		&:hover {
			color: black;
		}
	}

	.active {
		.fas {
			color: black;
		}
	}
}

</style>