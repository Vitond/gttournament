const http = require("http");
const fs = require("fs");

const index = [
    "/",
    "/registration",
    "/contestants",
    "/sponsors",
    "/rules",
    "/documents"
];

const files = [ //find -L
    "/rules/LOL.pdf",
    "/rules/ROCKET_LEAGUE.pdf",
    "/rules/MINECRAFT.pdf",
    "/rules/CS_GO.pdf",
    "/robots.txt",
    "/asset-manifest.json",
    "/static/css/main.c48eec82.chunk.css",
    "/static/css/main.c48eec82.chunk.css.map",
    "/static/js/2.4673f926.chunk.js.LICENSE.txt",
    "/static/js/2.4673f926.chunk.js",
    "/static/js/main.dbcbaab9.chunk.js",
    "/static/js/runtime-main.c772e103.js",
    "/static/js/runtime-main.c772e103.js.map",
    "/static/js/main.dbcbaab9.chunk.js.map",
    "/static/js/2.4673f926.chunk.js.map",
    "/static/media/rocket-wallpaper.2d18a6bc.webp",
    "/static/media/twitch-logo.9665ad35.svg",
    "/static/media/CZC_logo.0cc27c7a.png",
    "/static/media/rocket-logo.57593812.png",
    "/static/media/counter-wallpaper.4ca60fed.webp",
    "/static/media/counter-logo.4ca7c802.svg",
    "/static/media/minecraft-wallpaper.6bcfc721.webp",
    "/static/media/lol-wallpaper.93c7e927.jpg",
    "/static/media/mail-icon.1e22ca5f.svg",
    "/static/media/league-logo.76f9ea73.png",
    "/static/media/minecraft-logo.d7672a93.svg",
    "/static/media/discord-logo.0dbc33e0.svg",
    "/static/media/logo.6f70f2ac.svg",
    "/agreement.pdf",
    "/favicon.svg",
    "/index.html",
    "/parent_agreement.pdf",
];

/**
 * function to handle requests
 * @param {*} req request object
 * @param {*} res response object
 */
function reqhandler(req, res){
    /*console.log("//////////////////////////new req//////////////////////////");
    console.log(req);
    console.log("//////////////////////////end req//////////////////////////");
    */
    if(index.includes(req.url)){
        res.setHeader("Content-type", "text/html");
        res.write(fs.readFileSync("index.html"));
        res.end();
    }else if(files.includes(req.url)){
        res.write(fs.readFileSync(__dirname + req.url));
        res.end();
    }else{
        res.setHeader("Content-type", "text/html");
        res.writeHead(404,{
            "Content-type": "html",
        });
        res.write(fs.readFileSync("404.html"));
        res.end();
    }
}

const server = http.createServer(reqhandler);

server.listen("3000");
console.log("runnung on port 3000");   