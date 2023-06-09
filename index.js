// const express = require("express"); // 3rd party package
// const { MongoClient } = require("mongodb");
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
// console.log(process.env)
const app = express();
const PORT = process.env.PORT;
// req => what is the req we sent to Server
// res => what we receive for the req we sent to server

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is Connected");
  return client;
}

const client = await createConnection();

app.use(express.json());

// const books = [
//   {
//     id: "001",
//     name: "Charlotte's web  Charlotte's ",
//     poster:
//       "https://cdn.britannica.com/64/103064-050-295C6879/Charlottes-Web-EB-Garth-Williams.jpg",
//     rating: 8,
//     trailer: "https://www.youtube.com/embed/PU2r9tDwZ1M",
//     summary:
//       "The novel tells the story of a livestock pig named Wilbur and his friendship with a barn spider named Charlotte. When Wilbur is in danger of being slaughtered by the farmer, Charlotte writes messages praising Wilbur in her web in order to persuade the farmer to let him live.",

//     language: "English",
//   },
//   {
//     id: "002",
//     name: "Attitude is everything ",
//     poster: "https://miro.medium.com/max/1400/1*ItFOYfi8Dyy0yj9n1SE8uQ.jpeg",
//     rating: 8.1,
//     trailer: "https://www.youtube.com/embed/gqviJoSkf6U",
//     summary:
//       "Attitude, In psychology, a mental position with regard to a fact or state. Attitudes reflect a tendency to classify objects and events and to react to them with some consistency. Attitudes are not directly observable but rather are inferred from the objective, evaluative responses a person makes.",
//     language: "English",
//   },
//   {
//     id: "003",
//     name: "The Secret",
//     poster: "https://m.media-amazon.com/images/I/81fdQIY6ykL.jpg",
//     rating: 8,
//     trailer: "https://www.youtube.com/embed/san61qTwWsU",
//     summary:
//       "There's no secret to The Secret. The book and movie simply state that your thoughts control the universe. Through this “law of attraction” you “manifest” your desires. “It is exactly like placing an order from a catalogue",
//     language: "English",
//   },
//   {
//     id: "004",
//     name: "Discover Your Destiny",
//     poster: "https://m.media-amazon.com/images/I/61t18yWH5qL.jpg",
//     rating: 6,
//     trailer: "https://www.youtube.com/embed/o8wUR2JAeUw",
//     summary:
//       "'Discover Your Destiny' is a story about enlightenment of Dar Sanderson, who is an incredibly ambitious executive. The book throws light on the fact that 'happiness and harmony can never be achieved and assured by SUCCESS'. Dar is an achiever in almost every aspect of life, yet he is void from the inside.",
//     language: "English",
//   },
//   {
//     id: "005",
//     name: "The 5 AM Club",
//     poster: "https://m.media-amazon.com/images/I/71zytzrg6lL.jpg",
//     rating: 8.6,
//     trailer: "https://www.youtube.com/embed/Kxvp3eOYphY",
//     summary:
//       "In The 5 AM Club: Own Your Morning. Elevate Your Life, he uses a fictitious story about a billionaire mentor teaching a struggling artist and an entrepreneur about the importance of waking up early to show how revolutionary it is for success.",
//     language: "English",
//   },
//   {
//     id: "006",
//     name: "The power is within you",
//     poster:
//       "https://play-lh.googleusercontent.com/1aghoDaz52K3bbZA3EJGHvEpgaru4uMC3Ud2ik_EAW7SjNLwK7nXxOp_Uad-3L6Ovvg4C2-_d1kqVg=w480-h690-rw",
//     rating: 9,
//     summary:
//       'Louise expands on her philosophy of "loving the self" and shows you how to overcome emotional barriers through learning to listen to your inner voice, loving the child within, letting your true feelings out, and much more!',
//     trailer: "https://www.youtube.com/embed/4UzY6ksC6gU",
//     language: "Telugu",
//   },
//   {
//     id: "007",
//     name: "elon musk: tesla, spacex, and the quest for a fantastic future",
//     poster:
//       "https://rukminim1.flixcart.com/image/832/832/kplisnk0/book/l/l/t/elon-musk-original-imag3shevuu2d9qq.jpeg?q=70",
//     rating: 7,
//     summary: "elon musk: tesla, spacex, and the quest for a fantastic future",
//     trailer: "elon musk: tesla, spacex, and the quest for a fantastic future",
//     language: "Hindi",
//   },
//   {
//     id: "008",
//     name: "Harry potter",
//     poster:
//       "https://images-na.ssl-images-amazon.com/images/I/91bsMwU7IzL._RI_.jpg",
//     rating: 9.8,
//     summary:
//       "Adaptation of the first of J.K. Rowling's popular children's novels about Harry Potter, a boy who learns on his eleventh birthday that he is the orphaned son of two powerful wizards and possesses unique magical powers of his own.",
//     trailer: "https://www.youtube.com/embed/fFGS4zZWGoA",
//     language: "Tamil",
//   },
// ];
//REST API endpoint
app.get("/", (req, res) => {
  res.send("Hello Everyone🥳🥳🥳🥳");
});

//Task - 15 mins - 2:35
//     /books - all the books ✅
//     /books?language=English -  only english books ✅
//     /books?language=English&rating=8 - filter by language & rating  ✅
//     /books?rating=8  ✅

//get all books
app.get("/books", async (req, res) => {
  const { language, rating } = req.query; //search query after ?
  console.log(req.query, language);
  // let filteredBooks = books;
  // if (language) {
  //   filteredBooks = filteredBooks.filter((bk) => bk.language === language);
  // }
  // if (rating) {
  //   filteredBooks = filteredBooks.filter((bk) => bk.rating === +rating);
  // }
  if (req.query.rating) {
    req.query.rating = +req.query.rating;
  }
  const books = await client
    .db("b40-b39-we")
    .collection("books")
    .find(req.query)
    .toArray();
  res.send(books);
});

//get books by ID
app.get("/books/:id", async (req, res) => {
  //console.log(req.params);
  const { id } = req.params;
  console.log(id);
  //db.books.findOne({id: "002"})
  const book = await client
    .db("b40-b39-we")
    .collection("books")
    .findOne({ id: id });
  book ? res.send(book) : res.status(404).send({ message: "No Book found" });
});

//delete book ID
app.delete("/books/:id", async (req, res) => {
  //console.log(req.params);
  const { id } = req.params;
  console.log(id);
  //db.books.deleteOne({id: "002"})
  const book = await client
    .db("b40-b39-we")
    .collection("books")
    .deleteOne({ id: id });
  res.send(book);
});

//add books

app.post("/books", async (req, res) => {
  //console.log(req.params);
  const newBooks = req.body;
  console.log(newBooks);
  //db.books.deleteOne({id: "002"})
  const result = await client
    .db("b40-b39-we")
    .collection("books")
    .insertMany(newBooks);
  res.send(result);
});

app.listen(PORT, () => console.log("Server started on PORT ", PORT));

//CRUD     -  HTTP methods
// C - CREATE -  POST -   insert, add, create
// R - READ   -  GET  -   get, read which is already available
// U - UPDATE -  PUT  -   edit, update
// D - DELETE -  DELETE  - delete
