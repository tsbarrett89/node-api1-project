// implement your API here
const express = require("express");

const server = express();

const port = 4000;
server.listen(port, () => 
    console.log(`\n ** API running on port ${port} ** \n`))