<template>
      <vx-card title="Details" class="mb-base">
            <!-- Avatar -->
            <div class="vx-row">

                  <!-- Avatar Col -->
                  <div class="vx-col" id="avatar-col">
                        <div class="img-container mb-4">
                        <img style="width: 95%;" alt="access" src="../../../assets/images/accesses/placeholder.png" class="rounded" />
                        </div>
                  </div>

                  <!-- Information - Col 1 -->
                  <div class="vx-col flex-1" id="account-info-col-1">
                        <table>
                              <tr v-if="!isEditing">
                                    <td class="font-semibold">Name</td>
                                    <td>&nbsp;&nbsp;{{ access.first_name | title }} {{ access.last_name | title }}</td>
                              </tr>
                              <tr v-else>
                                    <td><vs-input size="small" class="w-32" label-placeholder="First Name" v-model="first_name"/></td>
                                    <td><vs-input size="small" class="w-32" label-placeholder="Last Name" v-model="last_name"/></td>
                              </tr>
                              <tr>
                                    <td class="font-semibold">Created</td>
                                    <td>&nbsp;&nbsp;{{ access.created_on.$date | date }}</td>
                              </tr>
                              <tr>
                                    <td class="font-semibold">Permissions</td>
                                    <td>&nbsp;&nbsp;{{ access.permissions.length }}</td>
                              </tr>
                              <tr>
                                    <td class="font-semibold">Group</td>
                                    <td>&nbsp;&nbsp;{{ access.group == ''? 'No Group' : getAccessGroupName }}</td>
                              </tr>
                        </table>
                  </div>
                  <!-- /Information - Col 1 -->

                  <div class="vx-col w-full flex" id="account-manage-buttons">
                        <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" @click="editAccess">Edit</vs-button>
                        <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash" @click="confirmDeleteAccess">Delete</vs-button>
                  </div>
            </div>

      </vx-card>
</template>

<script>
import { EventBus } from '../../../main'
export default {
      props:['access'],
      data() {
            return {
                  first_name:'',
                  last_name:'',
                  group: null,
                  isEditing: false
            }
      },
      methods: {
            confirmDeleteAccess(){
                  this.$vs.dialog({
                        type: 'confirm',
                        color: 'danger',
                        title: 'ACCESS DELETION',
                        text: 'IF YOU DELETE THIS ACCESS, ALL THE ASSOCIATED PERMISSIONS WILL BE DELETED AS WELL. PROCEED?',
                        accept: this.emitAccessDeletedAndNavigate
                  })
            },
            emitAccessDeletedAndNavigate(){
                  EventBus.$emit('accessDeleted',this.access)
                  this.navigateTo({name: "access-list"})
            },
            editAccess(){
                  this.switchIsEditing()
                  if(!this.checkIfEditing()){
                        if(this.checkIfCurrentNameIsDifferent()){
                              let updatedAccess = {
                                    _id:this.access._id,
                                    first_name:this.first_name, 
                                    last_name:this.last_name, 
                              }
                              this.dispatchAndNotifyUpdate(updatedAccess)
                        }
                  }
            },
            processPermissionsDeletion(permission_id){
                  this.access.permissions.forEach(el => {
                              this.$store.dispatch('permission/deletePermission',{
                              access_id: this.access._id, 
                              permission_id: el
                        })
                  })
            },
            dispatchAccessDeletion(){
                  this.$store.dispatch('access/deleteAccess',this.access._id)
            },
            switchIsEditing(){
                  this.isEditing = !this.isEditing
            },
            checkIfEditing: () => this.isEditing,
            checkIfCurrentNameIsDifferent(){
                  return this.first_name != this.access.first_name || this.last_name != this.access.last_name
            },
            navigateTo(route){
                  this.$router.push(route)
            },
            notify(title,text,color,icon){
                  this.$vs.notify({
                        title,
                        text,
                        color,
                        position:'top-right',
                        time: 2000
                  })
            },
            dispatchAndNotifyUpdate(data){
                  this.$store.dispatch('access/updateAccess',data).then(() => {
                        this.notify('Access updated','The access was successfully updated','success',)
                  })
            },
            setFirstName(value){ this.first_name = value },
            setLastName(value) { this.last_name = value },
            setGroup(value) { this.group = value }
      },
      computed: {
            getAccessGroupName(){
                  this.setGroup(this.$store.getters['group/groups'].find(el => el._id == this.access.group))
                  return this.group.name
            }
      },
      created(){
            this.setFirstName(this.access.first_name)
            this.setLastName(this.access.last_name)
      }
}
</script>

<style lang="scss">

#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: .8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width:370px) {
          display: block;
        }
      }
    }
  }
}

@media screen and (min-width:1201px) and (max-width:1211px),
only screen and (min-width:636px) and (max-width:991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }
}
</style>