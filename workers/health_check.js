const { parentPort } = require("worker_threads")
const knex = require('../db')

const getHealth = () => {
  return knex('students').first()
}

(async () => {
  const data = await getHealth()
  parentPort.postMessage(data)
})()
