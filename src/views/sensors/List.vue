<template>
  <div id="data-list-list-view" class="data-list-container">
    <vs-table ref="table"  pagination :max-items="itemsPerPage" :data="sensorsList">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between mb-4">
            <div class="flex flex-wrap-reverse items-center data-list-btn-container">
                  <h5 :class="getSensorStatusColor(status)">{{ status | title }} Sensors</h5>
            </div>
      </div>

      <template slot="thead">
        <vs-th sort-key="name">Sensor Name</vs-th>
        <vs-th sort-key="status">Status</vs-th>
        <vs-th>Actions</vs-th>
        <vs-th v-if="status === 'pending'">Adopt</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
          <vs-tr :key="data[index]._id" v-for="(tr, index) in data">
            <vs-td>
                  <vs-list-item icon-pack="feather" icon="icon-aperture" :title="data[index].name | title"></vs-list-item>
            </vs-td>

            <vs-td>
                  <vs-chip :color="getSensorStatusColor(data[index].status)" class="product-order-status">{{ data[index].status | title }}</vs-chip>
            </vs-td>

            <vs-td class="whitespace-no-wrap">
                  <feather-icon title="Edit" icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(data[index])" style="cursor: pointer;"/>
                  <feather-icon title="Forget" icon="ChevronsDown" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(data[index]._id)" style="cursor: pointer;"/>
            </vs-td>
            <vs-td class="whitespace-no-wrap" v-if="data[index].status === 'pending'">
                  <feather-icon title="Adopt" icon="PlusCircleIcon" svgClasses="w-5 h-5 hover:text-warning stroke-current" class="ml-2" @click.stop="adopt(data[index])" style="cursor: pointer;"/>
            </vs-td>

            <template class="expand-user" slot="expand">
              <div class="con-expand-users text-left">
                <vs-list>
                      <vs-list-item icon-pack="feather" icon="icon-map-pin" :title="data[index].access_area"></vs-list-item>
                      <vs-list-item icon-pack="feather" icon="icon-monitor" :title="data[index].ip_addr">
                        <vs-button color="warning" type="border" size="small" class="mr-2 ml-3" @click.stop="checkStatus(data[index].status)">Check Status</vs-button>
                      </vs-list-item>
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
import {EventBus} from '../../main.js'

export default {
      props: ['sensors','status'],
      data () {
            return {
                itemsPerPage: 4,
                isMounted: false
            }
      },
      computed: {
            currentPage () {
                  if (this.isMounted) {
                        return this.$refs.table.currentx
                  }
                  return 0
            },
            queriedItems () {
                  return this.$refs.table ? this.$refs.table.queriedResults.length : this.sensors.length
            },
            sensorsList(){
              return this.sensors.filter(el => el.status == this.status)
            }
      },
      methods: {
            deleteData(id) {
                  this.$store.dispatch('sensor/deleteSensor',id).then(() => {
                        this.notifySuccess('Sensor deleted','This sensor was successfully delete','icon-check')
                  })
            },
            notifySuccess(title,text,icon,time=2000){
                  this.$vs.notify({
                        title,
                        text,
                        color:'success',
                        position:'top-right',
                        icon,
                        iconPack:'feather',
                        time
                  })
            },
            notifyError(title,text,icon,time=2000){
                  this.$vs.notify({
                        title,
                        text,
                        color:'danger',
                        position:'top-right',
                        icon,
                        iconPack:'feather',
                        time
                  })
            },
            adopt(sensor) {
              this.setSensorStatus(sensor,'active')
              this.$store.dispatch('sensor/updateSensor',sensor).then(() => {
                this.notifySuccess('Sensor adopted','Sensor successfully adopted','icon-check')
              })
            },
            setSensorStatus(sensor,status){
              sensor.status = status
            },
            editData(sensor){
              EventBus.$emit('editData',sensor);
            },
            checkStatus(status) {
              EventBus.$emit('checkingStatus')

              setTimeout(() => {
                if(status == 'down'){
                  this.$vs.notify({
                    title:'Sensor is down',
                    text:'Sensor is not responding',
                    color:'danger',
                    position:'top-right',
                    icon:'icon-alert-octagon',
                    iconPack:'feather',
                    time: 2000
                  })
                }else{
                  this.$vs.notify({
                    title:'Sensor is alive',
                    text:'Sensor is alive, answered in: 78ms',
                    color:'success',
                    position:'top-right',
                    icon:'icon-activity',
                    iconPack:'feather',
                    time: 2000
                  })
                }

                EventBus.$emit('statusChecked')
              },3000)
            },
            getSensorStatusColor(status) {
                  if(status == "active") return 'success'
                  if(status == "down") return 'danger'
                  if(status == "pending") return 'warning'
                  if(status == "denying") return 'primary'
            }
      },
      mounted () {
            this.isMounted = true
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
