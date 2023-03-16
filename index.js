const resource = 'http://127.0.0.1:3000/api/tasks';

const initObj = {
    mode: 'cors'
}

const yearMonth = {
    year: new Date().getFullYear(),
    month: Number(new Date().getMonth())+1
}

const previousYearMonth = () => {
    const date = new Date(yearMonth.year, yearMonth.month, 1);
    date.setMonth(date.getMonth() - 1);
    yearMonth.year = date.getFullYear();
    yearMonth.month = date.getMonth();
};

const nextYearMonth = () => {
    const date = new Date(yearMonth.year, yearMonth.month, 1);
    date.setMonth(date.getMonth() + 1);
    yearMonth.year = date.getFullYear();
    yearMonth.month = date.getMonth();
};

function getReq() {
    return new Promise((resolve, reject) => {
        let get = '';
        initObj.method = 'GET';
        initObj.header = {};
        initObj.header.Origin = 'http://127.0.0.1:5500';
        console.log(initObj);
        try {
            fetch(resource, initObj)
                .then((response) => {
                    console.log(response);
                    return response.body
                })
                .then((body) => {
                    const reader = body.getReader();
                    return new ReadableStream({
                        start(controller) {
                        return pump();
                        function pump() {
                            return reader.read().then(({ done, value }) => {
                            // データを消費する必要がなくなったら、ストリームを閉じる
                            if (done) {
                                controller.close();
                                return;
                            }
                            // 次のデータチャンクを対象のストリームのキューに入れる
                            get += value;
                            controller.enqueue(value);
                            return pump();
                            });
                        }
                        }
                    })
                }) 
                // 新しいレスポンスをストリームの外に作成
                .then((stream) => new Response(stream))
                // レスポンスのオブジェクト URL を作成
                .then((response) => {
                    return response.blob();
                })
                .then((data) => {
                    console.log(data);
                    console.log('promiseの中のthen');
                    return data.text();
                })
                .then((data) => {
                    console.log(data);
                    return resolve(data);
                })
                .catch((err) => {
                    return reject(err);
                });
        } catch (e) {
            console.log(e);
        }
    })
}

function getTaskByDate(date) {
    return new Promise((resolve, reject) => {
        let get = '';
        initObj.method = 'GET';
        initObj.header = {};
        initObj.header.Origin = 'http://127.0.0.1:5500';
        console.log(initObj);
        try {
            fetch(resource+'/' + date, initObj)
                .then((response) => {
                    console.log(response);
                    return response.body
                })
                .then((body) => {
                    const reader = body.getReader();
                    return new ReadableStream({
                        start(controller) {
                        return pump();
                        function pump() {
                            return reader.read().then(({ done, value }) => {
                            // データを消費する必要がなくなったら、ストリームを閉じる
                            if (done) {
                                controller.close();
                                return;
                            }
                            // 次のデータチャンクを対象のストリームのキューに入れる
                            get += value;
                            controller.enqueue(value);
                            return pump();
                            });
                        }
                        }
                    })
                }) 
                // 新しいレスポンスをストリームの外に作成
                .then((stream) => new Response(stream))
                // レスポンスのオブジェクト URL を作成
                .then((response) => {
                    return response.blob();
                })
                .then((data) => {
                    console.log(data);
                    console.log('promiseの中のthen');
                    return data.text();
                })
                .then((data) => {
                    console.log(data);
                    return resolve(data);
                })
                .catch((err) => {
                    return reject(err);
                });
        } catch (e) {
            console.log(e);
        }
    })
}

