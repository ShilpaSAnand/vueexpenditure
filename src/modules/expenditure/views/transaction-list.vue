<template>
	<div class="hello">
		<h1>Transaction List</h1>
		Showing {{firstRowOnThisPage}} to {{lastRowOnThisPage}} of {{totalData}}
		<table>
			<tr>
				<th>Voucher Id</th>
				<th>Transaction Type</th>
				<th>Source </th>
				<th>Payment mode </th>
				<th>Amount</th>
			</tr>
				<tr v-for="transaction in transactions" :key="transaction.id">
				<td><router-link :to="{ name: 'transaction_show', params: { id: transaction.id }}">{{ transaction.voucher_id }}</router-link>
				</td>
				<td v-if="(transaction.to_category == 'cash' || transaction.to_category == 'bank')">Income</td>
				<td v-else>Expense</td>
				<td>{{ transaction.from_category }}</td>
				<td>{{ transaction.to_category }}</td>
				<td>{{ transaction.amount }}</td>
			</tr>
		</table>
		<pagination :pagination="pagination"  :callback="gettransactions" :options="paginationOptions"></pagination>
	</div>
</template>
<script>
import axios from 'axios'
import pagination from 'vue-bootstrap-pagination'
export default {
	name: 'transaction_list',
	mounted: function () {
		this.gettransactions()
	},
	components: {
	   pagination
   },
	data: function () {
		return {
			transactions: [],
			firstRowOnThisPage:'',
			lastRowOnThisPage:'',
			totalData:'',
			pagination: {
				per_page: 2,    // required
		        current_page: 1, // required
		        last_page: 35,
			},
			paginationOptions: {
				offset: 1,
				previousText: 'Prev',
				nextText: 'Next',
				alwaysShowPrevNext: true
		    }
		}
	},
    methods: {
      	gettransactions: function () {
			var app = this
			const options = {
		        params: {
		          paginate: this.pagination.per_page,
		          page: this.pagination.current_page,
		          /* additional parameters */
		        }
		    }

			console.log(options)
	        axios.get('http://192.168.1.6:8000/transaction/index/postman/?page='+this.pagination.current_page, {
				headers: {
					'Authorization': 'Bearer ' +localStorage.getItem('token'),
					'Content-Type': 'application/json'
				}
	        })
	        .then(function (response) {

	          	app.transactions = response.data.message.transaction_index
				app.firstRowOnThisPage = response.data.message.pagination.firstRowOnThisPage
				app.lastRowOnThisPage = response.data.message.pagination.lastRowOnThisPage
				app.totalData = response.data.message.pagination.total
				app.pagination.per_page = response.data.message.pagination.perPage
				app.pagination.current_page = response.data.message.pagination.currentPage
				app.pagination.last_page = response.data.message.pagination.lastPage

				console.log("LP: "+ app.pagination.last_page)
				console.log("CP: "+ app.pagination.current_page)
				console.log("PP: "+ app.pagination.per_page)
	        })
	        .catch(function (error) {
	          	console.log(error)
	        })
	    }
    }

}
</script>

<style scoped>

table {

   margin-left: 250px;
   border-radius: 3px;
   border: 2px solid #42b983;
}
th {
  background-color: #E8F4F7;
  // color: rgba(255,255,255,0.66);
  color:black;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

table, td, th {
  border: 1px solid black;
    padding: 15px;
}
</style>
