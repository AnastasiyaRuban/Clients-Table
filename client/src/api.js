export async function getClientsList() {
  const response = await fetch(`http://localhost:3000/api/clents`);

  if (response.status === 200 || response.status === 201) {
    return await response.json();
  }
  throw new Error('Не удалось загрузить список клиентов');
}

export async function createClient(client) {
  const response = await fetch(`http://localhost:3000/api/clients`, {
    method: 'POST',
    body: JSON.stringify(client),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 200 || response.status === 201) {
    return await response.json();
  } else {
    const errors = await response.json();
    console.log(errors.errors);
  }
  // throw new Error();
  // return await response.json();
}

export async function updateClient(clientId, data) {
  const response = await fetch(
    `http://localhost:3000/api/clients/${clientId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.json();
}

export function deleteClient(clientId) {
  fetch(`http://localhost:3000/api/clients/${clientId}`, {
    method: 'DELETE',
  });
}
