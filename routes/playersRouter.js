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

router.route("/")
    .get((req, res) => { //console.log("tlayers ", req.query.teamId);
        if (req.query.teamId == undefined || req.query.teamId == ""){
            teamPlayers = players;
        }else{ 
            teamPlayers = players.filter((p) => p.teamId == req.query.teamId)
        }        
        res.render('players', { teamPlayers });
    })

    .post((req, res, next) => { 
        const {firstName, height, weight, idNum, lastName, number, position, teamId} = req.body;
        console.log(weight, " new P: ",height);
        if (firstName && lastName && teamId) { 
            const p = {
                id: players[players.length - 1].id + 1,
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

    .put((req, res, next) => {
        const {firstName, height, weight, idNum, lastName, number, position, teamId} = req.body;
        console.log(weight, " .put P: ",height);
        const player = players.find((p, i) => {
        if (p.id == idNum) {
            for (const key in req.body) { console.log (players[i][key] , "  "+key+"  ",req.body[key])
                players[i][key] = req.body[key];
            }
            return true;
        }
        });

        if (player) {
            res.json("Player is updated");
        } else {
            next(error(404, "Update is failed"));
        }
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