//déclaration du tableau contenant les données de la commande
let arrayOfKanaps = JSON.parse(localStorage.getItem("panierkanap"));
console.table(arrayOfKanaps);

//function d'intégration des infos du tableau vers le html
for (kanap = 0; kanap < arrayOfKanaps.length; kanap++) {
    // création des balises html et de leur attribut
    const sectionKanap = document.getElementById("cart__items");
    const articleKanap = document.createElement("article");
    articleKanap.setAttribute("data-id", arrayOfKanaps[kanap].id);
    articleKanap.setAttribute("data-color", arrayOfKanaps[kanap].color);
    articleKanap.classList.add("cart__item");
    sectionKanap.appendChild(articleKanap);

    //déclaration d'une variable pour identifier chaque kanap
    let idKanap = arrayOfKanaps[kanap].id;
    console.log('Id du Kanap : ' + idKanap);

    const divImageKanap = document.createElement("div");
    divImageKanap.classList.add("cart__item__img");
    articleKanap.appendChild(divImageKanap);

    const imageKanap = document.createElement("img");
    imageKanap.src = arrayOfKanaps[kanap].imageUrl;
    imageKanap.alt = arrayOfKanaps[kanap].altTxt;
    divImageKanap.appendChild(imageKanap);
    let idImage = arrayOfKanaps[kanap].imageUrl;
    let idAltTxt = arrayOfKanaps[kanap].altTxt;

    const contentKanap = document.createElement("div");
    contentKanap.classList.add("cart__item__content");
    articleKanap.appendChild(contentKanap);

    const contentDetailsKanap = document.createElement("div");
    contentDetailsKanap.classList.add("cart__item__content__description");
    contentKanap.appendChild(contentDetailsKanap);

    const titleKanap = document.createElement("h2");
    titleKanap.innerHTML = arrayOfKanaps[kanap].name;
    contentDetailsKanap.appendChild(titleKanap);
    let idName = arrayOfKanaps[kanap].name;

    const colorKanap = document.createElement("p");
    colorKanap.innerHTML = arrayOfKanaps[kanap].color;
    contentDetailsKanap.appendChild(colorKanap);
    let idColor = arrayOfKanaps[kanap].color;
    console.log('choix couleur : ' + idColor);

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
    selectNewQuantityKanap.innerHTML = "Quantité : ";

    const inputNumberKanap = document.createElement("input");
    inputNumberKanap.classList.add("itemQuantity");
    inputNumberKanap.setAttribute("value", arrayOfKanaps[kanap].quantity);
    inputNumberKanap.setAttribute("type", "number");
    inputNumberKanap.setAttribute("min", "1");
    inputNumberKanap.setAttribute("max", "100");
    inputNumberKanap.setAttribute("name", "itemQuantity");
    adjustQuantityKanap.appendChild(inputNumberKanap);
    console.log('quantité affichée : ' + inputNumberKanap.value);
    console.log('quantité choisie : ' + arrayOfKanaps[kanap].quantity);
    let idQuantity = arrayOfKanaps[kanap].quantity;
    idQuantity = inputNumberKanap.value;

    // gestion de la modification de la quantité dans " input "
    inputNumberKanap.addEventListener('change', function (e) {
        idQuantity = e.target.value;
        let newChoiceKanap = new choiceKanap;
        console.log(newChoiceKanap);
        console.table(arrayOfKanaps);

        //création d'une constante pour regrouper les canapés avec le même id et couleur
        const comparekanap = arrayOfKanaps.find(
            (kanap) => kanap.idKanap === newChoiceKanap.idKanap
                &&
                kanap.color === newChoiceKanap.color
        );
        console.log(newChoiceKanap.quantity);

        //création de la fonction pour remplacer et mettre à jour les objets du tableau 
        exchangeQuantity = () => {
            arrayOfKanaps = arrayOfKanaps.filter(
                // fonction inversé avec les 2 conditions pour supprimer l'ancien kanap
                (element) => !(element.id === idKanap && element.color === idColor));
            console.log(idQuantity);
            // mise à jour dynamique du prix
            calculatePrice(idKanap, priceKanap, inputNumberKanap);
            //mise à jour du tableau avec le nouveau kanap
            arrayOfKanaps.push(newChoiceKanap);
            // mise à jour du localStorage
            localStorage.setItem("panierkanap", JSON.stringify(arrayOfKanaps));
            console.log("kanaps identiques");
            console.log(idQuantity);
            console.log(newChoiceKanap);
        };

        //mise en place de l'opérateur ternaire puis de la fonction pour modification
        comparekanap ? exchangeQuantity() : console.log("kanaps différents");
    });
    // fin de modification des quantités 


    const removeKanap = document.createElement("div");
    removeKanap.classList.add("cart__item__content__settings__delete");
    removeKanap.style.paddingTop = "12px";
    settingsKanap.appendChild(removeKanap);

    const deleteKanap = document.createElement("p");
    deleteKanap.classList.add("deleteItem");
    removeKanap.appendChild(deleteKanap);
    deleteKanap.innerHTML = "Supprimer";

    // calcul de la quantité total avec la méthode "reduce"
    let totalQuantity = document.querySelector("#totalQuantity");
    totalQuantity.innerHTML = arrayOfKanaps.reduce(function (a, b) { return parseInt(a) + parseInt(b.quantity) }, 0);

    //  gestion de la suppression d'un kanap
    deleteKanap.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Votre produit a été supprimé")

        // filtre et garde ce qui est différent du click
        arrayOfKanaps = arrayOfKanaps.filter(
            // fonction inversé avec les 2 conditions
            (element) => !(element.id === idKanap && element.color === idColor));

        // mise à jour du localStorage 
        localStorage.setItem("panierkanap", JSON.stringify(arrayOfKanaps));

        // rechargement de la page et mise à jour du DOM en fonction du localStorage
        location.reload();

        //si le localStorage est vide, il est supprimé puis retour à la page d'accueil
        if (arrayOfKanaps.length === 0) {
            localStorage.clear();
            document.location.href = "index.html";
        }
    }); // fin de la gestion de suppression

    //function de calcul du prix fetché, multiplié par la quantité de kanaps par model
    function calculatePrice(idKanap, priceKanap, _inputNumberKanap) {
        fetch('http://localhost:3000/api/products/' + idKanap)
            .then((resp) => resp.json())
            .then(function (getData) {
                priceKanap.innerHTML = "Prix total : " + `${getData.price}` * idQuantity + "  €";
                console.log(getData.price);
            })
            .catch(function (error) {
                console.log('Erreur : serveur introuvable ' + error);
            });
    }

    // création de la class kanap
    class choiceKanap {
        constructor() {
            this.id = idKanap;
            this.name = idName;
            this.color = idColor;
            this.quantity = idQuantity;
            this.altTxt = idAltTxt;
            this.imageUrl = idImage;
        }
    };

    calculatePrice(idKanap, priceKanap, inputNumberKanap);
};
console.table(arrayOfKanaps);