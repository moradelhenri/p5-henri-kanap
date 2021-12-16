/* La page Panier
 Sur cette page, l’utilisateur va pouvoir modifier la quantité d’un produit de son panier ; à ce
 moment, le total du panier devra bien se mettre à jour.
 L’utilisateur aura aussi la possibilité de supprimer un produit de son panier, le produit devra
 donc disparaître de la page.*/

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
      cartColorProduct.innerHTML = produitDansLocalStorage[produit].color;
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

// recuperation de la totalité des  quantités

function carTotality() {
  let quantityItem = document.getElementsByClassName("itemQuantity");

  let theLength = quantityItem.length,
    totalQte = 0;
  for (let i = 0; i < theLength; ++i) {
    totalQte += quantityItem[i].valueAsNumber;
  }
  let carTotalityQuantity = document.getElementById("totalQuantity");
  carTotalityQuantity.innerHTML = totalQte;
  console.log(totalQte);
  //  recuperation du prix

  totalPrice = 0;
  for (let i = 0; i < theLength; ++i) {
    totalPrice +=
      quantityItem[i].valueAsNumber * produitDansLocalStorage[i].prixProduit;
  }

  let carTotalityQuantityPrice = document.getElementById("totalPrice");
  carTotalityQuantityPrice.innerHTML = totalPrice;
  console.log(totalPrice);
}

carTotality();

//changement de la quantité

function changeQuantities() {
  let quantityChanged = document.querySelectorAll(".itemQuantity");

  for (let h = 0; h < quantityChanged.length; h++) {
    quantityChanged[h].addEventListener("change", (event) => {
      event.preventDefault();

      // selection de l'élement à changer couleur etc

      let changeOfChoice = produitDansLocalStorage[h].quantiteProduit;
      let valueOfChoice = quantityChanged[h].valueAsNumber;
      const finalChoice = produitDansLocalStorage.find(
        (el) => el.valueOfChoice !== changeOfChoice
      );
      finalChoice.quantiteProduit = valueOfChoice;
      produitDansLocalStorage[h].quantiteProduit = finalChoice.quantiteProduit;
      localStorage.setItem("produit", JSON.stringify(produitDansLocalStorage));
      // recharge la page
      location.reload();
    });
  }
}
changeQuantities();

// supprimer un produit
function cartProductRemoval() {
  let productRemoval = document.querySelectorAll(".deleteItem");

  for (let d = 0; d < productRemoval.length; d++) {
    productRemoval[d].addEventListener("click", (event) => {
      event.preventDefault();

      // selection des elements a suprimer en fonction de  son id et couleur
      let idRemoval = produitDansLocalStorage[d].idProduit;
      let colorRemoval = produitDansLocalStorage[d].color;
      produitDansLocalStorage = produitDansLocalStorage.filter(
        (el) => el.idProduit !== idRemoval || el.color !== colorRemoval
      );
      localStorage.setItem("produit", JSON.stringify(produitDansLocalStorage));
      // alerte produit supprimé
      alert(" Ce produit à bien été supprimé");
      location.reload();
    });
  }
}

cartProductRemoval();

/*Les inputs des utilisateurs doivent être analysés et validés pour vérifier le format et le type
de données avant l’envoi à l’API. Il ne serait par exemple pas recevable d’accepter un
prénom contenant des chiffres, ou une adresse e-mail ne contenant pas de symbole “@”. En
cas de problème de saisie, un message d’erreur devra être affiché en dessous du cham*/

// prenom,nom,adresse, ville, email; recherche de toute les inputs type text et type email

const form = document.querySelector(".cart__order__form");

const inputs = document.querySelectorAll(
  'input[type ="text"], input[type ="email"], input [type ="submit"]'
);
let firstName, lastName, address, city, email;

