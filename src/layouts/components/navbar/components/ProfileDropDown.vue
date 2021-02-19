<template>
  <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo">

    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ activeUserInfo.name | title}}</p>
      <small>Logged In</small>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

      <div class="con-img ml-3">
        <img key="onlineImg" src="@/assets/images/user/admin.png" alt="user-img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block" />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">

          <!-- <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="saveData"> -->
            <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="SaveIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Save Data</span>
          </li>

          <!-- <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="loadData"> -->
            <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="DownloadCloudIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Load Data</span>
          </li>

          <vs-divider class="m-1" />

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="navigateTo({name:'account'})">
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Account</span>
          </li>

          <!-- <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="MailIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Inbox</span>
          </li>

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Tasks</span>
          </li>

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="MessageSquareIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Chat</span>
          </li>

          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="HeartIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Wish List</span>
          </li> -->

          <vs-divider class="m-1" />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import axios from '../../../../axios'
import shared from '../../../../shared'

export default {
  computed: {
    activeUserInfo () {
      return !this.$store.getters['systemUser/user']? false : this.$store.getters['systemUser/user']
    }
  },
  methods: {
    logout () {
      this.openLogoutLoader()
      setTimeout(() => {
        this.$store.dispatch('systemUser/logout')
        this.$vs.loading.close()
      },2000)
    },
    openLogoutLoader(){
      this.$vs.loading({color: 'primary'})
    },
    navigateTo(route){
      this.$router.push(route)
    },
    loadData(){
      const token = this.$store.getters['systemUser/token']
      if(!token) return

      this.openDataLoader()

      axios
			.get('/users/' + this.activeUserInfo.user_key + '/data.json?auth=' + token)
			.then(res => {

        setTimeout(() => { 
          this.dispatchLoadData(res.data)
          this.closeDataLoader()
          this.notify("Data Loaded","Data succesfully loaded.","success")
        },3000)
        
        this.$router.replace({name: 'home'})
      })
      .catch(err => {this.axiosTokenErrorCatcher(err)})
    },
    dispatchLoadData(data){
      this.$store.dispatch('group/loadData', this.prepareDataAfterLoad(data.groups,false));
      this.$store.dispatch('sensor/loadData', data.sensors);
      this.$store.dispatch('access/loadData', this.prepareDataAfterLoad(data.accesses,true));
      this.$store.dispatch('permission/loadData', this.prepareDataAfterLoad(data.permissions,false));
      this.$store.dispatch('log/loadData', this.prepareDataAfterLoad(data.logs,false));
    },
    saveData(){
      const payload = this.preparePayload()
      const token = this.$store.getters['systemUser/token']

      this.openDataLoader()

      axios.patch('users/' + this.activeUserInfo.user_key + '.json?auth=' + token, payload)
        .then(res => {
          setTimeout(() => {
            this.closeDataLoader()
            this.notify("Data Saved","Data succesfully saved, you can load it whenever you want.","success")
          },3000)
        })
        .catch(err => {this.axiosTokenErrorCatcher(err)})
    },
    preparePayload(){
      return {
        data: {
          groups: this.prepareDataBeforeSaving(this.$store.getters['group/groups']),
          sensors: this.$store.getters['sensor/sensors'],
          permissions: this.prepareDataBeforeSaving(this.$store.getters['permission/permissions']),
          logs: this.prepareDataBeforeSaving(this.$store.getters['log/logs']),
          accesses: this.prepareDataBeforeSaving(this.$store.getters['access/accesses']),
        }
      }
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
    openDataLoader(){
      this.$vs.loading({color: 'primary'})
    },
    closeDataLoader(){
      this.$vs.loading.close()
    },
  },
  
  created(){
    this.prepareDataBeforeSaving = shared.prepareDataBeforeSaving
    this.prepareDataAfterLoad = shared.prepareDataAfterLoad
    this.axiosTokenErrorCatcher = shared.axiosTokenErrorCatcher
    this.$store.dispatch('systemUser/fetchUser')
  }
}
</script>
