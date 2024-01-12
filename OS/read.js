const fs = require('fs');

const filePath = '/Users/shubham/shubham/Quizzify/questions.json';

fs.promises.readFile(filePath, 'utf-8')
    .then(data => {
        const parsedData = JSON.parse(data);
        // Now 'parsedData' contains your JSON data
        console.log(parsedData);
    })
    .catch(error => console.error("Error reading JSON:", error));
