const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of your project?"
        },
        {
            type: "input",
            name: "description",
            message: "Describe your project."
        },

        {
            type: "input",
            name: "installation",
            message: "What are the installation instructions?"
        },
        {
            type: "input",
            name: "usage",
            message: "How is this project used?"
        },
        {
            type: "list",
            name: "license",
            message: "Select a license.",
            choices: ["MIT", "GNU", "Apache"]
        },
        {
            type: "input",
            name: "contributing",
            message: "How should contributions be made?"
        },
        {
            type: "input",
            name: "tests",
            message: "What are the testing instructions?"
        },
        {
            type: "input",
            name: "github",
            message: "Enter your github username."
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email address."
        }
    ]);
}

function generateReadMe(answers) {
    var licenseLink = {
        MIT: "https://opensource.org/licenses/MIT",
        GNU: "https://www.gnu.org/licenses/gpl-3.0",
        Apache: "https://opensource.org/licenses/Apache-2.0",
    }
    var licenseBadge = {
        MIT: "https://img.shields.io/badge/License-MIT-yellow.svg",
        GNU: "https://img.shields.io/badge/License-GPLv3-blue.svg",
        Apache: "https://img.shields.io/badge/License-Apache%202.0-blue.svg",
    }
    return `
  # ${answers.title} [![License: ${answers.license}](${licenseBadge[answers.license]})](${licenseLink[answers.license]})

  ## Description
  ${answers.description}

  ## Table of Contents
  * [Description](#description)
  * [Installation Instructions](#installation)
  * [Usage Information](#usage)
  * [Contribution Guidlines](#contributions)
  * [Test Instructions](#testing)
  * [Questions](#questions)

  ## Installation
  ${answers.installation}

  ## Usage
  ${answers.usage}

  ## Contributions
  ${answers.contributing}

  ## Testing
  ${answers.tests}

  ## Questions
  Where to Contact Me
  
  Github Profile: github.com/${answers.github}

  Email Address: ${answers.email}`;
}

promptUser()
    .then(function (answers) {
        const md = generateReadMe(answers);

        return writeFileAsync("README.md", md);
    })
    .then(function () {
        console.log("Successfully wrote to README.md");
    })
    .catch(function (err) {
        console.log(err);
    });