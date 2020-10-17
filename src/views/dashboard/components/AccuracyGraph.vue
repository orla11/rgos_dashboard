<template>
    <div slot="no-body">
        <vue-apex-charts type="line" height="266" :options="accuracyApexData.chartOptions" :series="accuracyApexData.series" />
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
    data() {
        return {
            accuracyApexData: {
                series:[{
                    name: "System Accuracy",
                    data: []
                }],
                chartOptions: {
                    chart: {
                        toolbar: { show: false },
                        dropShadow: {
                            enabled: true,
                            top: 20,
                            left: 2,
                            blur: 6,
                            opacity: 0.20
                        }
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 4
                    },
                    grid: {
                        borderColor: '#ebebeb'
                    },
                    legend: {
                        show: false
                    },
                    colors: ['#df87f2'],
                    fill: {
                        type: 'gradient',
                        gradient: {
                        shade: 'dark',
                        inverseColors: false,
                        gradientToColors: ['#7367F0'],
                        shadeIntensity: 1,
                        type: 'horizontal',
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100, 100, 100]
                        }
                    },
                    markers: {
                        size: 0,
                        hover: {
                        size: 5
                        }
                    },
                    xaxis: {
                        labels: {
                            style: {
                                cssClass: 'text-primary fill-current'
                            }
                        },
                        axisTicks: {
                            show: false
                        },
                        categories: [],
                        axisBorder: {
                            show: false
                        }
                    },
                    yaxis: {
                        tickAmount: 5,
                        labels: {
                            style: {
                                cssClass: 'text-primary fill-current'
                            },
                            formatter (val) {
                                return val > 999 ? `${(val / 1000).toFixed(1)}k` : val
                            }
                        }
                    },
                    tooltip: {
                        x: { show: false },
                        theme: 'dark'
                    }
                }
            }
        }
    },
    methods: {
        generateRandomDecimalNumber(){
            return Math.round((Math.random() * (100.00-70.00)+70.00) * 100) / 100
        }
    },
    created(){
        for(let i = 0; i<15; i++){
            this.accuracyApexData.series[0].data.push(this.generateRandomDecimalNumber())
            this.accuracyApexData.chartOptions.xaxis.categories.push("Day " + (i+1))
        }
    },
	components: {
		VueApexCharts
  	}
}
</script>