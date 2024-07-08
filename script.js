const main = document.querySelector("#main");
const addCard = document.querySelector("#addCard");
// addCard.style.padding = "20px"
let dropElement = null;

const addTask = (event) => {
  event.preventDefault();

  const currentForm = event.target;
  const value = currentForm.elements[0].value;
  const parent = currentForm.parentElement;
  const ticket = createTicket(value);

  if (!value) return;

  parent.insertBefore(ticket, currentForm);

  const h3Value = parent.children[0].innerText;

  if (!Array.isArray(savedTasks[h3Value])) {
    savedTasks[h3Value] = [];
  }

  savedTasks[h3Value].push(value);

  localStorage.setItem("savedTasks", JSON.stringify(savedTasks)); // saving data after adding each task

  currentForm.reset();
};

const myCreateCard = (cardTitle) => {

  const myDiv = document.createElement("div");
  const myH3 = document.createElement("h3");
  const myForm = document.createElement("form");
  const myInput = document.createElement("input");

  const h3Text = document.createTextNode(cardTitle);

  myDiv.setAttribute("class", "column");
  myInput.setAttribute("type", "text");
  myInput.setAttribute("placeholder", "add task");

  myH3.appendChild(h3Text);
  myForm.appendChild(myInput);
  myDiv.appendChild(myH3);
  myDiv.appendChild(myForm);

  myForm.addEventListener("submit", addTask);

  myDiv.addEventListener("dragleave", (event) => event.preventDefault());
  myDiv.addEventListener("dragover", (event) => event.preventDefault());

  myDiv.addEventListener("drop", (event) => {
    const cardDrop = event.target;

    if (cardDrop.className.includes("column")) {
      // console.log("2");
      cardDrop.appendChild(dropElement);
    }

    if (cardDrop.className.includes("ticket")) {
      cardDrop.parentElement.appendChild(
        dropElement
      );
    }
  });

  return myDiv;
};

const createTicket = (value) => {
  //
  const ticket = document.createElement("p");
  const elementText = document.createTextNode(value);

  ticket.setAttribute("draggable", "true");
  ticket.setAttribute("class", "ticket");
  ticket.appendChild(elementText);

  ticket.addEventListener("mousedown", (event) => {
    dropElement = event.target;
    console.log("1");
  });

  return ticket;
};

let savedTasks = JSON.parse(localStorage.getItem("savedTasks")); // fetching savedTasks obj and converting

if (!savedTasks) {
  savedTasks = {};
}

for (const title in savedTasks) {
  const card = myCreateCard(title);

  const arrayOfTasks = savedTasks[title];

  for (let i = 0; i < arrayOfTasks.length; i++) {
    const p = createTicket(arrayOfTasks[i]);
    card.insertBefore(p, card.lastElementChild);
  }

  main.insertBefore(card, addCard);
}

addCard.addEventListener("click", () => {
  const cardHeading = prompt("enter card name?");

  if (!cardHeading) return;

  const yourDiv = myCreateCard(cardHeading);

  main.insertBefore(yourDiv, addCard);
});

// const removeTask = document.querySelectorAll(".remove_Element");
// removeTask.forEach((i) => {
//     i.addEventListener("click", (event) => {
//        event.target.parentElement.remove();
//     })
//  })