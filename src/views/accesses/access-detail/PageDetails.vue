<template>
      <div>
            <vs-row vs-align="flex-end" vs-type="flex" vs-justify="space-between" vs-w="12">
                  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                        <app-access-details :access="access"></app-access-details>
                  </vs-col>
            </vs-row>
            <vs-divider border-style="dotted" color="primary" class="mb-5"/>

            <vs-tabs alignment="fixed">
                  <vs-tab label="Permissions">
                        <app-access-permissions-card></app-access-permissions-card>
                  </vs-tab>
                  <vs-tab label="Group">
                        <app-access-group-card></app-access-group-card>
                  </vs-tab>
                  <vs-tab label="File Upload">
                        <app-access-upload-card></app-access-upload-card>
                  </vs-tab>
            </vs-tabs>
      </div>
</template>

<script>
import Details from './Details.vue'
import GroupCard from './cards/Group.vue'
import PermissionsCard from './cards/Permissions.vue'
import FileUploadCard from './cards/FileUpload.vue'

export default {
      data() {
            return {
                  group: null
            }
      },
      computed: {
            access(){
                  return this.$store.getters['access/accesses'].find(el => el._id == this.$route.params.id)
            }
      },
      components: {
            'app-access-details':Details,
            'app-access-group-card':GroupCard,
            'app-access-permissions-card':PermissionsCard,
            'app-access-upload-card':FileUploadCard
      }
}
</script>