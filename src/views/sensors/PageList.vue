<template>
      <div>
            <div class="search-page__search-bar flex items-center">
                  <vs-input icon-no-border placeholder="Search" v-model="searchQuery" class="w-full input-rounded-full" icon="icon-search" icon-pack="feather" />
            </div>
            <vs-progress :height="2" indeterminate v-if="isCheckingStatus" :color="'#fff'" class="mb-8 mt-4" />
            <vs-divider v-if="!isCheckingStatus" border-style="dotted" color="primary" class="mb-8"/>
            <vs-row id="loading-search" class="vs-con-loading__container">
                  <vs-col v-for="(status,index) in statuses"
                        :key="index"
                        vs-w="6">
                        <app-sensor-list :sensors="sensors" :status="status"></app-sensor-list>
                  </vs-col>
            </vs-row>
            <app-sensor-popup-edit></app-sensor-popup-edit>
      </div>
</template>

<script>
import SensorList from './List.vue'
import {mapGetters} from 'vuex'
import Edit from './Edit.vue'
import {EventBus} from '../../main.js'

const kDebounceTimeoutMs = 1000;

export default {
      data() {
            return {
                  sensors: [],
                  statuses: ['active','down','pending','denying'],
                  searchQuery: "",
                  debounceTimeout: null,
                  isCheckingStatus: false
            }
      },
      watch: {
            searchQuery: function(query) {
                  if(this.debounceTimeout){
                        clearTimeout(this.debounceTimeout);
                  }

                  this.$vs.loading({
                        background: 'rgba(40, 47, 83, 0.25)',
                        color: 'warning',
                        container: "#loading-search",
                        type:'default',
                        scale: 1
                  })

                  this.debounceTimeout = setTimeout(() => {
                        this.sensors = this.getSensors().filter((el) => el.name.toLowerCase().includes(this.searchQuery.toLowerCase()) 
                                                                        || el.access_area.toLowerCase().includes(this.searchQuery.toLowerCase()) 
                                                                        || el.status.toLowerCase().includes(this.searchQuery.toLowerCase()) 
                                                                        || el.ip_addr.includes(this.searchQuery));

                        this.$vs.loading.close("#loading-search > .con-vs-loading")
                  },kDebounceTimeoutMs)
            }
      },
      methods: {
            ...mapGetters('sensor',{
                  getSensors: 'sensors'
            }),
      },
      components: {
            'app-sensor-list':SensorList,
            'app-sensor-popup-edit':Edit
      },
      created(){
            this.sensors = this.getSensors()
            EventBus.$on('sensorSaved', () => {
                  this.$vs.notify({
                        title:'Sensor updated',
                        text:'The sensor was successfully updated',
                        color:'success',
                        position:'top-right',
                        icon:'icon-check',
                        iconPack:'feather',
                        time: 2000
                  })
            })
            EventBus.$on('checkingStatus',() => {
                  this.isCheckingStatus = true
            })
            EventBus.$on('statusChecked',() => {
                  this.isCheckingStatus = false
            })
      }
}
</script>

<style lang="scss" scoped>
      .loading-example {
            width: 120px;
            float: left;
            height: 120px;
            box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.05);
            border-radius: 10px;
            margin: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
            &.activeLoading {
                  opacity: 0 !important;
                  transform: scale(0.5);
            }
      }
</style>