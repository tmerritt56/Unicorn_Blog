const router = require('express').Router();
const { Comment,User,Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req,res) => {
    User.findAll({
        attributes: { exlude: ['password'] },
    })
    .then((dbUserD) => res.json(dbUserD))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req,res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_content', 'creation_date'],
            },
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'creation_date' ],
                include: {
                    model: Post,
                    attributes: ['username'],
                },
            },
        ],
    })
    .then ((dbUserD) => {
        if(!dbUserD) {
            res.status(404).json({message: 'No user found'});
            return;
        }
        res.json(dbUserD);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req,res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }).then ((dbUserD) => {
        req.session.save(() => {
            req.session.user_id = dbUserD.id;
            
        })
    })
})

