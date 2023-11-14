import request from 'superagent'

const apiURL = '/api/v1/'

export async function getAllEmployeeVineCounts() {
  const res = await request.get(`${apiURL}/counts`)
  return res.body
}

export async function getAllFarms() {
  const res = await request.get(`${apiURL}/farms`)
  return res.body
}

export async function addFarm(farm) {
  const res = await request.post(`${apiURL}/farms`).send(farm)
  return res
}
