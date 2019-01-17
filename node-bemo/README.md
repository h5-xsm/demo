# nodejs 操作 mongodb

- 第三方模块来做支持
  - mongodb
  - mongoose
  - xxxxx



我的天，李威真帅

使用 ssh 的方式去连接远程仓库


1. 生成本地电脑的 公钥与私钥
  ssh-keygen -t rsa -C "xxx@xxx.com"

1.1 将本地 生成的  公钥 给写到 远程平台上（github）

2. 将本地仓库与远程仓库建立py关系
  git remote add origin xxxx


# 添加

- save
- insertOne
- insertMany

db.users.save({ name: '张三', age: 19 })
db.users.insertOne({ name: '李四', age: 20 })
db.users.insertMany(
  [
    {
      name: '王五'
    },
    {
      name: '马六'
    }
  ]
)

# 删除

- remove
- deleteOne
- deleteMany

db.users.remove({name: '张三'}, {justOne: true})

# 修改

- save      如果传入了 _id ，那么 save 会变成 修改
- update
- updateOne
- updateMany

db.users.save(
  { 
    _id: ObjectId("5c3fe3bb04f06e2406fe7cff"), 
    name: '李四',
    age: 50
  }
)

db.users.update(
  {
    name: '赵⑦'
  },

  {
    $set: {
      age: 200
    }
  },

  {
    upsert: true,
    multi: true
  }
)


# 分页

总条数 （totalSize） 11 数据

每页显示 (pageSize) 5条

当前第几页 (pageNum) 

一共多少页 (totalPage)        Math.ceil(totalSize / pageSize);

1 db.films.find().skip(0).limit(5)

2 db.films.find().skip(5).limit(5)

3 db.films.find().skip(10).limit(5)

公式： db.films.find().skip( (pageNum - 1) * pageSize ).limit(pageSize)