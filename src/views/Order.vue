<template>
    <div class="page">
        <Whatsapp
          background="#F54747"
          phone-number="0646898375"
        />

		<h1 class="title">
			Garagedeur bestellen
		</h1>

		<h3 class="subtitle">
			Stel bij ons zelf snel en gemakkelijk uw garage deur samen.
		</h3>
		
		<div class="content-wrapper">
			<TabPannel
				:width="form.width"
				:height="form.height"
				:color="form.color"
				:price="totalCalculatedPrice"
				:model="form.name"
			/>

			<div class="customizers">
				<div class="customizer-field">
					<label style="width: 65px">Model</label>
					<span>
						<select v-model="form.name">
							<option v-for="modelName in doorSettings.models" :value="modelName" :key="modelName">{{ modelName }}</option>
						</select>
						<span class="dropdown-icon">▼</span>
					</span>
				</div>

				<div class="customizer-field">
					<label style="width: 65px">Breedte</label>
					<span>
						<select v-model="form.width">
							<option v-for="size in doorSettings.widths" :value="size" :key="size">{{ size }}cm</option>
						</select>
						<span class="dropdown-icon">▼</span>
					</span>
				</div>

				<div class="customizer-field">
					<label style="width: 65px">Hoogte</label>
					<span>
						<select v-model="form.height">
							<option v-for="size in doorSettings.heights" :value="size" :key="size">{{ size }}cm</option>
						</select>
						<span class="dropdown-icon">▼</span>
					</span>
				</div>

				<div class="customizer-field">
					<label style="width: 65px">Kleur</label>
					<span class="color-selector">
						<span
							v-for="col in doorSettings.colors[form.name]"
							@click="form.color = col.name"
							class="color"
							:key="col.name"
							:style="`background: ${col.col}; ${ col.name === form.color ? 'outline: 2px solid red' : ''}`"
						></span>
					</span>
				</div>

				<div class="customizer-field">
					<label style="width: 65px">Montage</label>
					<span style="color: black">
						<input type="checkbox" v-model="form.hasMounting">
						€ 347
					</span>
				</div>
        
				<div class="customizer-field" style="margin-bottom: -40px">
					<label>Electrische aandrijving</label>
					<span style="color: black">
					</span>
				</div>

				<div class="customizer-field" style="margin-bottom: -40px">
					<label style="width: 90px">SL-1000</label>
					<span style="color: black">
						<input type="checkbox" v-model="form.engineTypeSL">
						€ 252
					</span>
				</div>

				<div class="customizer-field">
					<label style="width: 90px">Nova-Black</label>
					<span style="color: black">
						<input type="checkbox" v-model="form.engineTypeNB" :disabled="form.engineTypeSL">
						€ 377
					</span>
				</div>

				<div class="customizer-field">
					<label>Montage aandrijving</label>
					<span style="color: black">
						<input type="checkbox" v-model="form.hasEngineMounting">
						€ 81
					</span>
				</div>

				<div class="customizer-field" style="margin-bottom: -40px;">
					<label style="width: 145px">Drukknop</label>
					<span style="color: black">
						<input type="checkbox" v-model="form.button">
						€ 60
					</span>
				</div>

				<div class="customizer-field">
					<label style="width: 145px">Montage drukknop</label>
					<span style="color: black">
						<input type="checkbox" v-model="form.hasButtonMounting">
						€ 5
					</span>
				</div>

				<div class="customizer-field">
					<label style="width: 145px">Controle meting</label>
					<span style="color: black">
						<input type="checkbox" v-model="form.check">
						€ 75
					</span>
				</div>

				<div class="customizer-field">
					<button @click.prevent="modals.order = true" :disabled="!formValid" class="button">Offerte aanvragen</button>
					<span class="price-indicator">€ {{ totalCalculatedPrice }}.00</span>
				</div>
			</div>
		</div>

        <Modal v-if="modals.order" @close="modals.order = false">
			<template #header>
				<b class="title">Bestel gegevens</b>
			</template>

			<template #body>
				<table id="contactform">
					<span class="overview">
						<span>Model</span>
						<span> {{ form.name }} </span>

						<span>Formaat</span>
						<span> {{ form.width }} x {{ form.height }}</span>

						<span>Kleur</span>
						<span> {{ form.color }} </span>

						<span>Bedrag</span>
						<span>€ {{ totalCalculatedPrice }}.00</span>
					</span>

					<span class="details">
						<label>Naam</label>
						<input type="text" name="name">

						<label>Adres</label>
						<input type="text" name="email">

						<label>Woonplaats</label>
						<input type="text" name="email">

						<label>Postcode</label>
						<input type="text" name="email">

						<label>Tel. nummer</label>
						<input type="text" name="email">

						<label>Email</label>
						<input type="text" name="email">
					</span>
				</table>
			</template>
		</Modal>
    </div>
