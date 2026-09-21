# Pokedex TP3 - Programacion III

Es una pokedex para armar un equipo de pokemones. Esta hecha con vue, pinia, axios y mysql.

## que hay que tener

- node
- mysql (nosotros usamos xampp)

## base de datos

1. abrir phpmyadmin
2. importar `backend/pokedex.sql`
3. tiene que quedar la base pokedex con la tabla equipos

si mysql tiene contraseña hay que ponerla en server.js en DB_PASSWORD

## backend

```
cd backend
npm install
node server.js
```

tiene que decir conectado a mysql. corre en el puerto 3000

## frontend

```
npm install
npm run dev
```

abrir http://localhost:5173

## como se usa

primero esperas que carguen los pokemones, despues podes buscarlos, clickeas para agregarlos al equipo (maximo 6) y le pones un nombre y lo guardas. si ya hay un equipo guardado podes tocarlo en usar.

## archivos

- src/components/Listado.vue
- src/components/PokemonCard.vue
- src/components/Equipo.vue
- src/stores/Pinia_Pokemon.js
- backend/server.js
