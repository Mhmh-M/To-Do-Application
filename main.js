let input = document.querySelector(".input");
let submit = document.querySelector('.add');
let tasksDiv = document.querySelector('.tasks');
let clear = document.querySelector(".clear")
let arrayOfTasks = [];

submit.addEventListener("click", (e) => {
    e.preventDefault()
    addTaskToArray(input.value)

});

clear.addEventListener("click", (e) => {
    e.preventDefault()
    arrayOfTasks = []
    localStorage.clear()
    // tasksDiv.innerHTML = "Add new Task";

});



if (localStorage.getItem('tasks') != null) {
    tasksDiv.innerHTML = "";
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < arrayOfTasks.length; i++) {
        addElementsToPageFrom(arrayOfTasks[i])

    }

}

tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("task")) {
        toggleStautusTaskWith(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done")
    }
})


function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };

    arrayOfTasks.push(task);
    addElementsToPageFrom(arrayOfTasks[arrayOfTasks.length - 1])
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));

}

function addElementsToPageFrom(task) {

    let div = document.createElement('div');
    div.className = 'task';

    // if (task.completed === true) {
    //     div.className = 'task done'
    // }
    div.setAttribute('data-id', task.id);

    let text_Div = document.createElement("div");
    text_Div.className = "div_content";

    text_Div.appendChild(document.createTextNode(task.title));
    div.appendChild(text_Div);

    let spans_Container = document.createElement("div");
    spans_Container.className = "spans_Container";
    div.appendChild(spans_Container);

    let span_Done = document.createElement("span");
    // span_Done.type = "checkbox"
    span_Done.className = "task_Is_Done";
    span_Done.appendChild(document.createTextNode("Done"));
    spans_Container.appendChild(span_Done);
    span_Done.setAttribute('data-id', task.id);

    span_Done.addEventListener("click", () => {
        div.className = 'task done'

    })

    let span_Delete = document.createElement('span');
    span_Delete.className = 'del';
    span_Delete.appendChild(document.createTextNode("Delete"));

    spans_Container.appendChild(span_Delete);
    span_Delete.setAttribute('data-id', task.id);
    tasksDiv.appendChild(div);

    span_Delete.addEventListener("click", () => {
        div.remove()
        if (!arrayOfTasks.length) {
            localStorage.clear()
        } else {
            arrayOfTasks = arrayOfTasks.filter(function (item) { return item.id != span_Delete.getAttribute('data-id', task.id) });
            localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
        }


    })
    // if (!arrayOfTasks.length) {
    //     // tasksDiv.innerHTML = "Add new Task";
    //     console.log("true")
    //     let new_div = document.createElement("div");
    //     new_div.appendChild(document.createTextNode("Add new Task"))
    //     div.appendChild(new_div)
    // } else {
    //     console.log("false")

    // }

}

function addDataToLocalStorge(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function toggleStautusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed = false ? arrayOfTasks[i].completed = true : arrayOfTasks[i].completed = false;
        }
    }
    addDataToLocalStorge(arrayOfTasks)
}