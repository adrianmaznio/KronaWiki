const Weapon = require('../models/weapon.model');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

exports.weapon_create = function(req, res, next) {
    //Add validations and sanitations
    var weapon = new Weapon({
        class: req.body.class,
        name: req.body.name,
        type: req.body.type,
        level: req.body.level,
        attackMin: req.body.attackMin,
        attackMax: req.body.attackMax,
        bonus: req.body.bonus
    });
    weapon.save(function(err) {
        if (err) {
            return next(err);
        }
        console.log('Created weapon successfully!');
        res.redirect('/dashboard/items');
    })

};

exports.weapon_details = function(req, res, next) {
    // res.render('product_details');
    // Product.findById(req.params.id, function(err, product) {
    //     if (err) return next(err);
    //     res.send('Name: ' + product.name + '\nPrice: ' + product.price);
    // })
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
            bonus: req.body.bonus
        }
    }, function(err, product) {
        if (err) return next(err);
        console.log('Updated weapon successfully!');
        res.redirect('/dashboard/items');
    });
};

exports.weapon_delete = function(req, res, next) {
    Weapon.findByIdAndRemove(req.body.id, function(err) {
        if (err) return next(err);
        console.log('Deleted weapon successfully!');
        res.redirect('/dashboard/items');
    })
};