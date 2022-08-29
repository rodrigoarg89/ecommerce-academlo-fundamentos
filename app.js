let stockProducts = [];
let carrito = [];
const contenedorProductos = document.getElementById("contenedor-productos"); 

// _______________________________________________________________
if(!localStorage.getItem('stockSav')) { 
  
  const initialStock=[
      {id:0, name: "Mochila para Notebook", ref: "MOCH001", stock: 200, desc: "en stock", price: 29.99, img:'../img/mochila01.jpg', imgMin:'../img/mochila01.jpg'},
      {id:1, name: "Mochila para Notebook", ref: "MOCH002", stock: 200, desc: "en stock", price: 25.99, img:'../img/mochila02.jpg', imgMin:'../img/mochila02.jpg'},
      {id:2, name: "Mochila para Notebook", ref: "MOCH003", stock: 200, desc: "en stock", price: 34.99, img:'../img/mochila03.jpg', imgMin:'../img/mochila03.jpg'},
      {id:3, name: "Mochila para Notebook", ref: "MOCH004", stock: 200, desc: "en stock", price: 29.99, img:'../img/mochila04.jpg', imgMin:'../img/mochila04.jpg'},
      {id:4, name: "Mochila para Notebook", ref: "MOCH005", stock: 200, desc: "en stock", price: 35.99, img:'../img/mochila05.jpg', imgMin:'../img/mochila05.jpg'},
      {id:5, name: "Mochila para Notebook", ref: "MOCH006", stock: 200, desc: "en stock", price: 35.99, img:'../img/mochila06.jpg', imgMin:'../img/mochila06.jpg'},
      {id:6, name: "Mochila para Notebook", ref: "MOCH007", stock: 200, desc: "en stock", price: 35.99, img:'../img/mochila07.jpg', imgMin:'../img/mochila07.jpg'},
      {id:7, name: "Mochila para Notebook", ref: "MOCH008", stock: 200, desc: "en stock", price: 35.99, img:'../img/mochila08.jpg', imgMin:'../img/mochila08.jpg'},
    ];

  stockProducts = initialStock; 

  localStorage.setItem('stockSave', JSON.stringify(initialStock));

    } else {  
        stockProducts= JSON.parse(localStorage.getItem('stockSav'));
  }
  
// _______________________________________________________________


stockProducts.forEach((producto) => {

  const div = document.createElement('div');

  div.classList.add('producto');

  const codeCard = `
     <img src=${producto.img} alt="imagen">
     <h3>${producto.name}</h3>
     <p>${producto.ref}</p>
     <p>STOCK: ${producto.stock}</p>
     <p class="priceProducto">price: $${producto.price}</p>
     <button id="agregar${producto.id}" class="btn-agregar"> + <i class="fa-solid fa-cart-shopping"></i><i class="fas-fa-shopping-cart"></i></button>
  `; 
  div.innerHTML = codeCard;
  contenedorProductos.appendChild(div);

});

// _______________________________________________________________

const contenedorCarrito = document.getElementById(`carrito-contenedor`);
const btn1= document.getElementById(`agregar0`);
const btn2= document.getElementById(`agregar1`); 
const btn3= document.getElementById(`agregar2`);
const btn4= document.getElementById(`agregar3`);
const btn5= document.getElementById(`agregar4`);
const btn6= document.getElementById(`agregar5`);
const btn7= document.getElementById(`agregar6`);
const btn8= document.getElementById(`agregar7`);


const priceTotal= document.getElementById(`price-total`);
const btnPay = document.getElementById(`btn-pay`);
const btnVaciar = document.getElementById(`btn-vaciar`);


btn1.addEventListener('click', function(e) {
  const i=0;
  addToCar(i); 
})


btn2.addEventListener('click', function(e) {
  const i=1;
  addToCar(i); 
})

btn3.addEventListener('click', function(e) {
  const i=2;
  addToCar(i); 
})

btn4.addEventListener('click', function(e) {
  const i=3;
  addToCar(i); 
})

btn5.addEventListener('click', function(e) {
  const i=4;
  addToCar(i); 
})

