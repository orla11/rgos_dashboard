<template>
    <div slot="no-body">
        <vue-apex-charts type="donut" height="240" class="mt-4" :options="sensorApexData.chartOptions" :series="sensorApexData.series" />
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import {mapGetters} from 'vuex'

export default {
    data() {
        return {
            sensorApexData: {
                series:[],
                chartOptions: {
                    dataLabels: {
                        enabled: false
                    },
                    legend: {
                        show: true
                    },
                    labels:['Active','Down','Pending','Denying']
                }
            }
        }
    },
    methods:{
        ...mapGetters('sensor',['sensors','activeSensors','downSensors','pendingSensors','denyingSensors']),
        initSensorSerie(){
			this.sensorApexData.series.push(this.activeSensors().length)
			this.sensorApexData.series.push(this.downSensors().length)
			this.sensorApexData.series.push(this.pendingSensors().length)
			this.sensorApexData.series.push(this.denyingSensors().length)
		},
		getStatusColor(index){
			if(index == 0) return 'success'
			if(index == 1) return 'danger'
			if(index == 2) return 'primary'
			if(index == 3) return 'warning'
		}
    },
    created(){
		this.initSensorSerie()
	},
	components: {
		VueApexCharts
  	}
}
</script>