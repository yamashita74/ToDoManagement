const http = require('http');
const util = require('util');
const {join} = require('path');

console.log(__dirname);

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(join(__dirname, 'sqlite'));

const dbRun = util.promisify(db.run.bind(db));
const dbAll = util.promisify(db.all.bind(db));


const updateTaskById = ((task) => {
    for (let id = 1; id <= 5; id++) {
        const query = 'UPDATE Task SET StartDateTime = 4000, EndDateTime = 3000, Status = \'Undone\' '+
        'WHERE Id = \''+ String(id) +'\'';
        dbRun(query);
    }
})

updateTaskById();