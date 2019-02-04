const Guide = require('../models/guide.model');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

exports.guide_create = function(req, res, next) {
    //Add validations and sanitations
    var guide = new Guide({
        title: req.body.title,
        author: req.body.author,
        date: req.body.date,
        body: req.body.body
    });
    guide.save(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    })

};
exports.guide_details = function(req, res, next) {
    Guide.findById(req.params.guideID, (err, result) => {
        if (err) {
            return console.log(err)
        } else {
            res.render('guide', {
                guide: result
            });
        }
    })
};

exports.guide_update = function(req, res, next) {
    Guide.findByIdAndUpdate(req.body.id, {
        $set: {
            title: req.body.title,
            author: req.body.author,
            body: req.body.body
        }
    }, function(err, newspost) {
        if (err) return next(err);
        console.log('Guide updated.');
        res.redirect('/');
    });
};

exports.guide_delete = function(req, res, next) {
    Guide.findByIdAndRemove(req.body.id, function(err) {
        if (err) return next(err);
        console.log('Deleted news successfully!');
        res.redirect('/');
    })
};