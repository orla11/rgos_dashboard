<template>
  <div id="data-list-list-view" class="data-list-container">
    <vs-table ref="table"  pagination :max-items="itemsPerPage" :data="logs">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ logs.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : logs.length }}</span>
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

        <v-select id="style-select-bg" @input="filterByReason" class="w-48" :reduce="reason => reason.id" v-model="selectedReasonFilter" :options="reasons" placeholder="Filter Reason"></v-select>
      </div>

      <template slot="thead">
        <vs-th>Source</vs-th>
        <vs-th>Area</vs-th>
        <vs-th>Reason</vs-th>
        <vs-th>Created On</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
          <vs-tr :key="data[index]._id" v-for="(tr, index) in data">
            <vs-td>
                  <vs-list-item icon-pack="feather" icon="icon-aperture" :title="getSensorName(data[index].source) | title"></vs-list-item>
            </vs-td>

            <vs-td>
                  <vs-list-item :title="getSensorArea(data[index].source) | title"></vs-list-item>
            </vs-td>

            <vs-td>
                  <vs-chip :color="getLogReasonColor(getLogReason(data[index].log))" class="product-order-status">{{ getLogReason(data[index].log) | title}}</vs-chip>
            </vs-td>

            <vs-td>
                  <p class="product-price">{{ data[index].created_on.$date | date }}</p>
            </vs-td>

            <template slot="expand">
              <vs-row>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" :vs-w="checkIsDenied(data[index].log)? 6 : 12">
                  <json-viewer :value="parse(jsonifyData(data[index].log))"
                            :expand-depth=5 copyable boxed sort theme="rgos-theme" class="w-full"></json-viewer>
                </vs-col>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6" v-if="checkIsDenied(data[index].log)">
                  <vs-list class="p-10">
                      <vs-list-header color="warning" icon-pack="feather" icon="icon-user" title="Access Details:"></vs-list-header>
                      <vs-list-item :title="'Name: ' + getAccessName(data[index].log)"></vs-list-item>
                  </vs-list>
                </vs-col>
              </vs-row>
            </template>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import {mapGetters} from 'vuex'
import JsonViewer from 'vue-json-viewer'

import 'vue-json-viewer/style.css'

export default {
      data () {
            return {
                itemsPerPage: 4,
                isMounted: false,
                selectedReasonFilter: '',

                reasons: [
                  {id:0, label:'Unknown'},
                  {id:1, label:'Denied'},
                  {id:2, label:'Spoofing'}
                ]
            }
      },
      computed: {
            currentPage () {
                  if (this.isMounted) {
                        return this.$refs.table.currentx
                  }
                  return 0
            }
      },
      methods: {
            ...mapGetters('log',{
              getLogs:'logs'
            }),
            filterByReason(){
              if(this.selectedReasonFilter != null){
                this.setLogs(this.filterLogReasonThroughParsing(this.selectedReasonFilter))
              }else{
                this.setLogs(this.getLogs())
              }
            },
            filterLogReasonThroughParsing(reason_id){
              return this.getLogs().filter(el => {
                return this.getLogReason(el.log) == this.findReasonById(reason_id).label.toLowerCase()
              })
            },
            findReasonById(reason_id){
              return this.reasons.find(el => el.id == reason_id)
            },
            getSensorName(id){
              return this.$store.getters['sensor/sensors'].find(el => el._id == id).name
            },
            getSensorArea(id){
              return this.$store.getters['sensor/sensors'].find(el => el._id == id).access_area
            },
            getAccessName(log){
              let access_id = this.parse(log)['emp_id']
              let access = this.$store.getters['access/accesses'].find(el => el._id == access_id)

              return access.first_name + ' ' + access.last_name
            },
            getLogReason(log){
              return this.parse(log)['reason']
            },
            checkIsDenied(log){
              return this.getLogReason(log) == 'denied'
            },
            setLogs(array){
              this.logs = array
            },
            getLogReasonColor(reason) {
              if(reason == "unknown") return 'warning'
              if(reason == "denied") return 'primary'
              if(reason == "spoofing") return 'danger'
            },
            parse(jsonData){
              return JSON.parse(jsonData.replace(/'/g, '"'))
            },
            jsonifyData(data){
              return data.replace(/'/g, '"')
            }
      },
      mounted () {
        this.isMounted = true
      },
      created() {
        this.setLogs(this.getLogs())
      },
      components: {
        'v-select':vSelect,
        JsonViewer
      }
}
</script>

<style lang="scss">
#style-select-bg .vs__dropdown-toggle {
  background: #221e3a !important;
}

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


.rgos-theme {
  background: #10163A;
  white-space: nowrap;
  color: #eee;
  font-size: 14px;
  font-family: Consolas, Menlo, Courier, monospace;

  .jv-ellipsis {
    color: #eee;
    background-color: #eee;
    display: inline-block;
    line-height: 0.9;
    font-size: 0.9em;
    padding: 0px 4px 2px 4px;
    border-radius: 3px;
    vertical-align: 2px;
    cursor: pointer;
    user-select: none;
  }
  .jv-button { color: #49b3ff }
  .jv-key { color: #FEFEFE }
  .jv-item {
    &.jv-array { color: #FEFEFE }
    &.jv-boolean { color: #fc1e70 }
    &.jv-function { color: #067bca }
    &.jv-number { color: #fc1e70 }
    &.jv-number-float { color: #fc1e70 }
    &.jv-number-integer { color: #fc1e70 }
    &.jv-object { color:#FEFEFE }
    &.jv-undefined { color: #e08331 }
    &.jv-string {
      color: #42b983;
      word-break: break-word;
      white-space: normal;
    }
  }
  .jv-code {
    .jv-toggle {
      &:before {
        padding: 0px 2px;
        border-radius: 2px;
      }
      &:hover {
        &:before {
          background: transparent;
        }
      }
    }
  }
}
</style>
