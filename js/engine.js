//---------------------------
//      Classes Definition
//---------------------------
//-->Describe a Task
class Task {
    constructor(title, done) {
        this.done = done ? done : false;
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

    parseStorage(str) {
        let obj = JSON.parse(str);
        for (let t in obj['tasks']) {
            this.add(obj['tasks'][t].title, obj['tasks'][t].done);
        }
    }

    add(title, done) {
        this.tasks.push(new Task(title, done));
    }

    remove(id) {
        this.tasks.splice(id, 1);
    }

    sort() {
        function compare(a,b) {
            if (a.title < b.title)
              return -1;
            if (a.title > b.title)
              return 1;
            return 0;
        }
        this.tasks.sort(compare);
    }

    reverse() {
        function compare(a,b) {
            if (a.title < b.title)
              return 1;
            if (a.title > b.title)
              return -1;
            return 0;
        }
        this.tasks.sort(compare);
    }
}

//---------------------------
//    Variables Definition
//---------------------------
//-->All Tasks are Here
var _taskList = new TaskList();

//-->Has LocalStorage
var hasLS = supports_html5_storage();


//---------------------------
//    Functions Definition
//---------------------------
//-->At first load checking if Tasks info exists in localStorage
function init() {
    if (hasLS) {
        if (localStorage.getItem('_taskList')) {
            _taskList.parseStorage(localStorage.getItem('_taskList'));
            drawTasks(_taskList.tasks);
        }
    } else {
        document.getElementById('helpDiv') = 'Your data will be lost after you close or reload this page!';
    }
}

//-->Add new task when button pressed
function addTask() {
    let title = document.getElementById('titleInput').value;
    if (!title) {
        alert('Plaese enter a Task Title');
        return;
    }

    _taskList.add(title);
    drawTasks(_taskList.tasks);

    if (hasLS) {
       localStorage.setItem('_taskList', JSON.stringify(_taskList));
    }
}

//-->Draw given Tasks in a Table
function drawTasks(tasks) {
    let txt = '';
    for (let t in tasks) {
        console.log(tasks[t].done)
        let status = tasks[t].done ? 'checked="checked"' : '';
        console.log(status);
        txt += '<tr><td>' + (Number(t) + 1) + '</td>' +
                    '<td><input type="checkbox" onclick="changeTaskStatus(' + t + ')" ' + status + '"></td>' +
                    '<td><input type="text" id="task' + t + 'Title" value="' + tasks[t].title + '" readonly></td>' +
					'<td><input type="button" id="task' + t + 'EditBtn" onclick="editTask(' + t + ')" value="edit"></td>' +
					'<td><input type="button" onclick="removeTask(' + t + ')" value="remove"></td></tr>';

    }
    document.getElementById('taskListTable').innerHTML = txt;
}

//-->Change Task status when checkbox clicked
function changeTaskStatus(id) {
    _taskList.tasks[id].changeStatus();
    if (hasLS) {
       localStorage.setItem('_taskList', JSON.stringify(_taskList));
    }
}

//-->Remove Task from the List
function removeTask(id) {
    _taskList.remove(id);
    //redraw a table
    drawTasks(_taskList.tasks);

    if (hasLS) {
       localStorage.setItem('_taskList', JSON.stringify(_taskList));
    }
}

//-->Edit Task title when button is clicked
function editTask(id) {
    let inp = document.getElementById('task' + id + 'Title');
    let btn = document.getElementById('task' + id + 'EditBtn');
    let help = document.getElementById('helpDiv');

    if (inp.readOnly) {
        inp.readOnly = false;
        btn.value = 'save';
        help.innerHTML = 'Press Escape in input to cancel editing';

        inp.addEventListener('keydown', function(e) {
            if (e.keyCode == 27) {
                inp.readOnly = true;
                btn.value = 'edit';
                help.innerHTML = '';
            }
        });
    } else {
        _taskList.tasks[id].editTitle(inp.value);
        inp.readOnly = true;
        btn.value = 'edit';

        if (hasLS) {
            localStorage.setItem('_taskList', JSON.stringify(_taskList));
        }

        help.innerHTML = 'Task ' + (Number(id) + 1) + ' title successfully changed';
    }
}

//-->Sorting
function sortTasks() {
    _taskList.sort();
    drawTasks(_taskList.tasks);
}
function reverseTasks() {
    _taskList.reverse();
    drawTasks(_taskList.tasks);
}

//-->Check if client supports LocalStorage
function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
} catch (e) {
        return false;
    }
}