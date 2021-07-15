<template>
	<div v-if="isVisible">
		<div class="popup">
			
		</div>

		<div class="popup-body">
			<div class="popup-title">
				{{ title }}
			</div>

			<div class="message">
				<div class="alert">
					<i class="fas fa-exclamation-circle"></i>
					PAS OP
				</div>

				<div>
					{{ body }}
				</div>
			</div>

			<div class="actions">
				<button class="button" @click="submit"><i class="fas fa-check"></i></button>
				<button class="button" @click="isVisible = false"><i class="fas fa-times"></i></button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: String,
		body: String
	},

	data() {
		return {
			isVisible: false
		}
	},

	methods: {
		submit() {
			this.isVisible = false;
			this.$emit("submit");
		}
	}
};
</script>

<style scoped lang="scss">
@import "../../styles/color-sceme.scss";
@import "../../styles/styles.scss";

.popup {
	background: black;
	width: 100vw;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	opacity: 0.8;
}

.popup-body {
	background: white;
	position: fixed;
	width: 60vw;
	opacity: 100%;
	top: 30vh;
	left: 20vw;
	display: grid;

	.popup-title {
		width: calc(100% - 25px);
		height: 50px;
		background: $main-color;
		color: white;
		font-weight: bold;
		padding-top: 25px;
		padding-left: 25px;
	}

	.message {
		text-align: left;
		padding-left: 50px;
		padding-right: 50px;

		.alert {
			padding: 20px 0px;
			font-size: x-large;

			.fas {
				color: orange;
			}
		}	
	}

	.actions {
		text-align: left;
		padding: 20px 0px;
		padding-left: 50px;
	}
}
</style>