export async function getClientsList() {
  const response = await fetch(`http://localhost:3000/api/clients`);
  return await response.json();
}

export async function createClient(name) {
  const response = await fetch(`http://localhost:3000/api/clients`, {
    method: 'POST',
    body: JSON.stringify({
      id: 0,
      name,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

//   export function switchTodoItemDone({ todoItem }) {
//     todoItem.done = !todoItem.done;
//     fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
//       method: 'PATCH',
//       body: JSON.stringify({ done: todoItem.done }),
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     })
//   }

//   export function deleteTodoItem({ element, todoItem }) {
//     if (!confirm('Вы уверены?')) {
//       return;
//     }
//     element.remove();
//     fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
//       method: 'DELETE',
//     })
//   }