function putReq(task) {
    return new Promise((resolve, reject) => {
        let get = '';
        initObj.method = 'PUT';
        initObj.header = {};
        initObj.header.Origin = 'http://127.0.0.1:5500';
        initObj.body = JSON.stringify(task);
        console.log(initObj);
        fetch(resource, initObj)
            .then((response) => response.body)
            .then((body) => {
                const reader = body.getReader();
                return new ReadableStream({
                    start(controller) {
                    return pump();
                    function pump() {
                        return reader.read().then(({ done, value }) => {
                        // データを消費する必要がなくなったら、ストリームを閉じる
                        if (done) {
                            controller.close();
                            return;
                        }
                        // 次のデータチャンクを対象のストリームのキューに入れる
                        get += value;
                        controller.enqueue(value);
                        return pump();
                        });
                    }
                    }
                })
            }) 
            // 新しいレスポンスをストリームの外に作成
            .then((stream) => new Response(stream))
            // レスポンスのオブジェクト URL を作成
            .then((response) => {
                return response.blob();
            })
            .then((data) => {
                console.log(data);
                console.log('promiseの中のthen');
                return data.text();
            })
            .then((data) => {
                console.log(data);
                resolve(data);
            });
    })
}

function postReq(task) {
    return new Promise((resolve, reject) => {
        initObj.method = 'POST';
        initObj.header = {};
        initObj.header.Origin = 'http://127.0.0.1:5500';
        initObj.body = JSON.stringify(task);
        console.log(initObj);
        fetch(resource, initObj)
            .then((response) => response.body)
            .then((body) => {
                const reader = body.getReader();
                return new ReadableStream({
                    start(controller) {
                    return pump();
                    function pump() {
                        return reader.read().then(({ done, value }) => {
                        // データを消費する必要がなくなったら、ストリームを閉じる
                        if (done) {
                            controller.close();
                            return;
                        }
                        // 次のデータチャンクを対象のストリームのキューに入れる
                        get += value;
                        controller.enqueue(value);
                        return pump();
                        });
                    }
                    }
                })
            }) 
            // 新しいレスポンスをストリームの外に作成
            .then((stream) => new Response(stream))
            // レスポンスのオブジェクト URL を作成
            .then((response) => {
                return response.blob();
            })
            .then((data) => {
                console.log(data);
                return data.text();
            })
            .then((data) => {
                console.log(data);
                resolve(data);
            });
    })
}

let sum = 0
let dragged = null;

const undone = [];
const doing = [];
const done = [];

function dragStartHandler(event) {
    // ドラッグ中の要素の参照を保存
    dragged = event.target;
}

function dragOverHandler(event) {
    // ドロップできるように既定の動作を停止
    event.preventDefault();
}

function dropHandler(event) {
    console.log('drop');
    // 既定の動作（一部の要素でリンクとして開く）を行わないようにする。
    event.preventDefault();
    // ドラッグした要素を選択されたドロップターゲットに移動する
    dragged.parentNode.removeChild(dragged);
    console.log(dragged);
    event.target.appendChild(dragged);
    for (let ele of event.target.children) {
        switch (ele.className) {
            case 'undone-tasks':
                updateTaskStatus(getTaskByName(dragged.innerHTML), 'Undone');
                break;
            case 'doing-tasks':
                updateTaskStatus(getTaskByName(dragged.innerHTML), 'Doing');
                break;
            case 'done-tasks':
                updateTaskStatus(getTaskByName(dragged.innerHTML), 'Done');
                break;
            default:
        }
    }
}

function getTaskByName(name) {
    for (let ele of undone) {
        if (ele.Name === name) {
            return ele;
        };
    }
    for (let ele of doing) {
        if (ele.Name === name) {
            return ele;
        };
    }
    for (let ele of done) {
        if (ele.Name === name) {
            return ele;
        };
    }    
}

