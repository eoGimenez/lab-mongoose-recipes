const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipes-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create ({
      title: "curry",
      level: "Easy Peasy",
      ingredients: ["pollo", "patata", "nata", "cebolla"],
      cuisine: "Oriente",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      create: "EoG"
    })
  })
  .then((res) => {
    console.log(`**Recipe add:${res.title}`)
    return Recipe.insertMany(data);
  })
  .then((result) => {
    result.forEach((res) => {
    console.log(`** Recipie title: ${res.title}`)
    })
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true});
  }) 
  .then(() => {
    console.log("*Changed success*")
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then (() => {
    console.log("*Deleted success*")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
    console.log("*** conexion cerrada! ***")
    mongoose.connection.close()
  });
