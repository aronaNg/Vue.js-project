<template>
  <div>
    <v-simple-table :style="{background:'#009688', padding:50}">
      <tr>
        <td><h1>Parts</h1></td>
      </tr>
      <tr>
        <td>
          <CheckedList :fields="['code']" :entries="parts" @chosen-changed="chosenParts = $event" />
        </td>
      </tr>
    </v-simple-table>
    <v-btn :style="{background:'#004D40', color:'#FFF'}" :disabled="chosenParts.length==0" @click="mix()">Mixing</v-btn>

    <hr/>
    <v-btn :style="{background:'#00695C', color:'#FFF'}" @click="$router.push({path:'/labo/slice'})">Go to slicer</v-btn>

    <hr/>
    <p v-if="newVirus != null">New virus: <input v-model="newVirus.name"> {{newVirus.code}} {{newVirus.mortalite}}
    <v-btn :style="{backgroundColor:'#26A62A', color:'#FFF'}" @click="sendToLibrary">Send to library</v-btn>
    </p>

  </div>
</template>

<script>
  import {Virus, viruses} from '../model.js'
  import CheckedList from '../components/CheckedList.vue'

  export default {
    name: 'Mixer',
    data : () => {
      return {
        chosenParts:[],
        newVirus : null
      }
    },
    components: {
      CheckedList
    },
    methods: {
      mix : function() {
        let newCode="";

        let chosen = [...this.chosenParts]; // real copy so that we can splice on the copy
        let nb = chosen.length;
        for(let i=0;i<nb;i++) {
          // choose randomly a part among the selected ones
          let idx = Math.floor(Math.random() * chosen.length);
          let p = this.parts[chosen[idx]];
          newCode = newCode+p.code;
          chosen.splice(idx,1);
        }
        this.newVirus = new Virus(viruses.length,'mixedvirus',newCode);
        // remove chosen parts
        for(let i=this.chosenParts.length-1;i>=0;i--) {
          this.parts.splice(this.chosenParts[i],1);
        }
        // unselect all
        this.chosenParts.splice(0,this.chosenParts.length)
      },
      sendToLibrary : function() {
        this.$emit('store-virus',this.newVirus);
        this.newVirus = null;
      }
    },
    computed: {
      parts(){ return this.$store.getters.getParts}
    }
  }
</script>

<style scoped>
</style>
