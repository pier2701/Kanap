/**recherche et récupération de l'Id  dans  l'URL actuelle, définie par "herf" */
let searchAndGetKanap = new URL(location.href);
console.log('Id du Kanap = ' + searchAndGetKanap.searchParams.get("id"));
console.log(searchAndGetKanap);
let idKanap = searchAndGetKanap.searchParams.get("id");

/**constante qui correspond à l'url de l'API de tous les canapés**/
const URLKANAPS = "http://localhost:3000/api/Products/";

/**fonction pour récupérer l'url + l'id spécifique qui attendra 
 * d'abord le retour du "fetch(URLKANAPS + idKanap) = API du canapé récupéré" */
async function getKanap(idKanap) {
    const catchKANAPs = await fetch(URLKANAPS + idKanap)
        .then((catchKANAPs) => catchKANAPs.json())
        .then(function (data) {
            kanap = data;
        })
        .catch(function (err) {
            console.log('Erreur : serveur introuvable ' + err);
        });
    return kanap;
};

/**utilsation de la fonction requêtée précèdente dans une nouvelle fonction "async" */
async function displayKanap(idKanap) {
    const KANAP = await getKanap(idKanap);

    /** interprétation et intégration des données*/
    const imageKanap = document.createElement("img");
    document.querySelector(".item__img").appendChild(imageKanap);
    imageKanap.src = KANAP.imageUrl;
    imageKanap.alt = KANAP.altTxt;

    const titleKanap = document.getElementById("title");
    titleKanap.innerHTML = KANAP.name;

    const priceKanap = document.getElementById("price");
    priceKanap.innerHTML = KANAP.price;

    const descriptionKanap = document.getElementById("description");
    descriptionKanap.innerHTML = KANAP.description;

    /**boucle "for" qui intégrera chaque couleur présente dans le tableau fourni par l'API + Id*/
    for (color of KANAP.colors) {
        const colorKanap = document.createElement("option");
        document.querySelector("#colors").appendChild(colorKanap);
        colorKanap.value = color;
        colorKanap.textContent = color;
    };
};
/**la fonction se lance */
displayKanap(idKanap);

/**création d'une variable sous forme d'objet pour traiter 
 * le choix du canapé (id), la couleur et la quantité */
let choiceKanap = {
    id: idKanap,
    color: colors,
    quantities: quantity,
    price: price
};
console.log(choiceKanap);

/**création d'une fonction qui traitera les données à l'entrée puis à la sortie du localStorage */
function outOFlocalStorage() {
    /**format JSON stringifié du choix-client, puis création dans le localStorage*/
    /**intégration de l'objet dans un tableau avec la méthode "push" */
    let localStorageKanap = [];
    localStorageKanap.push(choiceKanap);
    localStorage.setItem("choiceKanap", JSON.stringify(localStorageKanap));
    console.log("kanap-stringifié dans LS");
    /**récupération du choix-client depuis le localStorage, puis conversion en "objet" avec .parse */
    localStorageKanap = JSON.parse(localStorage.getItem("choiceKanap"));
    console.log(localStorageKanap);
};

/**condition "if/else" en fonction des produits présents dans le localStorage */
checklocalStorage = () => {
    if (choiceKanap == null) {
        localStorageKanap.push(choiceKanap);
        console.log("localStorageKanap undefined");
    } else {
        for (i = 0; i < choiceKanap.length; i++) {
            return (
                choiceKanap[i].quantities + choiceKanap[i].color + choiceKanap[i].idKanap
            )
        }
        outOFlocalStorage();
        console.log("ok");
    }
}



/*if (choiceKanap == null) {
 
    console.log("produits dans le localStorage");
}
else {
    for (i = 0; i < choiceKanap.length; i++) {
        choiceKanap[i].quantities++;
    }
    console.log("rajouter produits dans le localStorage");
}**/

/**création d'une variable pour regrouper les kanaps aux "id" identiques mais de couleur différente */


/**récupération des informations sous forme d'objet au "clic" du bouton*/
const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", () =>
    /**ajout de l'id, de la couleur, de la quantité et du prix dans l'objet "choiceKanap" */ {
    choiceKanap.id = idKanap;
    choiceKanap.color = colors.value;
    choiceKanap.quantities = quantity.value;
    choiceKanap.price = kanap.price * quantity.value;
    console.log(choiceKanap);
    outOFlocalStorage();
});

checklocalStorage();

/**redirection vers la page "cart.html
window.location.href = "cart.html";"*/






