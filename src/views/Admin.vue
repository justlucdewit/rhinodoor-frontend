<template>
	<div>
		<div class="login-form" v-if="credentials.validated === false">
			<div class="header">
				Rhinodoor Admin
			</div><br />

			<span>
				Username: <span v-if="credentials.failedStatus == 1" class="error">{{ 'User is not registered' }}</span>
			</span>
			<span class="input-field">
				<i class="far fa-user"></i>
				<input v-model="credentials.userName" type="text" placeholder="your username" />
			</span>
			
			<span>
				Password: <span v-if="credentials.failedStatus == 2" class="error">{{ 'Password does not match' }}</span>
			</span>
			
			<span class="input-field">
				<i class="fas fa-unlock-alt"></i>
				<input v-model="credentials.password" type="password" placeholder="your password" />
			</span>

			<span>
				<button @click="validate">Login</button>
			</span>
		</div>

		<div v-else>
			<div class="header">
				<AdminPanel></AdminPanel>
			</div><br />
		</div>
	</div>
</template>

<script>
import AdminPanel from "@/components/admin/AdminPanel"

import Api from "@/services/api.service.js"

export default {
	mounted() {
		const username = localStorage.getItem('username');
		const password = localStorage.getItem('username');

		if (username !== null && password !== null) {
			this.credentials.failedStatus = 0;
			this.credentials.validated = true;
			this.credentials.userName = username;
			this.credentials.password = password;
		}
	},

	data() {
		return {
			credentials : {
				failedStatus: 0,
				validated: false,
				userName: "",
				password: ""
			}
		}
	},

	components: {
		AdminPanel
	},

	methods: {
		async validate() {
			var response = await Api.checkLogin({
				userName: this.credentials.userName,
				password: this.credentials.password
			});

			// Server erroor (user with that username was not found)
			if (response.status === 500)
				this.credentials.failedStatus = 1;

			// Unauthorized (password is wrong)
			else if (response.status === 401)
				this.credentials.failedStatus = 2;

			// Success!
			else if (response.status === 200) {
				// do the login
				this.credentials.failedStatus = 0;
				this.credentials.validated = true;

				// store the credentials in local storage
				localStorage.setItem('username', this.credentials.userName);
				localStorage.setItem('password', this.credentials.password);
			}
		}
	}
};

</script>

<style scoped lang="scss">
	@import "../styles/color-sceme.scss";
	@import "../styles/styles.scss";

	.login-form {
		text-align: left;
		display: grid;
		font-size: small;
		padding-left: calc(50vw - 150px);
		padding-right: calc(50vw - 150px);
		margin: 50px 0px;

		.error {
			color: red;
			font-weight: bolder;
		}

		input {
			padding: 10px;
			border: none;
			border-bottom: 1px solid gray;
		}

		input:focus {
			outline: none;
			border-bottom: 2px solid black;
		}

		.input-field {
			padding-bottom: 50px;
			display: grid;
			grid-template-columns: 25px auto;
			align-items: center;
		}

		button {
			border-radius: 20px;
			padding: 10px;
			width: 150px;
			background: $main-color;
			font-weight: bolder;
			color: white;
			border: none;
		}

		button:hover {
			color: gray;
			background: $light-color;
		}

		.header {
			font-size: x-large;
			font-weight: bolder;
			padding-bottom: 50px;
		}
	}
</style>