 // reçus

function confirm(){
    const ticket = document.getElementById("orderId");
    ticket.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"));
}

confirm()