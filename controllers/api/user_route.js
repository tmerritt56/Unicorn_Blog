const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req,res) => {
    try { 
        const userD = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userD.isSoftDeleted;
            req.session.logged_in = true;
            res.status(200).json(userD);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req,res) => {
    try{
        const userD =await User.findOne({ where: { email: req.body.email } }); 

        if (!userD) {
            res 
            .status(400)
            .json({ message: 'You typed your email or password wrong, try again :)' });
            return;
        }

        const validP = await userD.checkPassword(req.body.password);

        if (!validP) {
            res
            .status(400)
            .json({ message: 'You typed your email or password wrong, try again :)'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userD.id;
            req.session.logged_in = true;

            res.json({ user: userD, message: 'You are now a Unicorn, please continue!'});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req,res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
module.exports = router; 