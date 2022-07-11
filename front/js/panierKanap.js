//création d'une class pour stocker les données du kanap
class choiceKanap {
    constructor() {
        this.id = idKanap;
        this.name = kanap.name;
        this.color = colors.value;
        this.quantity = quantity.value;
        this.altTxt = kanap.altTxt;
        this.imageUrl = kanap.imageUrl;
    }
};

//création et préparation du futur tableau
let arrayOfKanaps = JSON.parse(localStorage.getItem("panierkanap"));

//récupération de la sélection au click
const addToCart = document.querySelector("#addToCart").addEventListener("click", async function (event) {
    event.preventDefault();

    // fonction pour finaliser la commande ou revenir aux choix de canapés
    const allerAuPanier = () => {
        if (window.confirm('Votre produit a bien été ajouté, cliquez sur "OK" pour finaliser votre commade ou "Annuler" pour continuer vos achats.')) {
            //redirection vers la page "panier"
            window.location.href = "cart.html";
        } else {
            //redirection vers la page "index" pour ajouter un autre choix
            window.location.href = "index.html";
        };
    };
    //utilisation de la class sous forme de variable pour récupération des données au click 
    let newchoiceKanap = new choiceKanap;

    // conditions de sélection par contraintes pour passer la commande
    if (newchoiceKanap.quantity == 0) {
        alert("Veuillez sélectionner une quantité");
    } else if (newchoiceKanap.color == "") {
        alert('Veuillez sélectionner une couleur');
    }
    else {
        //si le panier n'est pas vide et qu'il est inférieur ou égal à 100
        if (arrayOfKanaps != null && arrayOfKanaps.length <= 100) {
            //création d'une constante pour regrouper les canapés avec le même id et couleur
            const comparekanap = arrayOfKanaps.find(
                kanap => kanap.id === newchoiceKanap.id
                    && kanap.color === newchoiceKanap.color
            );
            //si la comparaison est vrai, on additionne les quantités
            if (comparekanap) {
                let sumQuantities = parseInt(comparekanap.quantity) + parseInt(newchoiceKanap.quantity);
                comparekanap.quantity = sumQuantities;
                console.log('quantité du même kanap additionner : ' + sumQuantities);
                // sinon, ajout du canapé sous forme d'objet dans le tableau
            } else {
                arrayOfKanaps.push(newchoiceKanap);
            };
            localStorage.setItem("panierkanap", JSON.stringify(arrayOfKanaps));
            console.log("localStorage pas vide " + arrayOfKanaps.length + " model de kanap");
            allerAuPanier();
            console.log(idKanap.name);
        }

        // si le panier est vide
        else {
            // création du tableau pour recevoir les objets
            arrayOfKanaps = new Array();
            // ajout du canapé sous forme d'objet dans le tableau
            arrayOfKanaps.push(newchoiceKanap);
            //création du localStorage et ajout du tableau stringifié
            localStorage.setItem("panierkanap", JSON.stringify(arrayOfKanaps));
            console.log("premier choix: " + arrayOfKanaps[0].quantity);
            allerAuPanier();
        }
        //recupération final du tableau sous forme d'objet 
        arrayOfKanaps = JSON.parse(localStorage.getItem("panierkanap"));
        console.log(newchoiceKanap);
    }
});
console.table(arrayOfKanaps);