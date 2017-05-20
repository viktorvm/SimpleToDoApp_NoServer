//-->Describe a Task
class Task {
    constructor(title) {
        this.done = false;
        this.title = title;
    }

    editTitle(newTitle) {
        this.title = newTitle;
    }

    changeStatus() {
        this.done = !this.done;
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

    remove(id) {
        this.tasks.splice(id, 1);
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
        txt += '<tr><td>' + (Number(t) + 1) + '</td>' +
                    '<td><input type="checkbox" onclick="changeTaskStatus(' + t + ')"' + status + '"></td>' +
                    '<td><input type="text" id="task' + t + 'Title" value="' + tasks[t].title + '" readonly></td>' +
					'<td><input type="button" id="task' + t + 'EditBtn" onclick="editTask(' + t + ')" value="edit"></td>' +
					'<td><input type="button" onclick="removeTask(' + t + ')" value="remove"></td></tr>';

    }
    document.getElementById('taskListTable').innerHTML = txt;
}

//Change Task status when checkbox clicked
function changeTaskStatus(id) {
    _taskList.tasks[id].changeStatus();
}

//Remove Task from the List
function removeTask(id) {
    _taskList.remove(id);
    //redraw a table
    drawTasks(_taskList.tasks);
}

//Edit Task title when button is clicked
function editTask(id) {
    let inp = document.getElementById('task' + id + 'Title');
    let btn = document.getElementById('task' + id + 'EditBtn');
    let help = document.getElementById('helpDiv');

    if (inp.readOnly) {
        inp.readOnly = false;
        btn.value = 'save';
        help.innerHTML = 'Press Escape in input to cancel editing Task';

        inp.addEventListener('keydown', function(e) {
            if (e.keyCode == 27) {
                inp.readOnly = true;
                btn.value = 'edit';
            }
        });
    } else {
        _taskList.tasks[id].editTitle(inp.value);
        inp.readOnly = true;
        btn.value = 'edit';
        help.innerHTML = 'Task ' + (Number(id) + 1) + ' title successfully changed';
    }
}

//-->Check if client supports LocalStorage
function supports_html5_storage() {
    try {
        console.log('localStorage' in window && window['localStorage'] !== null);
} catch (e) {
        console.log('no storage');
    }
}