const http = require('http');
const util = require('util');
const {join} = require('path');

console.log(__dirname);

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(join(__dirname, 'sqlite'));

const dbRun = util.promisify(db.run.bind(db));
const dbAll = util.promisify(db.all.bind(db));

const createTask = ((task) => {
    return new Promise ((resolve, reject) => {
        try {
            const query = 'INSERT INTO Task (StartDateTime, EndDateTime, Status, Name) VALUES (?, ?, ?, ?)';
            const pleceHolder = [];
            console.log(task);
            for (let prop in task) {
                switch (prop) {
                    case 'StartDateTime':
                        pleceHolder[0] = task[prop];
                        break;
                    case 'EndDateTime':
                        pleceHolder[1] = task[prop];
                        break;
                    case 'Status':
                        pleceHolder[2] = task[prop];
                        break;
                    case 'Name':
                        pleceHolder[3] = task[prop];
                        break;
                    default:
                }
            }
            console.log(query, pleceHolder);
            dbRun(query, pleceHolder);
            resolve();
        } catch(e) {
            console.log(e);
            reject(e);
        }
    })
});

const getTasks = () => {
    return new Promise((resolve, reject) => {
        try {
            const Today = new Date();
            Today.setHours(0);
            Today.setMinutes(0);
            Today.setSeconds(0);
            Today.setMilliseconds(0);
            console.log(Today);
            const Tomorrow = new Date(new Date().setDate((new Date().getDate() + 1)));
            Tomorrow.setHours(0);
            Tomorrow.setMinutes(0);
            Tomorrow.setSeconds(0);
            Tomorrow.setMilliseconds(0);
            console.log(Tomorrow);
            const query = 'SELECT * FROM Task '
            + 'WHERE (StartDateTime >= ' + String(Today.getTime())
            + ' AND StartDateTime <= ' + String(Tomorrow.getTime())
            + ' ) OR StartDateTime IS NULL';
            console.log(query);
            dbAll(query).then((data) => {
                resolve(data);
            })
        } catch(e) {
            console.log(e);
            reject(e);
        }
    })
}

const getTasksByDate = (epochtime) => {
    const nextDate = new Date(Number(epochtime));
    nextDate.setDate(nextDate.getDate() + 1);
    console.log(nextDate);
    const nextDateEpochTime = nextDate.getTime();
    console.log(nextDateEpochTime);
    return new Promise((resolve, reject) => {
        try {
             const query = 'SELECT * FROM Task WHERE StartDateTime >= ' + epochtime + ' AND StartDateTime <= ' + nextDateEpochTime;
             console.log(query);
             dbAll(query).then((data) => {
                 resolve(data);
             })
         } catch(e) {
             console.log(e);
             reject(e);
         }
     })    
}

const updateTaskById = ((task) => {
    return new Promise((resolve, reject) => {
        console.log(task);
        try {
            const query = 'UPDATE Task SET StartDateTime = ?, EndDateTime = ?, Status = ? WHERE Id = ?';
            const pleceHolder = [];
            for (let prop in task) {
                switch (prop) {
                    case 'StartDateTime':
                        pleceHolder[0] = task[prop];
                        break;
                    case 'EndDateTime':
                        pleceHolder[1] = task[prop];
                        break;
                    case 'Status':
                        pleceHolder[2] = task[prop];
                        break;
                    case 'Id':
                        pleceHolder[3] = task[prop];
                        break;
                default:
                }
            }
            dbRun(query, pleceHolder);
            resolve();
        } catch(e) {
            console.log(e);
            reject(e);
        }
    })
})

const todos = [
    {id: 1, title: '洗顔', completed: false},
    {id: 2, title: '朝食', completed: true}
];

const server = http.createServer((req, res) => {
    console.log(req.url.split('/', 4));
    const epochtime = req.url.split('/', 4)[3];
    console.log(epochtime);
    if (req.url === '/api/tasks') {
        console.log('REQUEST METHOD: ', req.method);
        if (req.method === 'OPTIONS') {
            console.log('OPTIONS REQUEST IS COMING');
            res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
            res.setHeader('Access-Control-Allow-Methods', 'PUT, DELETE, PATCH');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
            res.end();
        }
        if (req.method === 'GET') {
            console.log('GET REQUEST IS COMING');
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
            getTasks().then(data => {
                res.statusCode = 200
                console.log('SELECT TASKS: ', data);
                console.log('JSON.stringify(data): ', JSON.stringify(data));
                return res.end(JSON.stringify(data));
            })
        }
        else if (req.method === 'POST') {
            console.log('POST REQUEST IS COMING');
            let postDate = '';
            req.on('data', (chunk) => {
                postDate += chunk;
            });
            req.on('end', () => {
                createTask(JSON.parse(postDate)).then(() => {
                    res.statusCode = 200
                    return res.end();
                })
            })
        }
        else if (req.method === 'PUT') {
            console.log('PUT REQUEST IS COMING');
            let putData = '';
            req.on('data', (chunk) => {
                putData += chunk;
            });
            console.log(putData);
            res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
            req.on('end', () => {
                updateTaskById(JSON.parse(putData)).then(() => {
                    res.statusCode = 200;
                    return res.end();
                })
            });
        } else {
            res.end();
        }
    } else if (req.url === '/api/tasks/' + epochtime) {
        console.log('REQUEST METHOD: ', req.method);
        if (req.method === 'GET') {
            console.log('GET REQUEST IS COMING, TARGET IS', epochtime);
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
            getTasksByDate(epochtime).then(data => {
                res.statusCode = 200
                console.log('SELECT TASKS: ', data);
                console.log('JSON.stringify(data): ', JSON.stringify(data));
                return res.end(JSON.stringify(data));
            })
        }
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
        res.statusCode = 404
    }
}).listen(3000);