<template>
	<div class="hello">
		<h1>Transaction Fund Balance</h1><br><br>
		<div class="row" style="margin-left: 150PX;margin-right: 150px;">
			<div class="col-md-4 panel" style="background-color: #E3F3F7">
				<h2><b>CASH BALANCE </b></h2><br><h3>{{cash_balance}}</h3>
			</div><br><br>
			<div class="col-md-4 panel" style="margin-left: 200px;background-color: #E3F3F7">
			   <h2><b>BANK BALANCE</b></h2><br><h3>{{bank_balance}}</h3>
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
export default {
	name: 'transaction_funds',
	mounted: function () {
		this.getTransactionFunds()
	},
	data: function () {
		return {
			cash_balance: '',
			bank_balance:'',
		}
	},
    methods: {
      	getTransactionFunds: function () {
			var app = this
	        axios.get('http://192.168.1.6:8000/transaction/funds/postman', {
				headers: {
					'Authorization': 'Bearer ' +localStorage.getItem('token'),
					'Content-Type': 'application/json'
				}
	        })
	        .then(function (response) {
	          	app.cash_balance = response.data.message.balance
				app.bank_balance = response.data.message.bank_balance
				console.log(app.cash_balance)
	        })
	        .catch(function (error) {
	          	console.log(error)
	        })
	    }
    }
}
</script>








<style scoped>
.parent-container {
   display: flex;
}
</style>