function updateTaskStatus(task, newStatus) {
    console.log('移動するタスク: ', task);
    console.log('もともとのステータス: ', task.Status);
    console.log('新たなステータス: ', newStatus);
    switch (task.Status) {
        case 'Undone':
            // TODO: 配列の入れ替え処理
            undone.splice(undone.indexOf(task), 1);
            break;
        case 'Doing':
            // TODO: 配列の入れ替え処理
            doing.splice(doing.indexOf(task), 1);
            break;
        case 'Done':
            // TODO: 配列の入れ替え処理
            done.splice(done.indexOf(task), 1);
            break;
        default:
    }
    task.Status = newStatus;
    switch (newStatus) {
        case 'Undone':
            task.StartDateTime = null;
            task.EndDateTime = null;
            undone.push(task);
            break;
        case 'Doing':
            task.StartDateTime = new Date().getTime();
            task.EndDateTime = null;
            doing.push(task);
            break;
        case 'Done':
            task.EndDateTime = new Date().getTime();
            done.push(task);
            break;
        default:
    }
    console.log('処理完了後の配列:');
    console.log('undone: ', undone);
    console.log('doing: ', doing);
    console.log('done: ', done);
    console.log('UPDATE TARGET: ', task);
    putReq(task);
}

async function addFunc(num) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(sum+=num);
        }, 1000)
    })
}
async function init() {
    console.log('init called');
    getReq()
        .then((data) => {
            console.log(JSON.parse(data));

    for (let ele of JSON.parse(data)) {
        switch (ele.Status) {
            case 'Undone':
                undone.push(ele);
                break;
            case 'Doing':
                doing.push(ele);
                break;
            case 'Done':
                done.push(ele);
                break;
            default:
        }        
    }

    const undoneUl = document.getElementsByClassName('undone-tasks')[0];
    const doingUl = document.getElementsByClassName('doing-tasks')[0];
    const doneUl = document.getElementsByClassName('done-tasks')[0];

    for (let task of undone) {
        let insertTarget = document.createElement('li');
        insertTarget.classList.add('task');
        insertTarget.setAttribute('draggable', true);
        insertTarget.innerHTML = task.Name;
        undoneUl.appendChild(insertTarget);
    }

    for (let task of doing) {
        let insertTarget = document.createElement('li');
        insertTarget.classList.add('task');
        insertTarget.setAttribute('draggable', true);
        insertTarget.innerHTML = task.Name;
        doingUl.appendChild(insertTarget);
    }

    for (let task of done) {
        let insertTarget = document.createElement('li');
        insertTarget.classList.add('task');
        insertTarget.setAttribute('draggable', true);
        insertTarget.innerHTML = task.Name;
        doneUl.appendChild(insertTarget);
    }

    const tasks = document.getElementsByClassName('task');
    const taskContainers = document.getElementsByClassName('task-container');

    const ulelements = document.getElementsByTagName('ul');
    const lielements = document.getElementsByTagName('li');

    const closemenu = document.getElementsByClassName('closemenu');

    const taskHistory = document.getElementsByClassName('nav_item_task-history');
    const taskManager = document.getElementsByClassName('nav_item_task-manager');

    addFunc(100).then(()=>{
        for (let task of tasks) {
            console.log('event add')
            task.addEventListener('dragstart', dragStartHandler);
            task.addEventListener('click', (event) => {
                console.log('onclick');
                const taskmenu = document.getElementsByClassName('taskmenu');
                taskmenu[0].style.display = 'block';
                taskmenu[0].style.top = event.pageY + 'px';
                taskmenu[0].style.left = event.pageX + 'px';
            })
        }
        for (let taskContainer of taskContainers) {
            taskContainer.addEventListener('dragover', dragOverHandler);
            taskContainer.addEventListener('drop', dropHandler);
        }
        for (let ul of ulelements) {
            ul.addEventListener('dragover', (event) => {
                // event.stopPropagation();
            });
            ul.addEventListener('drop',  (event) => {
                console.log('ulへのドロップ');
                event.stopPropagation();
            });;
        }
        for (let li of lielements) {
            li.addEventListener('dragover', (event) => {
                // event.stopPropagation();
            });;
            li.addEventListener('drop', (event) => {
                console.log('liへのドロップ');
                event.stopPropagation();
            });;
        }

        closemenu[0].addEventListener('click', () => {
            console.log('menu close clicked');
            const taskmenu = document.getElementsByClassName('taskmenu');
            taskmenu[0].style.display = '';
        })

        taskHistory[0].addEventListener('click', () => {
            console.log('click taskHistory');
            const container = document.getElementsByClassName('container');
            container[0].style.display = 'none';
            const drawer_input = document.getElementById('drawer_input');
            drawer_input.checked = !drawer_input.checked;
            const task_history = document.getElementsByClassName('task-history');
            task_history[0].style.display = 'block';
        })

        taskManager[0].addEventListener('click', () => {
            console.log('click taskManager');
            const container = document.getElementsByClassName('container');
            container[0].style.display = '';
            const drawer_input = document.getElementById('drawer_input');
            drawer_input.checked = !drawer_input.checked;
            const task_history = document.getElementsByClassName('task-history');
            task_history[0].style.display = 'none';
        })

        updateYearMonthDisplay();

        createCalenderTable(new Date().getFullYear(), new Date().getMonth()+1);
        insertCalenderTable(new Date().getFullYear(), new Date().getMonth()+1);
        const previous_button = document.getElementsByClassName('previous-button');
        const next_button = document.getElementsByClassName('next-button');

        previous_button[0].addEventListener('click', ()=> {
            clearCalenderTable();
            previousYearMonth();
            insertCalenderTable(yearMonth.year, yearMonth.month);
            updateYearMonthDisplay();
        })

        next_button[0].addEventListener('click', ()=> {
            clearCalenderTable();
            nextYearMonth();
            insertCalenderTable(yearMonth.year, yearMonth.month);
            updateYearMonthDisplay();
        })
    })
    })
}

