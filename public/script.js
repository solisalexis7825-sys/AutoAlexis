let editandoId = null;

// ====================== GUARDAR / EDITAR ======================
async function guardarVehiculo() {

    const vehiculo = {
        marca: document.getElementById("marca").value,
        modelo: document.getElementById("modelo").value,
        anio: document.getElementById("anio").value,
        color: document.getElementById("color").value,
        precio: document.getElementById("precio").value,
        estado: document.getElementById("estado").value
    };

    let url = "/vehiculos";
    let method = "POST";

    if (editandoId) {
        url = `/vehiculos/${editandoId}`;
        method = "PUT";
    }

    await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vehiculo)
    });

    cancelarEdicion();
    cargarVehiculos();
}

// ====================== MOSTRAR ======================
async function cargarVehiculos() {

    const res = await fetch("/vehiculos");
    const vehiculos = await res.json();

    let filas = "";

    vehiculos.forEach(v => {
        filas += `
        <tr>
            <td>${v.marca}</td>
            <td>${v.modelo}</td>
            <td>${v.anio}</td>
            <td>${v.color}</td>
            <td>${v.precio}</td>
            <td>${v.estado}</td>
            <td>
                <button onclick="editarVehiculo('${v._id}')">✏️ Editar</button>
                <button onclick="eliminarVehiculo('${v._id}')">❌ Eliminar</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("listaVehiculos").innerHTML = filas;
}

// ====================== EDITAR ======================
async function editarVehiculo(id) {

    const res = await fetch(`/vehiculos/${id}`);
    const v = await res.json();

    document.getElementById("marca").value = v.marca;
    document.getElementById("modelo").value = v.modelo;
    document.getElementById("anio").value = v.anio;
    document.getElementById("color").value = v.color;
    document.getElementById("precio").value = v.precio;
    document.getElementById("estado").value = v.estado;

    editandoId = id;
}

// ====================== ELIMINAR ======================
async function eliminarVehiculo(id) {

    if (!confirm("¿Seguro que quieres eliminar este vehículo?")) return;

    await fetch(`/vehiculos/${id}`, {
        method: "DELETE"
    });

    cargarVehiculos();
}

// ====================== CANCELAR / LIMPIAR ======================
function cancelarEdicion() {

    editandoId = null;

    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("anio").value = "";
    document.getElementById("color").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("estado").value = "Nuevo";
}

// ====================== INICIO ======================
cargarVehiculos();