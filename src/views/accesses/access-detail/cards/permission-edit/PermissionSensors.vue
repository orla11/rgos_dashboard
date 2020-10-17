<template>
  <div>
    <vs-list>
      <vs-list-header title="Available Sensors" color="primary"></vs-list-header>
      <draggable :list="sensors" group="sensors" class="p-2 cursor-move">
            <app-permission-sensor-list-item
                  v-for="(listItem, index) in sensors"
                  :sensor="listItem" 
                  :key="index"></app-permission-sensor-list-item>
      </draggable>
    </vs-list>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import {mapGetters} from 'vuex'
import SensorListItem from './SensorListItem.vue'

export default {
  props: ['sensors'],
  methods: {
      ...mapGetters('sensor',{
        getSensors: 'sensors'
      }),
  },
  created() {
        
  },
  components: {
    draggable,
    'app-permission-sensor-list-item': SensorListItem
  }
}
</script>

<style scoped>
</style>