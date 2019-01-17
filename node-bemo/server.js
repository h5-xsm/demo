const http = require('http');
const url = require('url');
const routes = require('./modules/routes');

http.createServer((req, res) => {

  // 判断 登录或者注册
  if (req.url === '/favicon.ico') {
    res.end();
    return;
  }

  var pathName = url.parse(req.url).pathname.substr(1);

  try {
    routes[pathName](req, res);
  } catch (error) {
    console.log(error.message);
    routes['home'](req, res);
  }

}).listen(3000);

console.log('服务启动成功');