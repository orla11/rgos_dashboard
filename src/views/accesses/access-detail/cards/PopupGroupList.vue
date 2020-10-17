<template>
      <vs-popup id="scroll-popup-list" class="" :title="title" :active.sync="isActive">
            <div style="overflow-x: hidden; overflow-y: auto;" class="hide-scroll">
                  <vs-list class="w-full" style="cursor: ns-resize; height: 200px">
                        <vs-list-item v-for="(group,index) in groupList" :title="group.name | shortText" :key="index">
                              <div class="mt-3" v-if="isDetails"></div>
                              <vs-button color="warning" size="small" @click="selectGroup(group._id)">Select</vs-button>
                              &nbsp;
                              <vs-button color="primary" size="small" @click="showDetails(index)">Details</vs-button>
                              <div v-show="isDetails && index == currentDetail" class="mb-3 mt-1">
                                    <table>
                                          <tr>
                                                <td class="font-semibold">Name:</td>
                                                <td class="text-warning">&nbsp;&nbsp;&nbsp;&nbsp;{{ group.name | title }}</td>
                                          </tr>
                                          <tr>
                                                <td class="font-semibold">Daily Hours:</td>
                                                <td>&nbsp;&nbsp;&nbsp;&nbsp;{{ group.daily_start_time }} - {{ group.daily_end_time }}</td>
                                          </tr>
                                          <tr>
                                                <td class="font-semibold">Weekdays:</td>
                                                <td>&nbsp;&nbsp;&nbsp;&nbsp;{{ group.week_day_start | shortDay | title }} - {{ group.week_day_end | shortDay | title }}</td>
                                          </tr>
                                    </table>
                              </div>
                        </vs-list-item>
                  </vs-list>
            </div>
      </vs-popup>
</template>

<script>
import {EventBus} from '../../../../main.js'

export default {
      props:['title','groupList'],
      data() {
            return {
                  isActive: false,
                  isDetails: false,
                  currentDetail: 0
            }
      },
      methods: {
            selectGroup(groupId){
                  this.changeGroup(this.setIds(groupId,this.$route.params.id))
            },
            setIds(groupId,accessId){
                  let payload = {
                        access_id: accessId,
                        group_id:  groupId
                  }
                  return payload
            },
            changeGroup(payload){
                  this.$store.dispatch('access/setGroup',payload)
                  this.emitGroupChangedEvent()
            },
            emitGroupChangedEvent(){
                  EventBus.$emit('groupChanged')
                  this.closePopup()
            },
            closePopup(){
                  this.isActive = false
            },
            showDetails(index){
                  if(this.currentDetailIsIndex(index)){
                        this.setIsDetails(!this.isDetails)
                  }else{
                        this.setIsDetails(true)
                  }

                  this.setCurrentDetail(index)
            },
            currentDetailIsIndex(index) {
                  return this.currentDetail == index
            },
            setIsDetails(value){ 
                  this.isDetails = value
            },
            setCurrentDetail(index){ 
                  this.currentDetail = index
            }
      },
      created(){
            EventBus.$on('GroupPopupOpenEvent', () => {
                  this.isActive = !this.isActive
            })
      }
}
</script>

<style>
      #scroll-popup-list .vs-popup{
            width:40%;
            height: 280px;
            padding: 0 0 0 0;
      }
      .hide-scroll::-webkit-scrollbar {
            width: 0px;
            background: transparent; /* make scrollbar transparent */
      }
</style>