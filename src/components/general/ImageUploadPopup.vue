<template>
	<div v-show="isVisible">
		<div class="popup">
			
		</div>

		<div class="popup-body">
			<div class="popup-title">
				Selecteer kleuren
				<button class="button light" @click="isVisible = false" style="float: right"><i class="fas fa-times"></i></button>
				<button class="button light" @click="submit" style="float: right"><i class="far fa-save"></i></button>
			</div>

			<div>
                <div id="img-upload"></div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			isVisible: false,
			filter: ""
		};
    },
    
	methods: {
		submit() {
            this.$emit("submit");
            
			this.isVisible = false;
        },
        
        show() {
            this.isVisible = true;
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
	top: 10vh;
	left: 20vw;
	display: grid;
	max-height: 80vh;
    overflow: hidden;
    
    #img-upload {
        width: 400px;
        height: 400px;
    }

	.form {
		display: grid;
		grid-template-columns: 1fr 1fr;

		.form-field {
			font-weight: bold;
			padding-top: 40px;
			margin-left: 20px;
		}
	}

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