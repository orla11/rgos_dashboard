<template>
    <div>
        <router-view></router-view>
        <new-access-popup></new-access-popup>
    </div>
</template>

<script>
import newAccessPopup from './newAccessPopup.vue'

export default {
    components: {
        newAccessPopup
    }
}
</script>