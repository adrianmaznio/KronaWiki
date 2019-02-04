const Consumable = require('../models/consumable.model');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

exports.consumable_create = function(req, res, next) {
    //Add validations and sanitations

    var consumable = new Consumable({
        name: req.body.name,
        level: req.body.level,
        effect: req.body.effect
    });
    consumable.save(function(err) {
        if (err) {
            return next(err);
        } else {
            //console.log('Created weapon successfully!');
            req.flash('success', 'Consumable created successfully!');
            res.redirect('/dashboard/items');
        }

    })

};

exports.consumable_details = function(req, res, next) {
    Weapon.findById(req.params.consumableID, (err, result) => {
        if (err) {
            return console.log(err)
        } else {
            res.render('consumabledetails', {
                consumable: result
            });
        }
    })
};

exports.consumable_update = function(req, res, next) {
    Consumable.findByIdAndUpdate(req.body.id, {
        $set: {
            name: req.body.name,
            level: req.body.level,
            effect: req.body.effect
        }
    }, function(err, product) {
        if (err) {
            return next(err);
        } else {
            // console.log('Updated weapon successfully!');
            req.flash('warning', 'Consumable updated!');
            res.redirect('/dashboard/items');
        }
    });
};

exports.consumable_delete = function(req, res, next) {
    Consumable.findByIdAndRemove(req.body.id, function(err) {
        if (err) {
            return next(err);
        } else {
            // console.log('Deleted weapon successfully!');
            req.flash('danger', 'Consumable deleted!');
            res.redirect('/dashboard/items');
        }
    })
};