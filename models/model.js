const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 40,
  },
  year: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    maxLength: 10,
  },
  description: {
    type: String,
    required: false,
    maxLength: 1000,
  },
  quote: {
    type: String,
    required: false,
    maxLength: 200,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: String,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: false,
    maxLength: 1000,
  },
  author: {
    //_id: rand(id)
    type: mongoose.Schema.Types.ObjectId,
    //From created Schema
    ref: "Author",
  },
});

let Book = mongoose.model("Book", bookSchema);
let Author = mongoose.model("Author", authorSchema);

module.exports = { Book, Author };
