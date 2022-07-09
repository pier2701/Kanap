//récupération du numéro de commande
let newUrl = (window.location.search);
const urlparams = new URLSearchParams(newUrl);
const orderId = urlparams.get('orderId');

//récupération de la balise dans le Dom popur afficher le numéro de commande
let orderNumberId = document.getElementById('orderId');
orderNumberId.textContent = orderId;

// nettoyage du LocalStorage
//localStorage.clear();