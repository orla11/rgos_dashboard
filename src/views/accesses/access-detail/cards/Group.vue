<template>
      <div>
            <vx-card title="" class="mb-base">
                  <div v-if="group" class="vx-row">

                        <div class="vx-col flex-1">
                              <div class="vx-row">
                                    <div class="vx-col flex-1" id="account-info-col-1">
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
                                                      <td>&nbsp;&nbsp;&nbsp;&nbsp;{{ group.week_day_start | title }} - {{ group.week_day_end | title }}</td>
                                                </tr>
                                                <tr>
                                                      <td class="font-semibold">Created:</td>
                                                      <td>&nbsp;&nbsp;&nbsp;&nbsp;{{ group.created_on.$date | date }}</td>
                                                </tr>
                                          </table>
                                    </div>
                                    <div class="vx-col flex-1">
                                          <h5 class="mb-2 font-semibold underline">Description</h5>
                                          <p>{{ group.description }}</p>
                                    </div>
                              </div>
                        </div>

                        <div class="vx-col w-full flex mt-8" id="account-manage-buttons">
                              <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" @click="changeGroup">Change Group</vs-button>
                        </div>
                  </div>

                  <div v-else class="vx-row">
                        <div class="vx-col flex" id="account-manage-buttons">
                              <h5 class="text-danger mt-3">No group associated with this access</h5>
                        </div>
                        <div class="vx-col flex" id="account-manage-buttons">
                              <vs-button icon-pack="feather" icon="icon-plus" @click="changeGroup">Set Group</vs-button>
                        </div>
                  </div>
            </vx-card>
            <app-popup-group-list :groupList="groups" :title="'Groups List'"></app-popup-group-list>
      </div>
</template>

<script>
import PopupGroupList from './PopupGroupList.vue'
import {EventBus} from '../../../../main.js'

export default {
      data() {
            return {
                  groups: [],
                  group: null
            }
      },
      methods: {
            changeGroup(){
                  EventBus.$emit('GroupPopupOpenEvent')
            },
            notifyGroupChanged(){
                  this.$vs.notify({
                        title: 'Group Changed',
                        text: 'The selected group has been assigned.',
                        color: 'success',
                        position: 'top-right',
                        iconPack:'feather',
                        icon: 'icon-check'
                  })
            },
            setCurrentGroup(group_id){
                  this.group = this.$store.getters['group/groups'].find(el => el._id == group_id)
            },
            getCurrentAccess(){
                  return this.$store.getters['access/accesses'].find(el => el._id == this.$route.params.id).group
            }
      },
      components: {
            'app-popup-group-list':PopupGroupList
      },
      created(){
            this.groups = this.$store.getters['group/groups']
            this.setCurrentGroup(this.getCurrentAccess())

            EventBus.$on('groupChanged',()  => {
                  this.setCurrentGroup(this.getCurrentAccess())
                  this.notifyGroupChanged()
            })
      }
}
</script>