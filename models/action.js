const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');



const actionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    utilities: Number,
    appearedIn: [{
        comic: { type: Number, required: true, default: 1 },
        show: { type: String, lowercase: true, trim: true },
    }],
})

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;
