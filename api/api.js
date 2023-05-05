const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const url = require('url');
const bodyParser = require('body-parser');
const router = express.Router();

const app = express();
const port = 7778;

// After painstaking time of figuring out how to connect the api to a mysql database on a separate container, I've
// come across the real issue and solved the problems. Steps and explaination below:
// 1. On fresh 'docker-compose up' login to the mysql server and apply the following commands:
//   ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY '<password>';
//   flush privileges;
// 2. Then inspect docker network get the mysql container's ip and put it as the host value in the connection object
//    below.
// Connecting to the mysql db in a separate docker container was implemented by setting up a dedicated docker network,
// supplying a dedicated ip subnet and gateway for the network, and then making minor changes to mysql/server 
// connection.
// NOTE: We should probably upgrade to mysql2 (change the dependency in the docker file) and it should mitigate this
//       process for modifying privileges in the mysql database. Check out the following stack overflow question:
//       https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);  // Enable router with express

main();
function main() {
    var connection = mysql.createConnection({
        host: "<server_name>",
        database: "<db_name>", 
        user: "root", 
        password: "<password>",
        debug: true,
        port: 3306 
    });
    
    connection.connect(function(error) {
        if (error) {
            throw error;
        } else {
            console.log("Connected to database <db_name>.");
        }
    });
    
    router.get("/", (req, res) => {
        // Return information about the api.
        res.json([
            {
                "/mysql-init": {
                    "about": "Creates the tables needed for the database.",
                    "notice": "NOTICE: Dev endpoint only. This should be disabled on production."
                },
                "/mysql-drop-all": {
                    "about": "Deletes all data and tables from the database.",
                    "notice": "NOTICE: Dev endpoint only. This should be disabled on production."
                },
                "/api/users": "Fetches users from MySQL server.",
                "/api/users/login": {
                    "about": "Endpoint to log a user in. Endpoint takes a POST request, checks inputs against DB data, "
                             + "and returns user info to be stored in browser storage if there's a match between the "
                             + "two.",
                    "parameters": {
                        "email": "The user input email.",
                        "passHash": "The user input password that's been hashed client side."
                    }
                },
                "/api/users/add": {
                    "about": "Endpoint to create a new user. Endpoint takes a POST request, checks to make sure user "
                             + "doesn't already exist, and then creates the new users account.",
                    "parameters": {
                        "email": "The user input email.",
                        "passHash": "The user input password that's been hashed client side.",
                        "firstName": "The last name of the user.",
                        "lastName": "The first name of the user."
                    }
                },
                "/api/users/delete": {
                    "about": "Endpoint to delete a user. Endpoint takes a POST request and deletes the user where the "
                             + "id matches. It can be used with input data (such as requesting the user to verify), "
                             + "or pulled from stored locations such as localStorage.",
                    "parameters": {
                        "id": "The unique id for a user.",
                        "email": "The user input/stored email.",
                        "passHash": "The user input papssword that's been hashed client side.",
                        "firstName": "The user's stored first name.",
                        "lastName": "The user's stored last name."
                    }
                },
                "/api/users/delete-all": {
                    "about": "Endpoint used to delete all users from the database.",
                    "notice": "NOTICE: Dev endpoint only. This should be disabled on production."
                },
                "/api/tasks": "Fetches task data from MySQL server.",
                "/api/tasks/add": {
                    "about": "Endpoint to create tasks. Endpoint takes a POST request and creates a task assigned to "
                              + "the user.",
                    "parameters": {
                        "userId": "The id of the user the task belongs to.",
                        "title": "The title of the task.",
                        "description": "The description of the task.",
                        "reminder": "Switch determining whether reminders are enabled or not.",
                        "dueDate": "The date the task is due.",
                        "dueTime": "The time the task is due.",
                        "reminderDueDate0": "The date a reminder should remind.",
                        "reminderDueDate1": "The date a reminder should remind.",
                        "reminderDueDate2": "The date a reminder should remind.",
                        "reminderDueTime0": "The time a reminder should remind.",
                        "reminderDueTime1": "The time a reminder should remind.",
                        "reminderDueTime2": "The time a reminder should remind.",
                    }
                },
                "/api/tasks/delete": {
                    "about": "Endpoint to delete a task. Endpoint takes a POST request and deletes a task assigned to "
                              + "the user.",
                    "parameters": {
                        "id": "The id of the task.",
                        "userId": "The id of the user the task belongs to.",
                        "title": "The title of the task.",
                        "description": "The description of the task.",
                        "reminder": "Switch determining whether reminders are enabled or not.",
                        "dueDate": "The date the task is due.",
                        "dueTime": "The time the task is due.",
                        "reminderDueDate0": "The date a reminder should remind.",
                        "reminderDueDate1": "The date a reminder should remind.",
                        "reminderDueDate2": "The date a reminder should remind.",
                        "reminderDueTime0": "The time a reminder should remind.",
                        "reminderDueTime1": "The time a reminder should remind.",
                        "reminderDueTime2": "The time a reminder should remind.",
                    }
                },
                "/api/tasks/delete-all": {
                    "about": "Endpoint used to delete all tasks from the database.",
                    "notice": "NOTICE: Dev endpoint only. This should be disabled on production."
                },
                "/api/worktimes": "Fetches work time data from MySQL server.",
                "/api/worktimes/clockin": {
                    "parameters": {
                        "userId": "The id of the user the work time belongs to.",
                        "clockInTime": "The current time you clocked in.",
                        "dayOfWork": "The day of work the clock in time pertains to."
                    }
                },
                "/api/worktimes/clockbreak": {

                },
                "/api/worktimes/clockout": {

                },
                "/api/worktimes/clockcomplete": {

                },
                "/api/worktimes/delete": {
                    "about": "Endpoint to delete a work time. Endpoint takes a POST request and deletes a work time assigned to "
                              + "the user.",
                    "parameters": {
                        "id": "The id of the task.",
                        "title": "The title of the task.",
                        "description": "The description of the task.",
                        "reminder": "Switch determining whether reminders are enabled or not.",
                        "dueDate": "The date the task is due."
                    }
                },
                "/api/worktimes/delete-all": {
                    "about": "Endpoint used to delete all work times from the database.",
                    "notice": "NOTICE: Dev endpoint only. This should be disabled on production."
                }
            }
        ]);
    });

    router.get("/mysql-init", (req, res) => {
        let arrayInitQueries = [];
        const sqlUserTableQuery = "CREATE TABLE IF NOT EXISTS users ("
                                  + "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, "
                                  + "email VARCHAR(255) NOT NULL, "
                                  + "passHash VARCHAR(255) NOT NULL, "
                                  + "firstName VARCHAR(255) NOT NULL, "
                                  + "lastName VARCHAR(255) NOT NULL "
                                  + ");";
        const sqlUserPreferencesTableQuery = "CREATE TABLE IF NOT EXISTS userpreferences ("
                                             + "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, "
                                             + "userId INT NOT NULL, "
                                             + "preferences JSON "
                                             + ");";
        const sqlBillTableQuery = "CREATE TABLE IF NOT EXISTS bills ("
                                  + "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, "
                                  + "userId INT NOT NULL, "
                                  + "title VARCHAR(255) NOT NULL, "
                                  + "reminder BOOLEAN NOT NULL, "
                                  + "autopay BOOLEAN NOT NULL, "
                                  + "description VARCHAR(255) NOT NULL, "
                                  + "amount FLOAT(24) NOT NULL, "
                                  + "dueDate VARCHAR(255) NOT NULL, "
                                  + "reminderDueDate0 VARCHAR(255) NOT NULL, "
                                  + "reminderDueDate1 VARCHAR(255) NOT NULL, "
                                  + "reminderDueDate2 VARCHAR(255) NOT NULL, "
                                  + "reminderDueTime0 VARCHAR(255) NOT NULL, "
                                  + "reminderDueTime1 VARCHAR(255) NOT NULL, "
                                  + "reminderDueTime2 VARCHAR(255) NOT NULL "
                                  + ");";
        const sqlTaskTableQuery = "CREATE TABLE IF NOT EXISTS tasks ("
                                  + "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, "
                                  + "userId INT NOT NULL, "
                                  + "title VARCHAR(255) NOT NULL, "
                                  + "description VARCHAR(255) NOT NULL, "
                                  + "reminder BOOLEAN NOT NULL, "
                                  + "dueDate VARCHAR(255) NOT NULL, "
                                  + "dueTime VARCHAR(255) NOT NULL, "
                                  + "reminderDueDate0 VARCHAR(255) NOT NULL, "
                                  + "reminderDueDate1 VARCHAR(255) NOT NULL, "
                                  + "reminderDueDate2 VARCHAR(255) NOT NULL, "
                                  + "reminderDueTime0 VARCHAR(255) NOT NULL, "
                                  + "reminderDueTime1 VARCHAR(255) NOT NULL, "
                                  + "reminderDueTime2 VARCHAR(255) NOT NULL "
                                  + ");";
        const sqlWorkTimeTableQuery = "CREATE TABLE IF NOT EXISTS worktimes ("
                                      + "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, "
                                      + "userId INT NOT NULL, "
                                      + "clockInTime VARCHAR(255) DEFAULT '-1', "
                                      + "clockOutTime VARCHAR(255) DEFAULT '-1', "
                                      + "hasTakenBreak BOOLEAN DEFAULT 1, "
                                      + "dayOfWork VARCHAR(255) DEFAULT '-1'"
                                      + ");";
        // TODO: Add below queries to api
        const sqlIsBillSharedTableQuery = "CREATE TABLE IF NOT EXISTS isbillshared ("
                                          + "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, "
                                          + "isShared BOOLEAN NOT NULL, "
                                          + "billId INT NOT NULL, "
                                          + "userIdA INT NOT NULL, "
                                          + "userIdB INT NOT NULL "
                                          + ");";
        const sqlIsTaskSharedTableQuery = "CREATE TABLE IF NOT EXISTS istaskshared ("
                                          + "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, "
                                          + "isShared BOOLEAN NOT NULL, "
                                          + "taskId INT NOT NULL, "
                                          + "userIdA INT NOT NULL, "
                                          + "userIdB INT NOT NULL "
                                          + ");";
    
        arrayInitQueries.push(sqlUserTableQuery);
        arrayInitQueries.push(sqlUserPreferencesTableQuery);
        arrayInitQueries.push(sqlBillTableQuery);
        arrayInitQueries.push(sqlTaskTableQuery);
        arrayInitQueries.push(sqlWorkTimeTableQuery);
        arrayInitQueries.push(sqlIsBillSharedTableQuery);
        arrayInitQueries.push(sqlIsTaskSharedTableQuery);
    
        let haveAllQueriesInitialized = true;
        let queryError;
        let allResult = []
        arrayInitQueries.forEach((query, queryIndex) => {
            try {
                connection.connect(function (err) {
                    connection.query(query, function (err, result, fields) {
                        if (err) {
                            haveAllQueriesInitialized = false;
                            queryError = err;
                        } else {
                            allResult.push(result);
                        }
                    });
                });
            } catch (error) {
    
            }
        });

        if (haveAllQueriesInitialized) {
            res.json([
                {
                    "response": allResult.map(result => {return result + ' '}),
                    "message": "Init query ran successfully."
                }
            ]);
        } else {
            res.json([
                {
                    "response": queryError,
                    "message": "'" + query + "' was not ran successfully."
                }
            ])
        }
    });
    
    router.get("/mysql-drop-all", async (req, res) => {
        let arrSqlTables = ['users', 'userpreferences', 'bills', 'tasks', 'worktimes', 'isshared'];
        let errors = "";
        let tablesDropped = "";
        await arrSqlTables.forEach((strTable, strTableIndex) => {
            const sqlQuery = "DROP TABLE " + strTable + ";";
            
            connection.connect(function (err) {
                connection.query(sqlQuery, function (err, result, fields) {
                    if (err) { 
                        errors += result + "\n";
                    } else {
                        tablesDropped += "'" + strTable + "' ";
                    }
                });
            });
        });

        if (errors != "") {
            res.json([
                {
                    "response": "Error",
                    "message": errors + "tables were not deleted."
                }
            ]);
        } else {
            res.json([
                {
                    "response": "Success",
                    "message": "[" + tablesDropped + "] were deleted successfully."
                }
            ]);
        }
    });

    router.get("/api/users", (req, res) => {
        const sqlQuery = "SELECT * FROM users;";
    
        connection.connect(function (err) {
            connection.query(sqlQuery, function (err, result, fields) {
                if (err) {
                    throw err;
                } else {
                    const usersList = [];

                    // Return non-sensitive user data
                    for(let i = 0; i < result.length; i++) {
                        const dbUser = result[i];
                        const aUser = {
                            "id": dbUser.id,
                            "email": dbUser.email,
                            "firstName": dbUser.firstName,
                            "lastName": dbUser.lastName,
                        }
                        usersList.push(aUser);
                    }

                    res.json([
                        usersList
                    ]);
                }
            });
        });
    });
    router.post("/api/users/login", (req, res) => {
        const sqlQuery = "SELECT * FROM users;";
        console.log("Login request body: " + JSON.stringify(req.body, null, '\t'));
    
        connection.connect(function (err) {
            connection.query(sqlQuery, function (err, result, fields) {
                if (err) {
                    throw err;
                } else {
                    let foundUser = false;
                    let userData = {};

                    // Check if login credentials match stored user
                    for(let i = 0; i < result.length; i++) {
                        let dbUser = result[i];
                        if (req.body.email === dbUser.email && req.body.passHash === dbUser.passHash) {
                            if (foundUser === true) {
                                res.json([
                                    {
                                        "result": "Error",
                                        "message": "Duplicate users."
                                    }
                                ])
                                return;
                            } else {
                                foundUser = true;
                                userData = {
                                    "id": dbUser.id,
                                    "email": dbUser.email,
                                    "firstName": dbUser.firstName,
                                    "lastName": dbUser.lastName,
                                }
                            }
                        }
                    }

                    // Check if we received a match. If so, pass data back to user. Otherwise, return error
                    if (foundUser === true && userData !== null) {
                        res.json([
                            {
                                "result": "Success",
                                "data": {
                                    "id": userData.id,
                                    "email": userData.email,
                                    "firstName": userData.firstName,
                                    "lastName": userData.lastName,
                                }
                            }
                        ]);
                        console.log("Successful. Login Data passed back: " + JSON.stringify(result, null, '\t'));
                    } else {
                        res.json([
                            {
                                "result": "Error",
                                "message": "No match between user credentials and stored users."
                            }
                        ]);
                        console.log("Failure. No login data passed back.");
                    }
                }
            });
        });
    });
    router.post("/api/users/add", (req, res) => {
        var sqlQuery = "";
        console.log("Request body: " + req.body);
    
        if (req.body.email != "" && req.body.passHash != "" && req.body.firstName != "" && req.body.lastName != ""){
            // Insert task data into db
            sqlQuery = "INSERT INTO users " 
                       + "(email, passHash, firstName, lastName)"
                       + " VALUES " 
                       + "(\""
                       + req.body.email + "\", \"" 
                       + req.body.passHash + "\", \""
                       + req.body.firstName + "\", \""
                       + req.body.lastName + "\""
                       + ");"; 
            connection.connect(function (err) {
                connection.query(sqlQuery, function (err, result, fields) {
                    if (err) {
                        res.json([
                            "response", {
                                "error": "An error occurred when adding user. Error: " + err.message
                            }
                        ])
                    } else {
                        res.json([
                            {
                                "response": result,
                                "inserted data": {
                                    "email": req.body.title,
                                    "passHash": req.body.description,
                                    "firstName": req.body.reminder,
                                    "lastName": req.body.dueDate,
                                }
                            }
                        ]);
                    }
                });
            });
        } else {
            res.json([
                "response", {
                    "error": "Email, password, first name, or last name is empty."
                }
            ]);
        }
    });
    router.post("/api/users/delete", (req, res) => {
        var sqlQuery = "";
    
        if (req.body.id != "" && req.body.id != null && req.body.email != "" && req.body.passHash != "" 
            && req.body.firstName != "" && req.body.lastName != "") {
            sqlQuery = "DELETE FROM users WHERE id=" + req.body.id + ";";
            connection.connect(function (err) {
                connection.query(sqlQuery, function (err, result, fields) {
                    if (err) {
                        throw err;
                    } else {
                        res.json([
                            {
                                "response": result,
                                "delete tasks data": {
                                    "id": req.body.id,
                                    "email": req.body.email,
                                    "passHash": req.body.passHash,
                                    "firstName": req.body.firstName,
                                    "lastName": req.body.lastName
                                }
                            }
                        ]);
                    }
                });
            });
        } else {
            res.json([
                "response", {
                    "error": "ID, email, password, first name, or last name is empty."
                }
            ]);
        }
    });
    router.get("/api/users/delete-all", (req, res) => {
        var sqlQuery = "DELETE FROM users;";
        connection.connect(function (err) {
            connection.query(sqlQuery, function (err, result, fields) {
                if (err) {
                    res.json([
                        {
                            "response": {
                                "error": "An error occurred when deleting all users. Error: " + err.message
                            }
                        }
                    ]);
                } else {
                    res.json([
                        {
                            "response": result,
                            "message": "deleted all users"
                        }
                    ]);
                }
            });
        });
    });

    router.get("/api/userpreferences", (req, res) => {
        const sqlQuery = "SELECT * FROM userpreferences;";
    
        connection.connect(function (err) {
            connection.query(sqlQuery, function (err, result, fields) {
                if (err) {
                    res.json([
                        err 
                    ]);
                } else {
                    res.json([
                        result
                    ]);
                }
            });
        });
    });
    router.post("/api/userpreferences", (req, res) => {
        const sqlQuery = "SELECT * FROM userpreferences WHERE userId=" + req.body.userId + ";";
    
        connection.connect(function (err) {
            connection.query(sqlQuery, function (err, result, fields) {
                if (err) {
                    res.json([
                        err 
                    ]);
                } else {
                    res.json([
                        result
                    ]);
                }
            });
        });
    });
    router.post("/api/userpreferences/add", (req, res) => {
        var sqlQueryInsert = "";
        console.log("Request body: " + JSON.stringify(req.body, null, '\t'));
    
        if (req.body.userId != "" && req.body.preferences != ""){
            // Insert user preferences data into db if they don't already exist
            sqlQuerySearch = "SELECT * FROM userpreferences WHERE userId=" + req.body.userId + ";";
            sqlQueryInsert = "INSERT INTO userpreferences " 
                       + "(userId, preferences)"
                       + " VALUES " 
                       + "("
                       + req.body.userId + ", '" 
                       + req.body.userPreferences + "'" 
                       + ");"; 
            connection.connect(function (err) {
                connection.query(sqlQuerySearch, function (searchErr, searchResult, searchFields) {
                    if (searchErr) {
                        res.json([
                            "response", {
                                "error": "An error occurred when searching for user on user prefs query. Error: " + searchErr.message
                            }
                        ])
                    } else {
                        if (searchResult[0] == null) {
                            connection.query(sqlQueryInsert, function (insertErr, insertResult, insertFields) {
                                if (insertErr) {
                                    res.json([
                                        "response", {
                                            "error": "An error occurred when adding user prefs. Error: " + insertErr.message
                                        }
                                    ])
                                } else {
                                    console.log('Search Result info: ', insertResult[0]);
                                    res.json([
                                        {
                                            "response": insertResult,
                                            "inserted user prefs data": {
                                                "userId": req.body.userId,
                                                "preferences": req.body.userPreferences,
                                            }
                                        }
                                    ]);
                                }
                            });
                        } else {
                            // User preferences already exist
                            // TODO: either update existing record or delete record and add new one
                            sqlQueryInsert = "UPDATE userpreferences " 
                                            + "SET preferences='" + req.body.userPreferences + "'"
                                            + " WHERE userId=" + req.body.userId
                                            + ";"; 
                            connection.query(sqlQueryInsert, function (updateErr, updateResult, updateFields) {
                                if (updateErr) {
                                    res.json([
                                        "response", {
                                            "error": "An error occurred when updating user prefs. Error: " + updateErr.message
                                        }
                                    ])
                                } else {
                                    console.log('Update Result info: ', updateResult[0]);
                                    res.json([
                                        {
                                            "response": updateResult,
                                            "updated user prefs data": {
                                                "userId": req.body.userId,
                                                "preferences": req.body.userPreferences,
                                            }
                                        }
                                    ]);
                                }
                            });
                        }
                    }
                })
            });
        } else {
            res.json([
                "response", {
                    "error": "userId or user preferences is empty."
                }
            ]);
        }
    });
    router.post("/api/userpreferences/delete", (req, res) => {
        var sqlQuery = "";
    
        if (req.body.userId != null && req.body.userId != "") {
            sqlQuery = "DELETE FROM userpreferences WHERE userId=" + req.body.userId + ";";
            connection.connect(function (err) {
                connection.query(sqlQuery, function (err, result, fields) {
                    if (err) {
                        throw err;
                    } else {
                        res.json([
                            {
                                "response": result,
                                "deleted preferences for user": {
                                    "userId": req.body.userId,
                                }
                            }
                        ]);
                    }
                });
            });
        } else {
            res.json([
                "response", {
                    "error": "userid is empty."
                }
            ]);
        }
    });
    router.get("/api/userpreferences/delete-all", (req, res) => {
        var sqlQuery = "DELETE FROM userpreferences;";
        connection.connect(function (err) {
            connection.query(sqlQuery, function (err, result, fields) {
                if (err) {
                    res.json([
                        {
                            "response": {
                                "error": "An error occurred when deleting all user preferences. Error: " + err.message
                            }
                        }
                    ]);
                } else {
                    res.json([
                        {
                            "response": result,
                            "message": "deleted all user preferences"
                        }
                    ]);
                }
            });
        });
    });

    router.get("/api/bills", (req, res) => {
        const sqlQuery = "SELECT * FROM bills;"; 
    
        connection.connect(function (err) {
            connection.query(sqlQuery, function (err, result, fields) {
                if (err) {
                    res.json([
                        err 
                    ]);
                } else {
                    res.json([
                        result
                    ]);
                }
            });
        });
    });

    router.post("/api/bills", (req, res) => {
        const sqlQuery = "SELECT * FROM bills WHERE userId=" + req.body.userId + ";";
    
        connection.connect(function (err) {
            connection.query(sqlQuery, function (err, result, fields) {
                if (err) {
                    res.json([
                        err 
                    ]);
                } else {
                    res.json([
                        result
                    ]);
                }
            });
        });
    });

    router.post("/api/bills/add", (req, res) => {
        var sqlQuery = "";
        console.log("Client bills add request body: " + JSON.stringify(req.body));
    
        if (req.body.userId != "" && req.body.userId != null && req.body.title != "" && req.body.title != null 
            && req.body.description != "" && req.body.description != null && req.body.amount > 0 && typeof req.body.reminder == "boolean" 
            && req.body.dueDate != "" && req.body.dueDate != null) {
            // Insert bill data into db
            sqlQuery = "INSERT INTO bills " 
                       + "(userId, title, description, amount, reminder, autopay, dueDate, reminderDueDate0, reminderDueDate1, " 
                       + "reminderDueDate2, reminderDueTime0, reminderDueTime1, reminderDueTime2)" 
                       + " VALUES " 
                       + "("
                       + req.body.userId + ", \""
                       + req.body.title + "\", \"" 
                       + req.body.description + "\", "
                       + req.body.amount + ", "
                       + req.body.reminder + ", "
                       + req.body.autopay + ", \""
                       + req.body.dueDate + "\", \""
                       + req.body.reminderDueDate0 + "\", \""
                       + req.body.reminderDueDate1 + "\", \""
                       + req.body.reminderDueDate2 + "\", \""
                       + req.body.reminderDueTime0 + "\", \""
                       + req.body.reminderDueTime1 + "\", \""
                       + req.body.reminderDueTime2 + "\""
                       + ");"; 
            connection.connect(function (err) {
                connection.query(sqlQuery, function (err, result, fields) {
                    if (err) {
                        throw err;
                    } else {
                        console.log('API - Bill add result: ', JSON.stringify(result, null, '\t'));
                        res.json([
                            {
                                "response": result,
                                "insertedData": {
                                    "id": result.insertId,
                                    "userId": req.body.userId,
                                    "title": req.body.title,
                                    "description": req.body.description,
                                    "amount": req.body.amount,
                                    "reminder": req.body.reminder,
                                    "autopay": req.body.autopay,
                                    "dueDate": req.body.dueDate,
                                    "reminderDueDate0": req.body.reminderDueDate0,
                                    "reminderDueDate1": req.body.reminderDueDate1,
                                    "reminderDueDate2": req.body.reminderDueDate2,
                                    "reminderDueTime0": req.body.reminderDueTime0,
                                    "reminderDueTime1": req.body.reminderDueTime1,
                                    "reminderDueTime2": req.body.reminderDueTime2,
                                }
                            }
                        ]);
                    }
                });
            });
        } else {
            if (req.body.amount <= 0) {
                res.json([
                    "response", {
                        "error": "Bill amount should be larger than 0."
                    }
                ]);
            } else {
                res.json([
                    "response", {
                        "error": "userId, title, description, reminder, or dueDate is empty."
                    }
                ]);
            }
        }
    });
    router.post("/api/bills/delete", (req, res) => {
        var sqlQuery = "";
        console.log('Bill delete request body: ', JSON.stringify(req.body, null, '\t'));
    
        if (req.body.id != "" && req.body.id != null && req.body.userId != "" && req.body.userId != null 
            && req.body.title != "" && req.body.title != null && req.body.description != "" 
            && req.body.description != null && typeof req.body.reminder == "number"
            && req.body.dueDate != "" && req.body.dueDate != null) {
            sqlQuery = "DELETE FROM bills WHERE id="
                       + req.body.id + " AND userId=" + req.body.userId + ";";
            connection.connect(function (err) {
                connection.query(sqlQuery, function (err, result, fields) {
                    if (err) {
                        throw err;
                    } else {
                        res.json([
                            {
                                "response": result,
                                "delete bills data": {
                                    "id": req.body.id,
                                    "userId": req.body.userId,
                                    "title": req.body.title,
                                    "description": req.body.description,
                                    "reminder": req.body.reminder,
                                    "dueDate": req.body.dueDate
                                }
                            }
                        ]);
                    }
                });
            });
        } else {
            res.json([
                "response", {
                    "error": "id, userId, title, description, reminder, or dueDate is empty."
                }
            ]);
        }
    });

    router.get("/api/bills/delete-all", (req, res) => {
        const sqlQuery = "DROP TABLE bills;";
        connection.connect(function (err) {
            connection.query(sqlQuery, function (err, result, fields) {
                if (err) {
                    throw err;
                } else {
                    res.json([
                        {
                            "response": result,
                            "message": "bills table dropped successfully."
                        }
                    ]);
                }
            });
        });
    });

    router.get("/api/sharedbills", (req, res) => {
        const sqlQuery = "SELECT * FROM isbillshared;"; 
    
        connection.connect(function (err) {
            connection.query(sqlQuery, function (err, result, fields) {
                if (err) {
                    res.json([
                        err 
                    ]);
                } else {
                    res.json([
                        result
                    ]);
                }
            });
        });
    });

    router.post("/api/sharedbills", (req, res) => {
        const sqlQuery = "SELECT * FROM isbillshared WHERE userId=" + req.body.userId + ";";
    
        connection.connect(function (err) {
            connection.query(sqlQuery, function (err, result, fields) {
                if (err) {
                    res.json([
                        err 
                    ]);
                } else {
                    res.json([
                        result
                    ]);
                }
            });
        });
    });

    router.post("/api/sharedbills/add", (req, res) => {
        var sqlQuery = "";
        console.log("Client isbillshared add request body: " + JSON.stringify(req.body));
    
        if (req.body.billId != "" && req.body.billId != null && typeof req.body.isShared == "boolean" 
            && req.body.userIdA != "" && req.body.userIdA != null && req.body.userIdB != "" 
            && req.body.userIdB != null) {
            // Insert bill data into db
            sqlQuery = "INSERT INTO isbillshared " 
                       + "(billId, isShared, userIdA, userIdB) " 
                       + " VALUES " 
                       + "("
                       + req.body.billId + ", " 
                       + req.body.isShared + ", "
                       + req.body.userIdA + ", "
                       + req.body.userIdB + " "
                       + ");"; 
            connection.connect(function (err) {
                connection.query(sqlQuery, function (err, result, fields) {
                    if (err) {
                        throw err;
                    } else {
                        res.json([
                            {
                                "response": result,
                                "inserted data": {
                                    "billId": req.body.billId,
                                    "isShared": req.body.isShared,
                                    "userIdA": req.body.userIdA,
                                    "userIdB": req.body.userIdB,
                                }
                            }
                        ]);
                    }
                });
            });
        } else {
            res.json([
                "response", {
                    "error": "billId, isShared, userIdA, or userIdB is empty."
                }
            ]);
        }
    });
    router.post("/api/sharedbills/delete", (req, res) => {
        var sqlQuery = "";
        console.log('Bill delete request body: ', JSON.stringify(req.body, null, '\t'));
    
        if (req.body.billId != "" && req.body.billId != null && req.body.userIdA != "" && req.body.userIdA != null 
            && req.body.userIdB != "" && req.body.userIdB != null) {
            sqlQuery = "DELETE FROM isbillshared WHERE billId="
                       + req.body.billId + " AND userIdA=" + req.body.userIdA + " AND userIdB=" + req.body.userIdB + ";";
            connection.connect(function (err) {
                connection.query(sqlQuery, function (err, result, fields) {
                    if (err) {
                        throw err;
                    } else {
                        res.json([
                            {
                                "response": result,
                                "delete isShared bill record data": {
                                    "billId": req.body.billId,
                                    "userIdA": req.body.userIdA,
                                    "userIdB": req.body.userIdB,
                                }
                            }
                        ]);
                    }
                });
            });
        } else {
            res.json([
                "response", {
                    "error": "billId, userIdA, or userIdB is empty."
                }
            ]);
        }
    });

    router.get("/api/sharedbills/delete-all", (req, res) => {
        const sqlQuery = "DROP TABLE isbillshared;";
        connection.connect(function (err) {
            connection.query(sqlQuery, function (err, result, fields) {
                if (err) {
                    throw err;
                } else {
                    res.json([
                        {
                            "response": result,
                            "message": "isbillshared table dropped successfully."
                        }
                    ]);
                }
            });
        });
    });

    router.get("/api/tasks", (req, res) => {
        const sqlQuery = "SELECT * FROM tasks;";
    
        connection.connect(function (err) {
            connection.query(sqlQuery, function (err, result, fields) {
                if (err) {
                    res.json([
                        err 
                    ]);
                } else {
                    res.json([
                        result
                    ]);
                }
            });
        });
    });

    router.post("/api/tasks", (req, res) => {
        const sqlQuery = "SELECT * FROM tasks WHERE userId=" + req.body.userId + ";";
    
        connection.connect(function (err) {
            connection.query(sqlQuery, function (err, result, fields) {
                if (err) {
                    res.json([
                        err 
                    ]);
                } else {
                    res.json([
                        result
                    ]);
                }
            });
        });
    });

    router.post("/api/tasks/add", (req, res) => {
        var sqlQuery = "";
        console.log("Client tasks add request body: " + JSON.stringify(req.body));
    
        if (req.body.userId != "" && req.body.userId != null && req.body.title != "" && req.body.title != null 
            && req.body.description != "" && req.body.description != null && typeof req.body.reminder == "boolean"
            && req.body.dueDate != "" && req.body.dueDate != null) {
            // Insert task data into db
            sqlQuery = "INSERT INTO tasks " 
                       + "(userId, title, description, reminder, dueDate, dueTime, reminderDueDate0, reminderDueDate1, " 
                       + "reminderDueDate2, reminderDueTime0, reminderDueTime1, reminderDueTime2)" 
                       + " VALUES " 
                       + "("
                       + req.body.userId + ", \""
                       + req.body.title + "\", \"" 
                       + req.body.description + "\", "
                       + req.body.reminder + ", \""
                       + req.body.dueDate + "\", \""
                       + req.body.dueTime + "\", \""
                       + req.body.reminderDueDate0 + "\", \""
                       + req.body.reminderDueDate1 + "\", \""
                       + req.body.reminderDueDate2 + "\", \""
                       + req.body.reminderDueTime0 + "\", \""
                       + req.body.reminderDueTime1 + "\", \""
                       + req.body.reminderDueTime2 + "\""
                       + ");"; 
            connection.connect(function (err) {
                connection.query(sqlQuery, function (err, result, fields) {
                    if (err) {
                        throw err;
                    } else {
                        res.json([
                            {
                                "response": result,
                                "inserted data": {
                                    "userId": req.body.userId,
                                    "title": req.body.title,
                                    "description": req.body.description,
                                    "reminder": req.body.reminder,
                                    "dueDate": req.body.dueDate,
                                    "dueTime": req.body.dueTime,
                                    "reminderDueDate0": req.body.reminderDueDate0,
                                    "reminderDueDate1": req.body.reminderDueDate1,
                                    "reminderDueDate2": req.body.reminderDueDate2,
                                    "reminderDueTime0": req.body.reminderDueTime0,
                                    "reminderDueTime1": req.body.reminderDueTime1,
                                    "reminderDueTime2": req.body.reminderDueTime2,
                                }
                            }
                        ]);
                    }
                });
            });
        } else {
            res.json([
                "response", {
                    "error": "userId, title, description, reminder, dueDate, or dueTime is empty."
                }
            ]);
        }
    });
    router.post("/api/tasks/delete", (req, res) => {
        var sqlQuery = "";
        console.log('Bill delete request body: ', JSON.stringify(req.body, null, '\t'));
    
        if (req.body.id != "" && req.body.id != null && req.body.userId != "" && req.body.userId != null 
            && req.body.title != "" && req.body.title != null && req.body.description != "" 
            && req.body.description != null && typeof req.body.reminder == "number" 
            && req.body.dueDate != "" && req.body.dueDate != null) {
            sqlQuery = "DELETE FROM tasks WHERE id="
                       + req.body.id + " AND userId=" + req.body.userId + ";";
            connection.connect(function (err) {
                connection.query(sqlQuery, function (err, result, fields) {
                    if (err) {
                        throw err;
                    } else {
                        res.json([
                            {
                                "response": result,
                                "delete tasks data": {
                                    "id": req.body.id,
                                    "userId": req.body.userId,
                                    "title": req.body.title,
                                    "description": req.body.description,
                                    "reminder": req.body.reminder,
                                    "dueDate": req.body.dueDate
                                }
                            }
                        ]);
                    }
                });
            });
        } else {
            res.json([
                "response", {
                    "error": "id, userId, title, description, reminder, or dueDate is empty."
                }
            ]);
        }
    });

    router.get("/api/tasks/delete-all", (req, res) => {
        const sqlQuery = "DROP TABLE tasks;";
        connection.connect(function (err) {
            connection.query(sqlQuery, function (err, result, fields) {
                if (err) {
                    throw err;
                } else {
                    res.json([
                        {
                            "response": result,
                            "message": "tasks table dropped successfully."
                        }
                    ]);
                }
            });
        });
    });

    router.get("/api/worktimes", (req, res) => {
        const sqlQuery = "SELECT * FROM worktimes;";
    
        connection.connect(function (err) {
            connection.query(sqlQuery, function (err, result, fields) {
                if (err) {
                    res.json([
                        err 
                    ]);
                } else {
                    res.json([
                        result
                    ]);
                }
            });
        });
    });

    router.post("/api/worktimes", (req, res) => {
        const sqlQuery = "SELECT * FROM worktimes WHERE userId=" + req.body.userId + ";";
    
        connection.connect(function (err) {
            connection.query(sqlQuery, function (err, result, fields) {
                if (err) {
                    res.json([
                        err 
                    ]);
                } else {
                    res.json([
                        result
                    ]);
                }
            });
        });
    });

    router.post("/api/worktimes/clockin", (req, res) => {
        var sqlQuery = "";
        console.log("Client work times clockin request body: " + JSON.stringify(req.body));
    
        if (req.body.userId != "" && req.body.userId != null && req.body.clockInTime != "" && req.body.clockInTime != null 
            && req.body.dayOfWork != "" && req.body.dayOfWork != null) {
            // Insert task data into db
            sqlQuery = "INSERT INTO worktimes " 
                       + "(userId, clockInTime, dayOfWork)" 
                       + " VALUES " 
                       + "("
                       + req.body.userId + ", \""
                       + req.body.clockInTime + "\", \"" 
                       + req.body.dayOfWork + "\""
                       + ");"; 
            connection.connect(function (err) {
                connection.query(sqlQuery, function (err, result, fields) {
                    if (err) {
                        throw err;
                    } else {
                        res.json([
                            {
                                "response": result,
                                "inserted data": {
                                    "userId": req.body.userId,
                                    "clockInTime": req.body.clockInTime,
                                    "dayOfWork": req.body.dayOfWork,
                                }
                            }
                        ]);
                    }
                });
            });
        } else {
            res.json([
                "response", {
                    "error": "userId, clockInTime, or dayOfWork is empty."
                }
            ]);
        }
    });

    router.post("/api/worktimes/clockbreak", (req, res) => {
        var sqlQuery = "";
        console.log("Client work times clock break request body: " + JSON.stringify(req.body));
        console.log("req.body.hasTakenBreak type is: ", typeof req.body.hasTakenBreak);
    
        if (req.body.userId != "" && req.body.userId != null && typeof req.body.hasTakenBreak == "boolean" 
            && req.body.dayOfWork != "" && req.body.dayOfWork != null) {
            // Insert break taken data into db
            sqlQuery = "INSERT INTO worktimes " 
                       + "(userId, hasTakenBreak, dayOfWork)" 
                       + " VALUES " 
                       + "("
                       + req.body.userId + ", "
                       + req.body.hasTakenBreak + ", \"" 
                       + req.body.dayOfWork + "\""
                       + ");"; 
            connection.connect(function (err) {
                connection.query(sqlQuery, function (err, result, fields) {
                    if (err) {
                        throw err;
                    } else {
                        res.json([
                            {
                                "response": result,
                                "inserted data": {
                                    "userId": req.body.userId,
                                    "hasTakenBreak": req.body.hasTakenBreak,
                                    "dayOfWork": req.body.dayOfWork,
                                }
                            }
                        ]);
                    }
                });
            });
        } else {
            res.json([
                "response", {
                    "error": "userId, hasTakenBreak, or dayOfWork is empty."
                }
            ]);
        }
    });

    router.post("/api/worktimes/clockout", (req, res) => {
        var sqlQuery = "";
        console.log("Client work times clock out request body: " + JSON.stringify(req.body));
    
        if (req.body.userId != "" && req.body.userId != null && req.body.clockOutTime != "" && req.body.clockOutTime != null 
            && req.body.dayOfWork != "" && req.body.dayOfWork != null) {
            // Insert break taken data into db
            sqlQuery = "INSERT INTO worktimes " 
                       + "(userId, clockOutTime, dayOfWork)" 
                       + " VALUES " 
                       + "("
                       + req.body.userId + ", \""
                       + req.body.clockOutTime + "\", \"" 
                       + req.body.dayOfWork + "\""
                       + ");"; 
            connection.connect(function (err) {
                connection.query(sqlQuery, function (err, result, fields) {
                    if (err) {
                        throw err;
                    } else {
                        res.json([
                            {
                                "response": result,
                                "inserted data": {
                                    "userId": req.body.userId,
                                    "clockOutTime": req.body.clockOutTime,
                                    "dayOfWork": req.body.dayOfWork,
                                }
                            }
                        ]);
                    }
                });
            });
        } else {
            res.json([
                "response", {
                    "error": "userId, clockOutTime, or dayOfWork is empty."
                }
            ]);
        }
    });

    router.post("/api/worktimes/clockcomplete", (req, res) => {
        var sqlQuery = "";
        console.log("Client work times clock complete request body: " + JSON.stringify(req.body));
    
        if (req.body.userId != "" && req.body.userId != null && req.body.clockOutTime != "" && req.body.clockOutTime != null 
            && req.body.dayOfWork != "" && req.body.dayOfWork != null) {
            // Insert break taken data into db
            sqlQuery = "INSERT INTO worktimes " 
                       + "(userId, clockInTime, clockOutTime, hasTakenBreak, dayOfWork)" 
                       + " VALUES " 
                       + "("
                       + req.body.userId + ", \""
                       + req.body.clockInTime + "\", \"" 
                       + req.body.clockOutTime + "\", " 
                       + req.body.hasTakenBreak + ", \"" 
                       + req.body.dayOfWork + "\""
                       + ");"; 
            connection.connect(function (err) {
                connection.query(sqlQuery, function (err, result, fields) {
                    if (err) {
                        throw err;
                    } else {
                        res.json([
                            {
                                "response": result,
                                "inserted data": {
                                    "userId": req.body.userId,
                                    "clockInTime": req.body.clockInTime,
                                    "clockOutTime": req.body.clockOutTime,
                                    "hasTakenBreak": req.body.hasTakenBreak,
                                    "dayOfWork": req.body.dayOfWork,
                                }
                            }
                        ]);
                    }
                });
            });
        } else {
            res.json([
                "response", {
                    "error": "userId, clockInTime, clockOutTime, hasTakenBreak, or dayOfWork is empty."
                }
            ]);
        }
    });

    // TODO: We need to convert this delete function to delete all of the worktimes for the selected day.
    router.post("/api/worktimes/delete", (req, res) => {
        var sqlQuery = "";
        console.log("Deleting day " + req.body.dayOfWork + " for user " + req.body.userId);
    
        if (req.body.userId != "" && req.body.userId != null && req.body.dayOfWork != "" && req.body.dayOfWork != null) {
            sqlQuery = "DELETE FROM worktimes WHERE userId="
                       + req.body.userId + " AND dayOfWork=\"" + req.body.dayOfWork + "\";";
            connection.connect(function (err) {
                connection.query(sqlQuery, function (err, result, fields) {
                    if (err) {
                        throw err;
                    } else {
                        res.json([
                            {
                                "response": result,
                                "delete worktimes for a day": {
                                    "userId": req.body.userId,
                                    "dayOfWork": req.body.dayOfWork
                                }
                            }
                        ]);
                    }
                });
            });
        } else {
            res.json([
                "response", {
                    "error": "id or userId is empty."
                }
            ]);
        }
    });

    router.get("/api/worktimes/delete-all", (req, res) => {
        const sqlQuery = "DROP TABLE worktimes;";
        connection.connect(function (err) {
            connection.query(sqlQuery, function (err, result, fields) {
                if (err) {
                    throw err;
                } else {
                    res.json([
                        {
                            "response": result,
                            "message": "worktimes table dropped successfully."
                        }
                    ]);
                }
            });
        });
    });
    
    router.get("/notify", (req, res) => {
        const currentUrl = new URL(req.hostname + ":7778" + req.url);
        const searchParams = currentUrl.searchParams;
    
        if (searchParams.get("message") != "" && searchParams.get("message") != null) {
            try {
                res.json([
                    {
                        "response": "Message sent: " + searchParams.get("message"),
                    }
                ]);
            } catch (error) {
                res.json([
                    {
                        "response": "Message failed to send.",
                    }
                ]);
            }
        } else {
            res.json([
                "response", {
                    "error": "Title or description is empty."
                }
            ]);
        }
    });
}

app.listen(port, () => {
    console.log("listening for requests on port " + port)
});