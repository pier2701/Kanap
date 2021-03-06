//recherche et récupération de l'Id  dans  l'URL actuelle
let searchAndGetKanap = new URL(window.location.href);
let idKanap = searchAndGetKanap.searchParams.get("id");
console.log('Id du Kanap = ' + searchAndGetKanap.searchParams.get("id"));

//constante qui correspond à l'url de l'API de tous les canapés
const URLKANAPS = "http://localhost:3000/api/products/";

//fonction pour récupérer l'url + l'id spécifique qui attendra 
// d'abord le retour du "fetch(URLKANAPS + idKanap) = API du canapé récupéré"
async function getKanap(idKanap) {
    const catchKANAPs = await fetch(URLKANAPS + idKanap)
        .then((catchKANAPs) => catchKANAPs.json())
        .then(function (data) {
            kanap = data;
        })
        .catch(function (error) {
            console.log('Erreur : serveur introuvable ' + error);
        });
    return kanap;
};

//utilsation de la fonction requêtée précèdente dans une nouvelle fonction "async"
async function displayKanap(idKanap) {
    const KANAP = await getKanap(idKanap);

    //interprétation et intégration des données
    const imageKanap = document.createElement("img");
    document.querySelector(".item__img").appendChild(imageKanap);
    imageKanap.src = KANAP.imageUrl;
    imageKanap.alt = KANAP.altTxt;

    const titleKanap = document.getElementById("title");
    titleKanap.textContent = KANAP.name;

    const priceKanap = document.getElementById("price");
    priceKanap.textContent = KANAP.price;

    const descriptionKanap = document.getElementById("description");
    descriptionKanap.textContent = KANAP.description;

    //boucle "for" qui intégrera chaque couleur présente dans le tableau fourni par l'API + Id
    for (color of KANAP.colors) {
        const colorKanap = document.createElement("option");
        document.querySelector("#colors").appendChild(colorKanap);
        colorKanap.value = color;
        colorKanap.textContent = color;
    };
};
//la fonction se lance 
displayKanap(idKanap);

