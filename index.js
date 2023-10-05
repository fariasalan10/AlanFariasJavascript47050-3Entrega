// MOLDE CONSTRUCTOR PARA NUESTROS PRODUCTOS
class Producto {
  constructor(id, nombre, precio, descripcion, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.imagen = imagen;
  }
}

// Clase para que simula la base de datos del e-commerce, acá van a estar
// todos los productos de nuestro catálogo
class BaseDeDatos {
  constructor() {
    // Array para el catálogo
    this.productos = [];
    // Empezar a cargar productos
    this.agregarRegistro(
      1,
      "iPhone 14 Plus",
      1000,
      "iPhone en su máxima expresión. 1TB de capacidad y pantalla de 6.1",
      "../Images/iPhone 14 Plus.jpeg"
    );
    this.agregarRegistro(
      2,
      "AirPods Pro",
      200,
      "Chip H2 más inmersivo, un viaje de sonido. Con cancelación de sonido.",
      "../Images/AirPods Pro.jpeg"
    );
    this.agregarRegistro(
      3,
      "Apple Watch",
      400,
      "Un diseño continuo. Pantalla Retina activa, increíblemente resistente.",
      "../Images/Apple Watch.jpg"
    );
    this.agregarRegistro(
      4,
      "Funda de Silicona",
      30,
      "Accesorio sellado silicona original Apple con Magsafe color azul niebla.",
      "../Images/Funda de Silicona.jpg"
    );
    this.agregarRegistro(
      5,
      "iPhone 12",
      450,
      "Usado seleccionado, batería 99%, 128gb almacenamiento, morado.",
      "../Images/iPhone-12.jpg"
    );
    this.agregarRegistro(
      6,
      "iPhone 13 Pro Max",
      900,
      "Nuevo en caja sellada, 256gb almacenamiento, silver pantalla 6.1.",
      "../Images/iphone-13-pro-max-256gb-silver.jpg"
    );
    this.agregarRegistro(
      7,
      "iPhone 14 Pro",
      650,
      "Nuevo en caja sellada, 256gb almacenamiento, pantalla de 6.1",
      "../Images/iPhone-14-pro.jpg"
    );
    this.agregarRegistro(
      8,
      "iPhone 11",
      400,
      "Usado seleccionado, batería 90%, 128gb almacenamiento, black.",
      "../Images/iPhone-12.jpg"
    );
    this.agregarRegistro(
      9,
      "MacBook Pro 13",
      1400,
      "Equipo sellado, 512gb SSD, GPU 10 nucleos, procesador M2.",
      "../Images/pro13-m2.jpg"
    );
    this.agregarRegistro(
      10,
      "MacBook Pro 14",
      1700,
      "Equipo sellado, 1TB SSD, GPU 10 nucleos, procesador M2.",
      "../Images/macbook_pro_m2MAX_14y16.jpg"
    );
    this.agregarRegistro(
      11,
      "Mac mini M2",
      1300,
      "Equipo sellado, 512GB SSD, GPU 16 nucleos, procesador M2 Pro.",
      "../Images/Mac_mini_M2.jpg"
    );
    this.agregarRegistro(
      12,
      "MacBook Pro 13 2020",
      1200,
      "Usado seleccionado, 512GB SSD, GPU 10 nucleos, procesador M1.",
      "../Images//MacbookPro13m1.jpg"
    );
  }

  // Método que crea el objeto producto y lo almacena en el catálogo (array)
  agregarRegistro(id, nombre, precio, categoria, imagen) {
    const producto = new Producto(id, nombre, precio, categoria, imagen);
    this.productos.push(producto);
  }

  // Nos devuelve todo el catálogo de productos
  traerRegistros() {
    return this.productos;
  }

  // Nos devuelve un producto según el ID
  registroPorId(id) {
    return this.productos.find((producto) => producto.id === id);
  }

  // Nos devuelve un array con todas las coincidencias que encuentre según el
  // nombre del producto con la palabra que el pasemos como parámetro
  registrosPorNombre(palabra) {
    return this.productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(palabra.toLowerCase())
    );
  }
}

// Clase carrito que nos sirve para manipular los productos de nuestro carrito
class Carrito {
  constructor() {
    // Storage
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
    // Array donde van a estar almacenados todos los productos del carrito
    this.carrito = carritoStorage || [];
    this.total = 0; // Suma total de los precios de todos los productos
    this.cantidadProductos = 0; // La cantidad de productos que tenemos en el carrito
    // Llamo a listar apenas de instancia el carrito para aplicar lo que
    // hay en el storage (en caso de que haya algo)
    this.listar();
  }

  // Método para saber si el producto ya se encuentra en el carrito
  estaEnCarrito({ id }) {
    return this.carrito.find((producto) => producto.id === id);
  }

