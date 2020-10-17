<template>
      <vs-list-item     :title="capitalize(sensor.name) + ' - ' + capitalize(sensor.status)"
                        :subtitle="sensor.access_area + ' (IPv4: ' + sensor.ip_addr + ')' "
                        icon="camera"
                        :style="getSensorStatusColor(sensor.status)"></vs-list-item>
</template>

<script>
export default {
      props: ['sensor'],
      methods: {
            capitalize(s){
                  if(typeof s == 'string') return s.charAt(0).toUpperCase() + s.slice(1);
            },
            getSensorStatusColor(status) {
                  if(status == "active") return {color: '#28C76F'}
                  if(status == "down") return {color: '#EA5455'}
                  if(status == "pending") return {color: '#E4B93A'}
                  if(status == "denying") return {color: '#7a80bf'}
            }
      }
}
</script>