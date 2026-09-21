<script setup>
import { ref, onMounted } from 'vue'
import { PokemonPinia } from '@/stores/Pinia_Pokemon.js'

const Pinia = PokemonPinia()
const nombreEquipo = ref('')

onMounted(async function () {
  await Pinia.cargarEquiposDeBD()
})

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

function quitar(pokemon) {
  Pinia.quitarPokemon(pokemon.id)
}

async function guardar() {
  const ok = await Pinia.guardarEquipoEnBD(nombreEquipo.value)
  if (ok) {
    nombreEquipo.value = ''
  }
}

function usarEquipo(equipo) {
  Pinia.cargarEquipoGuardado(equipo)
}

function listaPokemones(equipo) {
  let lista = equipo.pokemones
  if (typeof lista === 'string') {
    lista = JSON.parse(lista)
  }
  return lista
}
</script>

<template>
  <aside class="panel equipo">
    <div class="titulo-seccion">
      <h2>Equipo personal</h2>
      <p>{{ Pinia.seleccionados.length }} / 6 pokemones</p>
    </div>

    <p v-if="Pinia.mensaje" class="aviso">{{ Pinia.mensaje }}</p>

    <p v-if="Pinia.seleccionados.length === 0" class="aviso">
      Todavia no elegiste ningun pokemon
    </p>

    <ul class="lista-equipo">
      <li v-for="i in Pinia.seleccionados" :key="i.id">
        <img :src="i.imagen" :alt="i.nombre">
        <div>
          <strong>{{ capitalizar(i.nombre) }}</strong>
          <small>{{ i.tipos.map(capitalizar).join(', ') }}</small>
        </div>
        <button type="button" class="btn-quitar" @click="quitar(i)">Quitar</button>
      </li>
    </ul>

    <form class="form-guardar" @submit.prevent="guardar">
      <label>
        Nombre del equipo
        <input type="text" v-model="nombreEquipo" placeholder="ej: equipo kanto" required>
      </label>
      <button type="submit" class="btn-guardar" :disabled="Pinia.seleccionados.length === 0">
        Guardar equipo
      </button>
    </form>

    <div class="equipos-bd">
      <h3>Equipos guardados</h3>
      <p v-if="!Pinia.backendOk" class="aviso">
        No esta conectado el backend, tenes que levantar mysql y poner node server.js
      </p>
      <p v-else-if="Pinia.equiposGuardados.length === 0" class="aviso">
        No hay equipos guardados todavia
      </p>
      <article v-for="equipo in Pinia.equiposGuardados" :key="equipo.id" class="equipo-guardado">
        <div>
          <strong>{{ equipo.nombre }}</strong>
          <small>
            {{ listaPokemones(equipo).map(function (p) { return capitalizar(p.nombre) }).join(', ') }}
          </small>
        </div>
        <button type="button" @click="usarEquipo(equipo)">Usar</button>
      </article>
    </div>
  </aside>
</template>
