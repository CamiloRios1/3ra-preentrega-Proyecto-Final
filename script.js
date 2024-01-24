const PRODUCTOS_SECTION_ID = 'productos-section';
const CARRITO_SECTION_ID = 'carrito-section';
const CONFIRMACION_SECTION_ID = 'confirmacion-section';

// Datos de ejemplo en formato JSON
const productos = [
    { id: 1, nombre: 'Producto 1', precio: 20.990, imagen: 'https://placekitten.com/350/350' },
    { id: 2, nombre: 'Producto 2', precio: 15.490, imagen: 'https://placekitten.com/350/350' },
    { id: 3, nombre: 'Producto 3', precio: 30.000, imagen: 'https://placekitten.com/350/350' },
    { id: 4, nombre: 'Producto 4', precio: 25.000, imagen: 'https://placekitten.com/350/350' },
    { id: 5, nombre: 'Producto 5', precio: 18.750, imagen: 'https://placekitten.com/350/350' },
    { id: 6, nombre: 'Producto 6', precio: 22.500, imagen: 'https://placekitten.com/350/350' },
    // Puedes agregar más productos según tus necesidades
  ];
  
  const carrito = [];
  
  // Función para renderizar los productos en la página

  function renderizarProductos() {
    const productosSection = document.getElementById('productos-section');
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
  }
  
  // Función para renderizar el carrito en la página

  function renderizarCarrito() {
    const carritoSection = document.getElementById('carrito-section');
    carritoSection.innerHTML = '<h2>Resumen del Carrito</h2>';
  
    carrito.forEach(item => {
      const itemElement = crearElementoCarrito(item);
      carritoSection.appendChild(itemElement);
    });
  
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
      </div>
    `;
    return itemElement;
  }
  // Función para calcular el subtotal del carrito

function calcularSubtotal() {
    return carrito.reduce((total, item) => total + item.precio, 0).toFixed(2);
  }
  
  // Función para renderizar el carrito en la página

  function renderizarCarrito() {
    const carritoSection = document.getElementById('carrito-section');
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

  // Función para manejar el evento de clic en el botón de realizar compra

function realizarCompra() {
  
    // Cambiar el contenido del cuadro de confirmación

    const compraProceso = document.getElementById('compra-proceso');
    const confirmacionTexto = document.getElementById('confirmacion-texto');
  
    compraProceso.textContent = '¡Compra en proceso!';
    confirmacionTexto.textContent = 'Gracias por tu compra.';
  
    const confirmacionSection = document.getElementById('confirmacion-section');
    confirmacionSection.style.display = 'block';
  }
    
  // Inicializar la página
  renderizarProductos();
  