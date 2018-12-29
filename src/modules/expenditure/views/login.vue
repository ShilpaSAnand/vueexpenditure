<template>
  <div class="login">
    <h1>Login</h1>
    Username <input v-model="username" name="Username"><br><br>
    Password <input v-model="password" type="password" name="Password"><br><br>
    <input type="button"  name="submit" value="submit" @click="login_check">
    <br><br>
  </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import Router from 'vue-router'
import transaction from '@/modules/expenditure/views/transaction'
Vue.use(Router)
Vue.use(transaction)
export default {
	name: 'Login',
	data () {
		return {
			username: '',
			password: '',
			message: '',
			seen: false
		}
	},
	mounted: function () {
		this.user()
	},
	methods: {
		user : function () {  //if user is already logged in, then redirect to the next page
			var app = this
			if(localStorage.getItem('token') != "undefined") {
				app.$router.push('/transaction-create')
			} else {
				app.$router.push('/')
			}
		},
		login_check: function () {
			var app = this
			axios.post('http://192.168.1.6:8000/oauth/token', {
				grant_type: 'password',
				client_id: 1,
				client_secret: 'dRzFp8DmwuQStjfMFONJtBUIA6qIcqrJZFbgiCK0',
				username: app.username,
				password: app.password,
				scope: ''
			}, {
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(function (response) {
				if (response.status === 200) {
					app.message = 'Successfully logged in'
					app.seen = true
					var route = response.data.route_list
					var routes = JSON.stringify(route)
					localStorage.setItem('route_list', routes)
					app.$router.push('/transaction-create')
				}
				var accessToken = response.data.access_token
				localStorage.setItem('token', accessToken)// console.log(access_token);
			}).catch(function (error) {
			})
		}
  	}
}
</script>
<style scoped>
</style>
