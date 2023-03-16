const http = require('http');

const postData = {
    "Name": "夕食",
    "Status": "Undone",
    "StartDateTime": null,
    "EndDateTime": null,
};

const putData = {
    "Name": "夕食",
    "Status": "着手",
    "StartDateTime": 100000,
    "EndDateTime": null,
    "Id": '1'
};

const postDataStr = JSON.stringify(postData);
const putDataStr = JSON.stringify(putData);

const options_post = {
    hostname: '127.0.0.1',
    port: 3000,
    path: '/api/tasks',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postDataStr)
    }
};

// GET
// function getReq() {
//     http.request('http://127.0.0.1:3000/api/tasks', res => {
//         console.log('STATUS: ' + res.statusCode);
//         console.log('HEADERS: ' + JSON.stringify(res.headers));
//         res.setEncoding('utf8');
//         let responseData = '';
//         res.on('data', (chunk) => {
//             console.log(chunk);
//             responseData += chunk
//         });
//         res.on('end', () => console.log('クライアント側の取得結果: ',JSON.parse(responseData)));
//     }).end();
// }

// POST
function postReq() {
    const post_req = http.request(options_post, res => {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        let responseData = '';
        res.on('data', chunk => responseData += chunk);
        res.on('end', () => console.log('result: ', responseData));
    });
    post_req.on('error', (e) => {
        console.log('problem with request: ' + e.message);
    });
    post_req.write(postDataStr);
    post_req.end();
}

// PUT
// function putReq() {
//     const options_put = {
//         hostname: '127.0.0.1',
//         port: 3000,
//         path: '/api/tasks',
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Content-Length': Buffer.byteLength(putDataStr)
//         }
//     };
//     const put_req = http.request(options_put, res => {
//         console.log('STATUS: ' + res.statusCode);
//         console.log('HEADERS: ' + JSON.stringify(res.headers));
//         res.setEncoding('utf8');
//         let responseData = '';
//         res.on('data', chunk => responseData += chunk);
//         res.on('end', () => console.log('result: ', responseData));
//     });
//     put_req.on('error', (e) => {
//         console.log('problem with request: ' + e.message);
//     });
//     put_req.write(putDataStr);
//     put_req.end();
// }

postReq();