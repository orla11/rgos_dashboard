<template>
	<vs-row>
		<vs-col
			vs-offset="2"
			vs-type="flex"
			vs-justify="center"
			vs-align="center"
			vs-w="8"
		>
			<app-under-development></app-under-development>
		</vs-col>
	</vs-row>
</template>

<script>
import UnderDevelopment from './pages/components/Maintenance.vue';

export default {
	components: {
		appUnderDevelopment: UnderDevelopment
	}
};
</script>