</template>

<script>
// data
const trans = require("../translations/translations.json").dutch;
const doorSettings = require("../settings/doorsettings.json");

// components
const whatsapp = require("../components/whatsapp.vue").default;
const Modal = require("../components/3rdparty/modal.vue").default;
const TabPannel = require("../components/TabPannel").default;

export default {
    data() {
        return {
            trans: trans,
            doorSettings: doorSettings,

            form: {
              	width: 2250,
              	height: 2000,
				color: "RAL 1015",
				name: "London",
				hasMounting: false,
				engineTypeSL: false,
				engineTypeNB: false,
				hasEngineMounting: false,
				button: false,
				hasButtonMounting: false,
				check: false
			},
			
			modals: {
				order: false,
			}
        }
	},

	mounted() {
		const params = new URLSearchParams(window.location.href.split("?")[1]);
		console.log(params)
		this.form.name = params.get("door");
	},
	
	computed: {
		formValid() {
			return this.form.width && this.form.height && this.form.color
		},

		totalCalculatedPrice() {
			let price = this.doorSettings.prices[this.form.name][this.form.width][this.form.height];

			if (this.form.hasMounting) {
				price += 347;
			}

			if (this.form.engineTypeSL) {
				price += 252;

				if (this.form.engineTypeNB) {
					this.form.engineTypeNB = false;
				}
			} else if (this.form.engineTypeNB) {
				price += 377;
			}

			if (this.form.hasEngineMounting) {
				price += 81;
			}

			if (this.form.button) {
				price += 60;
			}

			if (this.form.hasButtonMounting) {
				price += 5;
			}

			if (this.form.check) {
				price += 75;
			}

			return price;
		}
	},

    components: {
    	Whatsapp: whatsapp,
		Modal: Modal,
		TabPannel: TabPannel
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/color-sceme.scss";
@import "../styles/styles.scss";

.title {
	font-size: 25px;
	color: $main-color;
}

.details {
	display: grid;
	text-align: left;
	grid-template-columns: 1fr 3fr;
	margin-top: 30px;
	row-gap: 10px;
	color: black;
}

.overview {
	display: grid;
	grid-template-columns: 2fr 3fr;
	row-gap: 8px;
	text-align: left;
	color: black;
}

.page {
    min-height: calc(100vh - 215px);
	color: $dark-color;
	
	.content-wrapper {
		display: flex;
		justify-content: center;
		margin-top: 70px;

		@include small {
			margin-top: 0px;
		}

		.customizers {
			margin-top: 50px;
			margin-left: 2vw;
			width: 40vw;
			max-width: 500px;
			min-width: 200px;
			@include small {
				margin-top: 0px;
				width: 95vw;
				display: grid;
			}

			.customizer-field {
				padding-bottom: 15px;
				text-align: left;
				padding-top: 20px;

				@include small {
					padding-top: 30px;
					text-align: center;
				}

				label {
					display: inline-block;
					text-align: left;
					color: $highlight;
					font-weight: bold;
				}

				.button {
					margin-left: 84px;
					@include small {
						margin-left: 0px;
					}
				}

				.price-indicator {
					color: green;
					border: 3px solid green;
					border-radius: 25px;
					padding: 10px 8px;
					width: 125px;
					text-align: center;
					margin-left: 10px;
					display: none;
					@include small {
						display: inline-block;
					}
				}

				select {
					width: 200px;
					text-align: left;
				}

				.color-selector {
					width: 200px;
					display: inline-block;
					text-align: left;

					.color {
						outline: 1px solid lightgray;
						width: 25px;
						height: 25px;
						display: inline-block;
						margin: 0px 5px;

						&:hover {
							outline: 2px solid black;
						}
					}
				}
			}

			.color-bottom {
				width: 10px;
				height: 10px;
			}
		}
	}
}

#contactform {
	label {
		padding-right: 20px;
	}
}

.disabled-text {
	color: #888;
	text-decoration: line-through;
}
</style>