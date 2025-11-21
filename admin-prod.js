let productos = [];
let filteredProductos = [];
let visibleCount = 10;

document.addEventListener('DOMContentLoaded', function () {
    loadProductos();
});

async function loadProductos() {
    try {
        const response = await fetch("http://localhost:3000/productos", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
        }

        const data = await response.json();
        productos = data || [];


        filteredProductos = productos;
        renderProductCards();

    } catch (e) {
        console.error("Error cargando productos:", e);
    }
}


function renderProductCards() {
    const list = document.getElementById("productos-lista");
    if (!list) return;
    list.innerHTML = "";

    let displayProductos = filteredProductos.slice(0, visibleCount);

    displayProductos.forEach(prod => {
        const div = document.createElement("div");
        div.className = "product-item";
        div.tabIndex = 0;
        div.title = `Precio: $${prod.precio.toFixed(2)}`;

        div.onclick = () => selectProduct(prod);
        div.onkeydown = (e) => { if (e.key === "Enter") selectProduct(prod); };

        div.ondblclick = () => {
            selectedProduct = prod;
            document.getElementById("selected-product").value = prod.nombre.toUpperCase();
            document.getElementById("input-quantity").value = 1;
            addToSales();
            renderSalesList();
        };

        div.innerHTML = `
      <div class="product-title">${prod.nombre}</div>
      <div class="product-price">$${prod.precio.toFixed(2)}</div>
      <div class="product-actions">
        <button class="btn btn-sm btn-outline-danger btn-delete" title="Eliminar">
          <i class="fas fa-trash"></i>
        </button>
        <button class="btn btn-sm btn-outline-primary btn-edit" title="Modificar">
          <i class="fas fa-edit"></i>
        </button>
      </div>
    `;

        // Aquí puedes añadir listeners para estos botones que llamarán a Backend luego
        const btnDelete = div.querySelector(".btn-delete");
        btnDelete.addEventListener("click", (event) => {
            event.stopPropagation(); // evitar que active selectProduct
            // Aquí lógica para eliminar producto con prod.id - backend
            borrarProducto(prod.id);

        });

        const btnEdit = div.querySelector(".btn-edit");
        btnEdit.addEventListener("click", (event) => {
            event.stopPropagation();
            // Aquí lógica para modificar producto con prod.id - backend
            console.log("Modificar producto con ID:", prod.id);
        });

        list.appendChild(div);
    });

    const btnSeeMore = document.getElementById("btn-see-more");
    if (btnSeeMore) {
        btnSeeMore.style.display = visibleCount >= filteredProductos.length ? "none" : "block";
    }
}


//FUNCIONALIDADES BORRADO Y MODIFICADO DE PRODUCTOS

function borrarProducto(id) {
    const response = fetch('http://localhost:3000/eliminarProducto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
    });
}


