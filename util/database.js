const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://TheRaihan:paperback@cluster0.iojlf.mongodb.net/PaperBack?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("DB Conntected");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) return _db;
  throw "No DB Found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
