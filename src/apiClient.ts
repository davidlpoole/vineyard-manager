import request from 'superagent'

const apiURL = '/api/v1/counts'

export async function getAllEmployeeVineCounts() {
  const res = await request.get(`${apiURL}`)
  return res.body
}
