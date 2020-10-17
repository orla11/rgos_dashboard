<template>
      <div>
            <div class="vx-row">
                        <div class="vx-col w-full mb-2">
                              <vs-input class="w-full" label-placeholder="Permission Name" name="name" v-model="permission.name" />
                        </div>
                  </div>
                  <div class="vx-row">
                        <div class="vx-col sm:w-1/2 w-full mb-2 mt-2">
                              <flat-pickr :config="configdateTimePicker" v-model="permission.daily_start_time" placeholder="Daily start time" />
                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2 mt-2">
                              <flat-pickr :config="configdateTimePicker" v-model="permission.daily_end_time" placeholder="Daily end time" />
                        </div>
                  </div>
                  <div class="vx-row">
                        <div class="vx-col sm:w-1/2 w-full mb-2 mt-2">
                              <v-select :reduce="day => day.id" v-model="permission.week_day_start" :options="day_options" placeholder="Week day start"></v-select>
                        </div>
                        <div class="vx-col sm:w-1/2 w-full mb-2 mt-2">
                              <v-select :reduce="day => day.id" v-model="permission.week_day_end" :options="day_options" placeholder="Week day end"></v-select>
                        </div>
                  </div>
                  <div class="vx-row">
                        <div class="vx-col w-full">
                              <vs-textarea class="mt-3" counter="400" rows="4" label="Max characters: 400" counter-danger.sync="false" v-model="permission.description" />
                        </div>
                        <div class="vx-col w-full">
                              <vs-list>
                                    <vs-list-header title="Permission Sensors" color="primary"></vs-list-header>

                                    <draggable :list="permission.sensors" group="sensors" class="p-2 cursor-move">
                                          <app-permission-sensor-list-item 
                                                v-for="(listItem, index) in permission.sensors"
                                                :sensor="listItem" 
                                                :key="index"></app-permission-sensor-list-item>
                                    </draggable>

                                    <h6 class="text-center" v-show="permission.sensors.length == 0">Drag a new sensor here</h6>
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
import { EventBus } from '../../../../../main.js'
import SensorListItem from './SensorListItem.vue'

import 'flatpickr/dist/flatpickr.css';

export default {
      props: {   
            'permission':{
                  type: Object,
                  default: {
                        _id:"",
                        name:"",
                        daily_start_time:"",
                        daily_end_time:"",
                        week_day_start:"",
                        week_day_end:"",
                        description:"",
                        access:"",
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
                  this.permission.name = this.permission.daily_start_time = this.permission.daily_end_time = this.permission.week_day_start = this.permission.week_day_end = this.permission.description = ''
                  this.permission.sensors = []
                  EventBus.$emit('permissionFormReset')
            },
            submit(){
                  if(this.checkTimeAndNotify()){
                        this.$store.dispatch('permission/addPermission',this.permission).then(() => {
                              this.notify('Permission created','This permission was successfully created','success')
                              EventBus.$emit('permissionSaved')
                        })
                  }
            },
            checkTimeAndNotify(){
                  if(this.checkNotEmptyTimeValue()){
                        if(this.checkDailyTimeEqual()) {
                              this.notify('Daily Time Not Valid','Start Time and End Time cannot be equal','danger')
                              return false
                        }

                        if(this.checkDailyTimeGreater()){
                              this.notify('Daily Time Not Valid','End Time must be greater than start time','danger')
                              return false
                        }
                  }
                  return true
            },
            checkNotEmptyTimeValue(){
                  return this.permission.daily_start_time != '' && this.permission.daily_end_time != ''
            },
            checkDailyTimeEqual(){
                  return this.permission.daily_start_time == this.permission.daily_end_time
            },
            checkDailyTimeGreater(){
                  return this.permission.daily_start_time > this.permission.daily_end_time
            },
            notify(title,text,color){
                  this.$vs.notify({
                        title,
                        text,
                        color,
                        position:'top-right',
                        time: 4000
                  })
            }
      },
      components: {
            'v-select':vSelect,
            flatPickr,
            draggable,
            'app-permission-sensor-list-item': SensorListItem
      }
}
</script>

<style>
      .theme-dark .vs-con-textarea.focusx h4 {
            background-color: #7A80BF !important;
      }
</style>