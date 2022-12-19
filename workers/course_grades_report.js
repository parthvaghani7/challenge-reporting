const { parentPort } = require("worker_threads")
const gradesData = require('../grades.json')

const getMin = (data) => {
  return data.reduce((acc, value) => Math.min(acc, value))
}

const getMax = (data) => {
  return data.reduce((acc, value) => Math.max(acc, value))
}

const getAverage = (data) => {
  return data.reduce((acc, value) => (acc + value)) / data.length
}

const getGradesData = async () => {
  const courses = [...new Set(gradesData.map(item => item.course))]

  const data = courses.map(course => {
    const uGrade = gradesData
      .filter(item => item.course === course)
      .map(item => item.grade)
    const minGrade = getMin(uGrade)
    const maxGrade = getMax(uGrade)
    const avgGrade = getAverage(uGrade)

    return {
      course,
      minGrade,
      maxGrade,
      avgGrade,
    }
  })

  return data
}
  
(async () => {
  const data = await getGradesData()
  parentPort.postMessage(data)
})()
