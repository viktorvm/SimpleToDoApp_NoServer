//-->Describe a Task
class Task {
    constructor(title) {
        this.done = false;
        this.title = title;
    }
}

//-->Describe a TaskList
class TaskList {
    constructor() {
        this.tasks = [];
    }

    add(task) {
        this.tasks.push(task);
    }
}

//-->All Tasks are Here
var _taskList = new TaskList();

//-->Add new task when button pressed
function addTask() {
    title = document.getElementById('titleInput').value;
    let task = new Task(title);
    _taskList.add(task);

    drawTasks(_taskList.tasks);
}

//-->Draw given Tasks in a Table
function drawTasks(tasks) {
    let txt = '';
    for (var t in tasks) {
        let status = tasks[t].done ? 'checked' : 'unchecked';
        txt += '<tr><td><input type="checkbox" ' + status + '></td>' +
                    '<td>' + tasks[t].title + '</td>' +
					'<td><button type="button">edit</button></td>' +
					'<td><button type="button">remove</button></td></tr>';

    }
    document.getElementById('taskListTable').innerHTML = txt;
}

//-->Check if client supports LocalStorage
function supports_html5_storage() {
    try {
        console.log('localStorage' in window && window['localStorage'] !== null);
} catch (e) {
        console.log('no storage');
    }
}