  // Agregar al carrito
  agregar(producto) {
    const productoEnCarrito = this.estaEnCarrito(producto);
    // Si no está en el carrito, le mando eun push y le agrego
    // la propiedad "cantidad"
    if (!productoEnCarrito) {
      this.carrito.push({ ...producto, cantidad: 1 });
    } else {
      // De lo contrario, si ya está en el carrito, le sumo en 1 la cantidad
      productoEnCarrito.cantidad++;
    }
    // Actualizo el storage
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
    // Muestro los productos en el HTML
    this.listar();
  }

  // Quitar del carrito
  quitar(id) {
    // Obento el índice de un producto según el ID, porque el
    // método splice requiere el índice
    const indice = this.carrito.findIndex((producto) => producto.id === id);
    // Si la cantidad es mayor a 1, le resto la cantidad en 1
    if (this.carrito[indice].cantidad > 1) {
      this.carrito[indice].cantidad--;
    } else {
      // Y sino, borramos del carrito el producto a quitar
      this.carrito.splice(indice, 1);
    }
    // Actualizo el storage
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
    // Muestro los productos en el HTML
    this.listar();
  }

  // Renderiza todos los productos en el HTML
  listar() {
    // Reiniciamos variables
    this.total = 0;
    this.cantidadProductos = 0;
    divCarrito.innerHTML = "";
    // Recorro producto por producto del carrito, y los dibujo en el HTML
    for (const producto of this.carrito) {
      divCarrito.innerHTML += `

      <div class="card" style="width: 15rem;">
  <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
  <div class="card-body">
    <h5 class="card-title">${producto.nombre}</h5>
    <p class="card-text">Cantidad: ${producto.cantidad}</p>
    <p class="card-text">U$D ${producto.precio}</p>
    <a href="#" class="btnQuitar botonCarrito" data-id="${producto.id}">Quitar del carrito</a>
  </div>
</div>

      `;
      // Actualizamos los totales
      this.total += producto.precio * producto.cantidad;
      this.cantidadProductos += producto.cantidad;
    }
    // Como no se cuantos productos tengo en el carrito, debo
    // asignarle los eventos de forma dinámica a cada uno
    // Primero hago una lista de todos los botones con .querySelectorAll
    const botonesQuitar = document.querySelectorAll(".btnQuitar");
    // Después los recorro uno por uno y les asigno el evento a cada uno
    for (const boton of botonesQuitar) {
      boton.addEventListener("click", (event) => {
        event.preventDefault();
        // Obtengo el id por el dataset (está asignado en this.listar())
        const idProducto = Number(boton.dataset.id);
        // Llamo al método quitar pasándole el ID del producto
        this.quitar(idProducto);
      });
    }
    // Actualizo los contadores del HTML
    spanCantidadProductos.innerText = this.cantidadProductos;
    spanTotalCarrito.innerText = this.total;
  }
}

// Instanciamos la base de datos
const bd = new BaseDeDatos();

// Elementos
const spanCantidadProductos = document.querySelector("#cantidadProductos");
const spanTotalCarrito = document.querySelector("#totalCarrito");
const divProductos = document.querySelector("#productos");
const divCarrito = document.querySelector("#carrito");
const inputBuscar = document.querySelector("#inputBuscar");
const botonCarrito = document.querySelector("section h1");

// Instaciamos la clase Carrito
const carrito = new Carrito();

// Mostramos el catálogo de la base de datos apenas carga la página
cargarProductos(bd.traerRegistros());

// Función para mostrar para renderizar productos del catálogo o buscador
function cargarProductos(productos) {
  // Vacíamos el div
  divProductos.innerHTML = "";
  // Recorremos producto por producto y lo dibujamos en el HTML
  for (const producto of productos) {
    divProductos.innerHTML += `
    <article class="container1">
    <div class="producto card1">
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="contenido">
        <h3>${producto.nombre}</h3>
        <p class="card-text">${producto.descripcion}</p>
        <p>U$D ${producto.precio}</p>
        <a href="#" class="btnAgregar botonCarrito" data-id="${producto.id}">Agregar al carrito</a>
      </div>
    </div>
  </article>
    `;
  }

  // Lista dinámica con todos los botones que haya en nuestro catálogo
  const botonesAgregar = document.querySelectorAll(".btnAgregar");

  // Recorremos botón por botón de cada producto en el catálogo y le agregamos
  // el evento click a cada uno
  for (const boton of botonesAgregar) {
    boton.addEventListener("click", (event) => {
      // Evita el comportamiento default de HTML
      event.preventDefault();
      // Guardo el dataset ID que está en el HTML del botón Agregar al carrito
      const idProducto = Number(boton.dataset.id);
      // Uso el método de la base de datos para ubicar el producto según el ID
      const producto = bd.registroPorId(idProducto);
      // Llama al método agregar del carrito
      carrito.agregar(producto);
    });
  }
}

// Buscador
inputBuscar.addEventListener("input", (event) => {
  event.preventDefault();
  const palabra = inputBuscar.value;
  const productos = bd.registrosPorNombre(palabra);
  cargarProductos(productos);
});

// Toggle para ocultar/mostrar el carrito
botonCarrito.addEventListener("click", (event) => {
  document.querySelector("section").classList.toggle("ocultar");
});
