<template>
      <vs-popup fullscreen :title="title" :active.sync="isActive">
            <app-popup-edit-permission-area :id="permission_id"></app-popup-edit-permission-area>
      </vs-popup>
</template>

<script>
import PopupEditPermissionArea from './PopupEditArea.vue'
import {EventBus} from '../../../../../main.js'
import {validate} from 'uuid'

export default {
      data() {
            return {
                  isActive: false,
                  title: "New Permission",
                  permission_id: 0
            }
      },
      methods: {
            switchActiveStatus(){
                  this.isActive = !this.isActive
            },
            setTitle(value){
                  this.title = value
            },
            setPermissionId(value){
                  this.permission_id = value
            },
            checkValidUUID(id){
                  return validate(id)
            }
      },
      created() {
            EventBus.$on('NewPermissionPopupOpenEvent', (id) => {
                  if(this.checkValidUUID(id)){
                        this.setTitle("Edit Permission")
                        this.setPermissionId(id)
                        EventBus.$emit("PermissionBeingEdited")
                  }
                  this.switchActiveStatus()
            })
            EventBus.$on('permissionSaved',() => {
                  this.switchActiveStatus()
            })
      },
      components: {
            'app-popup-edit-permission-area':PopupEditPermissionArea
      }
}
</script>