const https = require('https');
const fs = require('fs');
const crypto = require("crypto");

var users = []
var ids = []

function getUser(id) {
    https.get('https://reqres.in/api/users/' + id, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('data', () => {
            var user = JSON.parse(data).data
            user = userPostProcessing(user)
            users.push(user)
            if (users.length === 10)
                fs.writeFile(db_dir + 'data.json', JSON.stringify(users, "", 4), (err) => {
                    if (err) throw err;
                });
        });
    })
}

function userPostProcessing(user) {
    user.name = user.first_name + ' ' + user.last_name
    user.avatar_path = user.first_name + '_' + user.last_name + '.jpg'

    var id = crypto.randomBytes(16).toString("hex")
    while (ids.includes(id))
        id = crypto.randomBytes(16).toString("hex")

    ids.push(id)
    var obj = {
        id: id,
        name: user.name,
        avatar: './images/' + user.avatar_path
    }
    getAvatar(user.avatar, images_dir + user.avatar_path)
    return obj
}

function getAvatar(url, file_name) {
    var file = fs.createWriteStream(file_name);
    https.get(url, function(response) {
        response.pipe(file);
    });
}

function create_dir(path) {
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
}

var db_dir = './db/'
var images_dir = './db/images/'

create_dir(db_dir)
create_dir(images_dir)

for(var i = 1; i <= 10; i++)
{
    getUser(i)
}