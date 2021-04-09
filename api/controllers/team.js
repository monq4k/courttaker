const ANALYSIS = require("../model/analysis");
const USER = require("../model/user");
const ADMIN = require("../model/admin");
const BCRYPT = require('bcrypt');
const JWT = require("jsonwebtoken");
const SALT_ROUNDS = 10;


//get all analyses func
exports.analysisGetALL = (req, res, next) => {
    ANALYSIS.findAll().then((analyses) => {
        if (analyses) {
            console.log("From database: ", analyses);
            res.status(200).json({
                message: "Analyses find successfuly!",
                analyses: analyses
            });
        } else {
            res.status(404).json({ message: "No valid entry found for provided ID" });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}

//get info about one analysis
exports.analysisGetInfoAboutOne = (req, res, next) => {
    const ID = req.params.id;
    ANALYSIS.findByPk(ID).then((analysis) => {
        if (analysis) {
            console.log("From database: ", analysis);
            res.status(200).json({
                message: "Analysis find successfuly!",
                analysis: analysis
            });
        } else {
            res.status(404).json({ message: "No valid entry found for provided ID" });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}

//analysis update info func
exports.analysisUpdateInfoAboutOne = (req, res, next) => {
    const ID = req.params.id;

    let resultChanged = req.body.result;
    let numberOfPeopleChanged = req.body.numberOfPeople;

    if (resultChanged != null && resultChanged != undefined && resultChanged != "" && resultChanged != " ") {
        ANALYSIS.update({ result: resultChanged }, { where: { id: ID } })
            .then(() => {
                next();
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            })
    }
    if (numberOfPeopleChanged != null && numberOfPeopleChanged != undefined && numberOfPeopleChanged != "" && numberOfPeopleChanged != " ") {
        ANALYSIS.update({ numberOfPeople: numberOfPeopleChanged }, { where: { id: ID } })
            .then(() => {
                next();
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            })
    }

    if ((resultChanged == null || resultChanged == undefined) && (numberOfPeopleChanged == null && numberOfPeopleChanged == undefined)) {
        return res.status(401).json({
            message: "Your fields are empty",
        });
    }
    return res.status(200).json({
        message: "Successful update. ZAEBUMBA!",
    });
}

//analysis create func
exports.analysisCreateAndAnalyse = (req, res, next) => {
    const ARRAY_OF_PEOPLE_IDS = req.body.peopleArray;
    analysisCreateAndAnalyseAsync(req, res, next, ARRAY_OF_PEOPLE_IDS);
}
async function analysisCreateAndAnalyseAsync(req, res, next, arrayOfPeopleIds) {

    if (arrayOfPeopleIds.length < 1) {
        return res.status(409).json({
            message: "You haven't sent peoples ids!"
        });
    } else {

        let CURRENT_ID = arrayOfPeopleIds[0];
        // let cycleGetInfoAbooutUser = new Promise((resolve, reject) => {
        //     USER.findByPk(CURRENT_ID).then((user) => {
        //         if (user) {
        //             console.log("cycle: " + CURRENT_ID)
        //             console.log("From database: ", user);
        //             resolve(user);
        //         } else {
        //             res.status(404).json({ message: "No valid entry found for provided ID" });
        //         }
        //     });
        // });

        const BAD = 13;
        const NOT_GOOD = 21;
        const GOOD = 50;
        const PERFECT = 78;
        var resultArray = [];
        var resultCompatibility = [];
        let resultArrayIndexator = 0;

        for (let i = 0; i < arrayOfPeopleIds.length; i++) {
            CURRENT_ID = arrayOfPeopleIds[i];
            console.log("i" + CURRENT_ID)
            let currentUser = await cycleGetInfoAbooutUserAsync(CURRENT_ID);
            for (let j = 0; j < arrayOfPeopleIds.length; j++) {
                if(i == j){
                    continue;
                }
                CURRENT_ID = arrayOfPeopleIds[j];
                console.log("j" + CURRENT_ID)
                let otherUser = await cycleGetInfoAbooutUserAsync(CURRENT_ID);
                
                if(currentUser.temperament == "Choleric"){
                    if(otherUser.temperament == "Choleric"){
                        resultCompatibility[resultArrayIndexator] = NOT_GOOD;
                        if(currentUser.typeCharacter == otherUser.typeCharacter){
                            resultCompatibility[resultArrayIndexator] += 22; 
                        } else if(currentUser.typeCharacter == "Ambivert"){
                            resultCompatibility[resultArrayIndexator] += 13; 
                        } else {
                            resultCompatibility[resultArrayIndexator] += 5;
                        }
                        resultArray[resultArrayIndexator] = currentUser.fullName + " && " + otherUser.fullName + " = " + resultCompatibility[resultArrayIndexator] + "% сумісності";
                        resultArrayIndexator++;
                        continue;
                    }
                    if(otherUser.temperament == "Sanguine"){
                        resultCompatibility[resultArrayIndexator] = GOOD;
                        if(currentUser.typeCharacter == otherUser.typeCharacter){
                            resultCompatibility[resultArrayIndexator] += 22; 
                        } else if(currentUser.typeCharacter == "Ambivert"){
                            resultCompatibility[resultArrayIndexator] += 13; 
                        } else {
                            resultCompatibility[resultArrayIndexator] += 5;
                        }
                        resultArray[resultArrayIndexator] = currentUser.fullName + " && " + otherUser.fullName + " = " + resultCompatibility[resultArrayIndexator] + "% сумісності";
                        resultArrayIndexator++;
                        continue;
                    }
                    if(otherUser.temperament == "Melancholic"){
                        resultCompatibility[resultArrayIndexator] = BAD;
                        if(currentUser.typeCharacter == otherUser.typeCharacter){
                            resultCompatibility[resultArrayIndexator] += 22; 
                        } else if(currentUser.typeCharacter == "Ambivert"){
                            resultCompatibility[resultArrayIndexator] += 13; 
                        } else {
                            resultCompatibility[resultArrayIndexator] += 5;
                        }
                        resultArray[resultArrayIndexator] = currentUser.fullName + " && " + otherUser.fullName + " = " + resultCompatibility[resultArrayIndexator] + "% сумісності";
                        resultArrayIndexator++;
                        continue;
                    }
                    if(otherUser.temperament == "Phlegmatic"){
                        resultCompatibility[resultArrayIndexator] = PERFECT;
                        if(currentUser.typeCharacter == otherUser.typeCharacter){
                            resultCompatibility[resultArrayIndexator] += 22; 
                        } else if(currentUser.typeCharacter == "Ambivert"){
                            resultCompatibility[resultArrayIndexator] += 13; 
                        } else {
                            resultCompatibility[resultArrayIndexator] += 5;
                        }
                        resultArray[resultArrayIndexator] = currentUser.fullName + " && " + otherUser.fullName + " = " + resultCompatibility[resultArrayIndexator] + "% сумісності";
                        resultArrayIndexator++;
                        continue;
                    }
                }
                if(currentUser.temperament == "Phlegmatic"){
                    if(otherUser.temperament == "Choleric"){
                        resultCompatibility[resultArrayIndexator] = PERFECT;
                        if(currentUser.typeCharacter == otherUser.typeCharacter){
                            resultCompatibility[resultArrayIndexator] += 22; 
                        } else if(currentUser.typeCharacter == "Ambivert"){
                            resultCompatibility[resultArrayIndexator] += 13; 
                        } else {
                            resultCompatibility[resultArrayIndexator] += 5;
                        }
                        resultArray[resultArrayIndexator] = currentUser.fullName + " && " + otherUser.fullName + " = " + resultCompatibility[resultArrayIndexator] + "% сумісності";
                        resultArrayIndexator++;
                        continue;
                    }
                    if(otherUser.temperament == "Sanguine"){
                        resultCompatibility[resultArrayIndexator] = GOOD;
                        if(currentUser.typeCharacter == otherUser.typeCharacter){
                            resultCompatibility[resultArrayIndexator] += 22; 
                        } else if(currentUser.typeCharacter == "Ambivert"){
                            resultCompatibility[resultArrayIndexator] += 13; 
                        } else {
                            resultCompatibility[resultArrayIndexator] += 5;
                        }
                        resultArray[resultArrayIndexator] = currentUser.fullName + " && " + otherUser.fullName + " = " + resultCompatibility[resultArrayIndexator] + "% сумісності";
                        resultArrayIndexator++;
                        continue;
                    }
                    if(otherUser.temperament == "Melancholic"){
                        resultCompatibility[resultArrayIndexator] = GOOD;
                        if(currentUser.typeCharacter == otherUser.typeCharacter){
                            resultCompatibility[resultArrayIndexator] += 22; 
                        } else if(currentUser.typeCharacter == "Ambivert"){
                            resultCompatibility[resultArrayIndexator] += 13; 
                        } else {
                            resultCompatibility[resultArrayIndexator] += 5;
                        }
                        resultArray[resultArrayIndexator] = currentUser.fullName + " && " + otherUser.fullName + " = " + resultCompatibility[resultArrayIndexator] + "% сумісності";
                        resultArrayIndexator++;
                        continue;
                    }
                    if(otherUser.temperament == "Phlegmatic"){
                        resultCompatibility[resultArrayIndexator] = GOOD;
                        if(currentUser.typeCharacter == otherUser.typeCharacter){
                            resultCompatibility[resultArrayIndexator] += 22; 
                        } else if(currentUser.typeCharacter == "Ambivert"){
                            resultCompatibility[resultArrayIndexator] += 13; 
                        } else {
                            resultCompatibility[resultArrayIndexator] += 5;
                        }
                        resultArray[resultArrayIndexator] = currentUser.fullName + " && " + otherUser.fullName + " = " + resultCompatibility[resultArrayIndexator] + "% сумісності";
                        resultArrayIndexator++;
                        continue;
                    }
                }
                if(currentUser.temperament == "Sanguine"){
                    if(otherUser.temperament == "Choleric"){
                        resultCompatibility[resultArrayIndexator] = GOOD;
                        if(currentUser.typeCharacter == otherUser.typeCharacter){
                            resultCompatibility[resultArrayIndexator] += 22; 
                        } else if(currentUser.typeCharacter == "Ambivert"){
                            resultCompatibility[resultArrayIndexator] += 13; 
                        } else {
                            resultCompatibility[resultArrayIndexator] += 5;
                        }
                        resultArray[resultArrayIndexator] = currentUser.fullName + " && " + otherUser.fullName + " = " + resultCompatibility[resultArrayIndexator] + "% сумісності";
                        resultArrayIndexator++;
                        continue;
                    }
                    if(otherUser.temperament == "Sanguine"){
                        resultCompatibility[resultArrayIndexator] = PERFECT;
                        if(currentUser.typeCharacter == otherUser.typeCharacter){
                            resultCompatibility[resultArrayIndexator] += 22; 
                        } else if(currentUser.typeCharacter == "Ambivert"){
                            resultCompatibility[resultArrayIndexator] += 13; 
                        } else {
                            resultCompatibility[resultArrayIndexator] += 5;
                        }
                        resultArray[resultArrayIndexator] = currentUser.fullName + " && " + otherUser.fullName + " = " + resultCompatibility[resultArrayIndexator] + "% сумісності";
                        resultArrayIndexator++;
                        continue;
                    }
                    if(otherUser.temperament == "Melancholic"){
                        resultCompatibility[resultArrayIndexator] = PERFECT;
                        if(currentUser.typeCharacter == otherUser.typeCharacter){
                            resultCompatibility[resultArrayIndexator] += 22; 
                        } else if(currentUser.typeCharacter == "Ambivert"){
                            resultCompatibility[resultArrayIndexator] += 13; 
                        } else {
                            resultCompatibility[resultArrayIndexator] += 5;
                        }
                        resultArray[resultArrayIndexator] = currentUser.fullName + " && " + otherUser.fullName + " = " + resultCompatibility[resultArrayIndexator] + "% сумісності";
                        resultArrayIndexator++;
                        continue;
                    }
                    if(otherUser.temperament == "Phlegmatic"){
                        resultCompatibility[resultArrayIndexator] = GOOD;
                        if(currentUser.typeCharacter == otherUser.typeCharacter){
                            resultCompatibility[resultArrayIndexator] += 22; 
                        } else if(currentUser.typeCharacter == "Ambivert"){
                            resultCompatibility[resultArrayIndexator] += 13; 
                        } else {
                            resultCompatibility[resultArrayIndexator] += 5;
                        }
                        resultArray[resultArrayIndexator] = currentUser.fullName + " && " + otherUser.fullName + " = " + resultCompatibility[resultArrayIndexator] + "% сумісності";
                        resultArrayIndexator++;
                        continue;
                    }
                }
                if(currentUser.temperament == "Melancholic"){
                    if(otherUser.temperament == "Choleric"){
                        resultCompatibility[resultArrayIndexator] = BAD;
                        if(currentUser.typeCharacter == otherUser.typeCharacter){
                            resultCompatibility[resultArrayIndexator] += 22; 
                        } else if(currentUser.typeCharacter == "Ambivert"){
                            resultCompatibility[resultArrayIndexator] += 13; 
                        } else {
                            resultCompatibility[resultArrayIndexator] += 5;
                        }
                        resultArray[resultArrayIndexator] = currentUser.fullName + " && " + otherUser.fullName + " = " + resultCompatibility[resultArrayIndexator] + "% сумісності";
                        resultArrayIndexator++;
                        continue;
                    }
                    if(otherUser.temperament == "Sanguine"){
                        resultCompatibility[resultArrayIndexator] = PERFECT;
                        if(currentUser.typeCharacter == otherUser.typeCharacter){
                            resultCompatibility[resultArrayIndexator] += 22; 
                        } else if(currentUser.typeCharacter == "Ambivert"){
                            resultCompatibility[resultArrayIndexator] += 13; 
                        } else {
                            resultCompatibility[resultArrayIndexator] += 5;
                        }
                        resultArray[resultArrayIndexator] = currentUser.fullName + " && " + otherUser.fullName + " = " + resultCompatibility[resultArrayIndexator] + "% сумісності";
                        resultArrayIndexator++;
                        continue;
                    }
                    if(otherUser.temperament == "Melancholic"){
                        resultCompatibility[resultArrayIndexator] = GOOD;
                        if(currentUser.typeCharacter == otherUser.typeCharacter){
                            resultCompatibility[resultArrayIndexator] += 22; 
                        } else if(currentUser.typeCharacter == "Ambivert"){
                            resultCompatibility[resultArrayIndexator] += 13; 
                        } else {
                            resultCompatibility[resultArrayIndexator] += 5;
                        }
                        resultArray[resultArrayIndexator] = currentUser.fullName + " && " + otherUser.fullName + " = " + resultCompatibility[resultArrayIndexator] + "% сумісності";
                        resultArrayIndexator++;
                        continue;
                    }
                    if(otherUser.temperament == "Phlegmatic"){
                        resultCompatibility[resultArrayIndexator] = GOOD;
                        if(currentUser.typeCharacter == otherUser.typeCharacter){
                            resultCompatibility[resultArrayIndexator] += 22; 
                        } else if(currentUser.typeCharacter == "Ambivert"){
                            resultCompatibility[resultArrayIndexator] += 13; 
                        } else {
                            resultCompatibility[resultArrayIndexator] += 5;
                        }
                        resultArray[resultArrayIndexator] = currentUser.fullName + " && " + otherUser.fullName + " = " + resultCompatibility[resultArrayIndexator] + "% сумісності";
                        resultArrayIndexator++;
                        continue;
                    }
                }
            }
        }
        async function cycleGetInfoAbooutUserAsync(CURRENT_ID){
            let resultGet = new Promise((resolve, reject) => {
                USER.findByPk(CURRENT_ID).then((user) => {
                    if (user) {
                        console.log("cycle: " + CURRENT_ID)
                        console.log("From database: ", user);
                        resolve(user);
                    } else {
                        res.status(404).json({ message: "No valid entry found for provided ID" });
                    }
                });
            });
            return await resultGet;
          
        }
        ANALYSIS.create({
            numberOfPeople: arrayOfPeopleIds.length,
            result: JSON.stringify(resultArray),
        }).then(result => {
            console.log(result);
            res.status(201).json({
                message: "Analysis created!",
                result: result
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    }
}


//analysis delete one func
exports.analysisDeleteOne = (req, res, next) => {
    const id = req.params.id;
    ANALYSIS.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).json({
            message: "Analysis №" + id + " was deleted",
            request: {
                type: "DELETE",
                url: "http://localhost:3000/Analysis",
                body: { name: "STRING", email: "STRING", password: "STRING" }
            }
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}