import { Router } from 'express';
import { decode, verify } from 'jsonwebtoken';
import  * as passport from 'passport';
import { jwt } from '../../config';
import { Strategy } from 'passport-remember-me';
console.log(Strategy);
var router = Router();

passport.use(new Strategy(function(token, done) {
    console.log({token, done});
    // Token.consume(token, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) { return done(null, false); }
    //   return done(null, user);
    // });
  },
  function(user, done) {
    console.log({user, done});
    // var token = utils.generateToken(64);
    // Token.save(token, { userId: user.id }, function(err) {
    //   if (err) { return done(err); }
    //   return done(null, token);
    // });
  }));

router.post("/account/authorize", passport.authenticate('remember-me', { failureRedirect: '/login', failureFlash: true }), (request, reply) => {
    const { token } = request.body;
    try {
        const payload = verify(token, jwt.tokenKey);
        passport.authenticate('remember-me');
        request.session.save(() => {
            reply.send({
                isSuccess: true,
                payload,
            });
        });
    } catch {
        reply.send({
            isSuccess: false,
        });
    }
    
});

export default router;
