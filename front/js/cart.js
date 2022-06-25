//déclaration du tableau contenant les données de la commande
let arrayOfkanaps = JSON.parse(localStorage.getItem("panierkanap"));
console.table(arrayOfkanaps);

/**for (let i of arrayOfkanaps) {
    fetch('http://localhost:3000/api/products/' + i.id)
        .then(response => response.json())
        .then( => {
            innerHTML += `<article class="cart__item" data-id="${arrayOfkanaps.id}" data-color="${arrayOfkanaps.color}">
              <div class="cart__item__img">
              <img src="${imageUrl}" alt="${altTx}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${arrayOfkanaps.name}</h2>
                <p>Vert</p>
                <p>${arrayOfkanaps.price} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`
        })
}*/

const sectionKanap = document.getElementById("cart__items");
const articleKanap = document.createElement("article");
articleKanap.classList.add("cart__item");
sectionKanap.appendChild(articleKanap);

const divImageKanap = document.createElement("div");
divImageKanap.classList.add("cart__item__img");
articleKanap.appendChild(divImageKanap);

const imageKanap = document.createElement("img");
//imageKanap.src = products.imageUrl;
//imageKanap.alt = products.altTxt;
divImageKanap.appendChild(imageKanap);

const contentKanap = document.createElement("div");
contentKanap.classList.add("cart__item__content");
articleKanap.appendChild(contentKanap);

const contentDetailsKanap = document.createElement("div");
contentDetailsKanap.classList.add("cart__item__content__description");
contentKanap.appendChild(contentDetailsKanap);

const titleKanap = document.createElement("h2");
contentDetailsKanap.appendChild(titleKanap);
titleKanap.innerHTML = "Nom du Kanap";

const colorKanap = document.createElement("p");
contentDetailsKanap.appendChild(colorKanap);
colorKanap.innerHTML = "Couleur du Kanap";

const settingsKanap = document.createElement("div");
settingsKanap.classList.add("cart__item__content__settings");
articleKanap.appendChild(settingsKanap);

const adjustQuantityKanap = document.createElement("div");
adjustQuantityKanap.classList.add("cart__item__content__settings__quantity");
settingsKanap.appendChild(adjustQuantityKanap);

const selectNewQuantityKanap = document.createElement("p");
adjustQuantityKanap.appendChild(selectNewQuantityKanap);
selectNewQuantityKanap.innerHTML = "Qté : ";

const inputNumberKanap = document.createElement("input");
inputNumberKanap.classList.add("itemQuantity");
inputNumberKanap.setAttribute("type", "number");
inputNumberKanap.setAttribute("min", "1");
inputNumberKanap.setAttribute("max", "100");
inputNumberKanap.setAttribute("value", "");
inputNumberKanap.setAttribute("name", "itemQuantity");
adjustQuantityKanap.appendChild(inputNumberKanap);

const removeKanap = document.createElement("div");
removeKanap.classList.add("cart__item__content__settings__delete");
settingsKanap.appendChild(removeKanap);

const deleteKanap = document.createElement("p");
deleteKanap.classList.add("deleteItem");
removeKanap.appendChild(deleteKanap);
deleteKanap.innerHTML = "Supprimer";

console.log(imageKanap);
