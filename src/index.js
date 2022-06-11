let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//Fetch Url And Add Event listener
const form = document.querySelector(".add-toy-form");
  form.addEventListener("submit", postToy);

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data.forEach(toy => {
      toyAdder(toy);
    })
  });
}
//Add New Toy Div Element
function toyAdder(toy) {
  const toyDiv = document.createElement("div");
  toyDiv.className = "card";
  const toyH2 = document.createElement("h2");
  toyH2.innerHTML = toy.name;
  toyDiv.appendChild(toyH2);
  const toyImg = document.createElement("img");
  toyImg.src = toy.image;
  toyImg.className = "toy-avatar";
  toyDiv.appendChild(toyImg);
  const toyP = document.createElement("p");
  toyP.innerText = toy.likes + " likes";
  toyDiv.appendChild(toyP);
  const toyBtn = document.createElement("button");
  toyBtn.className = "like-butn";
  toyBtn.id = toy.id;
  toyBtn.textContent = "Like <3";
  toyDiv.appendChild(toyBtn);
  document.getElementById("toy-collection").appendChild(toyDiv);

  toyBtn.addEventListener("click", addLikes);
}
//Add POST string to Json
function postToy(event) {
  event.preventDefault();
  nameInput = document.getElementsByTagName("input")[0].value;
  urlInput = document.getElementsByTagName("input")[1].value;
  fetch("http://localhost:3000/toys", {
    method: "POST" ,
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    } ,

    body: JSON.stringify({
      "name": `${nameInput}`,
      "image": `${urlInput}`,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then(data => toyAdder(data));
}
//Add PATCH and Add Likes
function addLikes() {
  console.log(this.id +  " liked")
  likesNum = parseInt(this.parentNode.querySelector("p").innerText[0]);
  return fetch(`http://localhost:3000/toys/${this.id}`, {
    method: "PATCH" ,
    headers: 
    {
      "Content-Type": "application/json" ,
      Accept: "application/json"
    } ,

    body: JSON.stringify({
      likes: likesNum + 1

    })
  })
  .then(response => response.json())
  .then(() => {
    this.parentNode.querySelector("p").innerText = likesNum + 1 + " likes";
  }); 
}