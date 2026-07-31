const form = document.querySelector('.task-form')
const todoList = document.querySelector('.task-list')

const todos = []

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(form)

    const todo = {
        id: Date.now(),
        description: formData.get('task'),
        completed: false
    }

    const li = renderTodoListItem(todo)
    todoList.innerHTML += li

    todos.push(todo)

    form.reset()

    console.log(todos);
    
})

function renderTodoListItem(todo) {
    return `
    <li class="task-list__item">
            <button type="button" class="task-list__status" aria-pressed="true" aria-label="Marcar tarefa como pendente">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="12" cy="12" r="12" />
                <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" />
              </svg>
            </button>
            <p class="task-list__description">${todo.description}</p>
            <button type="button" class="task-list__edit" aria-label="Editar tarefa">
              <span class="icon icon--edit icon--lg" aria-hidden="true"></span>
            </button>
          </li>
    `
}