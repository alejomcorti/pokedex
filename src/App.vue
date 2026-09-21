<script setup>
import Listado from './components/Listado.vue'
import Equipo from './components/Equipo.vue'
</script>

<template>
  <div class="app">
    <header>
      <div>
        <p class="materia">Programacion III</p>
        <h1>Pokedex</h1>
      </div>
      <p class="subtitulo">Elegi tu equipo con vue, pinia y mysql</p>
    </header>

    <main>
      <Listado />
      <Equipo />
    </main>
  </div>
</template>
