<template>
      <vx-card title="" class="mb-base">
            <vs-upload multiple text="Select Video or Photo" action="" @on-success="successUpload" />
      </vx-card>
</template>

<script>
// TODO: implement and test upload process
// TODO: add editable gallery to remove pictures from access library
export default {
      methods: {
            successUpload(){
                  this.$vs.notify({
                        color:'success',
                        title:'Upload Success',
                        text:'Upload process successfully executed!'
                  })
            }
      }
}
</script>