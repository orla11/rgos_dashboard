<template>
    <vs-popup title="New Access" :active.sync="isActive">
        <div class="vx-row">
            <div class="vx-col sm:w-1/2 w-full mb-2">
                <vs-input class="w-full" label-placeholder="First Name" v-model="first_name"/>
            </div>
            <div class="vx-col sm:w-1/2 w-full mb-2">
                <vs-input class="w-full" label-placeholder="Last Name" v-model="last_name"/>
            </div>
        </div>
        <vs-button class="mt-8" color="success" type="filled" @click="createAccess">Create</vs-button>
    </vs-popup>
</template>

<script>
import { EventBus } from '../../main'
export default {
    data() {
        return {
            isActive: false,
            first_name: '',
            last_name: ''
        }
    },
    methods: {
        switchActiveStatus(){
            this.isActive = !this.isActive
        },
        createAccess(){
            let payload = {
                first_name: this.first_name,
                last_name: this.last_name
            }

            this.$store.dispatch('access/createAccess', payload)

            const access_id = this.getLastCreatedAccess()._id

            this.$router.push('/accesses/' + access_id + '/details')

            this.first_name = ''
            this.last_name = ''
            
            this.switchActiveStatus()
        },
        getLastCreatedAccess(){
            return this.$store.getters['access/accesses'][this.getAccessesLength() - 1]
        },
        getAccessesLength(){
            return this.$store.getters['access/accesses'].length
        }
    },
    created() {
        EventBus.$on('NewAccessPopup', () => {
            this.switchActiveStatus()
        })
    },
}
</script>