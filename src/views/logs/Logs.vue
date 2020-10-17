<template>
	<app-logs-list :logs="logs"></app-logs-list>
</template>

<script>
import LogList from './List.vue';

export default {
	data() {
		return {
			logs: []
		};
	},
	methods: {
		initLogs() {
			this.setLogs(this.$store.getters['log/logs']);
		},
		setLogs(array) {
			this.logs = array;
		}
	},
	created() {
		this.initLogs();
	},
	components: {
		'app-logs-list': LogList
	}
};
</script>
