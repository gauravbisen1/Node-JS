const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['manager', 'chef', 'waiter'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

personSchema.pre('save', async function () {
    const person = this;

    //hash the password only if it has been modified (or is new)
    if (!person.isModified('password')) return;


    //hash password generate
    const salt = await bcrypt.genSalt(10);
    //hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);
    //override the plain text password with the hashed one
    person.password = hashedPassword;
});

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        //use bcrypt to compare provided password with hashed password
        const isMatch = bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw err;
    }
}

const Person = mongoose.model('Person', personSchema);

module.exports = Person;