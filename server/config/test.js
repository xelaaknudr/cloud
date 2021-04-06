show databases();
db.createCollection("users");
db.dropDatabase() //удалить

db.users.insert({
  name: "alex",
  age: 30
})  //есть еще insertOne, insertMany, просто insert - depricated

db.users.find() // найдет всех

db.users.insertMany([
  { name: "vasia", age: 12 },
  { name: "alisa", age: 20 },
  { name: "patia", age: 22 },
])

db.users.find({ age: 20 }) //поиск по критерию
db.users.find({ $or: [{ name: alisa }, { age: 25 }]}) // поиск по или. Или имя или возраст
db.users.find({ age: { $lt: 30 } }) //поиск меньше чем 30
db.users.find({ age: { $lte: 30 } }) //поиск меньше или равно 30
db.users.find({ age: { $ne: 30 } }) //не равен 30
db.users.find().sort({ age: 1 }) //сортировка -1 или 1 в обратном или не оратном порядке
db.users.find().limit(10) // первые 10 записей
db.users.find({ _id: ObjectId("348573406893745069587") }) // поиск по objectId
db.users.distinct("age", {}) //вернет массив уникальных значений [12, 20, 22]
db.users //и тут пойдут типа методу findOneAndUpdate, findOneAndreplace они все похожи и понятны по сути

db.users.update({
  name: "vasia"
}, {
  $set: {
    name: "vasia zamenen"
  }
}) // обновить значения

db.users.updateMany({}, //обновит все т.к пустой obj
  {
  rename: {
    name: "fullName"
  }
}) // обновить именно ключи в базе

db.users.deleteOne({ age: 22 }) // удалит с возрастом 22

db.users.bulkWrite([
  {
    insertOne: {
      document: {
        name: "vladik", age: 45
      }
    }
  },
  {
    deleteOne:{
      filter: { name: "vasia" }
    }
  }
]) // множественная операция. Вставит владика и удалит васю

db.users.update({ //связь одн ко многим
  name: "vasia"
}, {$set: {
  posts: [
    { commnet: '123', title: 'string' },
    { commnet: '12333', title: 'string2' },
    { commnet: '19923', title: 'string3' }
  ]
}}) //добавит к объектам где есть вася массив постов

db.users.findOne({ name: "vasia" }, { posts: 1 }) // тут будет выдавать только посты пользователя vasia
db.users.find({ posts: {
  $elemMatch: {
    comment: '123'
  }
} }) // тут поиск работает так. Он найдет пользователей где есть пост comment: '123'

db.users.find({ post: {$exists: true} }) //найдет юзеров у которых есть посты
