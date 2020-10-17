<template>
      <vs-popup id="scroll-popup-list" class="" :title="title" :active.sync="isActive">
            <div style="overflow-x: hidden; overflow-y: auto; height: 300px;" class="hide-scroll">
                  <table class="w-full">
                        <tr v-for="(item,index) in list" :key="index">
                              <td class="w-full">
                                    <h5>ListItem <vs-button class="ml-24" type="border" size="small" @click="showDetails(index)">details</vs-button></h5>
                                    <div v-if="isDetails && index == currentDetail" class="mt-5" style="height: 30px">
                                          <slot></slot>
                                    </div>
                                    <vs-divider v-if="i != 10" class="w-full"/>
                              </td>
                        </tr>
                  </table>
            </div>
      </vs-popup>
</template>

<script>
export default {
      props:['isActive','title','list'],
      data() {
            return {
                  isDetails: false,
                  currentDetail: 0
            }
      },
      methods: {
            showDetails(index){
                  this.currentDetail = index
                  this.isDetails = true
            }
      },
}
</script>

<style>
      #scroll-popup-list .vs-popup{
            width:280px;
            height: 380px;
      }
      .hide-scroll::-webkit-scrollbar {
            width: 0px;
            background: transparent; /* make scrollbar transparent */
      }
</style>