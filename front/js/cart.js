//déclaration du tableau contenant les données de la choix
let arrayOfKanaps = JSON.parse(localStorage.getItem("panierkanap"));
console.table(arrayOfKanaps);

//déclaration du tableau contenant les prix de chaque choix
let arrayOfPrice = new Array();

//function d'intégration des infos du tableau vers le html
for (kanap = 0; kanap < arrayOfKanaps.length; kanap++) {

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

    //déclaration d'une variable pour identifier chaque kanap
    let idKanap = arrayOfKanaps[kanap].id;
    console.log('Id du Kanap : ' + idKanap);

    // création des balises html et de leur attribut
    const sectionKanap = document.getElementById("cart__items");
    const articleKanap = document.createElement("article");
    articleKanap.setAttribute("data-id", arrayOfKanaps[kanap].id);
    articleKanap.setAttribute("data-color", arrayOfKanaps[kanap].color);
    articleKanap.classList.add("cart__item");
    sectionKanap.appendChild(articleKanap);
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
    let idQuantity = arrayOfKanaps[kanap].quantity;
    idQuantity = inputNumberKanap.value;

    //---------------gestion de la modification de la quantité dans " input "--------------//
    inputNumberKanap.addEventListener('input', function (e) {
        idQuantity = e.target.value;
        let newChoiceKanap = new choiceKanap;

        //création d'une constante pour regrouper les canapés avec le même id et couleur
        const comparekanap = arrayOfKanaps.find(
            (kanap) => kanap.idKanap === newChoiceKanap.idKanap
                &&
                kanap.color === newChoiceKanap.color
        );

        //création de la fonction pour remplacer et mettre à jour les objets du tableau 
        exchangeQuantity = () => {
            arrayOfKanaps = arrayOfKanaps.filter(
                // fonction inversé avec les 2 conditions pour supprimer l'ancien kanap
                (element) => !(element.id === idKanap && element.color === idColor));

            // mise à jour dynamique du prix
            calculatePrice();

            //mise à jour du tableau avec le nouveau kanap
            arrayOfKanaps.push(newChoiceKanap);

            // mise à jour du localStorage
            localStorage.setItem("panierkanap", JSON.stringify(arrayOfKanaps));
            console.log("kanaps identiques");

            // rechargement de la page et mise à jour du DOM en fonction du localStorage
            location.reload();
            alert("La quantité et le prix de votre produit vont être  modifiées")
        };

        //mise en place de l'opérateur ternaire puis de la fonction pour modification
        comparekanap ? exchangeQuantity() : console.log("kanaps différents");
        console.table(arrayOfKanaps);
    });
    //---------------------fin de modification des quantités--------------------------------//


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
    sumQuantity(totalQuantity);


    //------------------------gestion de la suppression d'un kanap-------------------//
    deleteKanap.addEventListener("click", (event) => {
        event.preventDefault();

        // filtre et garde ce qui est différent du click
        arrayOfKanaps = arrayOfKanaps.filter(
            // fonction inversé avec les 2 conditions
            (element) => !(element.id === idKanap && element.color === idColor));

        // mise à jour du localStorage 
        localStorage.setItem("panierkanap", JSON.stringify(arrayOfKanaps));

        // rechargement de la page et mise à jour du DOM en fonction du localStorage
        location.reload();
        alert("Votre produit a été supprimé")

        //si le localStorage est vide, il est supprimé puis retour à la page d'accueil
        if (arrayOfKanaps.length === 0) {
            localStorage.clear();
            document.location.href = "index.html";
        }

    });
    // ----------------------------fin de la gestion de suppression-----------------------//


    //fonction pour le calcul du prix fetché
    calculatePrice = () => {
        fetch('http://localhost:3000/api/products/' + idKanap)
            .then((resp) => resp.json())
            .then(function (kanaps) {
                priceKanap.innerHTML = "Prix total : " + kanaps.price * idQuantity + "  €";
            })
            .catch(function (error) {
                console.log('Erreur = ' + error);
            })
    };

    //fonction pour  calculer et intégrater le prix total du panier
    calculateTotalPrice = () => {
        fetch('http://localhost:3000/api/products/' + idKanap)
            .then((resp) => resp.json())
            .then(function (kanaps) {
                let totalPriceKanap = kanaps.price * idQuantity;
                arrayOfPrice.push(totalPriceKanap);
                let sumOfPrice = arrayOfPrice.reduce((a, b) => a + b, 0);
                let totalPrice = document.getElementById('totalPrice');
                totalPrice.innerHTML = sumOfPrice;
            })
            .catch(function (error) {
                console.log('Erreur = ' + error);
            })
    };

    //fonction pour le calcul total des quantités avec la méthode "reduce"
    function sumQuantity(totalQuantity) {
        let resultQuantity = arrayOfKanaps.reduce(function (a, b) { return parseInt(a) + parseInt(b.quantity); }, 0);
        totalQuantity.innerHTML = resultQuantity;
    };

    //prix global du panier
    calculateTotalPrice();

    //prix calculé en arrivant sur la page
    calculatePrice();
}
console.table(arrayOfKanaps)


