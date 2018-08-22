#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith("mongodb://")) {
  console.log(
    "ERROR: You need to specify a valid mongodb URL as the first argument"
  );
  return;
}

var async = require("async");
var Question = require("./models/question");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

var questions = [];

function questionCreate(
  name,
  language,
  description,
  tests,
  solution,
  output,
  cb
) {
  questiondetail = {
    name: name,
    language: language,
    description: description,
    tests: tests,
    solution: solution,
    output: output
  };

  var question = new Question(questiondetail);
  question.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Question: " + question);
    questions.push(question);
    cb(null, question);
  });
}

function createQuestions(cb) {
  async.parallel(
    [
      function(callback) {
        questionCreate(
          "1 Spring 18",
          "scheme",
          "(fun L) returns the sum of the fourth powers of all the odd positive numbers in the list L. Example: (fun '(2 3 -2 6 5 -3)) returns 34 + 54 = 706. Do not use “set!” except where explicitly permitted",
          ["(fun '(2 3 -2 6 5 -3))"],
          "(define (fun L) (if (null? L) 0\n\t(if (or (<= (car L) 0) (even? (car L))) (fun (cdr L))\n\t(+ (square (square (car L))) (fun (cdr L))))))",
          "expected output",
          callback
        );
      },

    ],
    // optional callback
    cb
  );
}

async.series(
  [createQuestions],
  // Optional callback
  function(err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
