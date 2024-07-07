export const domen = 'https://www.example.com/'
export const url = domen

export async function fetchRequest (Url: string, data: object = {}, token: string | null = null) {
  const header = new Headers()
  header.append('Content-Type', 'application/json')
  if (token) {
    header.append('Authorization', token)
  }
  try {
    const response = await fetch(url + 'api' + Url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(data)
    })
    const answer = await response.json()
    if (!response.ok) {
      return answer.message
    }

    return answer
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function fetchRequestString (Url: string, data: object = {}, token: string | null = null) {
  const header = new Headers()
  header.append('Content-Type', 'application/json')
  if (token) {
    header.append('Authorization', token)
  }
  try {
    const response = await fetch(url + 'api' + Url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(data)
    })
    const answer = await response.text()

    return answer
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function getBalance (logIn:boolean) {
  if (logIn) {
    const url = '/useController/getUserById'
    const data = {
      Id: localStorage.getItem('id')
    }
    const userData = await fetchRequest(url, data, localStorage.getItem('token'))
    if (userData.ballance >= 0) {
      localStorage.setItem('balance', userData.ballance.toFixed(2))
      return userData.ballance.toFixed(2)
    } else {
      localStorage.setItem('balance', 'null')
      return false
    }
  }
}
