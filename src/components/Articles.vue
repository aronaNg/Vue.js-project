<template>
  <div>
    <v-simple-table :style="{backgroundColor:'#00B0FF'}">
      <tr><td>Name</td><td>Code</td><td>% Mortality</td></tr>
      <tr v-for="(v,index) in collec" :key="index"><td>{{v.name}}</td><td>{{v.code}}</td><td>{{v.mortalite}}</td><td> <v-btn :style="{backgroundColor:'#01579B', color:'#FFF'}" elevation="5" large @click="$router.push({path: '/library/addbasket?name='+v.name+'&code='+v.code})">Clone virus for the lab</v-btn></td></tr>
    </v-simple-table>
  </div>
</template>

<script>

  export default {
    name: 'Articles',
    props: ['collec']
  }
</script>

<style scoped>
</style>
