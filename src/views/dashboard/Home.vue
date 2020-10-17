<template>
	<div>
		<div class="vx-row">
            <div class="vx-col w-1/3 md:w-1/3 xl:w-1/3">
                <statistics-card-line
                  hideChart
				  @click.native="navigateTo({name: 'access-list'})"
                  class="mb-base cursor-pointer"
                  icon="UserCheckIcon"
                  :statistic="countAccesses"
                  statisticTitle="Accesses"
				  color="danger" />
            </div>

            <div class="vx-col w-1/3 md:w-1/3 xl:w-1/3">
                <statistics-card-line
                  hideChart
				  @click.native="navigateTo({name: 'sensor-list'})"
                  class="mb-base cursor-pointer"
                  icon="ApertureIcon"
                  statisticTitle="Sensors"
                  :statistic="countSensors"
                  color="warning" />
            </div>

            <div class="vx-col w-1/3 md:w-1/3 xl:w-1/3">
                <statistics-card-line
                  hideChart
				  @click.native="navigateTo({name: 'group-list'})"
                  class="mb-base cursor-pointer"
                  icon="UsersIcon"
                  :statistic="countGroups"
                  statisticTitle="Groups"
                  color="primary" />
            </div>
		</div>
		
		<div class="vx-row">
			<div class="vx-col w-full lg:w-1/2 mb-base">
                <vx-card title="Sensors Statuses">
                    <app-sensor-statuses></app-sensor-statuses>
                </vx-card>
            </div>
			<div class="vx-col w-full lg:w-1/2 mb-base">
                <vx-card title="Logs Reasons">
                    <app-log-reasons></app-log-reasons>
                </vx-card>
            </div>
		</div>

		<div class="vx-row">
            <div class="vx-col w-full">
				<vx-card title="System Accuracy">
					<app-accuracy-graph></app-accuracy-graph>
				</vx-card>
			</div>
		</div>
	</div>
</template>

<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import {mapGetters} from 'vuex'

import SensorStatuses from './components/SensorStatuses.vue'
import LogReasons from './components/LogReasons.vue'
import AccuracyGraph from './components/AccuracyGraph.vue'

export default {
	methods:{
		...mapGetters('access',['accesses']),
		...mapGetters('sensor',['sensors']),
		...mapGetters('group',['groups']),
		navigateTo(route){
			this.$router.push(route)
		}
	},
	computed:{
		countAccesses(){
			return this.accesses().length
		},
		countSensors(){
			return this.sensors().length
		},
		countGroups(){
			return this.groups().length
		}
	},
	components: {
		StatisticsCardLine,
		'app-sensor-statuses':SensorStatuses,
		'app-log-reasons':LogReasons,
		'app-accuracy-graph':AccuracyGraph
  	},
}
</script>