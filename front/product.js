// récuperation de L'id avec la méthode window location search

const produit = window.location.search.split("?").join("");

// récuperation  d'un seul article  dans produitdata!

let produitData = [];
// appel de l'article grace à fetch et la fonction fetchProduit
const fetchProduit = async () => {
  await fetch(`http://localhost:3000/api/products/${produit}`)
    .then((res) => res.json())
    .then((promise) => {
      console.log((produitData=promise));
    });
  

};
produitData
console.log(produitData);

fetchProduit()


