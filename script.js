let taskInput = document.getElementById("task-input");
let add = document.getElementById("add");
let taskWarn = document.getElementById("taskWarn");
let form = document.getElementById("form");
let summary = document.getElementById("textSummary");
let category = document.getElementById("category");
let cardContainer = document.getElementById("cardContainer");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  validateForm();
});

function validateForm() {
  if (taskInput.value == "") {
    console.log("form validation failed");
    taskWarn.innerHTML = "Pls enter this field";
  } else {
    // taskWarn.innerHTML = '';
    acceptData();
    add.setAttribute("data-dismiss", "modal");
    add.click();
    add.setAttribute("data-dismiss", "");
  }
}

let data = [];

let acceptData = function () {

  data.push({
    cate: category.value,
    task: taskInput.value,
    desc: summary.value,
  });

  localStorage.setItem('data',JSON.stringify(data));

  createCard();
  
};



function createCard() {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  cardContainer.innerHTML = "";

   data.map(function (item,x) {
    return (cardContainer.innerHTML += `
  <div class="card" id="${x}">
    <div class="top-content">
        <p>${item.cate}</p>
    

      <div class="card-icons">
        <i class="fa-regular fa-pen-to-square" onclick="edit(this)" data-toggle="modal" data-target="form"></i>
        <i class="fa-solid fa-trash-can" onclick="del(this)" id='del' ></i>
      </div>
    </div>
    <div class="card-content">
      <h3>${item.task}</h3>
      <p>
        ${item.desc}
      </p>
    </div>
    <div class="date">
      <p>${currentDate}</p>
    </div>
  </div>
    `);
  });

  resetForm();
};

function del(e){
  e.parentElement.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.parentElement.id,1);
  localStorage.setItem('data',JSON.stringify(data));
}

function edit(e){


    let selectedTask = e.parentElement.parentElement.parentElement;
    category.value = selectedTask.children[0].children[0].innerHTML;
    taskInput.value = selectedTask.children[1].children[0].innerHTML;
    summary.value = selectedTask.children[1].children[1].innerHTML; 
    del(e);

}

let resetForm = () => {
  category.value = "";
  taskInput.value ="";
  summary.value = '';
}



(() => {
  data = JSON.parse(localStorage.getItem('data')) || [];
  createCard();
})()




// let form = document.getElementById("form");
// let textInput = document.getElementById("textInput");
// let dateInput = document.getElementById("dateInput");
// let textarea = document.getElementById("textarea");
// let msg = document.getElementById("msg");
// let tasks = document.getElementById("tasks");
// let add = document.getElementById("add");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   formValidation();
// });

// let formValidation = () => {
//   if (textInput.value === "") {
//     console.log("failure");
//     msg.innerHTML = "Task cannot be blank";
//   } else {
//     console.log("success");
//     msg.innerHTML = "";
//     acceptData();
//     add.setAttribute("data-bs-dismiss", "modal");
//     add.click();

//     (() => {
//       add.setAttribute("data-bs-dismiss", "");
//     })();
//   }
// };

// let data = [{}];

// let acceptData = () => {
//   data.push({
//     text: textInput.value,
//     date: dateInput.value,
//     description: textarea.value,
//   });

//   localStorage.setItem("data", JSON.stringify(data));

//   console.log(data);
//   createTasks();
// };

// let createTasks = () => {
//   tasks.innerHTML = "";
//   data.map((x, y) => {
//     return (tasks.innerHTML += `
//     <div id=${y}>
//           <span class="fw-bold">${x.text}</span>
//           <span class="small text-secondary">${x.date}</span>
//           <p>${x.description}</p>
  
//           <span class="options">
//             <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
//             <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
//           </span>
//         </div>
//     `);
//   });

//   resetForm();
// };

// let deleteTask = (e) => {
//   e.parentElement.parentElement.remove();
//   data.splice(e.parentElement.parentElement.id, 1);
//   localStorage.setItem("data", JSON.stringify(data));
//   console.log(data);
  
// };

// let editTask = (e) => {
//   let selectedTask = e.parentElement.parentElement;

//   textInput.value = selectedTask.children[0].innerHTML;
//   dateInput.value = selectedTask.children[1].innerHTML;
//   textarea.value = selectedTask.children[2].innerHTML;

//   deleteTask(e);
// };

// let resetForm = () => {
//   textInput.value = "";
//   dateInput.value = "";
//   textarea.value = "";
// };

// (() => {
//   data = JSON.parse(localStorage.getItem("data")) || []
//   console.log(data);
//   createTasks();
// })();