<template>
<div class="vx-row">
      <div class="vx-col w-1/2">
            <vx-card title-color="#fff" content-color="#fff">
                  <app-group-form :group="group"></app-group-form>
            </vx-card>
      </div>
      <div class="vx-col w-1/2">
            <vx-card title-color="#fff" content-color="#fff" title="Sensors">
                  <app-group-sensors :sensors="sensors"></app-group-sensors>
            </vx-card>
      </div>
</div>
</template>
        
<script>
import GroupSensors from './GroupSensors.vue'
import Form from './Form.vue'
import {mapGetters} from 'vuex'
import {EventBus} from '../../../main.js'

export default {
      data() {
            return {
                  sensors: [],
                  group: {
                        name:"",
                        daily_start_time:"",
                        daily_end_time:"",
                        week_day_start:"",
                        week_day_end:"",
                        description:"",
                        sensors: []
                  }
            }
      },
      methods: {
            ...mapGetters('sensor',{
                  getSensors: 'sensors'
            }),
            ...mapGetters('group',{
                  getGroups: 'groups'
            }),
            loadSensors(){
                  this.sensors = JSON.parse ( JSON.stringify ( this.getSensors() ))
            }
      },
      created(){
            this.sensors = JSON.parse ( JSON.stringify ( this.getSensors() ))

            if(this.$route.name == 'group-edit'){
                  this.group = {...this.getGroups().find(el => el._id == this.$route.params.id.toString())}

                  this.group.sensors =    [...this.sensors.filter(el => this.group.sensors.includes(el._id))]
                  this.sensors =          [...this.sensors.filter(el => !this.group.sensors.includes(el))]
            }

            EventBus.$on('form-reset',() => {
              this.loadSensors()
            })
      },
      components: {
            appGroupSensors:GroupSensors,
            appGroupForm:Form
      }
}
</script>

<style scoped>
</style>