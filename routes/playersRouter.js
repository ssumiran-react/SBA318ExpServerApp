import express from "express";
import players from "../data/players.js";

const router = express.Router();
let teamPlayers;

router.route("/:teamId")
    .get((req, res) => {
        teamPlayers = players.filter((p) => p.teamId == req.params.teamId)
        //console.log(req.params.teamId, "teamPlayers", teamPlayers[0].id);
        res.render('players', { teamPlayers });
    })
    .delete((req, res, next) => {  //console.log(req.params.teamId, " players ");
        //const {m}= req.body.m;
        //console.log(" players ",m);
    });

router.route("/")
    .get((req, res) => { console.log("tlayers ", req.query.teamId);
        if (req.query.teamId == undefined){
            teamPlayers = players;
        }else{ 
            teamPlayers = players.filter((p) => p.teamId == req.query.teamId)
        }
        
        res.render('players', { teamPlayers });
    })
    .post((req, res, next) => { 
        const {firstName, height, weight, idNum, lastName, number, position, teamId} = req.body;
        
        if (firstName && lastName && teamId) {
            const p = {
                id: posts[posts.length - 1].id + 1,
                firstName: firstName,
                lastName: lastName,
                teamId: teamId,
                number: number,
                position: position,
                height: height,
                weight: weight
            };

            players.push(p);
            res.json("Player is added");
        } else {
            next(error(400, "Insufficient Data"));
        }

    })

    .patch((req, res, next) => {
        const post = posts.find((p, i) => {
        if (p.id == req.params.id) {
            for (const key in req.body) {
            posts[i][key] = req.body[key];
            }
            return true;
        }
        });

        if (post) res.json(post);
        else next();
    })

    .delete((req, res, next) => { 
        const {firstName, height, weight, idNum, lastName, number, position, teamId} = req.body;
        
        const player = players.find((p, i) => {  
            if (p.id == idNum) {            //console.log(p ," o p ",idNum);
                players.splice(i, 1);
                return true;
            }
        });

        teamPlayers = players;

        if (player) { //console.log(" o rend ",players)
             res.render('players', { teamPlayers });
        }else{
          next();
        }
    });


// 404 Middleware
express().use((req, res, next) => {
    next(error(404, "Players Not Found"));
});

export default router;