//----------------------------gestion du formulaire-----------------------------//

// création de l'objet contenant les informations du formulaire
let detailsContact = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: ""
}

// création d'un objet contenant la commande "kanap" et l'objet "contact"
let command = new Array();

// déclaration des "regex" pour les soumettre aux différents opérateurs ternaires
let textRegex = /^[a-zA-Z]$/;

//recupération de l'information du formulaire grâce à l'Id
let firstName = document.querySelector('#firstName');
let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');


// récupération et traitement de l'input par l'opérateur ternaire
firstName.addEventListener("input", function (e) {
    e.preventDefault();
    e.target.value == undefined ? firstNameErrorMsg.innerHTML = "Veuillez renseigner votre Prénom" : e.target.value;
    let firstNameContact = e.target.value;
    // intégration de l'information dans l'objet "contact"
    detailsContact.firstName = firstNameContact;
    console.log(detailsContact);
});

//recupération de l'information du formulaire grâce à l'Id
let lastName = document.querySelector('#lastName');
let lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');

// récupération et traitement de l'input par l'opérateur ternaire
lastName.addEventListener("input", function (e) {
    e.preventDefault();
    e.target.value == undefined ? lastNameErrorMsg.innerHTML = "Veuillez renseigner votre Nom" : e.target.value;
    let lastNameContact = e.target.value;
    // intégration de l'information dans l'objet "contact"
    detailsContact.lastName = lastNameContact;
    console.log(detailsContact);
});

//recupération de l'information du formulaire grâce à l'Id
let address = document.querySelector('#address');
let addressErrorMsg = document.querySelector('#addressErrorMsg');

// récupération et traitement de l'input par l'opérateur ternaire
address.addEventListener("input", function (e) {
    e.preventDefault();
    e.target.value == undefined ? addressErrorMsg.innerHTML = "Veuillez renseigner votre Adresse" : e.target.value;
    let addressContact = e.target.value;
    // intégration de l'information dans l'objet "contact"
    detailsContact.address = addressContact;
    console.log(detailsContact);
});

//recupération de l'information du formulaire grâce à l'Id
let city = document.querySelector('#city');
let cityErrorMsg = document.querySelector('#cityErrorMsg');

// récupération et traitement de l'input par l'opérateur ternaire
city.addEventListener("input", function (e) {
    e.preventDefault();
    e.target.value == undefined ? cityErrorMsg.innerHTML = "Veuillez renseigner votre Ville" : e.target.value;
    let cityContact = e.target.value;
    // intégration de l'information dans l'objet "contact"
    detailsContact.city = cityContact;
    console.log(detailsContact);
});

//recupération de l'information du formulaire grâce à l'Id
let email = document.querySelector('#email');
let emailErrorMsg = document.querySelector('#emailErrorMsg');

// récupération et traitement de l'input par l'opérateur ternaire
email.addEventListener("input", function (e) {
    e.preventDefault();
    e.target.value == undefined ? addressErrorMsg.innerHTML = "Veuillez renseigner votre Email" : e.target.value;
    let emailContact = e.target.value;
    // intégration de l'information dans l'objet "contact"
    detailsContact.email = emailContact;
    console.log(detailsContact);
    //console.log(detailsContact.firstName);
    //création de l'objet contact dans le LocalStorage
    localStorage.setItem("objetContact", JSON.stringify(detailsContact));
    //let newContact = JSON.parse(localStorage.getItem("objetContact"));
});

// récuperation de l'objet contact 
let newContact = JSON.parse(localStorage.getItem("objetContact"));
console.log(newContact);

//intégration du contact dans le DOM
if (newContact == null) {
    console.log("No objetContact found");
} else {
    document.querySelector("#firstName").value = newContact.firstName;
    document.querySelector("#lastName").value = newContact.lastName;
    document.querySelector("#address").value = newContact.address;
    document.querySelector("#city").value = newContact.city;
    document.querySelector("#email").value = newContact.email;
    console.log(newContact);
}


let order = document.querySelector('#order');
console.log(order);


/** PUSH de la commande et de l'objet contact dans le même Array

if (/^[a-zA-Z]$/.test(newContact.firstName)) {
    console.log("ok");
} else {
    console.log("error");
};


command.push(detailsContact);
console.log(command);

let newDetailsContact = JSON.parse(localStorage.getItem("objetContact"));
    console.log(newDetailsContact);



    // création de la class contact
    class contact {
        constructor() {
            this.firstNameContact = firstName;
            this.lastNameContact = lastName;
            this.addressContact = address;
            this.cityContact = city;
            this.emailContact = email;
        }
    };
    let newContact = new contact;
    console.log(newContact)
*/

// regex pour l'email ('^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$')