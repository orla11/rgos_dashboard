import Vue from 'vue'
import Router from 'vue-router'

import store from './store/store'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
	routes: [
		{
			// =============================================================================
			// MAIN LAYOUT ROUTES
			// =============================================================================
			path: '',
      component: () => import('./layouts/main/Main.vue'),
      beforeEnter: loginGuard,
			children: [
				// =============================================================================
				// Theme Routes
				// =============================================================================
				{
					path: '/',
					name: 'home',
					component: () => import('./views/dashboard/Home.vue'),
					
					meta: {
						breadcrumb: [{ title: 'Dashboard', active: true }],
						pageTitle: 'Dashboard'
					}
				},
				{
					path: '/groups',
					name: 'groups',
					component: () => import('./views/groups/Groups.vue'),
					redirect: { name: 'group-list' },
					meta: {
						breadcrumb: [
							{ title: 'Home', url: { name: 'home' } },
							{ title: 'Groups', active: true }
						],
						pageTitle: 'Groups'
					},
					children: [
						{
							path: '',
							name: 'group-list',
							component: () =>
								import('./views/groups/PageList.vue'),
							meta: {
								breadcrumb: [
									{ title: 'Home', url: { name: 'home' } },
									{ title: 'Groups', active: true }
								],
								pageTitle: 'Groups',
								parent: 'groups'
							}
						},
						{
							path: ':id/edit',
							name: 'group-edit',
							component: () =>
								import(
									'./views/groups/group-edit/PageEdit.vue'
								),
							meta: {
								breadcrumb: [
									{ title: 'Home', url: { name: 'home' } },
									{
										title: 'Groups',
										url: { name: 'group-list' }
									},
									{ title: 'Edit', active: true }
								],
								pageTitle: 'Edit Group',
								parent: 'groups'
							}
						},
						{
							path: 'new',
							name: 'group-new',
							component: () =>
								import(
									'./views/groups/group-edit/PageEdit.vue'
								),
							meta: {
								breadcrumb: [
									{ title: 'Home', url: { name: 'home' } },
									{
										title: 'Groups',
										url: { name: 'group-list' }
									},
									{ title: 'New', active: true }
								],
								pageTitle: 'New Group',
								parent: 'groups'
							}
						}
					]
				},
				{
					path: '/accesses',
					name: 'accesses',
					component: () => import('./views/accesses/Accesses.vue'),
					redirect: { name: 'access-list' },
					meta: {
						breadcrumb: [
							{ title: 'Home', url: { name: 'home' } },
							{ title: 'Accesses', active: true }
						],
						pageTitle: 'Accesses'
					},
					children: [
						{
							path: '',
							name: 'access-list',
							component: () =>
								import('./views/accesses/PageList.vue'),
							meta: {
								breadcrumb: [
									{ title: 'Home', url: { name: 'home' } },
									{ title: 'Accesses', active: true }
								],
								pageTitle: 'Accesses',
								parent: 'accesses'
							}
						},
						{
							path: ':id/details',
							component: () =>
								import(
									'./views/accesses/access-detail/PageDetails.vue'
								),
							meta: {
								breadcrumb: [
									{ title: 'Home', url: { name: 'home' } },
									{
										title: 'Accesses',
										url: { name: 'access-list' }
									},
									{ title: 'Detail', active: true }
								],
								pageTitle: 'Access Details',
								parent: 'accesses'
							}
						}
					]
				},
				{
					path: '/sensors',
					name: 'sensors',
					component: () => import('./views/sensors/Sensors.vue'),
					redirect: { name: 'sensor-list' },
					meta: {
						breadcrumb: [
							{ title: 'Home', url: { name: 'home' } },
							{ title: 'Sensors', active: true }
						],
						pageTitle: 'Sensors'
					},
					children: [
						{
							path: '',
							name: 'sensor-list',
							component: () =>
								import('./views/sensors/PageList.vue'),
							meta: {
								breadcrumb: [
									{ title: 'Home', url: { name: 'home' } },
									{ title: 'Sensors', active: true }
								],
								pageTitle: 'Sensors',
								parent: 'sensors'
							}
						}
					]
				},
				{
					path: '/logs',
					name: 'logs',
					component: () => import('./views/logs/Logs.vue'),
					meta: {
						breadcrumb: [
							{ title: 'Home', url: { name: 'home' } },
							{ title: 'Logs', active: true }
						],
						pageTitle: 'Logs'
					}
				},
				{
					path: '/account',
					name: 'account',
					component: () => import('./views/Account.vue')
				},
				{
					path: '/settings',
					name: 'settings',
					component: () => import('./views/System.vue')
				}
			]
		},
		// =============================================================================
		// FULL PAGE LAYOUTS
		// =============================================================================
		{
			path: '',
			component: () => import('@/layouts/full-page/FullPage.vue'),
			children: [
				// =============================================================================
				// PAGES
				// =============================================================================
				{
					path: '/login',
					name: 'login',
          component: () => import('@/views/pages/Login.vue'),
          beforeEnter: checkIfUserAuthenticated
				},
				{
					path: '/error-404',
					name: 'error-404',
					component: () => import('@/views/pages/Error404.vue')
				}
			]
		},
		// Redirect to 404 page, if no match found
		{
			path: '*',
			redirect: '/error-404'
		}
	]
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

function checkIfUserAuthenticated(to, from, next){
  store.dispatch('systemUser/autoLogin');
  if(store.getters['systemUser/isAuthenticated']){
    next({name:'home'})
  }else{
    next()
  }
}

function loginGuard(to, from, next){
  store.dispatch('systemUser/autoLogin');
  if (store.getters['systemUser/isAuthenticated']) {
		next();
  } else {
		next({ name: 'login' });
  }
}

export default router
