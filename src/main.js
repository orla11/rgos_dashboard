import Vue from 'vue';
import App from './App.vue';

// Vuesax Component Framework
import Vuesax from 'vuesax';
import 'material-icons/iconfont/material-icons.css'; //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax

Vue.use(Vuesax);

// axios
import axios from './axios.js';
Vue.prototype.$http = axios;

// Filters
import './filters/filters.js';

// Theme Configurations
import '../themeConfig.js';

// Globally Registered Components
import './globalComponents.js';

// Styles: SCSS
import './assets/scss/main.scss';

// Tailwind
import '@/assets/css/main.css';

// Vue Router
import router from './router';

// Vuex Store
import store from './store/store';

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer';
Vue.use(VueHammer);

// PrismJS
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

// Feather font icon
require('./assets/css/iconfont.css');

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

// CUSTOM ORLA
export const EventBus = new Vue();

// Change this before building for production
Vue.config.productionTip = true;
Vue.config.devtools = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
