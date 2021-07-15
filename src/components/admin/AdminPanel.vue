<template>
	<div>
		<AdminMenu @switchpage="switchToPage"/>
		
		<OrderPage v-if="pageName === 'order'" :items="orderData"/>
		<DoorPage v-if="pageName === 'door'" :items="doorData" @refresh="refetchDoors"/>
	</div>
</template>

<script>
import AdminMenu from "./AdminMenu"

import OrderPage from "./pages/OrderPage"
import DoorPage from "./pages/DoorPage"

import Api from "@/services/api.service.js"

export default {
	components: {
		AdminMenu,
		OrderPage,
		DoorPage
	},

	async mounted() {
		// Retrieve order data
		const orderResponse = await Api.getAllOrders();
		const orderBody = await orderResponse.text();
		this.orderData = JSON.parse(orderBody);

		// Retrieve door data
		const doorResponse = await Api.getAllDoors();
		const doorBody = await doorResponse.text();
		this.doorData = JSON.parse(doorBody);
	},

	data() {
		return {
			orderData: [],
			doorData: [],
			pageName: "stats"
		}
	},

	methods: {
		switchToPage(page) {
			this.pageName = page;
		},

		async refetchDoors() {
			// Retrieve door data
			const doorResponse = await Api.getAllDoors();
			const doorBody = await doorResponse.text();
			this.doorData = JSON.parse(doorBody);
		}
	}
};
</script>

<style scoped lang="scss">
	
</style>