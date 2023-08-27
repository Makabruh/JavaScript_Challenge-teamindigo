let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();
let globalUsername = ' ';

//FOR DELETE
const { ObjectId } = require('mongodb');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// use when starting application locally - this needs to be commented for building the image
let mongoUrlLocal = "mongodb://admin:password@localhost:27017";

// use when starting application as docker container - this needs to be uncommented for building the image
//let mongoUrlLocal = "mongodb://admin:password@mongodb";

// pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

let databaseName = "user-data";


app.post('/create-profile', function (req, res) {
  const userPayload = req.body; // Get the payload from the request body
  const username = userPayload.username;

  // Connect to the db
  MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
    if (err) {
      console.error("Error connecting to MongoDB:", err);
      res.status(500).send("Error connecting to the database.");
      return;
    }

    const db = client.db(databaseName);

    // Create a new user document
    const newUser = {
      _id: username, // Using the username as the document _id
      firstName: userPayload.firstName,
      lastName: userPayload.lastName,
      email: userPayload.email,
      password: userPayload.password
    };

    // Insert the new user document into the "users" collection
    db.collection("users").insertOne(newUser, function (err, result) {
      if (err) {
        console.error("Error inserting user into MongoDB:", err);
        res.status(500).send("Error inserting user into the database.");
        return;
      }

      client.close();

      // Send a success response
      res.status(200).send("User created successfully.");
    });
  });
});

app.post('/check-profile', function (req, res) {
  const userPayload = req.body; // Get the payload from the request body
  const username = userPayload.username; //Get the username
  const password = userPayload.password; //Get the password
  console.log(username)
  console.log(password)

  // Connect to the db
  MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
    if (err) {
      console.log("Error: Database Connection")
      console.error("Error connecting to MongoDB:", err);
      res.status(500).send("Error connecting to the database.");
      return;
    }

    const db = client.db(databaseName);
    const collection = db.collection('users'); //Use the users table

    collection.findOne({_id: username}, function(err, user){  //Find the user in the users table using the username
      if (err) {
        console.log("Error: Finding User")
        console.error("Error finding user:", err);
        res.status(500).send("Error finding user.");
        return;
    } else {
      console.log(user);
    }

    if (!user) {
        console.log("User doesn't exist")
        res.json({ success: false });
    } else {
        if (user.password === password) {
            res.json({ success: true, user: user }); //Return success if the user's entered password matches the password in the database
            globalUsername = user._id; //Upon login, set the global username to the username
            console.log(globalUsername);
        } else {
            console.log("Password doesn't match")
            res.json({ success: false }); //Return false if not
        }
    }

    client.close();
    });
    
    
  });
});

app.post('/add-expense', function (req, res) {
  const userPayload = req.body; // Get the payload from the request body
  const expenseName = userPayload.expenseName;

  // Connect to the db
  MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
    if (err) {
      console.error("Error connecting to MongoDB:", err);
      res.status(500).send("Error connecting to the database.");
      return;
    }

    const db = client.db(databaseName);

    // Create a new user document
    const newExpense = {
      _id: expenseName,
      category: userPayload.category,
      frequency: userPayload.frequency,
      expValue: userPayload.expValue,
      selectedEssentialValue: userPayload.selectedEssentialValue,
      savingDesc: userPayload.savingDesc,
      savingValue: userPayload.savingValue
    };

    // Insert the new expense document into the collection named the username
    db.collection(globalUsername).insertOne(newExpense, function (err, result) {
      if (err) {
        console.error("Error inserting user into MongoDB:", err);
        res.status(500).send("Error inserting user into the database.");
        return;
      }

      client.close();

      // Send a success response
      res.status(200).send("Expense created successfully.");
    });
  });
});

app.get('/get-number-of-expenses', function (req, res) {
  let response = {};
  // Connect to the db
  MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);

    db.collection(globalUsername).countDocuments({}, function (err, count) {
      if (err) {
        console.error("Error counting documents:", err);
        res.status(500).send("Error counting documents.");
        return;
      }

      client.close();

      // Send the count as the response
      res.status(200).json({ count });
    });
    
  });
});

//Will maybe need to get a loop running to check the number of entries and transfer them all to main-page.js
app.get('/get-profile-data', function (req, res) {
  const numberOfExpenses = parseInt(req.query.numberOfExpenses); // Get the number from the query parameter

  MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
    if (err) {
      console.error("Error connecting to MongoDB:", err);
      res.status(500).send("Error connecting to the database.");
      return;
    }

    const db = client.db(databaseName);
    const collection = db.collection(globalUsername);

    // Find the specified number of documents
    collection.find().limit(numberOfExpenses).toArray(function (err, expenses) {
      if (err) {
        console.error("Error fetching expenses:", err);
        res.status(500).send("Error fetching expenses.");
        return;
      }

      client.close();

      // Send the expenses as the response
      res.status(200).json({ expenses });
    });
  });
});

app.get('/get-user-name', function (req, res) {

  let response = {};
  MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);

    let myquery = { _id: globalUsername };

    db.collection("users").findOne(myquery, function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      // Send response
      res.send(response ? response : {});
    });
  });
});

app.post('/delete-expense', function (req, res) {

  const expenseIdToDelete = req.body._id;
  console.log(expenseIdToDelete);

  
  MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
    if (err) {
      res.status(500).send({ error: 'An error occurred while connecting to the database.' });
      return;
    }

    const db = client.db(databaseName);
    const collection = db.collection(globalUsername);

    

    // Construct the query to find the document by _id
    const query = { _id: expenseIdToDelete };

    
    collection.deleteOne(query, function (err, result) {
      client.close();

      if (err) {
        res.status(500).send({ error: 'An error occurred while deleting the document.' });
        return;
      }

      if (result.deletedCount === 1) {
        res.send({ message: 'Expense deleted successfully.' });
      } else {
        res.status(404).send({ error: 'Expense not found.' });
      }
    });
    
  });
  
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});

