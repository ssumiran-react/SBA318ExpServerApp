import express from "express";
import standings from "../data/standings.js";
import teams from "../data/teams.js";

const router = express.Router();

router.route("/")
    .get((req, res) => {
        //const standingsFlat = Array.prototype.flat.call(standings.years);
        const yr = new Date().getFullYear();
        let wls = [];
        standings.forEach((s) => {
            let wl;
            for (let i of s.years) {
                if (Object.keys(i) == yr) {
                    const team = teams.find(t => t.id == s.id);
                    wl = { "id": s.id, "team": team.name, "conference": team.conference, "win": i[yr].win, "lost": i[yr].lost, "year": yr };
                    console.log("in wl ", wl);
                    break;
                }
            }
            if (wl != undefined)
                wls.push(wl);
            console.log("in wls ", wls);
        })
        //console.log ("in year ",standingsFlat[0].years[0][2026].win);


        function multiSort(arr, criteria) {
            if (!Array.isArray(arr)) {
                throw new TypeError("First argument must be an array.");
            }
            if (!Array.isArray(criteria) || criteria.length === 0) {
                throw new TypeError("Criteria must be a non-empty array.");
            }

            // Clone array to avoid mutating the original
            return [...arr].sort((a, b) => {
                for (let { key, order } of criteria) {
                    if (!(key in a) || !(key in b)) {
                        throw new Error(`Key "${key}" not found in one of the objects.`);
                    }

                    const dir = order && order.toLowerCase() === 'desc' ? -1 : 1;

                    if (a[key] > b[key]) return dir;
                    if (a[key] < b[key]) return -dir;
                    // If equal, move to next criteria
                }
                return 0;
            });
        }
        // Sort by age ASC, then score DESC, then name ASC
        const wlStandings = multiSort(wls, [
            { key: "conference", order: "asc" },
            { key: "win", order: "desc" },
            { key: "lost", order: "asc" }
        ])



        
        res.render('standings', { wlStandings });

    })

// 404 Middleware
express().use((req, res, next) => {
    next(error(404, "Standings Not Found"));
});
export default router;