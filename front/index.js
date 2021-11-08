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
    (kanap) => ` 
     
    <a  id="cart${kanap._id}">
 
   
    <article>
       
    <img src="${kanap.imageUrl}" alt="image de canapé${kanap.name}" />
        <h3 class="titre product">${kanap.name}</h3>
        <p class="productDescription">${kanap.altTxt}
         
        </p>
      </article>
           </a>
   
    `
  );
};
kanapDisplay();
