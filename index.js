#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//Initialize user balance and pin code
let myBalance = 10000;
let myPin = 12345;
//Print welcome message
console.log(chalk.yellow("\n \tWelcome to Manaher's ATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.green("Enter your pin code")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\nYour pin is correct, login successful!\n"));
    // console.log(`Current account balance is ${myBalance}`);
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.green("Select an operation"),
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk.green("Select a withdrawal method:"),
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: chalk.green("Select Amount:"),
                    choices: [1000, 2000, 5000, 10000, 20000, 50000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log("Insufficient balance!");
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash} withdraw successfully`);
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: chalk.green("Enter the amount to withdraw:")
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("\nInsufficient Balance!\n"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} withdraw successfully`);
                console.log(`Your remaining balance is ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(`Your current account balance is ${myBalance}`);
    }
}
else {
    console.log(chalk.red("\nPin is incorrect, Try Again!\n"));
}
