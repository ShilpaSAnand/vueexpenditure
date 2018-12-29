<template>
  <div class="hello">
  <div v-if="msg != ''"><span style="color:blue;"> <h3> {{ msg }}</h3></span></div><br>
    <h1>Transaction Details</h1><br><br>
    <div class="row">
        <div class="col-md-3 col-sm-2 col-xs-12 form-group">
          <label for="from_account_head"><b>From Account Head </b></label>
          <input v-model="from_account_head" name="from_account_head" :disabled="disabled" ><br><br>
        </div>  <br><br>
        <div class="col-md-3 col-sm-2 col-xs-12 form-group ">
          <label for="to_account_head"><b>To Account Head </b></label>
            <input v-model="to_account_head" name="to_account_head" :disabled="disabled"><br><br>
        </div>  <br><br>
        <div class="col-md-3 col-sm-2 col-xs-12 form-group ">
		  <label for="amount"><b> Amount Of Transaction</b></label>
        	<input v-model="amount" name="amount" :disabled="disabled"><br><br>
        </div>  <br><br>
        <div class="col-md-3 col-sm-2 col-xs-12 form-group ">
          <label for="name"><b>Transaction Done By </b></label>
        <input v-model="name" name="name" :disabled="disabled"><br><br>
        </div>  <br><br>
    </div>
  </div>
</template>
<script>
	import axios from 'axios'
    import Vue from 'vue'
    import Router from 'vue-router'
    export default {
        name: 'transaction_show',
		mounted: function () {
			this.showTransaction()
		},
        data () {
            return {
                amount: '',
                from_account_head: '',
                to_account_head:'',
                name:'',
				msg: '',
				transaction_data:'',
				id:'',
				transaction:'',
				disabled:true
            }
        },
        created() {
            this.amount = this.$route.params.amount
            this.from_account_head = this.$route.params.from_account_head
            this.to_account_head = this.$route.params.to_account_head
            this.name = this.$route.params.name
			this.msg = this.$route.params.msg
			this.id = this.$route.params.id
        },
		methods: {
	      	showTransaction: function () {
				var app = this
		        axios.get('http://192.168.1.6:8000/transaction/show/postman/'+this.$route.params.id, {
					headers: {
						'Authorization': 'Bearer ' +localStorage.getItem('token'),
						'Content-Type': 'application/json'
					}
		        })
		        .then(function (response) {
					app.amount = response.data.message.tasks.amount
					app.from_account_head = response.data.message.tasks.from_category
					app.to_account_head = response.data.message.tasks.to_category
					app.name = response.data.message.tasks.name
		        })
		        .catch(function (error) {
		          	console.log(error)
		        })
		    }
	    }

    }
</script>
