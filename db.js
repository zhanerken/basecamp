const mongoose = require('mongoose');
const DB_URI = `mongodb+srv://zhanerken:zhanerken@cluster0.bouto.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connectToDB = async () => {
    try {
        await mongoose.connect(DB_URI, {
                useUnifiedTopology : true,
                useNewUrlParser : true,
        })
        console.log("successfully connected to DB");
        return {"statusDBconn":"ok"};
    } catch(err) {
        console.log(err);
        return {"statusDBconn":"nok"};
    }
}

module.exports = {
    connectToDB
}

