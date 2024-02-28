const PRODUCTOS_SECTION_ID = 'productos-section';
const CARRITO_SECTION_ID = 'carrito-section';
const CONFIRMACION_SECTION_ID = 'confirmacion-section';

let productos = [];
let carrito = [];

// Función para obtener los productos desde un archivo JSON utilizando fetch
async function obtenerProductos() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return [];
  }
}

// Función para inicializar la página
async function inicializarPagina() {
  
  // Obtener los productos desde el archivo JSON
  productos = await obtenerProductos();

  // Renderizar los productos en la página
  renderizarProductos(productos);

  // Inicializar el carrito
  inicializarCarrito();
}

// Función para renderizar los productos en la página
function renderizarProductos(productos) {
  const productosSection = document.getElementById(PRODUCTOS_SECTION_ID);
  productosSection.innerHTML = '';

  productos.forEach(producto => {
    const productoElement = crearElementoProducto(producto);
    productosSection.appendChild(productoElement);
  });

  productosSection.style.display = 'flex';
}

// Función para agregar productos al carrito
function agregarAlCarrito(productoId) {
  const productoSeleccionado = productos.find(producto => producto.id === productoId);
  carrito.push(productoSeleccionado);

  // Actualizar la sección del carrito
  renderizarCarrito();

  // Guardar el carrito en el localStorage
  guardarCarrito();
}

// Función para renderizar el carrito en la página
function renderizarCarrito() {
  const carritoSection = document.getElementById(CARRITO_SECTION_ID);
  carritoSection.innerHTML = '<h2>Resumen del Carrito</h2>';

  carrito.forEach(item => {
    const itemElement = crearElementoCarrito(item);
    carritoSection.appendChild(itemElement);
  });

  // Mostrar el subtotal
  const subtotalElement = document.createElement('p');
  subtotalElement.classList.add('subtotal');
  subtotalElement.textContent = `Subtotal: $${calcularSubtotal()}`;
  carritoSection.appendChild(subtotalElement);

  carritoSection.style.display = 'flex';
}

// Función para crear un elemento de producto
function crearElementoProducto(producto) {
  const productoElement = document.createElement('div');
  productoElement.classList.add('producto');
  productoElement.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio.toFixed(2)}</p>
    <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
  `;
  return productoElement;
}

// Función para crear un elemento de carrito
function crearElementoCarrito(item) {
  const itemElement = document.createElement('div');
  itemElement.classList.add('item-carrito');
  itemElement.innerHTML = `
    <img src="${item.imagen}" alt="${item.nombre}" class="carrito-imagen">
    <div class="carrito-info">
      <h3>${item.nombre}</h3>
      <p>Precio: $${item.precio.toFixed(2)}</p>
      <p>Cantidad: 1</p>
      <p>Subtotal: $${item.precio.toFixed(2)}</p>
      <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
    </div>
  `;
  return itemElement;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(productoId) {
  carrito = carrito.filter(item => item.id !== productoId);
  renderizarCarrito();
  guardarCarrito();
}

// Función para calcular el subtotal del carrito
function calcularSubtotal() {
  return carrito.reduce((total, item) => total + item.precio, 0).toFixed(2);
}

// Función para manejar el evento de clic en el botón de realizar compra
function realizarCompra() {
  // Cambiar el contenido del cuadro de confirmación
  const compraProceso = document.getElementById('compra-proceso');
  const confirmacionTexto = document.getElementById('confirmacion-texto');

  compraProceso.textContent = '¡Compra en proceso!';
  confirmacionTexto.textContent = 'Gracias por tu compra.';

  const confirmacionSection = document.getElementById(CONFIRMACION_SECTION_ID);
  confirmacionSection.style.display = 'block';
}

// Función para recuperar la información del carrito desde el localStorage
function recuperarCarrito() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    return JSON.parse(carritoGuardado);
  }
  return [];
}

// Función para guardar la información del carrito en el localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para inicializar el carrito
function inicializarCarrito() {
  // Recuperar la información del carrito desde el localStorage
  carrito = recuperarCarrito();

  // Renderizar el carrito en la página
  renderizarCarrito();
}

// Función para manejar el envío del formulario
function enviarFormulario() {
  // Obtener los valores del formulario
  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const celular = document.getElementById('celular').value;
  const direccion = document.getElementById('direccion').value;
  const pais = document.getElementById('pais').value;

  // Crear un objeto con los datos del formulario
  const pedido = { nombre, correo, celular, direccion, pais };

  try {
    // Convertir el objeto a formato JSON y almacenarlo en el Local Storage
    localStorage.setItem('pedido', JSON.stringify(pedido));

    // Mostrar un mensaje de éxito
    alert('Pedido enviado correctamente.');
  } catch (error) {
    // Mostrar un mensaje de error si falla al guardar en el Local Storage
    console.error('Error al guardar en el Local Storage:', error);
    alert('Ocurrió un error al guardar el pedido. Por favor, inténtalo nuevamente.');
  }
}

// Configurar el evento de envío del formulario
const formulario = document.getElementById('checkout-form');
formulario.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenir el envío del formulario
  enviarFormulario(); // Llamar a la función para enviar el formulario
});

// Inicializar la página
inicializarPagina();
