<template>
      <vx-card>
            <!-- <div slot="no-body">
                  <img src="../../assets/images/accesses/placeholder.png" alt="content-img" class="responsive card-img-top" style="height: 4%">
            </div> -->

            <vs-icon icon="perm_identity" size="medium"></vs-icon>

            <h5 class="mb-2">{{ access.first_name | title }}</h5>
            <h5 class="mb-2">{{ access.last_name  | title }}</h5>

            <p class="text-primary" v-if="access.group != ''">{{ groupName }}</p>
            <p v-else class="text-danger">No Group</p>

            <p class="text-warning">Permissions: {{ access.permissions.length }}</p>

            <div class="flex justify-between flex-wrap text-center">
                  <vs-button @click.stop="goToDetails" size="small" icon-pack="feather" icon="icon-eye" class="mt-4 w-full" color="primary">Details</vs-button>
                  <vs-button @click="deleteAccess" size="small" icon-pack="feather" icon="icon-trash" class="mt-4 w-full" color="danger">Delete</vs-button>
            </div>
      </vx-card>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
      props:['access'],
      methods: {
            ...mapGetters('group',{
                  getGroups: 'groups'
            }),
            deleteAccess(){
                  this.$emit('confirmAccessItemDeletion',this.access)
            },
            getRandomInt(max) {
                  return Math.floor(Math.random() * Math.floor(max)) + 1;
            },
            goToDetails(){
                  this.$router.push(this.access._id + '/details')
            }
      },
      computed: {
            getRandomImg(){
                  return "../../assets/images/portrait/small/avatar-s-" + this.getRandomInt(26) + ".jpg"
            },
            groupName(){
                  let group = this.getGroups().find(el => el._id == this.access.group)
                  return group.name
            }
      }
}
</script>

<style scoped>

</style>