init();

// モーダル
const buttonOpen = document.getElementById('modalOpen');
const modal = document.getElementById('easyModal');
const buttonClose = document.getElementsByClassName('modalClose')[0];

// ボタンがクリックされた時
buttonOpen.addEventListener('click', modalOpen);
function modalOpen() {
  modal.style.display = 'block';
}

// バツ印がクリックされた時
buttonClose.addEventListener('click', modalClose);
function modalClose() {
  modal.style.display = 'none';
}

// モーダルコンテンツ以外がクリックされた時
addEventListener('click', outsideClose);
function outsideClose(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

const addTaskButton = document.getElementsByClassName('add-task-button')[0];
addTaskButton.addEventListener('click', (event) => {
    const newTaskNameInput = document.getElementsByClassName('new-task-name')[0];
    console.log(newTaskNameInput.value);
    addTaskButtonHandler(newTaskNameInput.value);
    modal.style.display = 'none';
});

function addTaskButtonHandler(taskName) {
    const postData = {
        "Name": taskName,
        "Status": "Undone",
        "StartDateTime":  null,
        "EndDateTime": null,
    };
    undone.push(postData);
    postReq(postData);
}

function createCalenderTable() {
    const table = document.getElementsByClassName('task-calender-table');
    for (let i = 0; i < 6; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const td = document.createElement('td');
            // const div = document.createElement('div');
            // td.appendChild(div);
            // div.style.border = '1px solid';
            // div.style.textAlign = 'center';
            tr.appendChild(td);
        }
        table[0].appendChild(tr);
    }
}
function insertCalenderTable(year, month) {
    console.log('カレンダー挿入する年月: ', year, '/', month);
    const content = calcCalenderContentByYearMonth(year, month);
    console.log(content);
    const table = document.getElementsByClassName('task-calender-table');
    for (let ele in table[0].children) {
        if (ele >= 1 && typeof Number(ele) === 'number') {
            for (let i = 0; i < 7; i++) {
                // table[0].children[ele].children[i].children[0].innerHTML = typeof content[ele - 1][i] !== "undefined" ? content[ele - 1][i]: '';
                const calenderDiv = document.createElement('div');
                calenderDiv.innerHTML = typeof content[ele - 1][i] !== "undefined" ? content[ele - 1][i]: '';
                calenderDiv.addEventListener('click', (e) => {
                    console.log(new Date(yearMonth.year, yearMonth.month - 1,content[ele - 1][i]));
                    getTaskByDate(new Date(yearMonth.year, yearMonth.month - 1,content[ele - 1][i]).getTime())
                        .then(data => {
                            const deleteTarget = document.getElementsByClassName('task-table-task-data');
                            for (let ele of deleteTarget) {
                                ele.remove();
                            }
                            console.log(data);
                            const dataContainer = document.getElementsByClassName('task-table-container')[0];
                            for (let ele of JSON.parse(data)) {
                                console.log(ele);
                                const dataElement = [];
                                let time;
                                if (ele.EndDateTime != null) {
                                    time = Math.floor((ele.EndDateTime - ele.StartDateTime)/1000/60);
                                    dataElement[2] = time;
                                }
                                for (let prop in ele) {
                                    console.log(prop);
                                    if (prop === 'Name') {
                                        dataElement[0] = ele[prop];
                                    }
                                    if (prop === 'Status') {
                                        dataElement[1] = ele[prop];
                                    }
                                }
                                const tr = document.createElement('tr');
                                tr.classList.add('task-table-task-data');
                                let hasData = false;
                                for (let data of dataElement) {
                                    console.log(data);
                                    if (typeof data != 'undefined') {
                                        if (!hasData) {
                                            hasData = !hasData;
                                        }
                                        const td = document.createElement('td');
                                        td.innerHTML = data;
                                        td.classList.add('task-table-task-column');
                                        tr.appendChild(td);
                                    }
                                }
                                if (hasData) {
                                    dataContainer.appendChild(tr);
                                }
                            }
                        });
                });
                table[0].children[ele].children[i].appendChild(calenderDiv);
                calenderDiv.style.textAlign = 'center';
                if (i === 0) {
                    calenderDiv.style.color = 'red';
                } else if (i === 6) {
                    calenderDiv.style.color = 'blue';
                } else if (content[ele - 1][i] === new Date().getDate()) {
                    calenderDiv.style.color = 'green';
                    calenderDiv.style.fontWeight = 'bold';
                }
            }
        }
    }
}

