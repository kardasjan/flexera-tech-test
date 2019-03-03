import { API_URL, PEOPLE_PATH } from "../constants/api"

export async function getPeople(payload) {
  const url = new URL(API_URL + PEOPLE_PATH);
  Object.keys(payload).forEach(key => url.searchParams.append(key, payload[key]))
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }

  return window.fetch(url, config)
    .then(response => {
      return response.json()
    })
    .then(data => {
      if (typeof data.code !== 'undefined') throw new Error(data.message)
      return data
    })

}

export async function addPerson(payload) {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }

  return window.fetch(API_URL + PEOPLE_PATH, config)
    .then(response => {
      return response.json()
    })
    .then(data => {
      if (typeof data.code !== 'undefined') throw new Error(data.message)
      return data
    })
}


export function deletePerson(payload) {
  const url = new URL(API_URL + PEOPLE_PATH);
  Object.keys(payload).forEach(key => url.searchParams.append(key, payload[key]))
  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }

  return window.fetch(url, config)
    .then(response => {
      if (response.status !== 204) throw new Error("Delete failed")
    })
}
