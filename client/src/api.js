export async function getClientsList() {
  const response = await fetch(`http://localhost:3000/api/clients`);

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
  } else if (
    response.status === 422 ||
    response.status === 404 ||
    String(response.status).startsWith('5')
  ) {
    const errors = await response.json();
    const err = new TypeError();
    err.errorMessages = errors.errors.map((err) => ({
      name: err.field,
      message: err.message,
    }));
    throw err;
  }
  throw new Error('Что-то пошло не так');
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

  if (response.status === 200 || response.status === 201) {
    return await response.json();
  } else if (
    response.status === 422 ||
    response.status === 404 ||
    String(response.status).startsWith('5')
  ) {
    const errors = await response.json();
    const err = new TypeError();
    err.errorMessages = errors.errors.map((err) => ({
      name: err.field,
      message: err.message,
    }));
    throw err;
  }
  throw new Error('Что-то пошло не так');
}

export function deleteClient(clientId) {
  fetch(`http://localhost:3000/api/clients/${clientId}`, {
    method: 'DELETE',
  });
}

export async function getClient(id) {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`);

  if (response.status === 200 || response.status === 201) {
    return await response.json();
  }
  throw new Error('Не удалось найти клиента');
}
