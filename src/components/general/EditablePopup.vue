<template>
	<div v-if="isVisible">
		<div class="popup">
			
		</div>

		<div class="popup-body">
			<div class="popup-title">
				{{ empty ? "Deur toevoegen" : "Deur wijzigen" }}
			</div>

			<div class="form">
				<div>
					<div class="form-field">
						<div>Deur naam</div>
						<input type="text" v-model="doorData.doorName" />
					</div>
					
					<div class="form-field">
						<div>Deur beschrijving</div>
						<textarea  v-model="doorData.description"></textarea>
					</div>
				</div>

				<div>
					<div class="form-field">
						<div>{{ doorData.colorsRal.length }} Kleuren</div>
						<button class="button" @click="$refs.colorEditorPopup.show()">Kleuren editen</button>
					</div>
					<div class="form-field">
						<div>({{ doorData.prices.length }} Prijzen</div>
						<button class="button">Prijzen editen</button>
					</div>
				</div>
				
			</div>

			<div class="actions">
				<button class="button" @click="submit"><i class="far fa-save"></i></button>
				<button class="button" @click="isVisible = false"><i class="fas fa-times"></i></button>
			</div>
		</div>

		<ColorEditorPopup
			ref="colorEditorPopup"
			@submit="loadColors" />
	</div>
</template>

<script>
import ApiService from "../../services/api.service"
import ColorEditorPopup from "./ColorEditorPopup.vue"

export default {
	props: {
		empty: {
			type: Boolean,
			default: false
		},

		doorId: Number
	},

	mounted() {
		
	},

	components: {
		ColorEditorPopup
	},

	data() {
		return {
			isVisible: false,
			doorData: {
				doorName: "",
				colorsRal: [],
				colorsHex: [],
				prices: [],
				description: "",
			}
		}
	},

	methods: {
		submit() {
			this.isVisible = false;
			this.$emit("submit", this.doorData);

			this.doorData = {
				doorName: "",
				colorsRal: [],
				colorsHex: [],
				prices: [],
				description: "",
			};
		},

		async show() {
			this.isVisible = true;
			if (!this.empty) {
				let data = await ApiService.getDoor(this.doorId);
				const dataBody = await data.text();
				data = JSON.parse(dataBody);
				
				this.doorData.doorName = data.name;
				this.doorData.description = data.description;
				this.doorData.colorsRal = data.colorsRal;
				this.doorData.colorsHex = data.colorsHex;

				this.$refs.colorEditorPopup.initialize(data.colorsRal);
			} else {
				this.doorData = {
					doorName: "",
					colorsRal: [],
					colorsHex: [],
					prices: [],
					description: "",
				};
			}
		},

		loadColors(colors) {
			this.doorData.colorsRal = colors.colorsRAL;
			
			this.doorData.colorsHex = colors.colorsHex;
			console.log(colors, this.doorData)
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