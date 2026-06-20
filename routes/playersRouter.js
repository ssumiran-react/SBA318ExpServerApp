import express from "express";
import players from "../data/players.js";

const router = express.Router();

router.route("/:id")
    .get( (req, res)=> {
        const teamPlayers = players.filter((p)=> p.teamId == req.params.id)
        console.log("teamPlayers", teamPlayers[0].id);
        res.render('players', { teamPlayers });
    })

router.route("/")
    .get( (req, res)=> {
        const teamPlayers = players;
        console.log("teamPlayers", players);
        res.render('players', { teamPlayers });
    })

// 404 Middleware
express().use((req, res, next) => {
  next(error(404, "Players Not Found"));
});    
export default router;