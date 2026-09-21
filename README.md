# Pokedex TP3 - Programacion III

Aplicacion para armar un equipo de pokemones. Vue.js, Pinia, Axios, PokeAPI y MySQL.

Repositorio: https://github.com/alejomcorti/pokedex

## requisitos

- node
- mysql (xampp o similar)

## como levantarlo

### 1. base de datos

Importar `backend/pokedex.sql` en phpMyAdmin. Tiene que quedar la base `pokedex` con la tabla `equipos`.

Si mysql tiene contraseña, ponerla en `backend/server.js` en `DB_PASSWORD`.

### 2. backend (puerto 3000)

```
cd backend
npm install
node server.js
```

tiene que decir `conectado a mysql`

### 3. frontend (puerto 5173)

```
npm install
npm run dev
```

abrir http://localhost:5173

## como se usa

esperas que carguen los 151 pokemones, podes buscarlos por nombre, clickeas la tarjeta para sumarlo o sacarlo del equipo (maximo 6) y le pones un nombre y lo guardas. los equipos quedan en mysql, se pueden volver a cargar con Usar.

## estructura

```
src/components/Listado.vue
src/components/PokemonCard.vue
src/components/Equipo.vue
src/stores/Pinia_Pokemon.js
backend/server.js
backend/pokedex.sql
```
