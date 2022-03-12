import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // déclaration des variables
    viruses: [],
    parts: [],
    samples: [],
    basket: []
  },
  mutations: {
    addVirusToBasket(state,virus){
      state.basket.push(virus)
    },
    addBasketToSamples(state){
      state.samples = [...state.basket]
      state.basket.splice(0,state.basket.length)

    }

  },
  getters: {
    getViruses:(state) =>{
      return state.viruses
    },
    getParts:(state)=>{
      return state.parts
    },
    getBasket:(state) => {
      return state.basket
    },
    getSamples:(state)=>{
      return state.samples
    }

  },
  actions: {
  },
  modules: {
  }
})
