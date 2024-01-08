let input = document.querySelector(".input");
let addBtn = document.querySelector(".add-btn");
let ol = document.querySelector(".ol");

// for function edit(edt){}
let targetTxt;
let editBtn;
let delBtn;

function addUser() {
  let lsData = localStorage.getItem("items");
  if (!lsData) lsData = [];
  else lsData = JSON.parse(lsData);

  if (input.value.trim().length > 2 && addBtn.innerHTML === "Add item") {
    ol.innerHTML += `<li>${input.value}<span>&nbsp;&nbsp;&nbsp;</span><button onclick="edit(this)">Edit</button>   <button onclick="delet(this)">Delete</button></li>`;
    lsData.push(ol.lastChild.outerHTML);
  }
  if (addBtn.innerHTML === "update...") {
    for (let i = 0; i < lsData.length; i++) {
      if (lsData[i].includes(targetTxt.nodeValue)) {
        lsData[i] = lsData[i].replace(targetTxt.nodeValue, input.value);
      }
    }
    targetTxt.nodeValue = input.value;
    input.value = "";
    delBtn.removeAttribute("disabled");
    editBtn.removeAttribute("disabled");
    addBtn.innerHTML = "Add item";
  }
  input.value = "";
  localStorage.setItem("items", JSON.stringify(lsData));
}

function edit(edt) {
  targetTxt = edt.parentNode.childNodes[0];

  editBtn = edt;
  editBtn.setAttribute("disabled", "disabled");
  delBtn = edt.nextSibling.nextSibling;
  delBtn.setAttribute("disabled", "disabled");

  addBtn.innerHTML = "update...";
  input.value = targetTxt.nodeValue;
}

function delet(del) {
  let targetDel = del.parentNode;
  ol.removeChild(targetDel);
  let updatedLsData = JSON.parse(localStorage.getItem("items"));
  for (let i = 0; i < updatedLsData.length; i++) {
    if (updatedLsData[i] === targetDel.outerHTML) {
      updatedLsData.splice(updatedLsData.indexOf(updatedLsData[i]), 1);
    }
  }
  localStorage.setItem("items", JSON.stringify(updatedLsData));
}

function pageLoad() {
  let onLoadLsData = localStorage.getItem("items");
  onLoadLsData = JSON.parse(onLoadLsData);
  if (onLoadLsData) {
    for (let i = 0; i < onLoadLsData.length; i++) {
      ol.innerHTML += onLoadLsData[i];
    }
  }
}
