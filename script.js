alert('Суканах')
const dom = {
    new:document.getElementById('new'),
    add:document.getElementById('add'),
    tasks:document.getElementById('tasks'),
    count:document.getElementById('count')
}
const tasks = [];

//отслеживаем
dom.add.onclick = () => {
    const newTaskText = dom.new.value
    if(newTaskText && isNotHaveTask(newTaskText, tasks)){
        addTask(newTaskText,tasks)
        dom.new.value = ''
        tasksRender(tasks)
    }
}
//добавление задачи
function addTask(text,list){
    const timestamp = Date.now()
    const task = {
        id: timestamp,
        text,
        isComplete: false
    }
    
    list.push(task)
    

}

//проверка повтора

function isNotHaveTask(text, list){
    let isNotHave = true

    list.forEach((task) => {
        if(task.text === text) {
        alert('Такая задача уже существует!')
        isNotHave = false
        }
    })
    return isNotHave
}

//Вывод списка на главный экран

function tasksRender(list) {
    let htmlList = ''

    list.forEach((task) => {
        const cls = task.isComplete 
        ? 'todo__task todo__task_complete' 
        : 'todo__task'
        const checked = task.isComplete ? 'checked' : ''
        
        
        const taskHtml = `
        <div id="${task.id}" class="${cls}">
            <label class="todo__checkbox">
            <input type="checkbox" ${checked}>
            <div class="todo__checkbox-div"></div>
            </label>
            <div class="todo__task-text">${task.text}</div>
            <div class="todo__task-del">-</div>
        </div>     
        `
        htmlList = htmlList + taskHtml

    });
    dom.tasks.innerHTML = htmlList
    renderTasksCount(list)
}


//клик чекбокса
dom.tasks.onclick = (event) => {
    const target = event.target
    const isCheckboxEl = target.classList.contains('todo__checkbox-div')
    const isDeleteEl = target.classList.contains('todo__task-del')

    if (isCheckboxEl) {
        const task = target.parentElement.parentElement
        const taskId = task.getAttribute('id')
        changeTaskStatus(taskId,  tasks)
        tasksRender(tasks)   
    }
    if (isDeleteEl) {
        const task = target.parentElement
        const taskId = task.getAttribute('id')
        deleteTask(taskId, tasks)
        tasksRender(tasks)
        console.log(tasks.length, tasks)

    }
}

//измененеие статуса азадачим

function changeTaskStatus(id, list){
    list.forEach((task) => {
        if (task.id == id) {
            task.isComplete = !task.isComplete
        }
    })
    
    
}
//удаление фанкшэн дэлит таск

function deleteTask(id, list){
    list.forEach((task, idx) => {
        if(task.id == id) {
            list.splice(idx, 1)
            console.log(list[idx])

        }
    })
    
    
}


//отслеживаем задачи их количество а вообще просто счетчик
function renderTasksCount(list) {
    dom.count.innerHTML = list.length
}
