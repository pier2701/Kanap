//déclaration du tableau contenant les données de la commande
let arrayOfkanaps = JSON.parse(localStorage.getItem("panierkanap"));
console.table(arrayOfkanaps);

let urlApi = "http://localhost:3000/api/products/";


//function d'intégration des infos du tableau vers le html
for (kanap = 0; kanap < arrayOfkanaps.length; kanap++) {

    // création des balises html et de leur attribut
    const sectionKanap = document.getElementById("cart__items");
    const articleKanap = document.createElement("article");
    articleKanap.setAttribute("data-id", arrayOfkanaps[kanap].id);
    articleKanap.classList.add("cart__item");
    sectionKanap.appendChild(articleKanap);
    let idKanap = arrayOfkanaps[kanap].id;
    console.log(idKanap);

    const divImageKanap = document.createElement("div");
    divImageKanap.classList.add("cart__item__img");
    articleKanap.appendChild(divImageKanap);

    const imageKanap = document.createElement("img");
    imageKanap.src = arrayOfkanaps[kanap].imageUrl;
    imageKanap.alt = arrayOfkanaps[kanap].altText;
    divImageKanap.appendChild(imageKanap);
    console.log(arrayOfkanaps[kanap].altText);

    const contentKanap = document.createElement("div");
    contentKanap.classList.add("cart__item__content");
    articleKanap.appendChild(contentKanap);

    const contentDetailsKanap = document.createElement("div");
    contentDetailsKanap.classList.add("cart__item__content__description");
    contentKanap.appendChild(contentDetailsKanap);

    const titleKanap = document.createElement("h2");
    titleKanap.innerHTML = arrayOfkanaps[kanap].name;
    contentDetailsKanap.appendChild(titleKanap);
    console.log(titleKanap);

    const colorKanap = document.createElement("p");
    colorKanap.innerHTML = arrayOfkanaps[kanap].color;
    contentDetailsKanap.appendChild(colorKanap);
    console.log(colorKanap);

    const priceKanap = document.createElement("p");
    contentDetailsKanap.appendChild(priceKanap);

    const settingsKanap = document.createElement("div");
    settingsKanap.classList.add("cart__item__content__settings");
    contentKanap.appendChild(settingsKanap);

    const adjustQuantityKanap = document.createElement("div");
    adjustQuantityKanap.classList.add("cart__item__content__settings__quantity");
    settingsKanap.appendChild(adjustQuantityKanap);

    const selectNewQuantityKanap = document.createElement("p");
    adjustQuantityKanap.appendChild(selectNewQuantityKanap);
    selectNewQuantityKanap.innerHTML = "Qté : ";

    const inputNumberKanap = document.createElement("input");
    inputNumberKanap.classList.add("itemQuantity");
    inputNumberKanap.setAttribute("value", arrayOfkanaps[kanap].quantity);
    inputNumberKanap.setAttribute("type", "number");
    inputNumberKanap.setAttribute("min", "1");
    inputNumberKanap.setAttribute("max", "100");
    inputNumberKanap.setAttribute("name", "itemQuantity");
    adjustQuantityKanap.appendChild(inputNumberKanap);
    console.log(inputNumberKanap.value);

    //calcul du prix fetch multiplié par la quantité de kanaps par model
    let amountKanap = urlApi + idKanap;
    fetch('http://localhost:3000/api/products/' + idKanap)
        .then(response => response.json())
        .then(json => console.log(json))
        .then((data) => {
            // for (data.price = 0, data.price < arrayOfkanaps.length, data.price++) {};
            priceKanap.innerHTML = idKanap.price * inputNumberKanap.value + "  €"
            console.log(_id);
        })

    /** .then(idKanap.price = {
         for (price = 0, price < arrayOfkanaps.length, price++) {
             priceKanap.innerHTML = price * inputNumberKanap.value + "  €";
         };
 
     })
    .catch (function (err) {
    console.log('Erreur : serveur introuvable ' + err);
})*/
    //let amountQuantity = amountKanap.products.price;

    const removeKanap = document.createElement("div");
    removeKanap.classList.add("cart__item__content__settings__delete");
    settingsKanap.appendChild(removeKanap);

    const deleteKanap = document.createElement("p");
    deleteKanap.classList.add("deleteItem");
    removeKanap.appendChild(deleteKanap);
    deleteKanap.innerHTML = "Supprimer";

    console.log(urlApi + idKanap);
};
