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
        /**colorKanap.value = color; */
    };
};
/**la fonction se lance */
displayKanap(idKanap);

