const express = require ("express");
const mongoose = require ("mongoose");
const bodyParser = require ("body-parser");
const cors = require('cors');
const app = express();

//swagger
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');

const swaggerDefinition = yaml.load('./swagger.yaml');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

//Cors handle
app.use(cors());
//import routes
const projectRoutes = require("./routes/project")
const rowRoutes = require("./routes/row")
const columnRoutes = require("./routes/column")
const authRoutes = require("./routes/auth")
require("dotenv-flow").config();



//Parse request Json
app.use(bodyParser.json());



mongoose.connect(
    process.env.DBHOST,
    {
        
    }
).catch(error => console.log("Error connecting to MongoDB:" + error));

mongoose.connection.once('open', () => console.log('Connected to the MongoDB database.'));

//route
app.get ("/api/welcome", (req, res) =>{
    res.status(200).send({message: "Health check-Alive"});
});

// routes
app.use("/api/project", projectRoutes);
app.use("/api/row", rowRoutes);
app.use("/api/column", columnRoutes);
app.use("/api/user", authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, function(){
    console.log("Server is running on port:" + PORT);

})
module.exports = app;