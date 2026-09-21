<script setup>
import { computed, onMounted } from 'vue'
import { PokemonPinia } from '@/stores/Pinia_Pokemon.js'
import PokemonCard from './PokemonCard.vue'

const Pinia = PokemonPinia()

const ListadoPokemon = computed(() => Pinia.pokemonFiltrados)

onMounted(async function () {
  if (Pinia.listaPokemon.length === 0) {
    await Pinia.cargarListaPokemon()
  }
})

function elegir(i) {
  if (Pinia.estaEnEquipo(i.id)) {
    Pinia.quitarPokemon(i.id)
  } else {
    Pinia.guardarPokemon(i)
  }
}
</script>

<template>
  <section class="panel listado">
    <div class="titulo-seccion">
      <h2>Listado de Pokemones</h2>
      <p>Hace click en la tarjeta para sumarlo o sacarlo del equipo</p>
    </div>

    <input
      class="buscador"
      type="text"
      placeholder="Buscar pokemon por nombre..."
      v-model="Pinia.busqueda"
    >

    <p v-if="Pinia.cargando" class="aviso">Cargando los 151 pokemones...</p>

    <p v-else-if="ListadoPokemon.length === 0" class="aviso">
      No se encontraron pokemones con ese nombre
    </p>

    <div v-else class="grilla">
      <PokemonCard
        v-for="i in ListadoPokemon"
        :key="i.id"
        :pokemon="i"
        :seleccionado="Pinia.estaEnEquipo(i.id)"
        @elegir="elegir"
      />
    </div>
  </section>
</template>
