// récuperation de L'id avec la méthode window location search

const produit = window.location.search.split("?").join("");

// récuperation  d'un seul article  dans produitdata!

let produitData = [];
// appel de l'article grace à fetch et la fonction fetchProduit
const fetchProduit = async () => {
  await fetch(`http://localhost:3000/api/products/${produit}`)
    .then((res) => res.json())
    .then((promise) => {
      console.log((produitData = promise));

      console.log(produitData);
    });
};

const produitDisplay = async () => {
  await fetchProduit();

  // Insertion de l'image et ces references

  document.querySelector(".item").innerHTML = `
  <section class="item"${produitData._id}
        <article>
        <div class="item__img">
        <img class="item__img"src=${produitData.imageUrl} alt="image de canapé"/>
                       
        <h1 id="title">${produitData.name}</h1>
        <p>Prix : <span id="price">${produitData.price}</span>€</p>
        <div class="item__content__description">
        <p class="item__content__description__title">Description :</p>
        <p id="description">${produitData.altTxt}</p>
            </div>
  <div class="item__content__settings">
  <div class="item__content__settings__color">
        <label for="color-select">Choisir une couleur :</label>
        <select name="color-select" id="colors"></select>
        <option value="">--SVP, choisissez une couleur --</option>
        <!--                       <option value="vert">vert</option>
                              <option value="blanc">blanc</option> -->
                          </select>
                        </div>
                      
                          <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>                
       
                          <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                          <div class="item__content__addButton">
                          <button id="addToCart">Ajouter au panier</button>
                                 </div>
                          </div>
       
        </article>
                   
      </section>    
                       `

                     

 // ajout des options couleurs

 let selectColor = document.querySelector("#colors");
 for (let i = 0; i < produitData.colors.length; i++) {
   let option = document.createElement("option");
   option.innerText = produitData.colors[i];
   selectColor.appendChild(option);
 }

 //création d'une function de distribution (avec variable de personnalisation et nombre produit)

 const quantityItem = document.getElementById("quantity");
 const colorSelect = document.getElementById("colors");
 function addToCart() {
   const addToCartBtn = document.querySelector("#addToCart");

   // Ecouter le panier avec 2 conditions couleur et quantité entre 1 et 100
   addToCartBtn.addEventListener("click", (event) => {
     if (
       quantityItem.value > 0 &&
       quantityItem.value <= 100 &&
       quantityItem.value != 0
     ) {
       let personnalisation = colorSelect.value;
       let kanapQuantity = quantityItem.value;
 //Récupération des options du produit à ajouter au panier
 let optionsProduit = {
   idProduit:produitData._id,
   couleurProduit: personnalisation,
   quantiteProduit: Number(kanapQuantity),
   nomProduit:produitData.name,
   prixProduit: produitData.price,
   descriptionProduit:produitData.description,
   imgProduit: produitData.imageUrl,
   altImgProduit: produitData.altTxt
};

    
   //Initialisation du local storage
   let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

   //fenêtre  window confirme
   const popupConfirmation =() =>{
       if(window.confirm(`Votre commande de ${kanapQuantity } ${produitData.name} ${personnalisation} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)){
           window.location.href ="./cart.html";
       }
   } 

 
   popupConfirmation() 

     
     
     
     
     }
   });




  // addEventListener();
 }

 addToCart();
};
produitDisplay();
