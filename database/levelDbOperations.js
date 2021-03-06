let levelDbOpr = {};
let profileDbOpr = require('./profileDbOperations');

levelDbOpr.dbOpr = require('./dbOperations.js');
levelDbOpr.tableNames = {
    zero: 'LevelZero',
    one: 'LevelOne',
    two: 'LevelTwo',
    three: 'LevelThree',
    four: 'LevelFour',
};

levelDbOpr.initLevelZero = function (username) {
    return levelDbOpr.dbOpr.insertOneOpr(levelDbOpr.tableNames['zero'], {
        userName: username,
        progresses: [0]
    });
}

levelDbOpr.updateProgress = function (username, progresses, level) {
    return levelDbOpr.dbOpr.updateOne(levelDbOpr.tableNames[level], {
        username: username
    }, { $set: { progresses: progresses } });
}

levelDbOpr.setUserLevel = function (username, level) {
    return levelDbOpr.dbOpr.insertOneOpr(levelDbOpr.tableNames[level], {
        userName: username,
        progresses: [0]
    });
}

levelDbOpr.deleteUserLevel = function (username, level) {
    return levelDbOpr.dbOpr.deleteDoc(levelDbOpr.tableNames[level], {
        userName: username,
    });
}

levelDbOpr.findLevelData = function (username, exp_level) {
    return levelDbOpr.dbOpr.findDoc(levelDbOpr.tableNames[exp_level], { userName: username }).then(oprRes => {
        if (!oprRes.length) {
            return { 'userName': 'not found' };
        } else {
            return oprRes[0]
        }
    });
}

module.exports = levelDbOpr;

