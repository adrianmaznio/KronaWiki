const Weapon = require('../models/weapon.model');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

exports.weapon_create = function(req, res, next) {
    //Add validations and sanitations
    // req.checkBody('name', 'Name is required.').notEmpty();
    // req.checkBody('name', 'Name is required.').notEmpty();
    // req.checkBody('level', 'Level is required.').notEmpty();
    // req.checkBody('attackMin', 'Attack Min. is required.').notEmpty();
    // req.checkBody('attackMax', 'Attack Max. is required.').notEmpty();

    var weapon = new Weapon({
        class: req.body.class,
        name: req.body.name,
        type: req.body.type,
        level: req.body.level,
        attackMin: req.body.attackMin,
        attackMax: req.body.attackMax,
        bonus: req.body.bonus,
        rarity: req.body.rarity,
        location: req.body.location
    });
    weapon.save(function(err) {
        if (err) {
            return next(err);
        } else {
            //console.log('Created weapon successfully!');
            req.flash('success', 'Weapon created successfully!');
            res.redirect('/dashboard/items');
        }

    })

};

exports.weapon_details = function(req, res, next) {
    Weapon.findById(req.params.weaponID, (err, result) => {
        if (err) {
            return console.log(err)
        } else {
            res.render('weapondetails', {
                weapon: result
            });
        }
    })
};

exports.weapon_update = function(req, res, next) {
    Weapon.findByIdAndUpdate(req.body.id, {
        $set: {
            class: req.body.class,
            name: req.body.name,
            type: req.body.type,
            level: req.body.level,
            attackMin: req.body.attackMin,
            attackMax: req.body.attackMax,
            bonus: req.body.bonus,
            rarity: req.body.rarity,
            location: req.body.location
        }
    }, function(err, product) {
        if (err) {
            return next(err);
        } else {
            // console.log('Updated weapon successfully!');
            req.flash('warning', 'Weapon updated!');
            res.redirect('/dashboard/items');
        }
    });
};

exports.weapon_delete = function(req, res, next) {
    Weapon.findByIdAndRemove(req.body.id, function(err) {
        if (err) {
            return next(err);
        } else {
            // console.log('Deleted weapon successfully!');
            req.flash('danger', 'Weapon deleted!');
            res.redirect('/dashboard/items');
        }
    })
};