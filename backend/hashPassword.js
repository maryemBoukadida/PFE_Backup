const bcrypt = require("bcrypt");

const generateHash = async() => {
    const password = "tech123"; // mot de passe que tu veux
    const hash = await bcrypt.hash(password, 10);
    console.log("Mot de passe hashé :", hash);
};

generateHash();
// mot de pass admin:123456  //matricule A001
//mot de pass technicien : tech123 //matricule A002