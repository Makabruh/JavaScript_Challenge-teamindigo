let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// use when starting application locally
let mongoUrlLocal = "mongodb://admin:password@localhost:27017";

// use when starting application as docker container
let mongoUrlDocker = "mongodb://admin:password@mongodb";

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
        } else {
            console.log("Password doesn't match")
            res.json({ success: false }); //Return false if not
        }
    }

    client.close();
    });
    
    
  });
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});

