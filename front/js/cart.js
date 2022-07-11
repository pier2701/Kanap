//déclaration du tableau contenant les données de la choix
let arrayOfKanaps = JSON.parse(localStorage.getItem("panierkanap"));

// signaler un panier vide et redirection vers l'accueil
backToMenu = () => {
    window.location.href = "index.html";
    alert("Vous n'avez pas de commande en cours, vous allez être rediriger vers la page d'acceuil")
};
arrayOfKanaps == null ? backToMenu() : console.table(arrayOfKanaps);

//déclaration du tableau contenant les prix de chaque choix
let arrayOfPrice = new Array();

//--------------- function d'intégration des kanaps vers le DOM ---------//
console.table(arrayOfKanaps)
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
            alert("La quantité et le prix de votre produit vont être  modifiées");
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
        alert("Votre produit a été supprimé");

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
            });
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
            });
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

//---------------- fin d'intégration des kanaps vers le DOM ------------//


//---------------------------- gestion du formulaire -----------------------------//

// création de l'objet contenant les informations du formulaire
let contact = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: ""
}

// déclaration de la validation par regex pour le Nom, le Prénom et la Ville
const newTextRegex = new RegExp(/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœA-Z\s-]{1,31}$/);



//----- gestion du Prénom-----//
//recupération de l'information du formulaire grâce à l'Id
let firstName = document.querySelector('#firstName');
let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');

// récupération et traitement de l'input par l'opérateur ternaire
firstName.addEventListener("input", function (e) {
    //e.preventDefault();

    // test du champ de formulaire par regex
    let firstNameContact = e.target.value;
    const regexFirstName = newTextRegex;
    let testFirstName = regexFirstName.test(firstNameContact);
    console.log(testFirstName);

    // intégration de l'information dans l'objet "contact" par l'opérateur ternaire
    (testFirstName == true) ? contact.firstName = firstNameContact : firstNameErrorMsg.innerHTML = "Vous n'avez pas renseigné correctement votre Prénom";
    console.log(firstNameContact);
    // condition pour retirer le message d'erreur
    (testFirstName == true) ? firstNameErrorMsg.innerHTML = "" : console.log("erreur formulaire");
    console.log(contact);
});



//-------gestion du Nom---------//
//recupération de l'information du formulaire grâce à l'Id
let lastName = document.querySelector('#lastName');
let lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');

// récupération et traitement de l'input par l'opérateur ternaire
lastName.addEventListener("input", function (e) {
    //e.preventDefault();

    // test du champ de formulaire par regex
    let lastNameContact = e.target.value;
    const regexLastName = newTextRegex;
    let testLastName = regexLastName.test(lastNameContact);
    console.log(testLastName);

    // intégration de l'information dans l'objet "contact" par l'opérateur ternaire
    (testLastName == true) ? contact.lastName = lastNameContact : lastNameErrorMsg.innerHTML = "Vous n'avez pas renseigné correctement votre Nom";
    console.log(lastNameContact);
    // condition pour retirer le message d'erreur
    (testLastName == true) ? lastNameErrorMsg.innerHTML = "" : console.log("erreur formulaire");
    console.log(contact);
});



//---------gestion de l'Adresse-------//
//recupération de l'information du formulaire grâce à l'Id
let address = document.querySelector('#address');
let addressErrorMsg = document.querySelector('#addressErrorMsg');

// récupération et traitement de l'input par l'opérateur ternaire
address.addEventListener("input", function (e) {
    //e.preventDefault();

    // test du champ de formulaire par regex
    let addressContact = e.target.value;

    // déclaration de la validation par regex pour l'Email
    const regexAddress = new RegExp(/^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœA-Z0-9\s,.'-]{3,}$/);
    let testAddress = regexAddress.test(addressContact);
    console.log(testAddress);

    // intégration de l'information dans l'objet "contact" par l'opérateur ternaire
    (testAddress == true) ? contact.address = addressContact : addressErrorMsg.innerHTML = "Vous n'avez pas renseigné correctement votre Adresse";
    console.log(addressContact);
    // condition pour retirer le message d'erreur
    (testAddress == true) ? addressErrorMsg.innerHTML = "" : console.log("erreur formulaire");
    console.log(contact);
});



//--------gestion de la Ville----------//
//recupération de l'information du formulaire grâce à l'Id
let city = document.querySelector('#city');
let cityErrorMsg = document.querySelector('#cityErrorMsg');

// récupération et traitement de l'input par l'opérateur ternaire
city.addEventListener("input", function (e) {
    //e.preventDefault();

    // test du champ de formulaire par regex
    let cityContact = e.target.value;
    const regexCity = newTextRegex;
    let testCity = regexCity.test(cityContact);
    console.log(testCity);

    // intégration de l'information dans l'objet "contact" par l'opérateur ternaire
    (testCity == true) ? contact.city = cityContact : cityErrorMsg.innerHTML = "Vous n'avez pas renseigné correctement votre Ville";
    console.log(cityContact);
    // condition pour retirer le message d'erreur
    (testCity == true) ? cityErrorMsg.innerHTML = "" : console.log("erreur formulaire");
    console.log(contact);
});



//--------gestion de l'Email----------//
//recupération de l'information du formulaire grâce à l'Id
let email = document.querySelector('#email');
let emailErrorMsg = document.querySelector('#emailErrorMsg');

// récupération et traitement de l'input par l'opérateur ternaire
email.addEventListener("input", function (e) {
    //e.preventDefault();

    // test du champ de formulaire par regex
    let emailContact = e.target.value;

    // déclaration de la validation par regex pour l'Email
    const regexEmail = new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/);
    let testEmail = regexEmail.test(emailContact);
    console.log(testEmail);

    // intégration de l'information dans l'objet "contact" par l'opérateur ternaire
    (testEmail == true) ? contact.email = emailContact : emailErrorMsg.innerHTML = "Vous n'avez pas renseigné correctement votre Email";
    console.log(emailContact);
    // condition pour retirer le message d'erreur
    (testEmail == true) ? emailErrorMsg.innerHTML = "" : console.log("erreur formulaire");

    console.log(contact);
});


/** 
if (contact != null) {
    //fonction fixe les informations du "contact" dans le DOM
    document.querySelector("firstName").value = contact.firstName;
    document.querySelector("#lastName").value = contact.lastName;
    document.querySelector("#address").value = contact.address;
    document.querySelector("#city").value = contact.city;
    document.querySelector("#email").value = contact.email;
    console.log(contact);
}
else if (contact != contact) {
    contact = contact;
}
else (console.log("No contact found"));
*/

//récupération du bouton de "commande" pour l'envoi
let order = document.querySelector('#order');
order.addEventListener("click", (event) => {
    event.preventDefault();

    // création d'une variable pour récupérer les "Id" de chaque produit
    let products = new Array();
    arrayOfKanaps.forEach(product => {
        products.push(product.id);
        console.log(products);
    });

    // fonction fetch avec une requête "post" pour soumettre la commande
    fetchDataPost = async () => {
        await fetch("http://localhost:3000/api/products/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                contact,
                products
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                window.location.href = 'confirmation.html?orderId=' + data.orderId;
                console.log(data.orderId);
                console.log(contact);
            })
            .catch((error) => {
                alert('serveur injoignable' + error);
            });
    };
    fetchDataPost();
})



// EMPECHER LA VALIDATION DU FORMULAIRE VIDE


