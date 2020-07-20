export const fetchColumn = async () => {
  const response = await fetch('/column')
  if (response.status === 404) {
    throw 'Column Not Found'
  }
  if (response.status >= 500) {
    throw 'Server Error'
  }
  const datas = await response.json()
  return datas
}

export const fetchCard = async () => {
  const response = await fetch('/card')
  if (response.status === 404) {
    throw 'Card Not Found'
  }
  if (response.status >= 500) {
    throw 'Server Error'
  }
  const datas = await response.json()
  return datas
}

export const updateColumnName = async (data) => {
  fetch('/column', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error('Error:', error))
}
