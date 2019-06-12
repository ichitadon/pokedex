var app = new Vue({
    el: '#app',
    data : {
      input_poledex_num: "pikachu",
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
      color: null,
      pokemon_jp_dict: null,
      find_result: null
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
      },
      findBy: function (list, value, column) {
        return list.filter(function (item) {
            return (item[column] == value)
        })
      },
      getPokemon_dict: function() {
        new Promise((resolve, reject) => {
          axios
            .get('https://raw.githubusercontent.com/kotofurumiya/pokemon_data/master/data/pokemon_data.json')
            .then(response => {
              this.pokemon_jp_dict = response.data,
              resolve()
            })
        })
      },
      getPokemonIdbyName: function() {
        this.find_result = this.findBy(this.pokemon_jp_dict, this.select_pokedex_num, 'name')
        if (this.find_result.length != 0) {
          return this.find_result[0].no
        } else {
          return this.select_pokedex_num
        }
      },
      showPokemonInfo: function() {
        this.select_pokedex_num = this.input_poledex_num
        this.select_pokedex_num = this.getPokemonIdbyName()
        this.getPokemon()
        this.getPokemon_species()
      }
    },
    mounted: function() {
      this.getPokemon()
      this.getPokemon_species()
      this.getPokemon_dict()
    }
});