import express from "express";
import axios from "axios";


const app = express();
const port = 3000;
const API_KEY = "58158dee17c7b97a1d12a198";


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.ejs",{
        outcomes:"",
        option1:"",
        option2:"",
        amount:"",
    });
})

app.post("/post",async(req,res)=>{
    let from = req.body.from;
    let to = req.body.to;
    let amount = req.body.amount;
    console.log(req.body);
    let result = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`);
    console.log(result.data);

    res.render("index.ejs",{
        outcomes:result.data.conversion_result,
        option1:from,
        option2:to,
        amount:amount,
    });
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});