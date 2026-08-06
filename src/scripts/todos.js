const form = document.querySelector('.task-form')
const todoList = document.querySelector('.task-list')

const todos = [
  {
    id: 1,
    description: 'Fazer o exercício de JavaScript',
    completed: true
  },
  {
    id: 2,
    description: 'Fazer o exercício de CSS',
    completed: false
  },
  {
    id: 3,
    description: 'Fazer o exercício de HTML',
    completed: false
  }
]

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const formData = new FormData(form)

  const todo = {
    id: Date.now(),
    description: formData.get('task'),
    completed: false
  }

  const li = renderTodoListItem(todo)
  todoList.appendChild(li)

  todos.push(todo)

  form.reset()

  console.log(todos);

})

function renderTodoListItem(todo) {

  const listItem = document.createElement('li')

  listItem.classList.add('task-list__item')

  const statusButton = document.createElement('button')
  statusButton.type = 'button'
  statusButton.classList.add('task-list__status')
  statusButton.setAttribute('aria-pressed', todo.completed)

  const statusIcon = document.createElement('img')
  statusIcon.src = todo.completed ? '/icons/check_circle.svg' : '/icons/check_circle_pending.svg'

  const paragraph = document.createElement('p')
  paragraph.classList.add('task-list__description')
  paragraph.textContent = todo.description

  const editButton = document.createElement('button')
  editButton.type = 'button'
  editButton.classList.add('task-list__edit')
  editButton.setAttribute('aria-label', 'Editar tarefa')

  const span = document.createElement('span')
  span.classList.add('icon', 'icon--edit', 'icon--lg')
  span.setAttribute('aria-hidden', 'true')

  statusButton.appendChild(statusIcon)
  editButton.appendChild(span)
  listItem.append(statusButton, paragraph, editButton)

  if (todo.completed) {
    listItem.classList.add('task-list__item--complete')
    statusButton.setAttribute('aria-pressed', 'Marcar tarefa como concluída')
  } else {
    statusButton.setAttribute('aria-label', 'Marcar tarefa como pendente')
  }

  return listItem

  // return `
  // <li class="task-list__item">
  //         <button type="button" class="task-list__status" aria-pressed="true" aria-label="Marcar tarefa como pendente">
  //           <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  //             <circle cx="12" cy="12" r="12" />
  //             <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" />
  //           </svg>
  //         </button>
  //         <p class="task-list__description">${todo.description}</p>
  //         <button type="button" class="task-list__edit" aria-label="Editar tarefa">
  //           <span class="icon icon--edit icon--lg" aria-hidden="true"></span>
  //         </button>
  //       </li>
  // `
}

todos.forEach(todo => {
  const element = renderTodoListItem(todo)
  todoList.appendChild(element)
})