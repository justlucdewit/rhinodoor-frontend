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
						<tr v-for="(color, index) in filteredColorList" :key="index">
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
import SearchBar from "./LCP/SearchBar.vue"

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
			colorList: [
				{ "selected": false, "ral": 1018, "hex": "#F8F32B", "name": "Zinc yellow" },
				{ "selected": false, "ral": 2000, "hex": "#ED760E", "name": "Yellow orange" },
				{ "selected": false, "ral": 6014, "hex": "#47402E", "name": "Yellow olive" },
				{ "selected": false, "ral": 7034, "hex": "#8F8B66", "name": "Yellow grey" },
				{ "selected": false, "ral": 6018, "hex": "#57A639", "name": "Yellow green" },
				{ "selected": false, "ral": 3005, "hex": "#5E2129", "name": "Wine red" },
				{ "selected": false, "ral": 7040, "hex": "#9DA1AA", "name": "Window grey" },
				{ "selected": false, "ral": 9006, "hex": "#A5A5A5", "name": "White aluminium" },
				{ "selected": false, "ral": 5021, "hex": "#256D7B", "name": "Water blue" },
				{ "selected": false, "ral": 5000, "hex": "#354D73", "name": "Violet blue" },
				{ "selected": false, "ral": 2002, "hex": "#CB2821", "name": "Vermilion" },
				{ "selected": false, "ral": 7022, "hex": "#332F2C", "name": "Umbra grey" },
				{ "selected": false, "ral": 5002, "hex": "#20214F", "name": "Ultramarine blue" },
				{ "selected": false, "ral": 6016, "hex": "#1E5945", "name": "Turquoise green" },
				{ "selected": false, "ral": 5018, "hex": "#3F888F", "name": "Turquoise blue" },
				{ "selected": false, "ral": 4006, "hex": "#A03472", "name": "Traffic purple" },
				{ "selected": false, "ral": 1023, "hex": "#FAD201", "name": "Traffic yellow" },
				{ "selected": false, "ral": 9016, "hex": "#F6F6F6", "name": "Traffic white" },
				{ "selected": false, "ral": 3020, "hex": "#CC0605", "name": "Traffic red" },
				{ "selected": false, "ral": 2009, "hex": "#F54021", "name": "Traffic orange" },
				{ "selected": false, "ral": 7043, "hex": "#4E5452", "name": "Traffic grey B" },
				{ "selected": false, "ral": 7042, "hex": "#8D948D", "name": "Traffic grey A" },
				{ "selected": false, "ral": 6024, "hex": "#308446", "name": "Traffic green" },
				{ "selected": false, "ral": 5017, "hex": "#063971", "name": "Traffic blue" },
				{ "selected": false, "ral": 9017, "hex": "#1E1E1E", "name": "Traffic black" },
				{ "selected": false, "ral": 3013, "hex": "#A12312", "name": "Tomato red" },
				{ "selected": false, "ral": 8028, "hex": "#4E3B31", "name": "Terra brown" },
				{ "selected": false, "ral": 4010, "hex": "#CF3476", "name": "Telemagenta" },
				{ "selected": false, "ral": 7047, "hex": "#D0D0D0", "name": "Telegrey 4" },
				{ "selected": false, "ral": 7046, "hex": "#82898F", "name": "Telegrey 2" },
				{ "selected": false, "ral": 7045, "hex": "#909090", "name": "Telegrey 1" },
				{ "selected": false, "ral": 7010, "hex": "#4C514A", "name": "Tarpaulin grey" },
				{ "selected": false, "ral": 1037, "hex": "#F39F18", "name": "Sun yellow" },
				{ "selected": false, "ral": 1016, "hex": "#EDFF21", "name": "Sulfur yellow" },
				{ "selected": false, "ral": 3018, "hex": "#D53032", "name": "Strawberry red" },
				{ "selected": false, "ral": 7030, "hex": "#8B8C7A", "name": "Stone grey" },
				{ "selected": false, "ral": 5011, "hex": "#231A24", "name": "Steel blue" },
				{ "selected": false, "ral": 7000, "hex": "#78858B", "name": "Squirrel grey" },
				{ "selected": false, "ral": 7015, "hex": "#434750", "name": "Slate grey" },
				{ "selected": false, "ral": 5015, "hex": "#2271B3", "name": "Sky blue" },
				{ "selected": false, "ral": 7001, "hex": "#8A9597", "name": "Silver grey" },
				{ "selected": false, "ral": 7044, "hex": "#CAC4B0", "name": "Silk grey" },
				{ "selected": false, "ral": 1003, "hex": "#E5BE01", "name": "Signal yellow" },
				{ "selected": false, "ral": 9003, "hex": "#F4F4F4", "name": "Signal white" },
				{ "selected": false, "ral": 4008, "hex": "#8C568A", "name": "Signal violet" },
				{ "selected": false, "ral": 3001, "hex": "#A52019", "name": "Signal red" },
				{ "selected": false, "ral": 2010, "hex": "#D84B20", "name": "Signal orange" },
				{ "selected": false, "ral": 7004, "hex": "#969992", "name": "Signal grey" },
				{ "selected": false, "ral": 6032, "hex": "#317F43", "name": "Signal green" },
				{ "selected": false, "ral": 8002, "hex": "#6C3B2A", "name": "Signal brown" },
				{ "selected": false, "ral": 5005, "hex": "#1E2460", "name": "Signal blue" },
				{ "selected": false, "ral": 9004, "hex": "#282828", "name": "Signal black" },
				{ "selected": false, "ral": 8014, "hex": "#382C1E", "name": "Sepia brown" },
				{ "selected": false, "ral": 5003, "hex": "#1D1E33", "name": "Saphire blue" },
				{ "selected": false, "ral": 1002, "hex": "#C6A664", "name": "Sand yellow" },
				{ "selected": false, "ral": 2012, "hex": "#E55137", "name": "Salmon range" },
				{ "selected": false, "ral": 3022, "hex": "#D95030", "name": "Salmon pink" },
				{ "selected": false, "ral": 1017, "hex": "#F5D033", "name": "Saffron yellow" },
				{ "selected": false, "ral": 3003, "hex": "#9B111E", "name": "Ruby red" },
				{ "selected": false, "ral": 3017, "hex": "#E63244", "name": "Rose" },
				{ "selected": false, "ral": 6011, "hex": "#587246", "name": "Reseda green" },
				{ "selected": false, "ral": 6013, "hex": "#6C7156", "name": "Reed green" },
				{ "selected": false, "ral": 4002, "hex": "#922B3E", "name": "Red violet" },
				{ "selected": false, "ral": 4001, "hex": "#6D3F5B", "name": "Red lilac" },
				{ "selected": false, "ral": 2001, "hex": "#C93C20", "name": "Red orange" },
				{ "selected": false, "ral": 8012, "hex": "#592321", "name": "Red brown" },
				{ "selected": false, "ral": 3027, "hex": "#C51D34", "name": "Raspberry red" },
				{ "selected": false, "ral": 1021, "hex": "#F3DA0B", "name": "Rape yellow" },
				{ "selected": false, "ral": 7039, "hex": "#6C6960", "name": "Quartz grey" },
				{ "selected": false, "ral": 4007, "hex": "#4A192C", "name": "Purple violet" },
				{ "selected": false, "ral": 3004, "hex": "#75151E", "name": "Purple red" },
				{ "selected": false, "ral": 6037, "hex": "#24E711", "name": "Pure green" },
				{ "selected": false, "ral": 3028, "hex": "#E72512", "name": "Pure red" },
				{ "selected": false, "ral": 9010, "hex": "#FFFFFF", "name": "Pure white" },
				{ "selected": false, "ral": 2004, "hex": "#F44611", "name": "Pure orange" },
				{ "selected": false, "ral": 7036, "hex": "#7F7679", "name": "Platinum grey" },
				{ "selected": false, "ral": 6028, "hex": "#2C5545", "name": "Pine green" },
				{ "selected": false, "ral": 5014, "hex": "#606E8C", "name": "Pigeon blue" },
				{ "selected": false, "ral": 7032, "hex": "#B8B799", "name": "Pebble grey" },
				{ "selected": false, "ral": 3032, "hex": "#721422", "name": "Pearl ruby red" },
				{ "selected": false, "ral": 3033, "hex": "#B44C43", "name": "Pearl pink" },
				{ "selected": false, "ral": 2013, "hex": "#C35831", "name": "Pearl orange" },
				{ "selected": false, "ral": 1036, "hex": "#705335", "name": "Pearl gold" },
				{ "selected": false, "ral": 1035, "hex": "#6A5D4D", "name": "Pearl beige" },
				{ "selected": false, "ral": 4011, "hex": "#8673A1", "name": "Pearl violet" },
				{ "selected": false, "ral": 6036, "hex": "#193737", "name": "Pearl opal green" },
				{ "selected": false, "ral": 5026, "hex": "#102C54", "name": "Pearl night blue" },
				{ "selected": false, "ral": 7048, "hex": "#898176", "name": "Pearl mouse grey" },
				{ "selected": false, "ral": 9022, "hex": "#9C9C9C", "name": "Pearl light grey" },
				{ "selected": false, "ral": 6035, "hex": "#1C542D", "name": "Pearl green" },
				{ "selected": false, "ral": 5025, "hex": "#2A6478", "name": "Pearl gentian blue" },
				{ "selected": false, "ral": 9023, "hex": "#828282", "name": "Pearl dark grey" },
				{ "selected": false, "ral": 8029, "hex": "#763C28", "name": "Pearl copper" },
				{ "selected": false, "ral": 4012, "hex": "#6C6874", "name": "Pearl black berry" },
				{ "selected": false, "ral": 6000, "hex": "#316650", "name": "Patina green" },
				{ "selected": false, "ral": 1034, "hex": "#EFA94A", "name": "Pastel yellow" },
				{ "selected": false, "ral": 2003, "hex": "#FF7514", "name": "Pastel orange" },
				{ "selected": false, "ral": 6019, "hex": "#BDECB6", "name": "Pastel green" },
				{ "selected": false, "ral": 4009, "hex": "#A18594", "name": "Pastel violet" },
				{ "selected": false, "ral": 6034, "hex": "#7FB5B5", "name": "Pastel turquoise" },
				{ "selected": false, "ral": 5024, "hex": "#5D9B9B", "name": "Pastel blue" },
				{ "selected": false, "ral": 9018, "hex": "#D7D7D7", "name": "Papyrus white" },
				{ "selected": false, "ral": 6021, "hex": "#89AC76", "name": "Pale green" },
				{ "selected": false, "ral": 8025, "hex": "#755C48", "name": "Pale brown" },
				{ "selected": false, "ral": 1013, "hex": "#EAE6CA", "name": "Oyster white" },
				{ "selected": false, "ral": 3009, "hex": "#642424", "name": "Oxide red" },
				{ "selected": false, "ral": 3031, "hex": "#B32428", "name": "Orient red" },
				{ "selected": false, "ral": 8023, "hex": "#A65E2E", "name": "Orange brown" },
				{ "selected": false, "ral": 6026, "hex": "#015D52", "name": "Opal green" },
				{ "selected": false, "ral": 1020, "hex": "#999950", "name": "Olive yellow" },
				{ "selected": false, "ral": 7002, "hex": "#7E7B52", "name": "Olive grey" },
				{ "selected": false, "ral": 6003, "hex": "#424632", "name": "Olive green" },
				{ "selected": false, "ral": 6022, "hex": "#25221B", "name": "Olive drab" },
				{ "selected": false, "ral": 8008, "hex": "#6F4F28", "name": "Olive brown" },
				{ "selected": false, "ral": 1024, "hex": "#AEA04B", "name": "Ochre yellow" },
				{ "selected": false, "ral": 8001, "hex": "#955F20", "name": "Ochre brown" },
				{ "selected": false, "ral": 5020, "hex": "#1D334A", "name": "Ocean blue" },
				{ "selected": false, "ral": 8011, "hex": "#5B3A29", "name": "Nut brown" },
				{ "selected": false, "ral": 5022, "hex": "#252850", "name": "Night blue" },
				{ "selected": false, "ral": 7005, "hex": "#646B63", "name": "Mouse grey" },
				{ "selected": false, "ral": 7003, "hex": "#6C7059", "name": "Moss grey" },
				{ "selected": false, "ral": 6005, "hex": "#2F4538", "name": "Moss green" },
				{ "selected": false, "ral": 6033, "hex": "#497E76", "name": "Mint turquoise" },
				{ "selected": false, "ral": 6029, "hex": "#20603D", "name": "Mint green" },
				{ "selected": false, "ral": 1028, "hex": "#F4A900", "name": "Melon yellow" },
				{ "selected": false, "ral": 6017, "hex": "#4C9141", "name": "May green" },
				{ "selected": false, "ral": 1006, "hex": "#E4A010", "name": "Maize yellow" },
				{ "selected": false, "ral": 8016, "hex": "#4C2F27", "name": "Mahogany brown" },
				{ "selected": false, "ral": 6038, "hex": "#00F700", "name": "Luminous green" },
				{ "selected": false, "ral": 1026, "hex": "#FFFF00", "name": "Luminous yellow" },
				{ "selected": false, "ral": 3024, "hex": "#F80000", "name": "Luminous red" },
				{ "selected": false, "ral": 2005, "hex": "#FF2301", "name": "Luminous orange" },
				{ "selected": false, "ral": 2007, "hex": "#FFA420", "name": "Luminous bright orange" },
				{ "selected": false, "ral": 3026, "hex": "#FE0000", "name": "Luminous" },
				{ "selected": false, "ral": 3015, "hex": "#EA899A", "name": "Light pink" },
				{ "selected": false, "ral": 1015, "hex": "#E6D690", "name": "Light ivory" },
				{ "selected": false, "ral": 7035, "hex": "#D7D7D7", "name": "Light grey" },
				{ "selected": false, "ral": 6027, "hex": "#84C3BE", "name": "Light green" },
				{ "selected": false, "ral": 5012, "hex": "#3B83BD", "name": "Light blue" },
				{ "selected": false, "ral": 1012, "hex": "#C7B446", "name": "Lemon yellow" },
				{ "selected": false, "ral": 6002, "hex": "#2D572C", "name": "Leaf green" },
				{ "selected": false, "ral": 7008, "hex": "#6A5F31", "name": "Khaki grey" },
				{ "selected": false, "ral": 9005, "hex": "#0A0A0A", "name": "Jet black" },
				{ "selected": false, "ral": 1014, "hex": "#E1CC4F", "name": "Ivory" },
				{ "selected": false, "ral": 7011, "hex": "#434B4D", "name": "Iron grey" },
				{ "selected": false, "ral": 1005, "hex": "#A98307", "name": "Honey yellow" },
				{ "selected": false, "ral": 4003, "hex": "#DE4C8A", "name": "Heather violet" },
				{ "selected": false, "ral": 9002, "hex": "#E7EBDA", "name": "Grey white" },
				{ "selected": false, "ral": 6006, "hex": "#3E3B32", "name": "Grey olive" },
				{ "selected": false, "ral": 8019, "hex": "#403A3A", "name": "Grey brown" },
				{ "selected": false, "ral": 5008, "hex": "#26252D", "name": "Grey blue" },
				{ "selected": false, "ral": 1019, "hex": "#9E9764", "name": "Grey beige" },
				{ "selected": false, "ral": 9007, "hex": "#8F8F8F", "name": "Grey aluminium" },
				{ "selected": false, "ral": 7009, "hex": "#4D5645", "name": "Green grey" },
				{ "selected": false, "ral": 8000, "hex": "#826C34", "name": "Green brown" },
				{ "selected": false, "ral": 5001, "hex": "#1F3438", "name": "Green blue" },
				{ "selected": false, "ral": 1000, "hex": "#BEBD7F", "name": "Green beige" },
				{ "selected": false, "ral": 6010, "hex": "#35682D", "name": "Grass green" },
				{ "selected": false, "ral": 7024, "hex": "#474A51", "name": "Graphite grey" },
				{ "selected": false, "ral": 9011, "hex": "#1C1C1C", "name": "Graphite black" },
				{ "selected": false, "ral": 7026, "hex": "#2F353B", "name": "Granite grey" },
				{ "selected": false, "ral": 1004, "hex": "#CDA434", "name": "Golden yellow" },
				{ "selected": false, "ral": 5010, "hex": "#0E294B", "name": "Gentian blue" },
				{ "selected": false, "ral": 3000, "hex": "#AF2B1E", "name": "Flame red" },
				{ "selected": false, "ral": 6009, "hex": "#31372B", "name": "Fir green" },
				{ "selected": false, "ral": 6025, "hex": "#3D642D", "name": "Fern green" },
				{ "selected": false, "ral": 8007, "hex": "#59351F", "name": "Fawn brown" },
				{ "selected": false, "ral": 6001, "hex": "#287233", "name": "Emerald green" },
				{ "selected": false, "ral": 7037, "hex": "#7D7F7D", "name": "Dusty grey" },
				{ "selected": false, "ral": 5023, "hex": "#49678D", "name": "Distant blue" },
				{ "selected": false, "ral": 2011, "hex": "#EC7C26", "name": "Deep orange" },
				{ "selected": false, "ral": 1033, "hex": "#F3A505", "name": "Dahlia yellow" },
				{ "selected": false, "ral": 1007, "hex": "#DC9D00", "name": "Daffodil yellow" },
				{ "selected": false, "ral": 1027, "hex": "#9D9101", "name": "Curry" },
				{ "selected": false, "ral": 9001, "hex": "#FDF4E3", "name": "Cream" },
				{ "selected": false, "ral": 3016, "hex": "#B32821", "name": "Coral red" },
				{ "selected": false, "ral": 8004, "hex": "#8E402A", "name": "Copper brown" },
				{ "selected": false, "ral": 7023, "hex": "#686C5E", "name": "Concrete grey" },
				{ "selected": false, "ral": 5013, "hex": "#1E213D", "name": "Cobalt blue" },
				{ "selected": false, "ral": 8003, "hex": "#734222", "name": "Clay brown" },
				{ "selected": false, "ral": 4004, "hex": "#641C34", "name": "Claret violet" },
				{ "selected": false, "ral": 6020, "hex": "#2E3A23", "name": "Chrome green" },
				{ "selected": false, "ral": 8017, "hex": "#45322E", "name": "Chocolate brown" },
				{ "selected": false, "ral": 8015, "hex": "#633A34", "name": "Chestnut brown" },
				{ "selected": false, "ral": 7033, "hex": "#7D8471", "name": "Cement grey" },
				{ "selected": false, "ral": 3002, "hex": "#A2231D", "name": "Carmine red" },
				{ "selected": false, "ral": 5019, "hex": "#1B5583", "name": "Capri blue" },
				{ "selected": false, "ral": 6008, "hex": "#39352A", "name": "Brown green" },
				{ "selected": false, "ral": 3011, "hex": "#781F19", "name": "Brown red" },
				{ "selected": false, "ral": 7013, "hex": "#464531", "name": "Brown grey" },
				{ "selected": false, "ral": 1011, "hex": "#8A6642", "name": "Brown beige" },
				{ "selected": false, "ral": 1032, "hex": "#D6AE01", "name": "Broom yellow" },
				{ "selected": false, "ral": 5007, "hex": "#3E5F8A", "name": "Brillant blue" },
				{ "selected": false, "ral": 2008, "hex": "#F75E25", "name": "Bright red orange" },
				{ "selected": false, "ral": 6007, "hex": "#343B29", "name": "Bottle green" },
				{ "selected": false, "ral": 4005, "hex": "#6C4675", "name": "Blue lilac" },
				{ "selected": false, "ral": 7031, "hex": "#474B4E", "name": "Blue grey" },
				{ "selected": false, "ral": 6004, "hex": "#1F3A3D", "name": "Blue green" },
				{ "selected": false, "ral": 3007, "hex": "#412227", "name": "Black red" },
				{ "selected": false, "ral": 6015, "hex": "#3B3C36", "name": "Black olive" },
				{ "selected": false, "ral": 7021, "hex": "#23282B", "name": "Black grey" },
				{ "selected": false, "ral": 6012, "hex": "#343E40", "name": "Black green" },
				{ "selected": false, "ral": 8022, "hex": "#212121", "name": "Black brown" },
				{ "selected": false, "ral": 5004, "hex": "#18171C", "name": "Black blue" },
				{ "selected": false, "ral": 3012, "hex": "#C1876B", "name": "Beige red" },
				{ "selected": false, "ral": 7006, "hex": "#6D6552", "name": "Beige grey" },
				{ "selected": false, "ral": 8024, "hex": "#79553D", "name": "Beige brown" },
				{ "selected": false, "ral": 1001, "hex": "#C2B078", "name": "Beige" },
				{ "selected": false, "ral": 7012, "hex": "#4E5754", "name": "Basalt grey" },
				{ "selected": false, "ral": 5009, "hex": "#025669", "name": "Azure blue" },
				{ "selected": false, "ral": 3014, "hex": "#D36E70", "name": "Antique pink" },
				{ "selected": false, "ral": 7016, "hex": "#293133", "name": "Anthracite grey" },
				{ "selected": false, "ral": 7038, "hex": "#B5B8B1", "name": "Agate grey " }
			],

			isVisible: false,
			filter: ""
		};
	},

	components: {
		SearchBar
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
		width: 100%;

		tbody {
			max-height: 60vh;
			overflow: scroll;

			.color-preview {
				width: 40px;
				height: 40px;
				background: red;
				display: inline-block;
				border-radius: 100%;
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