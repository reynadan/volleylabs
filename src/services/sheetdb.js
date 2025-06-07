const BASE_URL = import.meta.env.VITE_SHEETDB_URL

export async function fetchEvents() {
  const response = await fetch(`${BASE_URL}`)
  if (!response.ok) throw new Error('Erreur lors de la récupération des événements')
  return await response.json()
}

export async function createEvent(event) {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: event }),
  })

  if (!response.ok) throw new Error('Erreur lors de la création de l’événement')
  return await response.json()
}
