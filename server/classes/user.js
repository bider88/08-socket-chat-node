class User {
    constructor() {
        this.persons = []
    }

    addPerson(id, name, channel) {
        let person = {
            id,
            name,
            channel
        }

        this.persons.push(person)

        return this.persons
    }

    getPerson(id) {
        return this.persons.filter((person) => person.id === id)[0]
    }

    getPersons() {
        return this.persons
    }

    getPersonsPerChannel(channel) {
        return this.persons.filter(person => person.channel === channel)
    }

    deletePerson(id) {

        let person = this.getPerson(id)
        this.persons = this.persons.filter((person) => person.id !== id)
        return person
    }
}

module.exports = {
    User
}