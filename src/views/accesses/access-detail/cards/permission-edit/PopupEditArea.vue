<template>
<div class="vx-row">
      <div class="vx-col w-1/2">
            <vx-card content-color="#fff">
                  <app-permission-form :permission="permission"></app-permission-form>
            </vx-card>
      </div>
      <div class="vx-col w-1/2">
            <vx-card title-color="#fff" content-color="#fff" title="Sensors">
                  <app-permission-sensors :sensors="sensors"></app-permission-sensors>
            </vx-card>
      </div>
</div>
</template>
        
<script>
import PermissionSensors from './PermissionSensors.vue'
import Form from './Form.vue'
import {mapGetters} from 'vuex'
import {EventBus} from '../../../../../main.js'
import { validate } from 'uuid'

export default {
      props: ['id'],
      data() {
            return {
                  sensors: [],
                  permission: {
                        name:"",
                        daily_start_time:"",
                        daily_end_time:"",
                        week_day_start:"",
                        week_day_end:"",
                        description:"",
                        access: "",
                        sensors: []
                  }
            }
      },
      methods: {
            ...mapGetters('sensor',{
                  getSensors: 'sensors'
            }),
            ...mapGetters('permission',{
                  getPermissions: 'permissions'
            }),
            loadSensors(){
                  this.sensors = this.parseObject(this.getSensors())
            },
            checkIfIdZero(){
                  return this.id == 0? false : true
            },
            setPermission(value){
                  this.permission = this.parseObject(value)
            },
            setAccessValueInPermission(){
                  this.permission.access = this.$route.params.id
            },
            setPermissionSensors(array){
                  this.permission.sensors = array
            },
            setSensors(array){
                  this.sensors = array
            },
            parseObject(object){
                  return JSON.parse(JSON.stringify(object))
            },
            findPermission(permission_id){
                  return {...this.getPermissions().find(el => el._id == permission_id)}
            },
            loadEditableData(){
                  if(this.checkIfIdZero()){
                        this.setPermission(this.findPermission(this.id))
                        this.setPermissionSensors([...this.sensors.filter(el => this.permission.sensors.includes(el._id))])
                        this.setSensors([...this.sensors.filter(el => !this.permission.sensors.includes(el))])
                  }
            },
            checkIfUUID(id){
                  return validate(id)
            }
      },
      watch: {
            id: function() {
                  if(this.checkIfUUID(this.id)){
                        this.loadSensors()
                        this.loadEditableData()
                  }
            }
      },
      mounted(){
            this.loadSensors()
            this.setAccessValueInPermission()

            EventBus.$on('permissionFormReset',() => {
                  this.loadSensors()
            })
      },
      components: {
            appPermissionSensors:PermissionSensors,
            appPermissionForm:Form
      }
}
</script>

<style scoped>
</style>