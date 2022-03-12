
<template>
  <div>
    <v-simple-table >
      <template slot="default">
        <tr>
          <td>
            <v-flex v-for="(e,index) in entries" :key="index">
              <v-checkbox :label="index" v-model="chosenEntries" :value="index" @change="$emit('chosen-changed',chosenEntries)"> </v-checkbox>
              <span v-for="(f,index) in fields" :key="index">{{e[f]}} </span>
            </v-flex>
          </td>
        </tr>
      </template>
    </v-simple-table>
  </div>
</template>
<script>

export default {
  name: 'CheckedList',
  props: ['entries','fields'],
  data : () => {
    return {
      chosenEntries:[]
    }
  }
}
</script>

<style scoped>
</style>
