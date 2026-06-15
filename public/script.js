async function guardarVehiculo() {

    const vehiculo = {
        marca: document.getElementById("marca").value,
        modelo: document.getElementById("modelo").value,
        anio: document.getElementById("anio").value,
        color: document.getElementById("color").value,
        precio: document.getElementById("precio").value,
        estado: document.getElementById("estado").value
    };

    const respuesta = await fetch("/vehiculos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vehiculo)
    });

    const datos = await respuesta.json();

    alert(datos.mensaje);

    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("anio").value = "";
    document.getElementById("color").value = "";
    document.getElementById("precio").value = "";

    cargarVehiculos();
}

async function cargarVehiculos() {

    const respuesta = await fetch("/vehiculos");

    const vehiculos = await respuesta.json();

    let filas = "";

    vehiculos.forEach(v => {

        filas += `
        <tr>
            <td>${v.marca}</td>
            <td>${v.modelo}</td>
            <td>${v.anio}</td>
            <td>${v.color}</td>
            <td>$${v.precio}</td>
            <td>${v.estado}</td>
        </tr>
        `;

    });

    document.getElementById("listaVehiculos").innerHTML = filas;
}

cargarVehiculos();