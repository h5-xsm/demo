const fs = require('fs');
const path = require('path');
const qs = require('querystring');

// 引入 mongodb 模块
const MongoClient = require('mongodb').MongoClient;
// 定义连接 数据库的 url地址
const url = 'mongodb://localhost:27017';

module.exports = {
  login(req, res) {
    var data = fs.readFileSync(path.resolve(__dirname, '../views/login.html'));
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    res.write(data);
    res.end();
  },

  register(req, res) {
    var data = fs.readFileSync(path.resolve(__dirname, '../views/register.html'));
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    res.write(data);
    res.end();
  },

  home(req, res) {
    res.write('首页');
    res.end();
  },



  /**
   * 注册请求
   * @param {*} req 
   * @param {*} res 
   */
  registerFn(req, res) {
    // 1. 得到页面传递过来的用户名与密码
    var rawData = '';
    req.on('data', (chunk) => {
      rawData += chunk;
    });

    req.on('end', () => {
      var params = qs.parse(rawData);

      // 2. 将用户名与密码写入到数据库中 { name: '', pwd: '' }

      // 2.1 连接数据库
      MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        // client 数据库的连接对象
        if (error) {
          console.log('连接数据库失败')
        } else {
          console.log('连接数据库成功');

          // 2.2 选择某个数据库（db）
          var db = client.db('test');

          // 2.3 使用  db 去操作。。。
          db.collection('users').insertOne({
            name: params.username,
            pwd: params.password
          }, (err) => {
            if (err) {
              console.log('注册失败');
            } else {
              console.log('注册成功');
            }

            // 3. 记得在操作完成之后，将数据库的连接给关闭
            client.close();

            // 关闭请求
            res.end();
          })
        }
      })

      // ，，，，
    })

    
  },

  loginFn(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });

    var rawData = '';
    req.on('data', (chunk) => {
      rawData += chunk;
    })

    req.on('end', () => {
      var params = qs.parse(rawData);

      MongoClient.connect(url, (error, client) => {
        if (error) {
          console.log('连接数据库失败');
          res.write('连接数据库失败');
        } else {
          console.log('连接数据库成功');

          var db = client.db('test');

          // db.collection('users').find({
          //   name: params.username,
          //   pwd: params.password
          // }).toArray()

          db.collection('users').find({
            name: params.username,
            pwd: params.password
          }).count(function(err, num) {
            if (err) {
              console.log('查询失败');
            } else {
              console.log('查询成功');
              // 判断查找到的记录条数
              if (num === 1) {
                console.log('登陆成功');
                res.write('登陆成功');
              } else {
                console.log('登陆失败');
                res.write('用户名或密码不正确');
              }
            }

            // 关闭连接
            // 关闭请求
            client.close();
            res.end();
          })
        }

        
      })
    })

    
  } 
}