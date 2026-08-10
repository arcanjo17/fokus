let todosFromStorage = localStorage.getItem('todos')
let todos = todosFromStorage ? JSON.parse(todosFromStorage) : []
const form = document.querySelector('.task-form')
const FormLabelEdit = document.querySelector('.task-form__label')
const todoTextArea = document.querySelector('#task-input')
const todoList = document.querySelector('.task-list')
const buttonDelete = document.querySelector('#btn-delete')
// encontrar botão de limpar concluidas
const clearTarefaConcluidas = document.querySelector('.task-menu__button:has(.icon--check)')
// econtrar botao de limpar todas
const clearAll = document.querySelector('.task-menu__button:has(.icon--delete)')
// encontrar menu
const menu = document.querySelector('.task-menu')
const addForm = document.querySelector('.add-task-button')
const btnCancelAddForm = document.querySelector('#btn-cancel')

let todoEdit = null

buttonDelete.addEventListener('click', () => {
    if (todoEdit) {
      todos = todos.filter(t => t !== todoEdit)
    }

    resetFormState()
    toggleForm()
    renderAll()
})

// add event listener do limpar concluidas
clearTarefaConcluidas.addEventListener('click', () => {
  todos = todos.filter(t => !t.completed)
  renderAll()
  // fechar o menu
  menu.removeAttribute('open')
})

// add event listener do limpar todas
clearAll.addEventListener('click', () => {
  todos = []
  todoList.innerHTML = ''
  // fechar o menu
  menu.removeAttribute('open')
})

function toggleForm() {
  form.hidden = !form.hidden
  addForm.hidden = !addForm.hidden
}

//resetando o cancelar
function resetFormState() {
  form.reset()
  FormLabelEdit.textContent = 'Adicionando tarefa'
  todoEdit = null
  buttonDelete.hidden = true
}

addForm.addEventListener('click', toggleForm)

btnCancelAddForm.addEventListener('click', () => {
  toggleForm()
  resetFormState()
  form.reset()
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const formData = new FormData(form)

  if (todoEdit) {
    todoEdit.description = formData.get('task')
  } else {
    const todo = {
      id: Date.now(),
      description: formData.get('task'),
      completed: false
    }
    todos.push(todo)
  }

  renderAll()
  toggleForm()
  resetFormState()
})

function renderTodoListItem(todo) {

  const listItem = document.createElement('li')

  listItem.classList.add('task-list__item')

  const statusButton = document.createElement('button')
  statusButton.type = 'button'
  statusButton.classList.add('task-list__status')
  statusButton.setAttribute('aria-pressed', todo.completed)

  statusButton.addEventListener('click', () => {
    todo.completed = !todo.completed
    renderAll()
  })

  const statusIcon = document.createElement('img')
  statusIcon.src = todo.completed ? '/icons/check_circle.svg' : '/icons/check_circle_pending.svg'

  const paragraph = document.createElement('p')
  paragraph.classList.add('task-list__description')
  paragraph.textContent = todo.description

  const editButton = document.createElement('button')
  editButton.type = 'button'
  editButton.classList.add('task-list__edit')
  editButton.setAttribute('aria-label', 'Editar tarefa')

  editButton.addEventListener('click', () => {
    if (form.hidden) {
      toggleForm()
    }
    
    buttonDelete.hidden = false
    FormLabelEdit.textContent = 'Editando tarefa'
    todoTextArea.value = todo.description
    todoEdit = todo
  })

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
}

function renderAll() {
  localStorage.setItem('todos', JSON.stringify(todos))
  todoList.innerHTML = ''
  todos.forEach(todo => {
    const element = renderTodoListItem(todo)
    todoList.appendChild(element)
  })
}

renderAll()