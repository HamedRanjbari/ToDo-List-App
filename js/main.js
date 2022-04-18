// Variables
let $ = document
const body = $.body
const input = $.getElementById("inputTodo")
const bgAlarm = $.querySelector(".bgAlarm")
const addButton = $.querySelector(".add-btn")
const clearButton = $.querySelector(".clear-btn")
const todoListElem = $.getElementById("todoList")
const changeTheme = $.querySelector(".sun")
let isLight = true
let todosArray = []

// Theme
changeTheme.addEventListener("click", () => {
    changeTheme.classList.toggle("bi-moon")
    body.classList.toggle("darkTheme")
    if (body.className.includes("darkTheme")) {
        localStorage.setItem("Theme", "Dark")
    } else {
        localStorage.setItem("Theme", "Light")
    }
})
window.addEventListener("load", () => {
    let localTheme = localStorage.getItem("Theme")
    if (localTheme == "Dark") {
        body.classList.add("darkTheme")
    }
})
// New ToDo list
function addNewTodo() {
    let newTodoTitle = input.value
    let newTodoObj = {
        id: todosArray.length + 1,
        title: newTodoTitle,
        complete: false
    }
    if (input.value != "") {
        input.value = ''
        todosArray.push(newTodoObj)
        setLocalStorage(todosArray)
        todosGenerator(todosArray)
        input.focus()
    } else {
        let timer = setInterval(() => {
            bgAlarm.style.transform = "translateY(0)"
            clearInterval(timer)
        }, 100)
        setTimeout(() => {
            bgAlarm.style.transform = "translateY(-200%)"
        }, 3000);
    }
}
function setLocalStorage(todosList) {
    localStorage.setItem('todos', JSON.stringify(todosList))
}
// ToDo Generator
function todosGenerator(todosList) {
    let newTodoDiv, newTodoH3, groupBtn, CompleteBtn, DeleteBtn
    todoListElem.innerHTML = ''
    todosList.forEach(function (todo) {
        console.log(todo);
        newTodoDiv = $.createElement('div')
        newTodoDiv.className = 'lists'
        newTodoH3 = $.createElement('h3')
        newTodoH3.innerHTML = todo.title
        groupBtn = $.createElement("div")
        groupBtn.classList = "buttons"
        CompleteBtn = $.createElement('button')
        CompleteBtn.className = 'status-btn'
        CompleteBtn.innerHTML = 'Complete'
        CompleteBtn.setAttribute('onclick', 'editTodo(' + todo.id + ')')
        DeleteBtn = $.createElement('button')
        DeleteBtn.className = 'delete-btn'
        DeleteBtn.innerHTML = 'Delete'
        DeleteBtn.setAttribute('onclick', 'removeTodo(' + todo.id + ')')
        if (todo.complete) {
            newTodoH3.className = 'complete-list-header'
            CompleteBtn.innerHTML = 'Give Up'
        }
        newTodoDiv.append(newTodoH3, groupBtn)
        groupBtn.append(CompleteBtn, DeleteBtn)
        todoListElem.append(newTodoDiv)
    })
}
// Local storage
function editTodo(todoId) {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    todosArray = localStorageTodos
    todosArray.forEach(function (todo) {
        if (todo.id === todoId) {
            todo.complete = !todo.complete
        }
    })
    setLocalStorage(todosArray)
    todosGenerator(todosArray)
}
function removeTodo(todoId) {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    todosArray = localStorageTodos
    let mainTodoIndex = todosArray.findIndex(function (todo) {
        return todo.id === todoId
    })
    todosArray.splice(mainTodoIndex, 1)
    setLocalStorage(todosArray)
    todosGenerator(todosArray)
}
function getLocalStorage() {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    if (localStorageTodos) {
        todosArray = localStorageTodos
    } else {
        todosArray = []
    }
    todosGenerator(todosArray)
}
function clearTodos() {
    todosArray = []
    todosGenerator(todosArray)
    localStorage.removeItem('todos')
}
// Add event listeners
window.addEventListener('load', getLocalStorage)
addButton.addEventListener('click', addNewTodo)
clearButton.addEventListener('click', clearTodos)
input.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        addNewTodo()
    }
})
input.addEventListener('keydown', function (event) {
    if (event.code === 'NumpadEnter') {
        addNewTodo()
    }
})
input.addEventListener('keydown', function (event) {
    if (event.code === 'Escape') {
        input.value = ""
    }
})