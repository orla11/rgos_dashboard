<template>
            <div v-if="!isLoggingIn" class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              
              <div class="p-8 login-tabs-container">

                <div class="vx-card__title mb-4" v-if="!isLoggingIn">
                  <div class="flex mb-4">
                    <div class="w-3/4">
                      <h4 class="mb-4">Login</h4>
                      <p>Please login to your account.</p>
                    </div>
                    <div class="w-1/4">
                      <img class="xl:invisible lg:invisible" src="@/assets/images/logo/rgos-full.png" alt="logo-login" style="width:100%">
                    </div>
                  </div>
                </div>

                <div class="mt-8" v-if="!isLoggingIn">
                  <validation-provider name="username" rules="email" v-slot="{errors}">
                    <vs-input
                      name="username"
                      icon-no-border
                      icon="icon icon-user"
                      icon-pack="feather"
                      label-placeholder="Username"
                      v-model="username"
                      class="w-full"
                      @keyup.enter.native="login" />
                      <span class="text-danger text-sm">{{ errors[0] }}</span>
                  </validation-provider>
                  

                  <vs-input
                      type="password"
                      name="password"
                      icon-no-border
                      icon="icon icon-lock"
                      icon-pack="feather"
                      label-placeholder="Password"
                      v-model="password"
                      class="w-full mt-8"
                      @keyup.enter.native="login" />

                  <div class="flex flex-wrap justify-between my-5">
                    <span class="md:flex items-center mt-3">
                        <span>Made with</span>
                        <feather-icon icon="CoffeeIcon" svgClasses="stroke-current text-warning w-6 h-6" class="ml-2 mr-2" />
                        <span>by <a href="https://orla.dev" target="_blank">orla.dev</a></span>
                    </span>
                    <!-- <vs-checkbox v-model="checkbox_remember_me" class="mb-3" >Remember Me</vs-checkbox> -->
                    <vs-button class="float-right mt-2" @click="login" :disabled="username == '' || password == ''">Login</vs-button>
                    <!-- <router-link to="">Forgot Password?</router-link> -->
                  </div>
                </div>

              </div>
            </div>
</template>

<script>
import { EventBus } from '../../../main'
import { ValidationProvider } from 'vee-validate'

export default{
  data() {
    return {
      username: "",
      password: "",
      checkbox_remember_me: false,
      isLoggingIn: false
    }
  },
  methods: {
    login(){
      const authData = {
        username: this.username,
        password: this.password
      }

      this.hideForm()
      this.emitLoggingInEvent()
      this.openLoginLoader()

      setTimeout(() => {
        this.$store.dispatch('systemUser/login', authData)
          .catch(error => { this.generateLoginError(error)})
          this.closeLoginLoader()
          this.emitLoggingInErrorEvent()
      }, 2000)
      
    },
    generateLoginError(error){
      let errorMessage = "Unknown"
      if(error.code == 400 || 500){
        if(this.checkInvalidPasswordOrEmailError(error)){
          errorMessage = "Invalid Username or Password"
        }else{
          errorMessage = error.message
        }
      }

      this.showForm()
      this.notifyError("ERROR WHILE AUTHENTICATING",errorMessage)
    },
    checkInvalidPasswordOrEmailError(error){
      return error.message === "INVALID_PASSWORD" || "EMAIL_NOT_FOUND"
    },
    openLoginLoader(){
      this.$vs.loading({color: 'primary'})
    },
    closeLoginLoader(){
      this.$vs.loading.close()
    },
    resetForm(){
      this.username = this.password = ''
    },
    hideForm(){
      this.isLoggingIn = true;
    },
    showForm(){
      this.isLoggingIn = false;
    },
    notifyError(title,text){
      this.$vs.notify({
            title,
            text,
            color:"danger",
            position:'top-center',
            time: 8000
      })
    },
    emitLoggingInEvent(){
      EventBus.$emit('loggingIn')
    },
    emitLoggingInErrorEvent(){
      EventBus.$emit('loggingInError')
    }
  },
  components: {
    ValidationProvider
  }
}
</script>