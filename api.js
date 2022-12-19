const knex = require('./db')
const { Worker } = require('worker_threads')

module.exports = {
  getHealth,
  getStudent,
  getStudentGradesReport,
  getCourseGradesReport
}

async function getHealth(req, res, next) {
  try {
    const worker = new Worker('./workers/health_check.js')
    worker.on('message', () => res.json({ success: true }))
    worker.on('error', () => res.status(500).end())
  } catch (e) {
    res.status(500).end()
  }
}

async function getStudent(req, res, next) {
  try {
    const { id } = req.params

    const worker = new Worker('./workers/student_data.js', { workerData: { id } })
    worker.on('message', (data) => res.json({ success: true, data }))
    worker.on('error', () => res.status(500).end())
  } catch (e) {
    res.status(500).end()
  }
}

async function getStudentGradesReport(req, res, next) {
  try {
    const { id } = req.params

    const worker = new Worker('./workers/student_grades_report.js', { workerData: { id } })
    worker.on('message', (data) => res.json({ success: true, ...data }))
    worker.on('error', () => res.status(500).end())
  } catch (e) {
    res.status(500).end()
  }
}

async function getCourseGradesReport(req, res, next) {
  try {
    const worker = new Worker('./workers/course_grades_report.js')
    worker.on('message', (data) => res.json({ success: true, data }))
    worker.on('error', () => res.status(500).end())
  } catch (err) {
    res.status(500).end()
  }
}
