// mise en place de la requête vers l'API avec une réponse console
fetch('http://localhost:3000/api/products/')
    .then(function (res) {
        if (res.ok) {
            return res.json();
        } else { console.log('Erreur serveur : ' + res.status + ' serveur introuvable'); }
    })
    //---------------intégration dans le DOM de l'API----------------//


    // utilisation de la boucle forEach sur l'ensemble "products" de l'API
    .then(function (displayKanap) {
        displayKanap.forEach(products => {
            let kanaps = document.getElementById('items');
            let kanapLink = document.createElement("a");
            kanaps.appendChild(kanapLink);

            // lien href vers la page produit grâce à _id
            kanapLink.href = `product.html?id=${products._id}`;
            let kanapBlock = document.createElement("article");
            kanapLink.appendChild(kanapBlock);

            let imageProduct = document.createElement("img");
            imageProduct.src = products.imageUrl;
            imageProduct.alt = products.altTxt;
            kanapBlock.appendChild(imageProduct);

            let titleProduct = document.createElement("h3");
            titleProduct.classList.add("productName");
            titleProduct.textContent = products.name;
            kanapBlock.appendChild(titleProduct);

            let descriptionProduct = document.createElement("p");
            descriptionProduct.classList.add("productDescription");
            descriptionProduct.textContent = products.description;
            kanapBlock.appendChild(descriptionProduct);

            // rajout de l'élément "prix" et de sa mise en page
            let priceProduct = document.createElement("span");
            priceProduct.classList.add("price");
            priceProduct.textContent = products.price + " €";
            priceProduct.style.paddingBottom = "10px";
            kanapBlock.appendChild(priceProduct);
        });
    })
    .catch(function (error) {
        console.log('Erreur : serveur introuvable ' + error);
    });