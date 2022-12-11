const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');

const users = [];

const p = path.join(rootDir, 'data', 'users.json');

const getUsersFromFile = cb => {
   fs.readFile(p, (err, fileContent) => {
      if(err) {
         return cb([]);
      }
      cb(JSON.parse(fileContent));
   });
}

module.exports = class User {

   constructor(username) {
      this.username = username;
   }

   save() {
      getUsersFromFile(users => {
         users.push(this);
         fs.writeFile(p, JSON.stringify(users), (err) => {
            console.log('error writing file');
         });
      });
   }

   static fetchAll(cb) {
      getUsersFromFile(cb);
   }
}