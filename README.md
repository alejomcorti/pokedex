# Pokedex TP3 - Programacion III

Aplicacion para armar un equipo de pokemones. Vue.js, Pinia, Axios, PokeAPI y MySQL.

Repositorio: https://github.com/alejomcorti/pokedex

## requisitos

- node
- git
- mysql (en la escuela, xampp)
- internet (para npm y para la pokeapi)

## como levantarlo en una pc nueva

### 1. bajar el proyecto

```
git clone https://github.com/alejomcorti/pokedex.git
cd pokedex
```

### 2. prender mysql

Abrir XAMPP y darle Start a MySQL. Tiene que quedar en verde.

### 3. crear la base

1. Abrir phpMyAdmin (http://localhost/phpmyadmin)
2. Importar el archivo `backend/pokedex.sql`
3. Tiene que quedar la base `pokedex` con la tabla `equipos`

La tabla se crea en ese momento, una sola vez. Despues, al guardar un equipo, solo se agregan filas.

Si mysql tiene contraseña, ponerla en `backend/server.js` en `DB_PASSWORD`. En xampp de la escuela a veces esta vacia.

### 4. backend (puerto 3000)

Abrir una terminal en la carpeta del proyecto:

```
cd backend
npm install
node server.js
```

Tiene que decir `conectado a mysql`. Esa terminal no se cierra.

### 5. frontend (puerto 5173)

Abrir otra terminal, volver a la carpeta del proyecto (no quedarse en backend):

```
cd ..
npm install
npm run dev
```

Abrir el link que aparece, http://localhost:5173

## como se usa

Esperar a que carguen los 151 pokemones. Se pueden buscar por nombre, clickear la tarjeta para sumarlo o sacarlo del equipo (maximo 6), ponerle un nombre y guardar. Los equipos quedan en mysql y se pueden volver a cargar con Usar.

## estructura

```
src/components/Listado.vue
src/components/PokemonCard.vue
src/components/Equipo.vue
src/stores/Pinia_Pokemon.js
backend/server.js
backend/pokedex.sql
```
