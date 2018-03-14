var hello1Factory = require('./module')
var hello2Factory = require('./module')

var hello1 = hello1Factory()
var hello2 = hello2Factory()

hello1.setName('BYVoid');
hello2.setName('BYVoid 2');

hello1.sayHello();