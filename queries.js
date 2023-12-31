const mysql = require('mysql2');
const { generatePeople } = require('./faker');
const { PASSWORD } = require('./config')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: PASSWORD,
    database: 'test_db'
});



function getPeople(response) {
    const query = "SELECT * FROM test_data";
    connection.query(query, async function (err, res) {
        if (err) throw err;
        console.log("Connected to database!")
        // console.log(res);
        response.send(res)
    });

};

function getPeopleCount(response) {
    const query = 'SELECT COUNT(*) AS people_count FROM test_data'
    connection.query(query, async function (err, res) {
        if (err) throw err;
        console.log("Connected to database!");
        response.send(res)
    })
}

function getPerson(id, response) {
    const query = `SELECT * FROM test_data WHERE id=${id}`;
    connection.query(query, async function (err, result) {
        if (err) throw err;
        console.log("Connected to database!")
        // console.log(res);
        if (result.length === 0) {
            response.send(`Could not find a person with an id of ${id}`)
        } else {
            response.send(result)
        };
    });
};

function addPeople(num, response) {
    const query = "INSERT INTO test_data (first_name, last_name, email) VALUES ?";
    const people = generatePeople(num);

    connection.query(query, [people], function (err, result) {
        if (err) throw err;
        console.log('Connected to database!');

        // console.log(arr)
        console.log("Values added")
        response.send(result)
    });


};


function addPerson({ first, last, email }, response) {
    const person = [first, last, email]
    const query = "INSERT INTO test_data (first_name, last_name, email) VALUES (?)";
    connection.query(query, [person], function (err, result) {
        if (err) throw err;
        console.log("Connected to database!");
        console.log("Values added to database!")
        response.send(result)
    });



};

function removePerson(id, response) {
    const query = `DELETE FROM test_data WHERE id = ${id}`
    connection.query(query, function (err, result) {
        if (err) throw err;
        console.log("Connected to database!");
        console.log("Value removed!")
        if (result.affectedRows === 0) {
            response.send(`Could not find a person with id of ${id}`)
        } else {
            response.send(result);
        };

    });

};


function updatePerson({ first, last, email, id }, response) {
    const query = `
    UPDATE test_data 
    SET first_name = '${first}', last_name = '${last}', email = '${email}'
    WHERE id = ${id}`;

    connection.query(query, function (err, result) {
        if (err) throw err;
        console.log("Connected to Database");
        console.log("Updated person!");
        if (result.affectedRows === 0) {
            response.send(`Could not find a person with id of ${id}`)
        } else {
            response.send(result);
        };
    });
};

module.exports = {
    addPeople: addPeople,
    addPerson: addPerson,
    removePerson: removePerson,
    updatePerson: updatePerson,
    getPeople: getPeople,
    getPerson: getPerson,
    getPeopleCount: getPeopleCount
};










