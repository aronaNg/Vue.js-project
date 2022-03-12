<template>
  <div>
    <h1>Labo</h1>
    <v-simple-table>
      <tr>
        <td><h1>Viruses</h1></td>
        <td><h1>Parts</h1></td>
      </tr>
      <tr>
        <td>
          <CheckedList :fields="['name','code']" :entries="samples" @chosen-changed="chosenViruses = $event" />
        </td>
        <td>
          <CheckedList :fields="['code']" :entries="parts" @chosen-changed="chosenParts = $event" />
        </td>

      </tr>
    </v-simple-table>
    <label for="cut">part length: </label><input id="cut" v-model.number="cutFactor"><button :disabled="chosenViruses.length==0" @click="cut()">Cut</button>
    <label for="mute">nb mutations: </label><input id="mute" v-model.number="nbMutation"><button :disabled="chosenViruses.length==0" @click="mutation()">Mutation</button>
    <button :disabled="chosenParts.length==0" @click="mix()">Mixing</button>

    <hr/>
    <p v-if="newVirus != null">New virus: <input v-model="newVirus.name"> {{newVirus.code}} {{newVirus.mortalite}}
    <button @click="$emit('store-virus',newVirus)">Send to library</button></p>
  </div>
</template>

<script>
  import {Virus, viruses} from '../model.js'
  import CheckedList from './CheckedList.vue'

  export default {
    name: 'Labo',
    //props: ['samples'],
    data : () => {
      return {
        chosenViruses:[],
        parts : [],
        chosenParts:[],
        cutFactor: 5,
        nbMutation : 10,
        newVirus: null
      }
    },
    components: {
      CheckedList
    },
    methods: {
      cut : function() {
        if (this.cutFactor == 0) return;
        this.chosenViruses.forEach(e => {
          let s = this.samples[e];
          for(let i=0;i<s.code.length;i+=this.cutFactor) {
            this.parts.push({code : s.code.substring(i,i+this.cutFactor)});
          }
        });
        // remove chosen viruses
        for(let i=this.chosenViruses.length-1;i>=0;i--) {
          this.samples.splice(this.chosenViruses[i],1);
        }
        // unselect all
        this.chosenViruses.splice(0,this.chosenViruses.length)
      },
      mutation : function() {
        if (this.nbMutation == 0) return;

        this.chosenViruses.forEach(e => {
          let newCode;
          let s = this.samples[e];
          for(let i=0;i<this.nbMutation;i++) {
            let idx = Math.floor(Math.random() * s.code.length);
            let chr =  String.fromCharCode(Math.floor(Math.random() * 4)+ "A".charCodeAt(0));
            newCode = s.code.substring(0,idx) + chr + s.code.substring(idx+1);
            s.code = newCode;
            s.updateCaracs();
          }
        });
      },
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
      }
    },
    computed: {
      samples(){ return this.$store.getters.getSamples}
    }
  }
</script>

<style scoped>
</style>
