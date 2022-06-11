/**intégration de l'API dans une constante */
let URLProducts = 'http://localhost:3000/api/products';
/**récuperation de l'API */
fetch(URLProducts)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log('Erreur : ' + response.status + ' page introuvable');
        }
    })
    /**création des balises html,selon l'exemple donné, et association par "mot-clé/products" aux balises */
    /**utilisation de la boucle forEach sur l'ensemble "products" */
    .then(function (syncDisplay) {
        syncDisplay.forEach(products => {
            let items = document.getElementById('items');
            a = document.createElement("a");
            a.ref = "./product.html" + "?id=" + products._id;
            items.appendChild(a);

            let article = document.createElement("article");
            a.appendChild(article);

            let img = document.createElement("img");
            img.src = products.imageUrl;
            img.alt = products.altTxt;
            article.appendChild(img);

            let h3 = document.createElement("h3");
            h3.classList.add("productName");
            h3.innerHTML = products.name;
            article.appendChild(h3);

            let p = document.createElement("p");
            p.classList.add("productDescription");
            p.innerHTML = products.description;
            article.appendChild(p);

            let span = document.createElement("span");
            span.classList.add("price");
            span.innerHTML = products.price + " €";
            span.style.paddingBottom = "10px";
            article.appendChild(span);
        });
    });

