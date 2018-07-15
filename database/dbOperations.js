let dbOperations = {};

dbOperations.database = require('./db.js');

dbOperations.insertOneOpr = function (collection,dataObj) {
    return dbOperations.database.getCollection(collection)
        .then((coll) => {
            return coll.coll.insertOne(dataObj)
                .then((oprRes) => {
                    coll.client.close();
                    return oprRes
                })
        });
}

dbOperations.findOpr = function (collection,dataObj) {
    return dbOperations.database.getCollection(collection)
        .then((coll) => {
            return coll.coll.find(dataObj).count().then((oprRes) => {
                coll.client.close();
                return oprRes > 0
            });
        });
}

dbOperations.updateOne = function (collection,findQuery,updateTarget) {
    return dbOperations.database.getCollection(collection)
        .then((coll) => {
            return coll.coll.updateOne(findQuery,updateTarget).count().then((oprRes) => {
                coll.client.close();
                return oprRes
            });
        });
}

module.exports = dbOperations;

