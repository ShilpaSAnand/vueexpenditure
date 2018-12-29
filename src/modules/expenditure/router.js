export default[
    {
      path: '/',
      name: 'login',
      component: () => import('@/modules/expenditure/views/login.vue')
    },
    {
      path: '/transaction-create',
      name: 'transaction',
      component: () => import('@/modules/expenditure/views/transaction.vue')
    },
    {
      path: '/transaction-show/:id',
      name: 'transaction_show',
      component: () => import('@/modules/expenditure/views/transaction-show.vue')
    },
    {
      path: '/transaction-list',
      name: 'transaction_list',
      component: () => import('@/modules/expenditure/views/transaction-list.vue')
    },
	{
      path: '/transaction-list',
      name: 'transaction_list',
      component: () => import('@/modules/expenditure/views/transaction-list.vue')
  	},
	{
      path: '/transaction-funds',
      name: 'transaction_funds',
      component: () => import('@/modules/expenditure/views/transaction-funds.vue')
  	},
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue')
    }
]
