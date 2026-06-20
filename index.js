import express from "express";
import ejs from "ejs";
import teamsRouter from "./routes/teamsRouter.js";
import playersRouter from "./routes/playersRouter.js";

const port = 3000;
const app = express();

// Setup View Engine
app.set('view engine', 'ejs');

app.use("/teams", teamsRouter);
app.use("/players", playersRouter);

app.get("/home", (req, res)=>{
    //res.render('teams', { message: 'Hello World'  })
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