<template>
	<div v-show="isVisible">
		<div class="popup">
			
		</div>

		<div class="popup-body fullscreen">
			<div class="popup-title">
				Prijzen
				<button class="button light" @click="isVisible = false" style="float: right"><i class="fas fa-times"></i></button>
				<button class="button light" @click="submit" style="float: right"><i class="far fa-save"></i></button>
			</div>

			<div style="padding-left: 20px;">
				Groote (mm): <br />
				<input v-model="currentSizeInput" type="number">&nbsp;&nbsp;&nbsp;
				<button @click="widths.push(currentSizeInput);">Breedte toevoegen</button>&nbsp;&nbsp;&nbsp;
				<button @click="heights.push(currentSizeInput);">Hoogte toevoegen</button>

				<br /><br />
				Prijzen: {{ widths.length }} hoogtes, {{ heights.length }} breedtes:
				
				<div class="table-wrapper" v-if="widths.length > 0 && heights.length > 0">
					<table class="table">
						<thead id="table-head">
							<tr>
								<th width="50"></th>
								<th v-for="width in widths" :key="width">{{ width }}</th>
							</tr>
						</thead>
						<tbody id="table-body" @scroll="fixscroll">
							<tr v-for="height in heights" :key="height">
								<td style="font-weight: bold">{{ height }}</td>
								<td style="font-weight: bold" v-for="width in widths" :key="'cell' + width">
									€ <input type="number" @input="handlePriceInput(width, height)">
								</td>
							</tr>
						</tbody>
					</table>
				</div>
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
			widths: [],
			heights: [],
			currentSizeInput: 0,
			prices: []
		};
	},

	methods: {
		handlePriceInput(width, height) {
			console.log("aaa");
			this.prices.push({
				width: width,
				height: height
			})
		},

		fixscroll() {
			console.log("test")
			const thead = document.getElementById("table-head");
			const tbodyScroll = document.getElementById("table-body").scrollLeft;
			thead.scrollLeft = tbodyScroll;
		},

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

	&.fullscreen {
		max-height: 100vh;
		width: 100vw;
		left: 0;
		top: 0;
		height: 100vh;
		display: block;

		.popup-title {
			margin-bottom: 20px;
		}
		
		.table-wrapper {
			height: 60vh;
			width: calc(100vw - 40px);
			overflow: hidden;

			table, .table {
				display: flex;
				flex-direction: column;
				flex: 1 1 auto;
				width: calc(100vw - 40px);
				height: 100%;
				border-collapse: collapse;
				overflow: hidden;

				thead {
					display: block;
					overflow-x: hidden;
					overflow-y: auto;
				}

				tbody {
					display: block;
					overflow: scroll;
				}

				td, th {
					width: 6em;
					min-width: 6em;
					padding: 0.3em;
					border: 1px solid #ddd;
					background-color: white;
				}

				td:first-child, th:first-child {
					position: sticky;
					position: -webkit-sticky;
					left:0;
				}

				input {
					width: 90px;
					appearance: textfield;
				}
			}
		}
	}

	table {


		tbody {

			
			tr {

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