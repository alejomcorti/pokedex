import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const API_BACKEND = 'http://localhost:3000'

export const PokemonPinia = defineStore('pokemonStore', () => {
  const listaPokemon = ref([])
  const seleccionados = ref([])
  const equipoPersonal = seleccionados
  const equiposGuardados = ref([])
  const busqueda = ref('')
  const cargando = ref(false)
  const mensaje = ref('')
  const backendOk = ref(false)

  const pokemonFiltrados = computed(() => {
    const texto = busqueda.value.toLowerCase()
    if (texto == '') {
      return listaPokemon.value
    }
    return listaPokemon.value.filter(function (pokemon) {
      return pokemon.nombre.toLowerCase().includes(texto)
    })
  })

  function estaEnEquipo(id) {
    return seleccionados.value.some(function (pokemon) {
      return pokemon.id === id
    })
  }

  async function cargarListaPokemon() {
    cargando.value = true
    mensaje.value = ''
    try {
      const respuesta = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      const listaBasica = respuesta.data.results
      console.log(listaBasica)

      const detalles = await Promise.all(
        listaBasica.map(async function (poke) {
          const detalle = await axios.get(poke.url)
          return {
            id: detalle.data.id,
            nombre: detalle.data.name,
            imagen: detalle.data.sprites.front_default,
            tipos: detalle.data.types.map(function (item) {
              return item.type.name
            }),
            habilidades: detalle.data.abilities.map(function (item) {
              return item.ability.name
            })
          }
        })
      )

      listaPokemon.value = detalles
    } catch (error) {
      mensaje.value = 'No se pudieron cargar los pokemones, fijate internet'
      console.log(error)
    }
    cargando.value = false
  }

  function guardarPokemon(pokemon) {
    if (estaEnEquipo(pokemon.id)) {
      return
    }
    if (seleccionados.value.length >= 6) {
      mensaje.value = 'Ya tenes 6 pokemones, saca uno para poner otro'
      return
    }
    seleccionados.value.push(pokemon)
    mensaje.value = ''
  }

  function quitarPokemon(id) {
    seleccionados.value = seleccionados.value.filter(function (pokemon) {
      return pokemon.id !== id
    })
    mensaje.value = ''
  }

  async function guardarEquipoEnBD(nombreEquipo) {
    if (!nombreEquipo || seleccionados.value.length === 0) {
      mensaje.value = 'Ponele un nombre y eligi algun pokemon'
      return false
    }

    const nuevoEquipo = {
      nombre: nombreEquipo,
      pokemones: seleccionados.value
    }

    try {
      const respuesta = await axios.post(API_BACKEND + '/api/guardar', nuevoEquipo)
      if (respuesta.data.success) {
        backendOk.value = true
        mensaje.value = 'Se guardo el equipo en la base'
        await cargarEquiposDeBD()
        return true
      }
      mensaje.value = 'No se pudo guardar el equipo'
      return false
    } catch (error) {
      mensaje.value = 'No conecta el backend, fijate si esta el puerto 3000'
      console.log(error)
      return false
    }
  }

  async function cargarEquiposDeBD() {
    try {
      const respuesta = await axios.get(API_BACKEND + '/api/listado')
      equiposGuardados.value = respuesta.data
      backendOk.value = true
    } catch (error) {
      equiposGuardados.value = []
      backendOk.value = false
      console.log('no anda el get')
    }
  }

  function cargarEquipoGuardado(equipo) {
    let lista = equipo.pokemones
    if (typeof lista === 'string') {
      lista = JSON.parse(lista)
    }
    seleccionados.value = lista
    mensaje.value = 'Cargue el equipo ' + equipo.nombre
  }

  return {
    listaPokemon,
    seleccionados,
    equipoPersonal,
    equiposGuardados,
    busqueda,
    cargando,
    mensaje,
    backendOk,
    pokemonFiltrados,
    estaEnEquipo,
    cargarListaPokemon,
    guardarPokemon,
    quitarPokemon,
    guardarEquipoEnBD,
    cargarEquiposDeBD,
    cargarEquipoGuardado
  }
})
