<template>
	<div id="door-page">
		<Popup 
			ref="deletePopup"
			@submit="deleteItem"
			title="Deur verwijderen"
			body="je gaat deze order verwijderen, dit kan niet ongedaan gemaakt worden! weet je zeker dat je dit wilt doen?"/>

		<Popup 
			ref="forceDeletePopup"
			@submit="forceDeleteItem"
			title="Deur geforceerd verwijderen"
			body="deze deur heeft al orders, weet je zeker dat je deze deur wilt verwijderen en dus deze orders cancelen?"/>

		<EditablePopup
			ref="editPopup"
			:empty="addingNewDoor"
			:doorId="targetDoorId"
			@submit="saveDoor" />
		
		<div class="title">
			Deuren

			<span class="save-spinner" v-if="saving">
				<i class="fas fa-spinner spinning"></i> saving
			</span>
		</div>

		<tr class="no-orders" v-if="items.length === 0">
			<img src="@/assets/rhino_error.png" style="width: 25vw" /><br /> Geen orders gevonden!
		</tr>

		<table v-if="items.length > 0">
			<thead>
				<tr>
					<td>Naam</td>
					<td>Breedtes</td>
					<td>Hoogtes</td>
					<td>Kleuren</td>
					<td>Acties</td>
				</tr>
			</thead>

			<tbody>
				<tr v-for="(door, idx) in items" :key="idx">
					<td>{{ door.doorName }}</td>
					<td>{{ 0 }}</td>
					<td>{{ 0 }}</td>
					<td>{{ 0 }}</td>
					<td width="220px">
						<!-- Edit -->
						<button  class="button  button-edit" @click="showEditPopup(door.doorId)">
							<i class="fas fa-pencil-alt"></i>
						</button>

						<!-- Delete -->
						<button class="button  button-delete" @click="showDeletePopup(door.doorId)">
							<i class="fas fa-times"></i>
						</button>
					</td>
				</tr>
			</tbody>
		</table>

		<button class="button  button-new" @click="showEditPopup()">
			<i class="fas fa-plus"></i>
		</button>
	</div>
</template>

<script>
import Popup from "../../general/Popup"
import EditablePopup from "../../general/EditablePopup"

import ApiService from "../../../services/api.service"

export default {
	props: {
		items: () => []
	},

	data() {
		return {
			saving: false,
			addingNewDoor: false,
			targetDoorId: 0, 
			mockupItems: [
				{
					doorName: "testDoor"
				}
			]
		}
	},

	components: {
		Popup,
		EditablePopup
	},

	methods: {
		showDeletePopup(doorId) {
			this.targetDoorId = doorId;
			this.$refs.deletePopup.isVisible = true;
		},

		async deleteItem() {
			this.saving = true;

			const response = await ApiService.deleteDoor(this.targetDoorId);

			if (response.status === 200) {
				this.saving = false;
				this.$emit("refresh");
			} else {
				this.$refs.forceDeletePopup.isVisible = true;
				this.saving = false;
			}
		},

		async forceDeleteItem() {
			this.saving = true;

			await ApiService.forceDeleteDoor(this.targetDoorId);
			
			this.saving = false;
			this.$emit("refresh");
		},

		showEditPopup(itemId) {
			this.targetDoorId = itemId;

			if (itemId !== undefined)
				this.addingNewDoor = false;
			else
				this.addingNewDoor = true;

			this.$nextTick(() => {
				this.$refs.editPopup.show();
			});
		},

		async saveDoor(doorData) {
			this.saving = true;

			await ApiService.createNewDoor({
				doorName: doorData.doorName,
				doorImage: "",
				description: doorData.description,
				colorsRAL: doorData.colorsRAL,
				colorsHex: doorData.colorsHex,
				doorSizes: []
			});

			this.$emit("refresh");

			this.saving = false;
		}
	}
};
</script>

<style scoped lang="scss">
@import "../../../styles/color-sceme.scss";
@import "../../../styles/styles.scss";

#door-page {
	display: grid;
	padding: 0vh 10vw;
	text-align: left;
	font-size: 20px;
	margin-top: 40px;

	.button-new {
		float: right;
		margin-top: 20px;
		width: 60px;
	}

	.no-orders {
		text-align: center;
	}

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