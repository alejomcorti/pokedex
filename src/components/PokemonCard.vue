<script setup>
const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  },
  seleccionado: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['elegir'])

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

function elegir() {
  emit('elegir', props.pokemon)
}
</script>

<template>
  <article class="tarjeta" :class="{ activa: seleccionado }" @click="elegir">
    <img :src="pokemon.imagen" :alt="pokemon.nombre">
    <p class="numero">#{{ String(pokemon.id).padStart(3, '0') }}</p>
    <h3>{{ capitalizar(pokemon.nombre) }}</h3>
    <div class="tipos">
      <span v-for="tipo in pokemon.tipos" :key="tipo" class="tipo" :class="'tipo-' + tipo">
        {{ capitalizar(tipo) }}
      </span>
    </div>
    <p class="habilidades">
      {{ pokemon.habilidades.map(capitalizar).join(', ') }}
    </p>
    <button type="button">
      {{ seleccionado ? 'Quitar del equipo' : 'Agregar al equipo' }}
    </button>
  </article>
</template>
