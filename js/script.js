
const typeText = document.querySelector('.form__input');
const btnAdd = document.querySelector('.form__btnAdd');
const todoList = document.querySelector('.todoList');
const btnClear = document.querySelector('.btnClear');
const textHello = document.querySelector('.hello');

let taskArr = [];

if (localStorage.task) {
    taskArr = JSON.parse( localStorage.getItem('task'));
    taskCreate();
} else {taskArr = []; }

btnAdd.addEventListener('click', () => {
    todoList.innerHTML = '';
    if(typeText.value.trim()!=0){
        let task =  {
            description: typeText.value,
            complited: false
        }
        taskArr.push(task);
        typeText.value = '';
        updateLocal();
        
    } else {
        typeText.placeholder = '';
    }
    taskCreate();
});

btnClear.addEventListener('click', () => {
    todoList.innerHTML = '';
    taskArr.length = 0;
    localStorage.clear();
});

function updateLocal() {
    localStorage.setItem('task', JSON.stringify(taskArr)); 
};

function btnComplFunc(index, btnComplite, task, p) {
    btnComplite.addEventListener('click', () => {
        task.classList.toggle('checked');
        btnComplite.classList.toggle('acceptWell');
        p.classList.toggle('complitedText');
        if (task.classList.contains('checked')) {
            taskArr[index].complited = true;
            updateLocal();
        } else {
            taskArr[index].complited = false;
            updateLocal();
        }
    });
}

function btnDelFunc(index, btnDelete) {
    btnDelete.addEventListener('click', () => {
        taskArr.splice([index], 1);
        updateLocal();
        todoList.innerHTML = '';
        taskArr.forEach((item, index) => {
            createTask(item.description, index);
        });
    });
}

function taskCreate() {
    taskArr.forEach((item, index) => {
        createTask(item.description, index);
    });
}

function createTask(description, index) {
    let task = document.createElement('li');
    task.classList.add('todoList__item');

    let btnComplite = document.createElement('span');
    btnComplite.classList.add('acceptTask');
    let p = document.createElement('p');
    
    p.textContent = description;

    let btnDelete = document.createElement('i');
    btnDelete.classList.add('deleteTask');
    btnComplFunc(index, btnComplite, task, p);
    btnDelFunc(index, btnDelete);

    if(taskArr[index].complited) {
        btnComplite.classList.add('acceptWell');
        task.classList.add('checked');
        p.classList.add('complitedText');
        taskArr[index].complited = true;
        updateLocal();
    } else {
        btnComplite.classList.remove('acceptWell');
        task.classList.remove('checked');
        p.classList.remove('complitedText');
    }
    task.append(btnComplite, p, btnDelete);
    todoList.prepend(task);
}