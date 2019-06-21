const noteStore = require("../services/note-store.js");

async module.exports.getNotes = function(req,res){
    res.json(await noteStore.getNotes)
};
