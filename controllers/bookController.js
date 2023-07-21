const { Author, Book } = require("../models/model");

const bookController = {
  addBook: async (request, response) => {
    try {
      const newBook = new Book(request.body);
      const savedBook = await newBook.save();
      //Check author and add Book => Author
      if (request.body.author) {
        //Or Author.findById(id);
        const author = Author.find({ _id: request.body.author });
        //Update once and only once
        await author.updateOne({ $push: { books: savedBook._id } });
      }
      response.status(200).json(savedBook);
    } catch (err) {
      response.status(500).json(err);
    }
  },
  getAllBook: async (request, response) => {
    try {
      const book = await Book.find().populate("author");
      response.status(200).json(book);
    } catch (error) {
      response.status(500).json(error);
    }
  },
  getABookBasedOnId: async (request, response) => {
    try {
      const book = await Book.findById(request.params.id).populate("author");
      response.status(200).json(book);
    } catch (error) {
      response.status(500).json(error);
    }
  },
  updateBookBasedOnId: async (request, response) => {
    try {
      const book = await Book.findById(request.params.id);
      await book.updateOne({ $set: request.body });
      response
        .status(200)
        .json(`Updated Book at ID: ${request.params.id} Successfully`);
    } catch (error) {
      response.status(500).json(error);
    }
  },
  deleteBookBasedOnId: async (request, response) => {
    try {
      await Book.updateMany(
        {
          "author.books": request.params.id,
        },
        { $pull: { "author.books": request.params.id } }
      );
      await Book.findByIdAndDelete(request.params.id);
      await Author.updateMany(
        { books: request.params.id },
        { $pull: request.params.id }
      );
      response
        .status(200)
        .json(`Deleted book at ID: ${request.params.id} Successfully`);
    } catch (error) {
      response.status(500).json(error);
    }
  },
};
module.exports = bookController;
