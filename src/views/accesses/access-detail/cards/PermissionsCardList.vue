<template>
      <div id="data-list-list-view" class="data-list-container">
            <vs-table ref="table"  pagination :max-items="itemsPerPage" search :data="permissions">

                  <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

                  <div class="flex flex-wrap-reverse items-center data-list-btn-container">
                        <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary"
                              @click="toNew">
                              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
                              <span class="ml-2 text-base text-primary">Add New Permission</span>
                        </div>
                  </div>

                  <!-- ITEMS PER PAGE -->
                  <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
                  <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                        <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ permissions.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : permissions.length }} of {{ queriedItems }}</span>
                        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                  </div>
                  <vs-dropdown-menu>

                        <vs-dropdown-item @click="itemsPerPage=4">
                        <span>4</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="itemsPerPage=10">
                        <span>10</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="itemsPerPage=15">
                        <span>15</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="itemsPerPage=20">
                        <span>20</span>
                        </vs-dropdown-item>
                  </vs-dropdown-menu>
                  </vs-dropdown>
                  </div>

                  <template slot="thead">
                  <vs-th sort-key="name">Permission Name</vs-th>
                  <vs-th sort-key="daily_start_time">Daily Hours</vs-th>
                  <vs-th>Weekdays</vs-th>
                  <vs-th>Sensors</vs-th>
                  <vs-th>Created</vs-th>
                  <vs-th>Action</vs-th>
                  </template>

                  <template slot-scope="{data}">
                  <tbody>
                        <vs-tr :key="data[index]._id" v-for="(tr, index) in data">

                        <vs-td>
                        <p class="product-name font-medium truncate">{{data[index].name | title}}</p>
                        </vs-td>

                        <vs-td>
                        <p class="product-name font-medium truncate">{{ data[index].daily_start_time }} - {{ data[index].daily_end_time }}</p>
                        </vs-td>

                        <vs-td>
                        <p class="product-name font-medium truncate">{{ data[index].week_day_start | title }} - {{ data[index].week_day_end | title }}</p>
                        </vs-td>

                        <vs-td>
                        <vs-chip color="red" class="product-order-status">{{ tr.sensors.length }}</vs-chip>
                        </vs-td>

                        <vs-td>
                        <p class="product-price">{{ data[index].created_on.$date | date }}</p>
                        </vs-td>

                        <vs-td class="whitespace-no-wrap">
                        <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editPermission(data[index]._id)" style="cursor: pointer;"/>
                        <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deletePermission(data[index]._id)" style="cursor: pointer;"/>
                        </vs-td>

                        <template class="expand-user" slot="expand">
                        <div class="con-expand-users text-left">
                              <vs-list>
                              <vs-list-item title="Description" :subtitle="tr.description"></vs-list-item>
                              </vs-list>
                        </div>
                        </template>
                        </vs-tr>
                  </tbody>
                  </template>
            </vs-table>
      </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {EventBus} from '../../../../main.js'

export default {
    data () {
      return {
        itemsPerPage: 4,
        isMounted: false,
        permissions: []
      }
    },
    computed: {
      currentPage () {
        return this.isMounted? this.$refs.table.currentx : 0
      },
      queriedItems () {
        return this.$refs.table ? this.$refs.table.queriedResults.length : this.permissions.length
      }
    },
    methods: {
      ...mapGetters('permission',{
        getPermissions: 'permissions'
      }),
      deletePermission (id) {
        let payload = {
          permission_id: id,
          access_id: this.$route.params.id
        }
        this.$store.dispatch('permission/deletePermission',payload)
        this.setCurrentPermissions()
        this.notify('Permission deleted','This permission was successfully deleted','success','icon-check')
      },
      notify(title,text,color,icon){
            this.$vs.notify({
                  title,
                  text,
                  color,
                  position:'top-right',
                  icon,
                  iconPack:'feather',
                  time: 2000
          })
      },
      setCurrentPermissions(){
        this.permissions = this.getPermissions().filter(el => el.access == this.$route.params.id)
      },
      editPermission (id) {
        EventBus.$emit('NewPermissionPopupOpenEvent',id)
      },
      toNew(){
        EventBus.$emit('NewPermissionPopupOpenEvent')
      }
    },
    mounted () {
      this.isMounted = true
    },
    created(){
      this.setCurrentPermissions()

      EventBus.$on('permissionSaved',() => {
        this.setCurrentPermissions()
      })
    }
}
</script>

<style lang="scss">
#data-list-list-view {
  .vs-con-table {
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search{
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          &+i {
            left: 1rem;
          }

          &:focus+i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            //cursor: pointer;
            //padding: 20px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
          }
      }
    }

    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>