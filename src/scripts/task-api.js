const API_URL = "http://localhost:4242/tasks"

export async function getTasks() {
    try {
        const response = await fetch(API_URL)
        return response.json()
    } catch (error) {
        alert('Alguma coisa deu errado!')
        return []
    }
}

export async function createTask(description) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description,
            completed: false
        })
    })

    return response.json()
}

export async function updateTask(id, data) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response.json()
}

export async function deleteTask(id) {
    return fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
}