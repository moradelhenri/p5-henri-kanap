/* La page Panier
 Sur cette page, l’utilisateur va pouvoir modifier la quantité d’un produit de son panier ; à ce
 moment, le total du panier devra bien se mettre à jour.
 L’utilisateur aura aussi la possibilité de supprimer un produit de son panier, le produit devra
 donc disparaître de la page.
 Les inputs des utilisateurs doivent être analysés et validés pour vérifier le format et le type
 de données avant l’envoi à l’API. Il ne serait par exemple pas recevable d’accepter un
 prénom contenant des chiffres, ou une adresse e-mail ne contenant pas de symbole “@”. En
 cas de problème de saisie, un message d’erreur devra être affiché en dessous du cham*/

//verrif local storage

let produitDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(produitDansLocalStorage);

const pageCartProduct = document.querySelector("#cart__items");
// s'il ny a pas de produit dans le panier
function cartFill() {
  if (produitDansLocalStorage === null || produitDansLocalStorage == 0) {
    const cartProduct = `<p> Votre panier est vide  </p>`;

    pageCartProduct.innerHTML = cartProduct;
  } else {
    for (let produit in produitDansLocalStorage) {
      let productArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(productArticle);
      productArticle.className = "cart__item";
      productArticle.setAttribute(
        "data-id",
        produitDansLocalStorage[produit].idProduit
      );
      // insertion de l'elément <div>
      let imgProductDiv = document.createElement("div");
      productArticle.appendChild(imgProductDiv);
      imgProductDiv.className = "cart__item__img";

      //insertion de l'image
      let imgProduct = document.createElement("img");
      imgProductDiv.appendChild(imgProduct);
      imgProduct.src = produitDansLocalStorage[produit].imgProduit;
      imgProduct.alt = produitDansLocalStorage[produit].altImgProduit;
      // insertion de l'élement "div"

      let cartItemContent = document.createElement("div");
      productArticle.appendChild(cartItemContent);
      cartItemContent.className = "cart__item__content";

      // insertion de l'élement "div"
      let cartItemContentTitlePrice = document.createElement("div");
      cartItemContent.appendChild(cartItemContentTitlePrice);
      cartItemContentTitlePrice.className = "cart__item__content__titlePrice";

      // insertion   nom de produit "h2"
      let cartProductTitle = document.createElement("h2");
      cartItemContentTitlePrice.appendChild(cartProductTitle);
      cartProductTitle.innerHTML = produitDansLocalStorage[produit].name;
      // insertion de la couleur
      let cartColorProduct = document.createElement("p");
      cartProductTitle.appendChild(cartColorProduct);
      cartColorProduct.innerHTML =
        produitDansLocalStorage[produit].color;
      cartColorProduct.style.fontSize = "18px";
      // insertion des prix
      let cartProductPrice = document.createElement("p");
      cartItemContentTitlePrice.appendChild(cartProductPrice);
      cartProductPrice.innerHTML =
        produitDansLocalStorage[produit].prixProduit + "€,";
      // insertion de l'elément div
      let cartItemContentSetting = document.createElement("div");
      cartItemContent.appendChild(cartItemContentSetting);
      cartItemContentSetting.className = "cart__item__content__settings";
      //insertion de l'élement div
      let cartItemContentSettingQuantity = document.createElement("div");
      cartItemContentSetting.appendChild(cartItemContentSettingQuantity);
      cartItemContentSettingQuantity.className =
        "cart__item__content__settings__quantity";
      // insertion de quantité(Qte)
      let cartItemQte = document.createElement("p");
      cartItemContentSettingQuantity.appendChild(cartItemQte);
      cartItemQte.innerHTML = "qte ; ";

      // insertion de la quantité

      let cartQuantity = document.createElement("input");
      cartItemContentSettingQuantity.appendChild(cartQuantity);

      cartQuantity.value = produitDansLocalStorage[produit].quantiteProduit;
      cartQuantity.className = "itemQuantity";
      cartQuantity.setAttribute("type", "number");
      cartQuantity.setAttribute("min", "1");
      cartQuantity.setAttribute("max", "100");
      cartQuantity.setAttribute("name", "itemQuantity");

      // insertion de l'élement div
      let cartItemContentSettingDelete = document.createElement("div");
      cartItemContentSetting.appendChild(cartItemContentSettingDelete);
      cartItemContentSettingDelete.className =
        "cart__item__content__settings__delete";
      //insertion supprimer (p)

      let cartDeleteItem = document.createElement("p");
      cartItemContentSettingDelete.appendChild(cartDeleteItem);
      cartDeleteItem.className = "deleteItem";
      cartDeleteItem.innerHTML = "Supprimer";
    }
  }
}

cartFill();

/* <!--  <article class="cart__item" data-id="{product-ID}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>Nom du produit</h2>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> -->*/