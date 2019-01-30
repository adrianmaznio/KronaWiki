const Armor = require('../models/armor.model');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

exports.armor_create = function(req, res, next) {
    //Add validations and sanitations
    var armor = new Armor({
        class: req.body.class,
        sex: req.body.sex,
        name: req.body.name,
        type: req.body.type,
        level: req.body.level,
        defenseMin: req.body.defenseMin,
        defenseMax: req.body.defenseMax,
        rarity: req.body.rarity,
        location: req.body.location,
        set: req.body.set
    });
    armor.save(function(err) {
        if (err) {
            return next(err);
        }
        console.log('Created armor successfully!');
        res.redirect('/dashboard/items');
    })

};

exports.armor_details = function(req, res, next) {
    Armor.findById(req.params.armorID, (err, result) => {
        if (err) return console.log(err)
        res.render('armordetails', {
            armor: result
        })
    })
};

exports.armor_update = function(req, res, next) {
    Armor.findByIdAndUpdate(req.body.id, {
        $set: {
            class: req.body.class,
            sex: req.body.sex,
            name: req.body.name,
            type: req.body.type,
            level: req.body.level,
            defenseMin: req.body.defenseMin,
            defenseMax: req.body.defenseMax,
            rarity: req.body.rarity,
            location: req.body.location,
            set: req.body.set
        }
    }, function(err, product) {
        if (err) return next(err);
        console.log('Updated armor successfully!');
        res.redirect('/dashboard/items');
    });
};

exports.armor_delete = function(req, res, next) {
    Armor.findByIdAndRemove(req.body.id, function(err) {
        if (err) return next(err);
        console.log('Deleted armor successfully!');
        res.redirect('/dashboard/items');
    })
};