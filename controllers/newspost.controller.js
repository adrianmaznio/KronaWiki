const NewsPost = require('../models/newspost.model');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

exports.newspost_create = function(req, res, next) {
    //Add validations and sanitations
    var newspost = new NewsPost({
        title: req.body.title,
        author: req.body.author,
        date: req.body.date,
        author: req.body.author,
        hidden: req.body.hidden,
        body: req.body.body
    });
    newspost.save(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/dashboardnewsposts');
    })

};
exports.newspost_details = function(req, res, next) {
    //res.render('news_post_detail');
    res.send('News Post title: ' + req.body.title)
};

exports.newspost_update = function(req, res, next) {
    NewsPost.findByIdAndUpdate(req.body.id, {
        $set: {
            title: req.body.title,
            author: req.body.author,
            body: req.body.body
        }
    }, function(err, newspost) {
        if (err) return next(err);
        console.log('News Post updated.');
        res.redirect('/dashboardnewsposts');
    });
};

exports.newspost_delete = function(req, res, next) {
    NewsPost.findByIdAndRemove(req.body.id, function(err) {
        if (err) return next(err);
        console.log('Deleted news successfully!');
        res.redirect('/dashboardnewsposts');
    })
};