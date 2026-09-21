import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mysql from 'mysql2'

const app = express()
const PORT = 3000

// si xampp tiene contraseña ponganla aca
const DB_PASSWORD = ''

app.use(cors())
app.use(bodyParser.json())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: DB_PASSWORD,
  database: 'pokedex'
})

db.connect((err) => {
  if (err) {
    console.log('error al conectar mysql', err)
  } else {
    console.log('conectado a mysql')
  }
})

app.get('/api/listado', (req, res) => {
  db.query('SELECT * FROM equipos ORDER BY fecha_creacion DESC', (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err })
    res.json(results)
  })
})

app.post('/api/guardar', (req, res) => {
  const { nombre, pokemones } = req.body

  if (!nombre || !pokemones) {
    return res.json({ success: false, message: 'faltan datos' })
  }

  const sql = 'INSERT INTO equipos (nombre, pokemones) VALUES (?, ?)'
  db.query(sql, [nombre, JSON.stringify(pokemones)], (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ success: false })
    }
    res.json({ success: true, id: result.insertId })
  })
})

app.listen(PORT, () => console.log('servidor en http://localhost:' + PORT))
