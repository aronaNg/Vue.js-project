
<template>
  <div>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <h2 class="lime accent-4 black--text display-2" >In my basket :</h2>
    <v-simple-table class="container" light :style="{backgroundColor: '#90A4AE'}" >
      <template v-slot:default>
        <tr><td>Name</td><td>Code</td><td>% Mortality</td></tr>
          <tr v-for="(v,index) in basket" :key="index">
            <td>{{v.name}}</td><td>{{v.code}}</td><td>{{v.mortalite}}</td>
          </tr>
      </template>
    </v-simple-table>
    <v-btn :style="{backgroundColor:'#01579B', color:'#FFF'}" @click="sendToLab">
        Send To Lab
    </v-btn>
  </div>
</template>

<script>

  import {Virus} from "../model";
  import { mapMutations } from 'vuex'


  export default {

    name: 'Basket',
    props: ['operation','name','code'],
    data : () => {
      return {
        virus: new Virus(0,this.name,this.code)
      }
    },
    methods: {
      ...mapMutations({
        sendToLab: 'addBasketToSamples'
      })
      ,
      ...mapMutations([
          'addVirusToBasket'
      ])
    },
    computed: {
      basket(){
        return this.$store.getters.getBasket
      }

    },

    watch: {
      operation(to) {
        if (to == 'addbasket') {
          this.basket.push(new Virus(0,this.name, this.code))
          this.$router.push({path:'/library/view'})
        }
      }
    }
  }
</script>

<style scoped>
</style>
