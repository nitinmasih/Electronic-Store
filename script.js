const id = document.getElementById("userid");
const productName = document.getElementById("proname");
const seller = document.getElementById("seller");
const price = document.getElementById("price");
const createButton = document.getElementById("btn-create");
const deleteBtn = document.getElementById("btn-delete");
const updateBtn = document.getElementById("btn-update");
const inputs = document.querySelectorAll('input');

let updateId;

// function to save data
const saveData = () => {
  const newObj = {
    id: id.value,
    productName: productName.value,
    seller: seller.value,
    price: price.value,
  };

  let webTask = localStorage.getItem("data");
  if (webTask == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(webTask);
  }

  taskObj.push(newObj)
  localStorage.setItem("data", JSON.stringify(taskObj));
};
const showTask = () => {
  let webTask = localStorage.getItem("data");
  if (webTask == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(webTask);
  }
  let html = "";
  let tableElement = document.getElementById("tables");
  taskObj.forEach((item, index) => {
    html += `<tbody>
            <tr>
              <th >${item.id}</th>
              <td>${item.productName}</td>
              <td>${item.seller}</td>
              <td>${item.price}</td>
              <td onclick="editTask(${index})"><i class="fas fa-edit" id="edit-icon"></i></td>
              <td onclick="deleteTask(${index})"><i class="fas fa-trash-alt" id="delete-icon"></i></td> 
            </tr>
          </tbody>`;
  });
  tableElement.innerHTML = html;
};
showTask();

createButton.addEventListener("click", () => {

  saveData();
  showTask();

  // Loop through each input and clear its value
  inputs.forEach(input => {
    input.value = '';
  });
});


const editTask = (index) => {
  let editObj = taskObj[index];
  productName.value = editObj.productName;
  seller.value = editObj.seller;
  price.value = editObj.price;
  id.value = editObj.id;
  id.focus();
  updateId = index;
};

const deleteTask = (index) => {
  taskObj.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(taskObj));
  showTask();
};
const deleteAll = document.getElementById("btn-delete");

deleteAll.addEventListener("click", () => {
  localStorage.clear();
  showTask();
});


updateBtn.addEventListener("click", () => updateTask());

const updateTask = () => {
  const editedObj = {
    id: id.value,
    productName: productName.value,
    seller: seller.value,
    price: price.value,
  };
  taskObj[updateId] = editedObj;
  localStorage.setItem("data", JSON.stringify(taskObj));

  // Loop through each input and clear its value
  inputs.forEach(input => {
    input.value = '';
  });
  showTask();
};
