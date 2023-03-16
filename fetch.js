const resource = 'http://127.0.0.1:3000/api/tasks';

const init = {
    method: null,
    headers: null,
    body: null
}

function getReq() {
    init.method = 'GET';
    fetch(resource, init).then((data) => {
        console.log(data);
    });
}

function putReq(task) {
    init.method = 'PUT';
    init.body = task;
    fetch(resource, init).then((data) => {
        console.log('UPDATE');
        console.log(data);
    })
}

export {getReq, putReq};