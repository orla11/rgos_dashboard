<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color" id="login-area">

          <div class="vx-row no-gutter justify-center items-center" :class="{'animate-pulse':isLogginIn}">

            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.jpg" alt="login" class="mx-auto">
            </div>

            <app-login-form></app-login-form>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../../main'
import LoginForm from './components/LoginForm.vue'

export default{
  data() {
    return {
      isLogginIn: false
    }
  },
  created(){
    EventBus.$on("loggingIn", () => {
      this.isLogginIn = true
    })
    EventBus.$on("loggingInError", () => {
      this.isLogginIn = false
    })
    EventBus.$off("logginIn")
    EventBus.$off("logginError")
  },
  components: {
    appLoginForm: LoginForm
  }
}
</script>

<style lang="scss">
#page-login {
  background-image: none;
  background-color: #10163A;
}
#login-area {
  background-color: #262C49 !important;
}
</style>
