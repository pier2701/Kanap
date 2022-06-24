//création d'une class pour stocker les données du kanap
class choiceKanap {
    constructor() {
        this.id = idKanap;
        this.color = colors.value;
        this.quantity = quantity.value;
    }
};

//création et préparation du futur tableau
let arrayOfkanaps = JSON.parse(localStorage.getItem("panierkanap"));
console.log(arrayOfkanaps);
//récupération de la sélection au click
const addToCart = document.querySelector("#addToCart").addEventListener("click", async function (event) {
    event.preventDefault();

    // fonction pour finaliser la commande ou revenir aux choix de canapés
    const allerAuPanier = () => {
        if (window.confirm('Votre produit a bien été ajouté, cliquez sur "OK" pour finaliser votre commade ou "ANNULER" pour continuer vos achats.')) {
            //redirection vers la page "cart.html
            window.location.href = "cart.html";
        } else {
            window.location.href = "index.html";
        };
    };
    //utilisation de la class sous forme de variable pour récupération des données au click 
    let newchoiceKanap = new choiceKanap;
    // conditions de sélection pour passer commandes
    if (newchoiceKanap.quantity == 0) {
        alert("Veuillez sélectionner une quantité");
    } else if (newchoiceKanap.color == "") {
        alert('Veuillez sélectionner une couleur');
    }
    else {
        //si le panier n'est pas vide et qu'il est inférieur ou égal à 100
        if (arrayOfkanaps != null && arrayOfkanaps.length <= 100) {
            //création d'une constante pour regrouper les canapés avec le même id et couleur
            const comparekanap = arrayOfkanaps.find(
                (kanap) => kanap.idKanap === newchoiceKanap.idKanap
                    &&
                    kanap.color === newchoiceKanap.color
            );
            //si la comparaison est vrai, on additionne les quantités
            if (comparekanap) {
                let sumQuantities = parseInt(comparekanap.quantity) + parseInt(newchoiceKanap.quantity);
                comparekanap.quantity = sumQuantities;
                console.log(sumQuantities);
            } else {   // sinon, ajout du canapé sous forme d'objet dans le tableau
                arrayOfkanaps.push(newchoiceKanap);
            };
            localStorage.setItem("panierkanap", JSON.stringify(arrayOfkanaps));
            console.log("localStorage pas vide " + arrayOfkanaps.length + " model de kanap");
            allerAuPanier();
        }

        // si le panier est vide
        else {
            // création du tableau pour recevoir les objets
            arrayOfkanaps = [];
            // ajout du canapé sous forme d'objet dans le tableau
            arrayOfkanaps.push(newchoiceKanap);
            //création du localStorage et ajout du tableau stringifié
            localStorage.setItem("panierkanap", JSON.stringify(arrayOfkanaps));
            console.log("premier choix: " + arrayOfkanaps[0].quantity);
            allerAuPanier();
        }
        //recupération final du tableau sous forme d'objet 
        arrayOfkanaps = JSON.parse(localStorage.getItem("panierkanap"));
        console.log(newchoiceKanap);
    }
});
console.table(arrayOfkanaps);