function clearCalenderTable() {
    const table = document.getElementsByClassName('task-calender-table');
    for (let ele in table[0].children) {
        if (ele >= 1 && typeof Number(ele) === 'number') {
            for (let i = 0; i < 7; i++) {
                const element = table[0].children[ele].children[i].childNodes[0];
                table[0].children[ele].children[i].removeChild(element);
            }
        }
    }    
}

function calcCalenderContentByYearMonth(year, month) {
    const content = [[], [], [], [], [], []];
    const firstDay = new Date(
        year, // year
        month - 1, // month
        1, // day
        0, // hours
        0, // minuets
        0, // seconds
        0 // millseconds
    );
    const lastDay = month === 12 ? 
        new Date(
            year + 1, // year
            0, // month
            1, // day
            0, // hours
            0, // minuets
            0, // seconds
            0 // millseconds
        ):
        new Date(
            year, // year
            month, // month
            1, // day
            0, // hours
            0, // minuets
            0, // seconds
            0 // millseconds
        );
    let insertDay = 1;
    console.log('firstDay: ', firstDay);
    console.log('lastDay: ', lastDay);
    const upper = new Date(lastDay.setDate(lastDay.getDate() - 1)).getDate();
    console.log('upper: ', upper);
    for (let week = 0; week <= 5; week++) {
        for (let i = 0; i <= 6; i++) {
            if (week === 0 && i > firstDay.getUTCDay()) {
                content[week][i] = insertDay++; 
            }
            if (week >= 1 && insertDay <= upper) {
                content[week][i] = insertDay++;
            } else if (week >= 1 && insertDay > upper){
                console.log(content);
                return content;
            }
        }
    }
}

function updateYearMonthDisplay() {
    const targetYearMonth = document.getElementsByClassName('calender-target-year-month')[0];
    targetYearMonth.innerHTML = yearMonth.year + ' / ' + yearMonth.month;
}