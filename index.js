import express from "express";
import ejs from "ejs";
import bodyParser from 'body-parser';
import teamsRouter from "./routes/teamsRouter.js";
import playersRouter from "./routes/playersRouter.js";
import standingsRouter from "./routes/standingsRouter.js";

const port = 3000;
const app = express();

// Setup View Engine
app.set('view engine', 'ejs');
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/teams", teamsRouter);
app.use("/players", playersRouter);
app.use("/standings", standingsRouter);

app.get("/home", (req, res)=>{
    res.redirect("/teams");    
})
 
app.get("/", (req, res) => {  //create a route
    res.redirect("/home");
})

app.listen(port, () => {  // Start server
    console.log("Server port: " + port);
})

//Error handling middleware
app.use((err, req, res, next) => {
    res.status(404).send("Error: "+err);
})