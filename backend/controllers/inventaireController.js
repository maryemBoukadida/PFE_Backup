const InventairePG = require("../models/InventairePG");
const InventaireBALISAGE = require("../models/InventaireBALISAGE");
const InventaireAGL = require("../models/InventaireAGL");

exports.getAllInventaires = async(req, res) => {
    const type = req.params.type; // "PG", "BALISAGE", "AGL"
    let Model;

    if (type === "PG") Model = InventairePG;
    else if (type === "BALISAGE") Model = InventaireBALISAGE;
    else if (type === "AGL") Model = InventaireAGL;
    else return res.status(400).json({ message: "Type inventaire invalide" });

    try {
        const data = await Model.find({});
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};