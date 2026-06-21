import express from "express";
import teams from "../data/teams.js";

const router = express.Router();

router.route("/")
    .get( (req, res)=> {
        res.render('teams', { teams });
        //console.log(" iam team router", teams[0].id);
    })

export default router;
