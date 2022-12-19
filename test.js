const tape = require('tape')
const jsonist = require('jsonist')

const port = (process.env.PORT = process.env.PORT || require('get-port-sync')())
const endpoint = `http://localhost:${port}`

const server = require('./server')

tape('health', async function (t) {
  const url = `${endpoint}/health`
  try {
    const { data, response } = await jsonist.get(url)
    if (response.statusCode !== 200) {
      throw new Error('Error connecting to sqlite database; did you initialize it by running `npm run init-db`?')
    }
    t.ok(data.success, 'should have successful healthcheck')
    t.end()
  } catch (e) {
    t.error(e)
  }
})

tape('student', async function (t) {
  const url = `${endpoint}/student/1`
  try {
    const { data, response } = await jsonist.get(url)
    if (response.statusCode !== 200) {
      throw new Error('Error while processing your request')
    }
    t.ok(data.success, 'should have student data')
    t.end()
  } catch (e) {
    t.error(e)
  }
})

tape('student_grades_report', async function (t) {
  const url = `${endpoint}/student/1/grades`
  try {
    const { data, response } = await jsonist.get(url)
    if (response.statusCode !== 200) {
      throw new Error('Error while processing your request')
    }
    t.ok(data.success, 'should have successful data')
    t.ok(data.student, 'should have the student data')
    t.ok(data.grades, 'should have the grades')

    t.end()
  } catch (e) {
    t.error(e)
  }
})

tape('coursewise_grades_report', async function (t) {
  const url = `${endpoint}/course/all/grades`
  try {
    const { data, response } = await jsonist.get(url)
    if (response.statusCode !== 200) {
      throw new Error('Error while processing your request')
    }
    t.ok(data.success, 'should have successful data')
    t.end()
  } catch (e) {
    t.error(e)
  }
})

tape('cleanup', function (t) {
  server.closeDB()
  server.close()
  t.end()
})
