//accessing libraries
const fs = require("fs");

const inquirer = require("inquirer");


// function to initialize program
function init() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your project title?",
            name: "projectTitle"
        },
        {
            type: "input",
            message: "What is your github username?",
            name: "username"
        },
        {
            type: "input",
            message: "What is your email address?",
            name: "email"
        },
        {
            type: "input",
            message: "Please give a general description of your application?",
            name: "description"
        },
        {
            type: "input",
            message: "What are the installation insructions for your application?",
            name: "installInstruct"
        },
        {
            type: "input",
            message: "What are the usage instructions for your application?",
            name: "usage"
        },
        {
            type: "input",
            message: "What liscence do you have and what are the conditions?",
            name: "liscence"
        },
        {
            type: "input",
            message: "What are the guidelines for contribution to your application?",
            name: "guidelines"

        },
        {
            type: "input",
            message: "Please link to premade tests for your application, and give any test instructions?",
            name: "tests"

        },
        {
            type: "confirm",
            message: "Do you have contributors",
            name: "contributorsConfirm"
        }
    ]).then(function (response) {
        if (response.contributorsConfirm === true) {
            inquirer.prompt([
                {
                    type: "input",
                    message: "List the application's contributors: [name](https.github.com/githubAccountName) separate contributors by comma",
                    name: "contributorsInput"

                }]).then(function (response) {
                    const finalResponse = { ...response, ...response2 };
                    writeToFile("README.md", finalResponse);
                });
        }
        else{
            writeToFile("README.md", response);   
        }
    });

}
// function to write README file
function writeToFile(fileName, data) {
    //creating content
    const projectTitle = data.projectTitle;
    const username = data.username;
    const email = data.email
    const description=data.description
    const installInstruct=data.installInstruct;
    const usage =data.usage;
    const liscence=data.liscence;
    const tests=data.tests;
    const guidelines=data.guidelines;
    const contributorNames=data.contributorsInput;

    //altering table of contents and content depending on contributors
    let content ="";
    if(data.contributorsConfirm===false){
        const tableinMD = ["Description of Application","Installation Instructions","Directions for Use","Liscence","Testing","Contribution Guidelines","Questions"];
         content = "# " + projectTitle+"\n\n ## Table of Contents \n\n["+tableinMD[0]+"](#des)\n\n["+tableinMD[1]+"](#insta)\n\n["+tableinMD[2]+"](#use)\n\n["+tableinMD[3]+"](#lis)\n\n["+tableinMD[4]+"](#test)\n\n["+tableinMD[5]+"](#gui)\n\n["+tableinMD[6]+"](#ques)\n\n <a id='des'></a>\n\n ## "
        +tableinMD[0]+"\n"+description
        +"\n\n<a id='insta'></a> \n\n ## "+tableinMD[1]+"\n"+installInstruct+"\n\n<a id='use'></a> \n\n ## "+tableinMD[2]+"\n"+usage+" \n\n<a id='lis'></a> \n\n ## "+tableinMD[3]+"\n"+liscence+"\n\n<a id='test'></a> \n\n ## "+tableinMD[4]+"\n"+tests+"\n\n<a id='gui'></a> \n\n ## "+tableinMD[5]+"\n"+guidelines+"\n\n<a id='ques'></a> \n\n ## "+tableinMD[6]+ "\n\n Created by: [" + username + "](https://www.github.com/" + username + ")\n\n If you have any further queries, please contact the creator at: "+email+"\n\n With the subject \""+projectTitle+" Query\".";
    }
    else{
        const tableinMD = ["Description of Application","Installation Instructions","Directions for Use","Liscence","Testing","Contribution Guidelines","Contributors","Questions"];
    
        content = "# " + projectTitle + 
        "\n\n ## Table of Contents \n\n["+tableinMD[0]+"](#des)\n\n["+tableinMD[1]+"](#insta)\n\n["+tableinMD[2]+"](#use)\n\n["+tableinMD[3]+"](#lis)\n\n["+tableinMD[4]+"](#test)\n\n["+tableinMD[5]+"](#gui)\n\n["+tableinMD[6]+"](#cont)\n\n["+tableinMD[7]+"](#ques)\n\n <a id='des'></a> \n\n ## "
        +tableinMD[0]+"\n"+description
        +"\n\n <a id='insta'></a> \n\n ## "+tableinMD[1]+"\n"+installInstruct+"\n\n<a id='use'></a> \n\n ## "+tableinMD[2]+"\n"+usage+"\n\n<a id='lis'></a> \n\n ## "+tableinMD[3]+"\n"+liscence+"\n\n<a id='test'></a> \n\n ## "+tableinMD[4]+"\n"+tests+"\n\n<a id='gui'></a> \n\n ## "+tableinMD[5]+"\n"+guidelines+"\n\n<a id='cont'></a> \n\n ## "+tableinMD[6]+"\n"+contributorNames+"\n\n<a id='ques'></a> \n\n ## "+tableinMD[7]+ "\n\n Created by: [" + username + "](https://www.github.com/" + username + ")\n\n If you have any further queries, please contact the creator at: "+email+"\n\n With the subject \""+projectTitle+" Query\".";
       
    }

    //write file
    writeFileAsync(projectTitle+"_README.md", content);
}

// function call to initialize program
init();
