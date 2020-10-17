<template>
    <vs-popup classContent="popup" :title="'Edit Sensor'" :active.sync="isEditPopupActive">
      <vs-row class="text-left">
        <vs-col vs-w="12">
          <h5>{{ sensor.name | title }}</h5>
          <vs-divider border-style="dotted" color="primary"></vs-divider>
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col vs-w="12">
          <vs-input class="mb-3 w-full" label-placeholder="Access Area" v-model="sensor.access_area" />
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col vs-w="6">
          <vs-input class="mb-3 w-full" label-placeholder="IP Address" v-model="sensor.ip_addr" />
        </vs-col>
        <vs-col vs-w="6" v-if="sensor.status == 'active' || sensor.status == 'denying'" class="mt-3 text-center">
          <ul class="">
            <li>
              <h6 style="text-decoration: underline;">Set status</h6>
              <vs-radio color="success" class="ml-3 mt-2" v-model="sensor.status" vs-value="active">Active</vs-radio>
              <vs-radio class="ml-3" v-model="sensor.status" vs-value="denying">Denying</vs-radio>
            </li>
          </ul>
        </vs-col>
      </vs-row>
      <vs-button @click="saveSensorData" vs-value="isEditPopupActive" color="primary" type="filled" class="mt-5">Update</vs-button>
    </vs-popup>
</template>

<script>
import {EventBus} from '../../main.js'

export default {
      data() {
        return {
          isEditPopupActive: false,
          sensor: {
            _id: '',
            name:'test',
            access_area: '',
            ip_addr: '',
            status: ''
          }
        }
      },
      methods: {
        saveSensorData(){
          this.$store.dispatch('sensor/updateSensor',this.sensor)
            .then(() => {
              EventBus.$emit('sensorSaved')
              this.isEditPopupActive = false
            })
        }
      },
      mounted(){
        EventBus.$on('editData',(sensorData) => {

          for(const property in this.sensor) {
            this.sensor[property] = sensorData[property]
          }

          this.isEditPopupActive = true
        })
      }
}
</script>