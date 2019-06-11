var app = new Vue({
    el: '#app',
    data : {
      select_pokedex_num: "pikachu",
      display_pokedex_num: null,
      name: null,
      types: [],
      height: null,
      weight: null,
      abilities: [],
      json:null,
      front_default: null,
      back_default: null,
      color: null
    },
    methods: {
      getPokemon: function() {
        new Promise((resolve, reject) => {
          axios
            .get('https://pokeapi.co/api/v2/pokemon/' + this.select_pokedex_num)
            .then(response => {
              this.json = response.data,
              this.display_pokedex_num = response.data.id,
              this.name = response.data.name,
              this.types = response.data.types,
              this.height = response.data.height,
              this.weight = response.data.weight,
              this.front_default = response.data.sprites.front_default,
              this.back_default = response.data.sprites.back_default,
              this.abilities = response.data.abilities
              resolve()
            })
        })
      },
      getPokemon_species: function() {
        new Promise((resolve, reject) => {
          axios
            .get('https://pokeapi.co/api/v2/pokemon-species/' + this.select_pokedex_num)
            .then(response => {
              this.color = response.data.color.name,
              resolve()
            })
        })
      }
    },
    mounted: function() {
      this.getPokemon()
      this.getPokemon_species()
    }
});
