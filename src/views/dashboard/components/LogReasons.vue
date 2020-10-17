<template>
    <div slot="no-body">
        <vue-apex-charts type="radialBar" height="255" class="" :options="logApexData.chartOptions" :series="logApexData.series" />
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import {mapGetters} from 'vuex'

export default {
    data() {
        return {
            logApexData: {
                series:[],
                chartOptions: {
                    plotOptions: {
                        radialBar: {
                            dataLabels: {
                                total: {
                                    show: true,
                                    label: 'Total Logs',
                                    formatter: (w) => this.logs().length
                                }
                            }
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    legend: {
                        show: true
                    },
                    labels:['Unknown','Denied','Spoofing']
                }
            }
        }
    },
    methods:{
        ...mapGetters('log',['logs']),
        initLogSerie(){
			this.logApexData.series.push(this.filterLogReasonThroughParsing('unknown').length)
			this.logApexData.series.push(this.filterLogReasonThroughParsing('denied').length)
			this.logApexData.series.push(this.filterLogReasonThroughParsing('spoofing').length)
        },
        filterLogReasonThroughParsing(reason){
            return this.logs().filter(el => {
                return this.getLogReason(el.log) == reason
            })
        },
        getLogReason(log){
            return this.parse(log)['reason']
        },
        parse(jsonData){
            return JSON.parse(jsonData.replace(/'/g, '"'))
        },
    },
    created(){
        this.initLogSerie()
	},
	components: {
		VueApexCharts
  	}
}
</script>