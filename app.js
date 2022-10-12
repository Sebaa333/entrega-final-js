let carrito = [];
const items = document.getElementById("items");
const dcarrito = document.querySelector("#carrito");
const contenedorcarrito = document.querySelector("#lista-carrito tbody");
const finalizarcompra = document.querySelector("#finalizar-compra");
const vaciarcarrito = document.querySelector("#vaciar-carrito");



function renderizarProductos() {
  
  fetch('array.json')
  .then(res => res.json())
  .then((data)=>{
    data.forEach((info) => {
    
      const miNodo = document.createElement("div");
      miNodo.classList.add("card", "col-sm-4");
  
      const CardBody = document.createElement("div");
      CardBody.setAttribute("id", info.id);
      CardBody.classList.add("card-body");
      
      const Title = document.createElement("h5");
      Title.classList.add("card-title");
      Title.innerText = info.nombre;
      
      const Precio = document.createElement("p");
      Precio.classList.add("card-text");
      Precio.innerText = `$${info.precio}`;
      
      const Boton = document.createElement("button");
      Boton.classList.add("btn", "btn-info", "agregar-carrito");
      Boton.innerText = "agregar al carrito";
      Boton.setAttribute("marcador", info.id);
      
  
      CardBody.append(Title);
      CardBody.append(Precio);
      CardBody.append(Boton);
      miNodo.append(CardBody);
      items.append(miNodo);
    });
  }


  )};


cargarCarritoDeLocalStorage();
renderizarProductos();
cargarEvent();

function cargarEvent() {
  // Cuando agregas un producto presionando "agregar al carrito"
    items.addEventListener("click", agregarProducto);
  
    dcarrito.addEventListener("click", eliminarProducto);
  // Finalizar Compra
    finalizarcompra.addEventListener("click", () => {
    Toastify({
        text: "GRACIAS POR COMPRAR VUELVA PRONTO",
        duration: 1500,
        gravity: "top",
        position: "center",
        backgroundColor: "#525252"
    }).showToast()

});
  // Vaciar el Carrito
    vaciarcarrito.addEventListener("click", () => {
    carrito = [];
    limpiarHTML();
});
}

function agregarProducto(e) {
    if (e.target.classList.contains("agregar-carrito")) {
        const produSelec = e.target.parentElement;
        Datos(produSelec);
        Toastify({
        text: "Agregaste un Producto al Carrito",
        duration: 1000,
        gravity: "top",
        position: "right",
        backgroundColor: "#525252"
    }).showToast()
    }
}


function eliminarProducto() {
  if (e.target.classList.contains("borrar-Producto")) {
    const ProductoId = e.target.getAttribute("marcador");

    // Elimina del arreglo de carrito por el marcador
    carrito = carrito.filter((produ) => produ.id !== ProductoId);
    
    carritoHTML(); 
  }
}

  

function Datos(datos) {
  // Crear un objeto con el contenido del producto actual
  const infoProducto = {
    
    titulo: datos.querySelector("h5").textContent,
    precio: datos.querySelector("p").textContent,
    id: datos.querySelector("button").getAttribute("marcador"),
    cantidad: 1,
  };

  if (carrito.some((datos) => datos.id === infoProducto.id)) {
    const datos = carrito.map((datos) => {
        if (datos.id === infoProducto.id) {
        datos.cantidad++;
        return datos;
    } else {
        return datos;
    }
    });
    carrito = [...datos];
    } else {
    carrito = [...carrito, infoProducto];
}

carritoHTML();

guardarCarritoEnLocalStorage();
}


function carritoHTML() {

  limpiarHTML();
  carrito.forEach((items) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${items.titulo}</td>
      <td>${items.precio}</td>
      <td>${items.cantidad}</td>
      <td>
          <a href="#" class="borrar-item" marcador="${items.id}"> X </a>
      </td>
      `;

      contenedorcarrito.appendChild(row);
});
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage() {
    if (localStorage.getItem("carrito") !== null) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}
}

const limpiarHTML=()=>{
  while (contenedorcarrito.firstChild) {
    contenedorcarrito.removeChild(contenedorcarrito.firstChild);
}
}

