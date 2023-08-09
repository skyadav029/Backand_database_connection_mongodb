const crypto=require('crypto')
const key1=crypto.randomBytes(32).toString('hex')
console.log(key1)    // write in terminal  nodemon ./helpers/genrate_keys.js
    // throw an error then type some comand in powershell as an admistator mod
    // type command :-  Set-ExecutionPolicy RemoteSigned -Scope CurrentUser type A

    const key2=crypto.randomBytes(32).toString('hex')
    //console.log({key1,key2})// here {} mens key1: ____ and key2:___
console.table({key1,key2})