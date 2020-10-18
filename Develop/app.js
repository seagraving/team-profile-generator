const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const employee_db = []

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function start() {
    inquirer
        .prompt({
            name: "toDo",
            //   list or input for type?
            type: "list",
            message: "What would you like to do?",
            choices: ["Add Manager", "Add Engineer", "Add Intern", "Exit"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            switch (answer.toDo) {
                case "Add Manager":
                    addManager()
                    break
                case "Add Engineer":
                    addEngineer()
                    break
                case "Add Intern":
                    addIntern()
                    break
                case "Exit":
                    exitToTeam()
                    break
            }
        });
}

function addManager() {
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "What is the Manager's name?"
    }, {
        name: "id",
        type: "input",
        message: "What is the Manager's ID?"

    }, {
        name: "email",
        type: "input",
        message: "What is the Manager's email?"
    }, {
        name: "office",
        type: "input",
        message: "What is the Manager's office number?"
    }]).then(function(answer){
        const newManager = new Manager(answer.name, answer.id, answer.email, answer.office)
        employee_db.push(newManager)
        start(); 
    }) 
}

function addEngineer(){
    inquirer.prompt ([{
        name: "name",
        type: "input",
        message: "What is the Engineer's name?"
    }, {
        name: "id",
        type: "input",
        message: "What is the Engineer's ID?"
    }, {
        name: "email",
        type: "input",
        message: "What is the Engineer's email?"
    }, {
        name: "github",
        type: "input",
        message: "What is the Engineer's GitHub username?"
    }]).then(function(answer){
        const newEngineer = new Engineer(answer.name, answer.id, answer.email, answer.github)
        employee_db.push(newEngineer)
        start();
    })
}

function addIntern() {
    inquirer.prompt ([{
        name: "name",
        type: "input",
        message: "What is the Intern's name?"
    }, {
        name: "id",
        type: "input",
        message: "What is the Intern ID?"
    }, {
        name: "email",
        type: "input",
        message: "What is the Intern's email?"
    }, {
        name: "school",
        type: "input",
        message: "What is the Intern's school name?"
    }]).then(function(answer){
        const newIntern = new Intern(answer.name, answer.id, answer.email, answer.school)
        employee_db.push(newIntern)
        start();
    })
}

function exitToTeam() {
console.log(employee_db)
const teamData = render(employee_db)
fs.writeFile(outputPath, teamData, function(error){
    if (error) throw error
    console.log("Success!")
})
}
start();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
