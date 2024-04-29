#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let conditions = true;
console.log("=".repeat(70));
console.log(chalk.magenta.bold("\n\tWellcome to my code: Todo - List - Application\n"));
console.log("=".repeat(70));
let main = async () => {
    while (conditions) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.blue("Select an option you want to do:"),
                choices: ["Add Task", "Delete Task", "Update Task", "View todo-List", "Exit"],
            }
        ]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await updateTask();
        }
        else if (option.choice === "View todo-List") {
            await viewTask();
        }
        else if (option.choice === "Exit") {
            conditions = false;
        }
    }
};
//Function to add new Task in the List
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.green("Enter your new Task:")
        }
    ]);
    todoList.push(newTask.task);
    console.log(chalk.red(`\n ${newTask.task} task updated successfully in your Todo-list\n`));
};
// Function to view all Todo-Tasks
let viewTask = () => {
    console.log("\n Your Todo-List: \n");
    todoList.forEach((task, index) => {
        console.log(chalk.red(` ${index + 1}: ${task}`));
    });
};
//Function to delete a task from the list
let deleteTask = async () => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.green("Enter the 'index.no' of the task you want to delete:"),
        }
    ]);
    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(chalk.red(`\n${deletedTask} This task has been deleted successfully from your Todo-List\n`));
};
//Function to Update a Task
let updateTask = async () => {
    await viewTask();
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.green("Enter the index of the task you want to update:")
        },
        {
            name: "new_task",
            type: "input",
            message: chalk.green("Now Enter new Task name :")
        }
    ]);
    todoList[update_task_index.index - 1] = update_task_index.new_task;
    console.log(chalk.red(`\n Task at index no.${update_task_index.index - 1} added successfully! [for updated list check option: "view Todo-List"]`));
};
main();
