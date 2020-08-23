const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, des, imgURL) {
    this.title = title;
    this.price = price;
    this.des = des;
    this.imgURL = imgURL;
  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log();
        return products;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
