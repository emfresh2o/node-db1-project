const express = require('express');
const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
    db.select("*")
    .from("accounts")
    .then(rows => {
        res.status(200).json({ data: rows});
    })
    .catch( error => res.status(500).json({message: "Error retrieving accounts"}))
})


router.get("/:id", (req, res) => {
    db("accounts")
    .where({ id: req.params.id})
    .first()
    .then(account => {
        if (account) {
            res.status(200).json({data: account})
        } else {res.status(404).json({message: "Account not found"})}
    })
    .catch( error => res.status(500).json({message: "Error retrieving accounts"}))
})

router.post("/", (req, res) => {
    db("accounts")
    .insert(req.body, "id")
    .then(id => {
        res.status(201).json({results: id})
    })
    .catch( error => {
        res.status(500).json({message: "Error posting new account"})
    })
})

router.put('/:id', (req, res) => {
    db('account')
    .update(req.params.id, req.body)
    .then(() => {
        db('account').getById(req.params.id)
        .then(account => res.status(201).json(account))
        .catch(err => res.status(500).json(err))
    });
})



router.delete("/:id", (req, res) => {
    db("accounts")
    .where({id: req.params.id})
    .del()
    .then( count => {
        if (count>0) {
            res.status(200).json({message: "Account has been deleted"})
        } else { res.status(404).json({message: "Account is not found"})}
    })
    .catch(error => res.status(500).json({message: "Error deleting the account"}))
})

module.exports = router;