<template>
      <div>
            <div class="vx-row">
                        <div class="vx-col w-full mb-2">
                              <vs-input class="w-full" label-placeholder="Group Name" name="name" v-model="group.name" />
                        </div>
                  </div>
                  <div class="vx-row">
                        <div class="vx-col sm:w-1/2 w-full mb-2 mt-2">
                              <flat-pickr :config="configdateTimePicker" v-model="group.daily_start_time" placeholder="Daily start time" />
                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2 mt-2">
                              <flat-pickr :config="configdateTimePicker" v-model="group.daily_end_time" placeholder="Daily end time" />
                        </div>
                  </div>
                  <div class="vx-row">
                        <div class="vx-col sm:w-1/2 w-full mb-2 mt-2">
                              <v-select :reduce="day => day.id" v-model="group.week_day_start" :options="day_options" placeholder="Week day start"></v-select>
                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2 mt-2">
                              <v-select :reduce="day => day.id" v-model="group.week_day_end" :options="day_options" placeholder="Week day end"></v-select>
                        </div>
                  </div>
                  <div class="vx-row">
                        <div class="vx-col w-full">
                              <vs-textarea class="mt-3" counter="400" rows="4" label="Max characters: 400" counter-danger.sync="false" v-model="group.description" />
                        </div>
                        <div class="vx-col w-full">
                              <vs-list>
                                    <vs-list-header title="Group Sensors" color="primary"></vs-list-header>

                                    <draggable :list="group.sensors" group="sensors" class="p-2 cursor-move">
                                          <app-group-sensor-list-item 
                                                v-for="(listItem, index) in group.sensors"
                                                :sensor="listItem" 
                                                :key="index"></app-group-sensor-list-item>
                                    </draggable>

                                    <h6 class="text-center" v-show="group.sensors.length == 0">Drag a new sensor here</h6>
                              </vs-list>
                        </div>
                  </div>
                  <div class="vx-row mt-10">
                        <div class="vx-col w-full">
                              <vs-button class="mr-3 mb-2 ml-4" @click.native="submit">Create</vs-button>
                              <vs-button color="warning" type="border" class="mb-2" @click="resetForm">Reset</vs-button>
                        </div>
                  </div>
      </div>
</template>

<script>
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import draggable from 'vuedraggable'
import { EventBus } from '../../../main.js'
import SensorListItem from './SensorListItem.vue'

import 'flatpickr/dist/flatpickr.css';

export default {
      props: {   
            'group':{
                  type: Object,
                  default: {
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
      data() {
            return {
                  day_options: [
                        {id:"monday", label:"Monday"},
                        {id:"tuesday",label:"Tuesday"},
                        {id:"wednesday", label:"Wednesday"},
                        {id:"thursday", label:"Thursday"},
                        {id:"friday", label:"Friday"},
                        {id:"saturday", label:"Saturday"},
                        {id:"sunday", label:"Sunday"},
                  ],
                  configdateTimePicker: {
                        enableTime: true,
                        enableSeconds: false,
                        noCalendar: true,
                        time_24hr: true
                  }
            }
      },
      methods: {
            resetForm(){
                  this.group.name = this.group.daily_start_time = this.group.daily_end_time = this.group.week_day_start = this.group.week_day_end = this.group.description = ''
                  this.group.sensors = []
                  EventBus.$emit('form-reset')
            },
            submit(){
                  this.checkTime()
                  this.$store.dispatch('group/addGroup',this.group).then(() => {

                        this.$vs.notify({
                              title:'Group created',
                              text:'This group was successfully created',
                              color:'success',
                              position:'top-right',
                              icon:'icon-plus',
                              iconPack:'feather',
                              time: 2000
                        })
                        
                        this.$router.push({name: 'groups'})
                  })
            },
            checkTime(){
                  if(this.group.daily_start_time != '' && this.group.daily_end_time != ''){
                        if(this.group.daily_start_time == this.group.daily_end_time){
                              this.$vs.notify({
                                    title:'Daily Time Not Valid',
                                    text:'Start Time and End Time cannot be equal',
                                    color:'danger',
                                    position:'top-right',
                                    time: 3000
                              })
                              return
                        } 
                        if(this.group.daily_start_time > this.group.daily_end_time){
                              this.$vs.notify({
                                    title:'Daily Time Not Valid',
                                    text:'End Time must be greater than start time',
                                    color:'danger',
                                    position:'top-right',
                                    time: 3000
                              })
                              return
                        }
                  }
                  return
            }
      },
      components: {
            'v-select':vSelect,
            flatPickr,
            draggable,
            'app-group-sensor-list-item': SensorListItem
      }
}
</script>

<style>
      .theme-dark .vs-con-textarea.focusx h4 {
            background-color: #7A80BF !important;
      }
</style>