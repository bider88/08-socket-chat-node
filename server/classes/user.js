class User {
    constructor() {
        this.persons = []
    }

    addPerson(id, name) {
        let person = {
            id,
            name
        }

        this.persons.push(person)

        return this.persons
    }

    getPerson(id) {
        return this.persons.filter((person) => person.id === id)[0]
    }

    addPersons() {
        return this.persons
    }

    getPersonsPerRoom(room) {

    }

    deletePerson() {

        let person = this.getPerson(id)
        this.persons = this.persons.filter((person) => person.id !== id)
        return person
    }
}

module.exports = {
    User
}