btn6.addEventListener('click', function(e) {
  const i=5;
  addToCar(i); 
})

btn7.addEventListener('click', function(e) {
  const i=6;
  addToCar(i); 
})

btn8.addEventListener('click', function(e) {
  const i=7;
  addToCar(i); 
})

// _______________________________________________________________

 
btnVaciar.addEventListener('click', function(e) {

  if(carrito.length!=0) {   
    for (let i=0; i<carrito.length; i++) { 
      document.getElementById(`${carrito[i].ref}`).outerHTML = ""; 
    } 
               
    carrito=[]; //VACIAMOS EL CARRITO
    priceTotal.textContent = 0; 
      
  }
})



btnPay.addEventListener('click', function(e){
  
  if(carrito.length != 0) { 
    for (let i = 0; i < carrito.length; i++) { 

      const indice = stockProducts.findIndex(item => item.ref === carrito[i].ref); 

      stockProducts[indice].stock =  parseFloat(stockProducts[indice].stock)- parseFloat(carrito[i].cantidad);
      document.getElementById(`${carrito[i].ref}`).outerHTML = ""; 
      
    } 
      
      localStorage.setItem('stockSave', JSON.stringify(stockProducts));
          
      carrito = []; 
      priceTotal.textContent = 0; 
      window.location.reload();
      

  }
})

// _______________________________________________________________


function buscarEnCarrito(objeto) { 

  const elemento = {};
  let indice=0;

  if(carrito.length === 0) { 

    elemento.ref = objeto.ref;
    elemento.name = objeto.name;
    elemento.cantidad = 1;
    elemento.price = objeto.price;
    elemento.subtotal = 1*parseFloat(objeto.price);
    elemento.imgMin = objeto.imgMin;

    carrito.push(elemento); 

    return indice;

  } else {

      for (let i = 0; i < carrito.length; i++) {  

        if (carrito[i].ref === objeto.ref) { 

          carrito[i].cantidad = parseFloat(carrito[i].cantidad)+1;
          carrito[i].subtotal = parseFloat(carrito[i].cantidad)*parseFloat(carrito[i].price); 

          indice = i;
          return indice;

       }
      }

      elemento.ref = objeto.ref;
      elemento.name = objeto.name;
      elemento.cantidad = 1;
      elemento.price = objeto.price;
      elemento.subtotal = 1*parseFloat(objeto.price);
      elemento.imgMin = objeto.imgMin;

      carrito.push(elemento); 
      indice = carrito.length-1;
      
      return indice;
    }
}

function addToCar(id){

  const indice = buscarEnCarrito(stockProducts[id]);

  if (document.getElementById(`${carrito[indice].ref}`)) {

    document.getElementById(`${carrito[indice].ref}`).outerHTML = ""; 
  
  }
  
  const div = document.createElement('div'); 

  div.classList.add('product-in-Car'); 

  div.setAttribute("id", `${carrito[indice].ref}`);

  const codeCard=` 
      
      <div>${carrito[indice].ref}</div>
      
      <div><img src=${carrito[indice].imgMin} alt="imagen"></div>
      
      <div>${carrito[indice].name}</div>
      
      <div>${carrito[indice].cantidad}</div>
      
      <div>$ ${carrito[indice].price}</div>
      
      <div>$ ${carrito[indice].subtotal}</div>
      
      <div><button id="eliminar${carrito[indice].ref}" class="btn-eliminar" onclick="funcionEliminar('${carrito[indice].ref}')" >Eliminar <i class="fas-fa-shopping-cart"></i></button></div>
          </div>
       `;

  div.innerHTML = codeCard;

  contenedorCarrito.appendChild(div);

  calcTotal();

}

function calcTotal () { 
  let total = 0;
  
  for(let item of carrito) {  
    total = parseFloat(item.subtotal) + total;
    total.toString;
  }

  priceTotal.textContent = total;
}


function funcionEliminar(referencia) {

  let nuevoCarrito = [];
  document.getElementById(referencia).outerHTML = "";
  
  nuevoCarrito = carrito.filter(item => item.ref != referencia);

  carrito = nuevoCarrito;
  calcTotal();
  
}


