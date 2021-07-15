<template>
	<div id="order-page">
		<Popup ref="deletePopup" @submit="deleteItem" title="Order verwijderen" body="je gaat deze order verwijderen, dit kan niet ongedaan gemaakt worden! weet je zeker dat je dit wilt doen?"/>
		
		<Popup ref="resendPopup" @submit="resendItem" title="Factuur herzenden" body="je gaat het factuur van deze order opnieuw verzenden via de mail, weet je zeker dat je dit wilt doen?"/>
		
		<div class="title">
			Orders 
			<span class="save-spinner" v-if="saving">
				<i class="fas fa-spinner spinning"></i> saving
			</span>
		</div>

		<table>
			<thead>
				<tr>
					<td>Geplaatst op</td>
					<td>Geplaatst door</td>
					<td>Status</td>
					<td>Acties</td>
				</tr>
			</thead>

			<tbody>
				<tr v-for="order in items">
					<td>{{ order.placedOn }}</td>
					<td>{{ order.placedBy }}</td>
					<td>{{ order.status }}</td>
					<td width="220px">
						<!-- Resend -->
						<button class="button button-again" @click="showResendPopup">
							<i class="fas fa-redo"></i>
						</button>

						<!-- Edit -->
						<button  class="button  button-edit">
							<i class="fas fa-pencil-alt"></i>
						</button>

						<!-- Delete -->
						<button class="button  button-delete" @click="showDeletePopup">
							<i class="fas fa-times"></i>
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import Popup from "../../general/Popup"

export default {
	props: {
		items: () => []
	},

	data() {
		return {
			saving: false
		}
	},

	components: {
		Popup
	},

	methods: {
		showDeletePopup() {
			this.$refs.deletePopup.isVisible = true;
		},

		showResendPopup() {
			this.$refs.resendPopup.isVisible = true;
		},

		deleteItem() {
			this.saving = true;

			setTimeout(() => {
				this.saving = false;
			}, 2000);
		},

		resendItem() {
			this.saving = true;

			setTimeout(() => {
				this.saving = false;
			}, 2000);
		}
	}
};
</script>

<style scoped lang="scss">
@import "../../../styles/color-sceme.scss";
@import "../../../styles/styles.scss";

#order-page {
	display: grid;
	padding: 0vh 10vw;
	text-align: left;
	font-size: 20px;
	margin-top: 40px;

	.title {
		font-weight: bold;
		font-size: 25px;
		padding-bottom: 20px;

		.save-spinner {
			float: right;
			color: $main-color;
		}
	}
}
</style>