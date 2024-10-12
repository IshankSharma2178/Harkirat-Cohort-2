const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/paytm-clone");

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true  
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    }
});

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        default: 0,
        required: true
    }
});

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Account, User };
