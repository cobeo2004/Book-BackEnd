const { Author, Book } = require("../models/model");

const authorController = {
  addAuthor: async (request, response) => {
    try {
      const newAuth = new Author(request.body);
      const savedAuthor = await newAuth.save();
      response.status(200).json(savedAuthor);
    } catch (err) {
      response.status(500).json(err);
    }
  },

  getAllAuthor: async (request, response) => {
    try {
      const auth = await Author.find().populate("books");
      response.status(200).json(auth);
    } catch (error) {
      response.status(500).json(error);
    }
  },
  getAnAuthorBasedOnId: async (request, response) => {
    try {
      const author = await Author.findById(request.params.id).populate("books");
      response.status(200).json(author);
    } catch (error) {
      response.status(500).json(error);
    }
  },
  updateAuthorBasedOnId: async (request, response) => {
    try {
      const author = await Author.findById(request.params.id);
      await author.updateOne({ $set: request.body });
      response
        .status(200)
        .json(`Updated Author at ${request.params.id} Successfully`);
    } catch (error) {
      response.status(500).json(error);
    }
  },
  deleteAuthorBasedOnId: async (request, response) => {
    try {
      await Book.updateMany({ author: request.params.id }, { author: null });
      await Author.findByIdAndDelete(request.params.id);
      response
        .status(200)
        .json(`Deleted Author at ${request.params.id} Successfully`);
    } catch (error) {
      response.status(500).json(error);
    }
  },
};

module.exports = authorController;
