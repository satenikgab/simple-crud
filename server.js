const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const PORT = 3000
 let movies = []
 app.use(bodyParser.json())
 
 
 app.post("/movies", (req , res) => {
    const newMovie = req.body
    movies.push(newMovie)
    res.status(201).send({message: 'New movie was added to the list',
  })
 })

 app.get("/movies/:id",(req , res) => {
    const movie = movies.find(m => m.id == parseInt(req.params.id))
    if(movie) {
        res.status(200).json(movie)
    } else res.status(404).send("Movie not found")
 })

 app.get("/movies" , (req,res) => {
    res.json(movies)
 })


 app.put ("/movies/:id" , (req, res) => {
    let movieIndex = movies.findIndex(m => m.id == parseInt(req.params.id))
     movies[movieIndex] = req.body
    res.status(200).json(movies[movieIndex])
 })

 app.delete("/movies" ,(req,res) => {
    movies = []
    res.status(204)
 })

 app.delete("/movies/:id" , (req , res) => {
    let movieIndex = movies.findIndex(m => m.id == parseInt(req.params.id))
    if (movieIndex != -1) {
        movies.splice(movieIndex , 1)
        res.status(204)
    } else res.status(404).send("Movie not found")

 })


 app.patch("/movies/:id" , (req , res) => {
    const movie = movies.find(m => m.id == parseInt(req.params.id))
    if (movie) {
        if(req.body.title != undefined){
            movie.title = req.body.title
        }
        if (req.body.director != undefined){
            movie.director = req.body.director
        }
        if (req.body.genre != undefined) {
            movie.genre = req.body.genre
        }
        if (req.body.year != undefined) {
            movie.year = req.body.genre
        } res.status(200).json(movie)
    } else res.status(404).send("movie not found")


 })



 app.listen(PORT,() => {
    console.log("server is runnimg...")
 })