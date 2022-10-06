const express = require("express");
const router = express.Router();

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static("public"));

router.get("/home", (req,res)=>{

    res.render("home.ejs");
});

router.get("/createGuest", (req,res)=>{

    res.render("createGuest.ejs");
});

router.get("/employee", (req,res)=>{

    res.render("employee");
});

router.get("/guestList", (req,res)=>{

    res.render("guestList");
});

router.get("/room", (req,res)=>{

    res.render("room");
});

router.get("/roomList", (req,res)=>{

    res.render("roomList");
});

router.get("/updateEmployee", (req,res)=>{

    res.render("updateEmployee");
});

router.get("/updateGuest", (req,res)=>{

    res.render("updateGuest");
});

router.get("/updateRoom", (req,res)=>{

    res.render("updateRoom");
});

module.exports = router;