const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Clz = require('../models/clz');

router.get('/', (req, res, next) => {
    Clz
        .find()
        .exec() 
        .then(docs => {
            console.log(docs); 
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const clz = new Clz({
        _id: new mongoose.Types.ObjectId(),
        subjectName: req.body.name,
        hallNo: req.body.hallNo,
        grade: req.body.grade,
        day: req.body.day,
        batch: req.body.batch,
        time: req.body.time,
        teacher: req.body.teacher,
        cardMarker: req.body.cardMarker
    });
    clz
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                state: true,
                clzId: clz._id,
                teacher: req.body.teacher,
                Card_Marker: req.body.cardMarker
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:clzId', (req, res, next) => {
    const searchId = req.params.clzId;
    Clz
        .findById(searchId)
        .populate('teacher cardMarker')
        .exec()
        .then(result => {
            res.status(200).json({
                Clz: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ 
                state: false 
            });
        });

});
 
router.patch('/:clzId', (req, res, next) => {
    const patchId = req.params.clzId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Clz.update({ _id: patchId }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                state: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                state: false
            });
        });
});

router.delete('/:clzId', (req, res, next) => {
    const deleteId = req.params.clzId;
    Clz
        .findById(deleteId)
        .then(result => {
            if (result){
                Clz
                    .remove({ _id: deleteId })
                    .then()

                    res.status(200).json({
                        state: true
                    });
            } else {
                res.status(200).json({
                    state: false
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                state: false
            });
        });
});

module.exports = router;