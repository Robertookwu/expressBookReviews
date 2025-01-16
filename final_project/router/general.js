const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  const promiseA = new Promise((resolve,reject) => {
    resolve("Promise successful");

  });
  promiseA.then((successful) => {
    if(successful)
    return res.send(JSON.stringify(books, null , 4));
  }).catch((error) => {
    return res.status(500).json({error: error});
  });
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const promiseA = new Promise((resolve,reject) => {
    resolve("Promise successful");

  });
  promiseA.then((successful) => {
    if(successful){
        const isbn = req.params.isbn;
        return res.send(JSON.stringify(books[isbn], null , 4));
    }
  }).catch((error) => {
    return res.status(500).json({error: error});
  });
  
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Write your code here
    const promiseA = new Promise((resolve,reject) => {
        resolve("Promise successful");
    
      });
      promiseA.then((successful) => {
        if(successful){
            const author = req.params.author;
            let book ;
            for(key in books){
                 if(books[key].author === author){
                 book = books[key];
                break;
                }
            };
            if(book){
                return res.send(JSON.stringify(book,null,4));
              }else{
                return res.status(400).json({message: "No book with such author found"});
              } 
        }
      }).catch((error) => {
        return res.status(500).json({error: error});
      });
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const promiseA = new Promise((resolve,reject) => {
    resolve("Promise successful");

  });
  promiseA.then((successful) => {
    if(successful){
        const title = req.params.title;
  let book ;
  for(key in books){
    if(books[key].title === title){
        book = books[key];
        break;
    }
  }
  if(book){
    return res.send(JSON.stringify(book,null,4));
  } 
  else{
    return res.status(400).json({message: "No book with such title found"});
  }
    }
  }).catch((error) => {
    return res.status(500).json({error: error});
  });

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn]; 
  if(book){
    return res.send(JSON.stringify(book.reviews, null, 4));
  }else{
    return res.status(400).json({message: "No book with such ISBN found"});
  }
});

module.exports.general = public_users;