const firstNameChecker = (value) => {
  console.log(firstNameChecker);
  const cartOrderForm = document.querySelector(".cart__order__form__question ");
  const firstNameError = document.getElementById("firstNameErrorMsg");

  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    cartOrderForm.classList.add("cart__order");
    firstNameError.textContent = "Le prenom doit faire entre 3 et 20 caracteres";
    firstName = null;
  } else if (!value.match(/^[é è¨a-z ,.'-]+$/i)) {
    cartOrderForm.classList.add(".cart__order");
    firstNameError.textContent =
      "Le prenom  ne doit pas contenir des caractère spéciaux ";
    firstName = null;
  } else {
    cartOrderForm.classList.remove("cart__order");
    firstNameError.textContent = "";
    firstName = value;
  }
};

const lastNameChecker = (value) => {
  const cartOrderFormName = document.querySelector(
    ".cart__order__form__question "
  );
  const lastNameError = document.getElementById("lastNameErrorMsg");

  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    cartOrderFormName.classList.add("cart__order");
    lastNameError.textContent = "Le nom doit faire entre 3 et 20 caracteres";
    lastName = null;
  } else if (!value.match(/^[é è¨a-z ,.'-]+$/i)) {
    cartOrderFormName.classList.add("cart__order");
    lastNameError.textContent =
      "Le nom  ne doit pas contenir des caractères spéciaux ";
    lastName = null;
  } else {
    cartOrderFormName.classList.remove("cart__order");
    lastNameError.textContent = "";
    lastName = value;
  }
};

const addressChecker = (value) => {
  const cartOrderFormAdress = document.querySelector(
    ".cart__order__form__question "
  );
  const adressError = document.getElementById("addressErrorMsg");

  if (value.length > 0 && (value.length < 3 || value.length > 100)) {
    cartOrderFormAdress.classList.add("cart__order");

    adressError.textContent = "Veuillez remplir ce champ svp";
    address = null;
  } else if (!value.match(/^[ 1234567890é è¨a-z ,.'-]+$/i)) {
    cartOrderFormAdress.classList.add("cart__order");
    adressError.textContent =
      "L'adresse ne doit pas contenir des caractères spéciaux ";
    address = null;
  } else {
    cartOrderFormAdress.classList.remove("cart__order");
    adressError.textContent = "";
    address = value;
  }
};

const cityChecker = (value) => {
  const cartOrderFormCity = document.querySelector(
    ".cart__order__form__question"
  );
  const cityError = document.getElementById("cityErrorMsg");
  if (value.length > 0 && (value.length < 3 || value.length > 100)) {
    cartOrderFormCity.classList.add("cart__order");
    cityError.textContent = "Veuillez remplir ce champ svp";
    city = null;
  } else if (!value.match(/^[ 1234567890é è¨a-z ,.'-]+$/i)) {
    cartOrderFormCity.classList.add("cart__order");

    cityError.textContent =
      "La ville ne doit pas contenir des caractère spéciaux ";
    city = null;
  } else {
    cartOrderFormCity.classList.remove("cart__order");
    cityError.textContent = "";
    city = value;
  }
};

const emailChecker = (value) => {
  console.log(emailChecker);
  const cartOrderEmail = document.querySelector(
    ".cart__order__form__question "
  );
  const emailError = document.getElementById("emailErrorMsg");

  if (!value.match('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g')){
    emailError.textContent = "Le mail n'est pas valide";
    email = null;
  } else {
    emailError.textContent = "Le mail est valide";
    email = value;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName":
        firstNameChecker(e.target.value);
        break;
      case "lastName":
        lastNameChecker(e.target.value);
        break;
      case "address":
        addressChecker(e.target.value);
        break;
      case "city":
        cityChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (firstName && lastName && address && city && email) {
    const data = {
      firstName,
      lastName,
      address,
      city,
      email,
    };
console.log(data);

    inputs.forEach((input) => (input.value = ""));

    firstName = null;
    lastName = null;
    address = null;
    city = null;
    email = null;

    alert("formulaire validée !");
  } else {
    alert("veuillez remplir correctement les champs");
  }
});

function postForm () {
  const btn_commander = document.getElementById("order");
  // ecoute du panier
  btn_commander.addEventListener("click", (event) => {
   //Récupération des coordonnées du formulaire client
   firstName = document.getElementById('firstName');
   lastName = document.getElementById('lastName');
   address = document.getElementById('address');
   city = document.getElementById('city');
  email = document.getElementById('email');

  //Construction d'un array depuis le localStorage
  let idProducts = [];
  for (let i = 0; i<produitDansLocalStorage.length;i++) {
      idProducts.push(produitDansLocalStorage[i].idProduit);
  }
  console.log(idProducts);

  const order = {
      contact : {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
      },
      products: idProducts,
  } 

  const options = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
          'Accept': 'application/json', 
          "Content-Type": "application/json" 
      },
  };

  fetch("http://localhost:3000/api/products/order", options)
  .then((response) => response.json())
  .then((data) => {
      console.log(data);
      localStorage.clear();
      localStorage.setItem("orderId", data.orderId);

      document.location.href = "confirmation.html";
  })
  .catch((err) => {
      alert ("Problème avec fetch : " + err.message);
  });
  })
}
postForm();
