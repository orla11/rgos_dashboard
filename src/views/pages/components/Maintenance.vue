<template>
	<vx-card
		style="width: 800px; height: 474px;"
		:card-background="'url(' + maintenance_img + ')'"
		:title="'PAGE UNDER DEVELOPMENT'"
		title-color="#10163A"
	></vx-card>
</template>

<script>
export default {
	data() {
		return {
			maintenance_img: require('@/assets/images/pages/maintenance.jpg')
		};
	}
};
</script>
