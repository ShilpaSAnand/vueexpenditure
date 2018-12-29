<template>
  <div class="hello">
    <div v-if="unauthenticated != ''"><span style="color:red;"> <h3> {{ unauthenticated }}</h3></span></div><br>
    <h1>Transaction</h1>
    Transaction time <input v-model="transaction_time" name="transaction_time"><br><br>
    <div v-if="transaction_time_error != ''"> <span style="color:red;">{{transaction_time_error}}</span></div><br>
    Transaction type <select v-model="selected" style="width: 179px;"><option disabled value=""> Select </option>
    <option v-for="transaction in transaction_type" v-bind:value="transaction.value">
    	{{ transaction.text }}
    </option>
    </select><br><br>
    <div v-if="transaction_type_error != ''"> <span style="color:red;">{{transaction_type_error}}</span></div><br>
	Account head <select v-model="account_head" style="width: 179px;"><option disabled value=""> Select </option>
    <option v-for="account_head_data in account_head_datas" v-bind:value="account_head_data.id">
    	{{ account_head_data.category }}
    </option>
    </select><br><br>
    <div v-if="account_head_error != ''"> <span style="color:red;">{{account_head_error}}</span></div><br>
	Payment mode<select v-model="payment_mode" style="width: 179px;"><option disabled value=""> Select </option>
    <option v-for="payment in payment_modes" v-bind:value="payment.value">
    	{{ payment.text }}
    </option>
    </select><br><br>
    <div v-if="payment_mode_error != ''"> <span style="color:red;">{{payment_mode_error}}</span></div><br>
	<div v-if="payment_mode == '2'">Account No <select v-model="account_number" style="width: 179px;"><option disabled value=""> Select </option>
	<option v-for="account_data in account_no_data" v-bind:value="account_data.id">
    	{{ account_data.bank_account }}
    </option>
    </select></div><br><br>
	<div v-if="account_number_error != ''"> <span style="color:red;">{{account_number_error}}</span></div><br>
	Amount <input v-model="amount" name="amount"><br><br>
    <div v-if="amount_error != ''"> <span style="color:red;">{{amount_error}}</span></div><br>
    <input type="button" name="submit" value="submit" :disabled="seen" @click="submit"><br><br>

	<div><button><router-link :to="{ name: 'transaction_list'}">Transaction List</router-link></button>
	<button><router-link :to="{ name: 'transaction_funds'}">Transaction Fund Balance</router-link></button>
	</div>
	<br><br><br>
  </div>
</template>
<script>
import axios from 'axios'
import transaction_show from '@/modules/expenditure/views/transaction-show'
export default {
	name: 'transaction',
	mounted: function () {
	  this.getRelavantDatas()
	},
  	data : function(){
    	return {
			transaction_time: '',
			account_head: '',
			payment_mode: '',
			amount:'',
			transaction_time_error:'',
			transaction_type_error:'',
			account_head_error:'',
			payment_mode_error:'',
			account_number_error:'',
			amount_error:'',
			unauthenticated:'',
			account_number:'',
			selected:'',
			seen:false,  //to diable the button on request and enable it when response come
			transaction_type: [
				{ text: 'Income', value: '1' },
				{ text: 'Expense', value: '2' }
			],
			payment_modes: [
				{ text: 'Cash', value: '1' },
				{ text: 'Bank', value: '2' },
				{ text: 'Journal Entry', value: '3' },
			],
			account_head_datas: [],
			account_no_data:[],
		}
	},
	methods: {

		getRelavantDatas: function () {
			var app = this
	        axios.get('http://192.168.1.6:8000/transaction/getRelavantDatas', {
				headers: {
					'Authorization': 'Bearer ' +localStorage.getItem('token'),
					'Content-Type': 'application/json'
				}
	        })
	        .then(function (response) {
	          	app.account_head_datas = response.data.message.account_head
				app.account_no_data = response.data.message.account_details
	        })
	        .catch(function (error) {
	          	console.log(error)
	        })
		},
		submit: function () {
			var app = this;
			app.seen = true
			this.transaction_time_error=''
			this.transaction_type_error=''
			this.account_head_error=''
			this.payment_mode_error=''
			this.amount_error=''
			this.account_number_error=''
			axios.post('http://192.168.1.6:8000/transaction/create/postman',  {
				transaction_time: app.transaction_time,
				transaction_type: app.selected,
				account_head: app.account_head,
				payment_mode:app.payment_mode,
				amount: app.amount,
				account_number:app.account_number,
			}, {
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('token'),
					'Content-Type': 'application/json'
				}
			}).then(function (response) {
				if (response.status === 200) {
					app.seen = false
					console.log(response)
					// app.message = 'Successfully inserted transaction'
					// app.seen = true
					var transaction = response.data.message.data
					var route = response.data.route_list
					var routes = JSON.stringify(route)
					localStorage.setItem('route_list', routes)
					app.$router.push({ name: 'transaction_show', params: { id: transaction.id, amount: transaction.amount, from_account_head: transaction.from_account_head, to_account_head: transaction.to_account_head, msg:"Transaction created successfully"}})
					// app.$router.push('/transaction-show')
				}
				var accessToken = response.data.access_token
				localStorage.setItem('token', accessToken)
			}).catch(function (error) {
				app.seen = false
				if (error.response.status === 401) {
					app.unauthenticated = 'Unauthenticated.'
				}
				var obj = error.response.data.error.errors
				// app.transaction_time_error = obj["transaction_time"][0]
				Object.keys(obj).forEach(function (key) {
					var value = obj[key]
					var count = value.length
					for (var i = 0; i < count; i++) {
						var errorObject = value[i]
						// Object.keys(errorObject).forEach(function (key1) {
						//   var result = errorObject[key1]
						// console.log(result)
						console.log(key)
						switch (key) {
							case 'transaction_time': app.transaction_time_error = errorObject; break
							case 'transaction_type': app.transaction_type_error = errorObject; break
							case 'account_head': app.account_head_error = errorObject; break
							case 'payment_mode': app.payment_mode_error = errorObject; break
							case 'amount': app.amount_error = errorObject; break
							case 'account_number': app.account_number_error = errorObject; break
						}
						// })
					}
				})
			})
		}
	}
}
</script>
<style scoped>
</style>
