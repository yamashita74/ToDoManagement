// テーブルを作成する
const util = require('util');
const {join} = require('path');

console.log(__dirname);

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(join(__dirname, 'sqlite'));

const dbRun = util.promisify(db.run.bind(db));

const createTaskTable =
    'CREATE TABLE Task (' +
        'Id INTEGER PRIMARY KEY AUTOINCREMENT' +
        ', Name TEXT NOT NULL' +
        ', StartDateTime INTEGER' +
        ', EndDateTime INTEGER' +
        ', Status TEXT NOT NULL' +
    ')';

dbRun(createTaskTable).then(() => {
    console.log('Table Init Completed');
});