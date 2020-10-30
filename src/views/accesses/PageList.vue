<template>
      <div>
            <div class="search-page__search-bar flex items-center">
                  <vs-input icon-no-border placeholder="Search" v-model="searchQuery" class="w-full input-rounded-full" icon="icon-search" icon-pack="feather" />
                  <v-select id="style-select-bg" @input="filterByGroup" class="w-full ml-32" :reduce="group => group.id" v-model="selectedGroupFilter" :options="groups" placeholder="Filter Group"></v-select>
                  <vs-button @click="openNewAccessPopup" class="ml-32" style="width: 50%" color="primary" type="border" icon-pack="feather" icon="icon-plus">Add New</vs-button>
                  <vs-pagination :total="pageCount" v-model="currentPage"></vs-pagination>
            </div>
            
            <vs-progress :height="2" indeterminate v-if="isSearching" :color="'#fff'" class="mb-8 mt-4" />
            <vs-divider border-style="dotted" v-if="!isSearching" color="primary" class="mb-8"/>

            <div class="vx-row">
                  <div v-for="(access,index) in itemsForList" :key="index" class="vx-col w-full sm:w-1/3 lg:w-1/5 mb-base">
                        <app-access :access="access" @confirmAccessItemDeletion="confirmDeleteAccess"></app-access>
                  </div>
            </div>
      </div>
</template>

<script>
import Item from './Item.vue'
import {mapGetters} from 'vuex'
import vSelect from 'vue-select'
import { EventBus } from '../../main';

const kDebounceTimeoutMs = 1000;

export default {
      static: {
            visibleItemsPerPageCount: 10
      },
      data() {
            return {
                  accesses: [],
                  groups: [],

                  currentPage: 1,
                  pageCount: 0,

                  searchQuery: '',
                  isSearching: false,
                  debounceTimeout: null,
                  selectedGroupFilter: ''
            }
      },
      watch: {
            searchQuery: function(query) {
                  if(this.debounceTimeout){
                        clearTimeout(this.debounceTimeout);
                  }
                  this.setSearchStatus(true)
                  this.setDebounceTimeOut(this.searchTimeout())
            }
      },
      methods: {
            openNewAccessPopup(){
                  EventBus.$emit('NewAccessPopup')
            },
            confirmDeleteAccess(access){
                  this.$vs.dialog({
                        type: 'confirm',
                        color: 'danger',
                        title: 'ACCESS DELETION',
                        text: 'IF YOU DELETE THIS ACCESS, ALL THE ASSOCIATED PERMISSIONS WILL BE DELETED AS WELL. PROCEED?',
                        accept: this.deleteAccessAndNotify,
                        parameters:[access]
                  },)
            },
            deleteAccessAndNotify(parameters){
                  this.processPermissionsDeletion(parameters[0])
                  this.dispatchAccessDeletion(parameters[0])
                  this.notify("Success","The access has been deleted successfully","success")
            },
            processPermissionsDeletion(access){
                  access.permissions.forEach(el => {
                              this.$store.dispatch('permission/deletePermission',{
                              access_id: access._id, 
                              permission_id: el
                        })
                  })
            },
            dispatchAccessDeletion(access){
                  this.$store.dispatch('access/deleteAccess',access._id)
            },
            ...mapGetters('access',{
                  getAccesses: 'accesses'
            }),
            ...mapGetters('group',{
                  getGroups: 'groups'
            }),
            searchTimeout(){
                  setTimeout(() => {
                        this.setAccesses(this.filterAccesses())
                        this.setPageCount(this.computePageCount())
                        this.setSearchStatus(false)
                  },kDebounceTimeoutMs)
            },
            notify(title,text,color){
                  this.$vs.notify({
                        title,
                        text,
                        color,
                        position:'top-right',
                        time: 2000
                  })
            },
            filterAccesses(){
                  return this.getAccesses().filter((el) => el.first_name.toLowerCase().includes(this.searchQuery.toLowerCase()) 
                                                           || el.last_name.toLowerCase().includes(this.searchQuery.toLowerCase()));
            },
            filterByGroup() {
                  if(this.checkNoGroupFilter()){
                        this.setAccesses(this.getAccesses().filter(el => el.group == ''))
                  }else if(this.selectedGroupFilter){
                        this.setAccesses(this.getAccesses().filter(el => el.group == this.selectedGroupFilter))
                  }else{
                        this.setAccesses(this.getAccesses())
                  }
                  this.setPageCount(this.computePageCount())
            },
            checkNoGroupFilter(){
                  return this.selectedGroupFilter == 0
            },
            computePageCount(){
                  return Math.ceil(this.accesses.length / this.$options.static.visibleItemsPerPageCount)
            },
            setPageCount(value){
                  this.pageCount = value
            },
            setSearchStatus(value){
                  this.isSearching = value
            },
            setAccesses(value){
                  this.accesses = value
            },
            setDebounceTimeOut(value){
                  this.debounceTimeout = value
            },
            addToGroups(value){
                  this.groups.push(value)
            }
      },
      computed: {
            itemsForList() {
                  return this.accesses.slice(
                        (this.currentPage - 1) * this.$options.static.visibleItemsPerPageCount,
                        this.currentPage * this.$options.static.visibleItemsPerPageCount
                  );
            }
      },
      components:{
            appAccess: Item,
            'v-select':vSelect
      },
      mounted() {
            this.setPageCount(this.computePageCount())
      },
      created(){
            this.setAccesses(this.getAccesses())
            this.getGroups().forEach(el => { 
                  this.addToGroups({id: el._id, label: el.name}) 
            })
            this.addToGroups({id: 0, label: 'No Group'})

            EventBus.$on('accessDeleted',(access) => {
                  this.processPermissionsDeletion(access)
                  this.dispatchAccessDeletion(access)
                  this.notify("Success","The access has been deleted successfully","success")
                  EventBus.$off('accessDeleted')
            })
      }
}
</script>

<style>
      #style-select-bg .vs__dropdown-toggle {
            background: #221e3a !important;
      }
</style>