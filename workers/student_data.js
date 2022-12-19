const { workerData, parentPort } = require("worker_threads")
const knex = require('../db')

const getStudent = async () => {
  const { id } = workerData

  return knex('students')
  .where({ id })
  .first()
}

(async () => {
  const data = await getStudent()
  parentPort.postMessage(data)
})()
