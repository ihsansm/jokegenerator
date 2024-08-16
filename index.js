import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extented: true}));

let jokeData;

app.get("/", (req, res) => {
    try {
    res.render("index.ejs", {joke: jokeData});
    }catch (error) {
    res.send("No joke data available")
}
})

app.post("/joke", async (req, res) => {{
    try {
        const response = await axios.get("https://v2.jokeapi.dev/joke/Any?format=jon");
        jokeData = response.data;

        console.log(jokeData);

        res.redirect("/");
    } catch (error) {
        console.log("Error:", error);
    }
}});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});