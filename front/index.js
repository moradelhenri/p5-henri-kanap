// variable pour tableaux

let kanapData = [];
const fetchkanap = async () => {
  // Récupérer les articles depuis l'API


  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) => {
      kanapData = promise;
      console.log(kanapData);
    });
};
const kanapDisplay = async () => {
  await fetchkanap();
  document.getElementById("items").innerHTML = kanapData.map(
    (kanap) =>
    
      `       
    <a  id="product${kanap._id}">
  
    <article>
       
    <img src="${kanap.imageUrl}" alt="image de canapé${kanap.name}" />
        <h3 class="titre product">${kanap.name}</h3>
        <button id =${kanap._id} class=boutonProduit>voir</button>
        <p class="productDescription">${kanap.altTxt}
         
        </p>
       
      </article>
      </a>
       
  `
    ,
  )
  .join("");
 
  let boutons = document.querySelectorAll(".boutonProduit")
  console.log(boutons);
  
  boutons.forEach((bouton) =>
    bouton.addEventListener("click", () => {
      console.log(bouton);
      window.location = 'product.html?${bouton.id}';
    }),

  );
  };

kanapDisplay();


const URLSearchParams=new URLSearchParams("bouton.id")

const id = URLSearchParams.length("id");
console.log(id);
