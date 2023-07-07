const { faker } = require('@faker-js/faker');


const myEmail = faker.location.streetAddress()


function generatePerson() {
    const person =
    {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        // zipcode: faker.location.zipCode('#####'),
        // phone: faker.phone.number('###-###-####')
    };

    const email = {
        email: faker.internet.email({ firstName: person.firstName, lastName: person.lastName })
    }

    const personWithEmail = { ...person, ...email }
    return personWithEmail;


}

function generatePeople(num) {

    const peopleArray = [];

    for (var i = 0; i < num; i++) {
        const person = generatePerson();
        peopleArray.push(Object.values(person))
    }

    return peopleArray;
}

//console.log(generatePeople(3));

module.exports = {
    generatePeople: generatePeople
};