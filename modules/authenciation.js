var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var FacebookStrategy = require('passport-facebook').Strategy
var database = require('./database')

module.exports = {
    login: function (req, res) {
        if (req.user && req.user.local) {
            res.render('admin/pages/dashboard', { user: req.user });
        } else {
            res.render('admin/pages/login', { message: req.flash('loginMessage') })
        }
    },
    logout: function (req, res) {
        req.logout();
        res.redirect('/login');
    },
    localLogin: passport.authenticate('local-administrator', {
        successRedirect: '/ad/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    }),
    signup: passport.authenticate('local-signup', {
        successRedirect: '/ad/dashboard',
        failureRedirect: '/signup',
        failureFlash: true
    }),
    facebookLogin: passport.authenticate('facebook', { scope: ['manage_pages', 'publish_pages'] }),

    facebookCallback: passport.authenticate('facebook', {
        successRedirect: '/ad/setting',
        failureRedirect: '/login'
    }),
    initialize: function (app, facebookApp) {
        app.use(passport.initialize());
        app.use(passport.session());
        passport.use(new FacebookStrategy({
            clientID: facebookApp.id,
            clientSecret: facebookApp.secret,
            passReqToCallback: true,
            callbackURL: facebookApp.url
        },
            function (req, token, refreshToken, profile, done) {
                process.nextTick(function () {
                    if (!req.user) {
                        done(null, user)
                    } else {
                        var user = req.user; // lấy đối tượng người dùng trong session
                        user.facebook = {
                            id: profile.id,
                            token: token,
                            displayName: profile.displayName
                        };
                        user.save(function (err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, user);
                        })
                    }
                });
            }
        ))
        passport.use('verify', function (req) {

        })

        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function (id, done) {
            database.user.findById(id, function (err, user) {
                done(err, user);
            });
        });

        passport.use('local-administrator', new LocalStrategy({
            usernameField: 'user',
            passwordField: 'password',
            passReqToCallback: true
        },
            function (req, email, password, done) {
                database.user.findOne({ 'local.email': email }, function (err, docs) {
                    if (err) {
                        return done(err);
                    }
                    if (!docs) {
                        return done(null, false, req.flash('loginMessage', 'Không tìm thấy tài khoản'));
                    }
                    if (docs.password || docs.local.password != password) {
                        return done(null, false, req.flash('loginMessage', 'Mật khẩu chưa đúng'));
                    }
                    return done(null, docs);
                });
            }));

        passport.use('local-signup', new LocalStrategy({
            usernameField: 'user',
            passwordField: 'password',
            passReqToCallback: true
        },
            function (req, email, password, done) {
                process.nextTick(function () {
                    database.user.findOne({ 'local.email': email }, function (err, user) {
                        if (err)
                            return done(err);
                        if (user) {
                            return done(null, false, req.flash('signupMessage', 'Email  đã tồn tại .'));
                        } else {
                            var newUser = new User();
                            newUser.local.email = email;
                            newUser.local.password = password;
                            newUser.save(function (err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }

                    });

                });

            })
        );
    }
}
