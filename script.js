/*
 * File: script.js
 * Created: Tuesday, 22nd December 2020 1:33:12 pm
 * Author: Aquib Mujtaba (aquib.pust13@gmail.com)
 * -----
 * Last Modified: Monday, 4th January 2021 10:20:28 pm
 * Modified By: Aquib Mujtaba (aquib.pust13@gmail.com)
 * -----
 * Copyright (c) 2020 @quib_self
 */


//Define all elements within a variable that used in HTML
let form = document.querySelector('#task-form');
let taskInput = document.querySelector('#task_input');
let taskList = document.querySelector('ol');
let clearButton = document.querySelector('#clear_btn');

//Defining event Listener
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearButton.addEventListener('click', clearTask);
document.addEventListener('DOMContentLoaded', getStoredData);


//Defining Functions
function addTask(e) {
    if (taskInput.value === "") {
        alert('Add a Task!');
    } else {
        // Create Li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));

        //Adding an option to done the task
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = ' X ';
        li.appendChild(link)

        taskList.appendChild(li);

        //Add local storage for save the data
        storeInLocalStorage(taskInput.value);

        taskInput.value = "";
    }
    e.preventDefault();
}

//Removing from task list one by one
function removeTask(e) {
    if (e.target.hasAttribute('href')) {
        let ele = e.target.parentElement;
        ele.remove();
        // to remove from local storage
        removeDataFromLocalStorage(ele);
    }
}


// Clear All task from list
function clearTask(e) {
    if (confirm('Delete All !')) {
        taskList.innerHTML = '';
    }
    localStorage.clear();
}

//Local Storage function definition
function storeInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//DOM event function to load data

function getStoredData() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(element => {
        // Create Li element from local storage tasks array
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(element + " "));

        //Adding an option to done the task
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = ' X ';
        li.appendChild(link)
        taskList.appendChild(li);
    });
}

//Definig function for removing data from local storeage
function removeDataFromLocalStorage(item) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = item;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}