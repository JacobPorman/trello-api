// const express = require('express')
import express from 'express'

const app = express()

const hostname = 'localhost'
const port = 3000

app.get('/', (req, res) => {
  res.send('<h1>Trello API Server is running</h1>')
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})