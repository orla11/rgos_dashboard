<template>
      <vx-card class="mt-3" title="Permissions">
            <app-permissions-card-list></app-permissions-card-list>
            <app-edit-permission-popup></app-edit-permission-popup>
      </vx-card>
</template>

<script>
import PermissionsCardList from './PermissionsCardList.vue'
import EditPermissionPopup from './permission-edit/EditPermissionPopup.vue'

export default {
      props:['permissions'],
      components: {
            'app-permissions-card-list':PermissionsCardList,
            'app-edit-permission-popup':EditPermissionPopup
      }
}
</script>