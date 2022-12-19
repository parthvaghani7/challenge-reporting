const { workerData, parentPort } = require("worker_threads")
const knex = require('../db')
const gradesData = require('../grades.json')

const getStudentGrades = async () => {
  const { id } = workerData

  const student = await knex('students')
    .where({ id })
    .first()

  const grades = gradesData.filter(grade => grade.id == id)

  return {
    student,
    grades
  }
}

(async () => {
  const data = await getStudentGrades()
  parentPort.postMessage(data)
})()
