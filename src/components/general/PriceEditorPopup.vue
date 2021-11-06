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
				<SearchBar v-model="filter" />
				<table>
					<tbody>
						<tr v-for="(color, index) in filteredColorList" :key="index" @click="color.selected = !color.selected">
							<td><input type="checkbox" v-model="color.selected"/></td>
							<td>RAL {{ color.ral }}</td>
							<td>{{ color.name }}</td>
							<td><span class="color-preview" :style="`background: ${color.hex}`"></span></td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="actions">
				
			</div>
		</div>
	</div>
</template>

<script>
import ApiService from "../../services/api.service"


export default {
	props: {
		empty: {
			type: Boolean,
			default: false
		},

		doorId: Number
	},

	data() {
		return {
			isVisible: false,
		};
	},

	components: {

	},

	computed: {
		filteredColorList() {
			return this.colorList
				.filter(color => color.name.toLowerCase().includes(this.filter.toLowerCase()))
				.sort((a, b) => (a.ral > b.ral) ? 1 : -1)
		}
	},

	mounted() {
		
	},

	methods: {
		submit() {
			const selected = this.colorList.filter(color => color.selected)

			const codes = {
				colorsRAL: selected.map(color => color.ral),
				colorsHex: this.hexToByte(selected.map(color => color.hex))
			};

			this.$emit("submit", codes);
			this.isVisible = false;
		},

		hexToByte(hexColors) {
			return hexColors.map(color => parseInt(color.substring(1).toLowerCase(), 16));
		},

		initialize(ralColors) {
			this.colorList.forEach(color => {
				if (ralColors.includes(color.ral))
					color.selected = true;
			});
		},

		async show() {
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

	table {
		height: 100%;
		max-height: 63vh;
		overflow: scroll;
		display: block;

		tbody {
			display: grid;
			width: 100%;
			
			tr {
				display: grid;
				grid-template-columns: 1fr 6fr 6fr 4fr;

				.color-preview {
					width: 40px;
					height: 40px;
					background: red;
					display: inline-block;
					border-radius: 100%;
				}
			}
		}
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