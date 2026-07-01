// ==========================================
// SISTEMA DE GESTIÓN DE ESTUDIANTES
// Autor: José Fernando Buitrago Bohórquez
// ==========================================


// ==========================================
// VARIABLES GLOBALES
// ==========================================

let estudiantes = [];
let indiceEditar = -1;


// ==========================================
// EVENTO: SOLO NÚMEROS EN DOCUMENTO
// ==========================================

document.getElementById("documento").addEventListener("input", function () {

    this.value = this.value.replace(/[^0-9]/g, "");

});


// ==========================================
// BOTÓN REGISTRAR
// ==========================================

document.getElementById("btnRegistrar").addEventListener("click", function () {

    let documento = document.getElementById("documento").value;
    let nombre = document.getElementById("nombre").value;
    let programa = document.getElementById("programa").value;

    let nota1 = document.getElementById("nota1").value;
    let nota2 = document.getElementById("nota2").value;
    let nota3 = document.getElementById("nota3").value;


    // ==========================
    // VALIDACIONES
    // ==========================

    if (
        documento == "" ||
        nombre == "" ||
        programa == "" ||
        nota1 == "" ||
        nota2 == "" ||
        nota3 == ""
    ) {

        alert("Todos los campos son obligatorios.");
        return;

    }


    if (isNaN(documento)) {

        alert("El documento solo puede contener números.");
        return;

    }


    for (let i = 0; i < estudiantes.length; i++) {

        if (estudiantes[i].documento == documento) {

            alert("El documento ya está registrado.");
            return;

        }

    }


    if (

        Number(nota1) < 0 || Number(nota1) > 5 ||
        Number(nota2) < 0 || Number(nota2) > 5 ||
        Number(nota3) < 0 || Number(nota3) > 5

    ) {

        alert("Las notas deben estar entre 0 y 5.");
        return;

    }


    let estudiante = {

        documento: documento,
        nombre: nombre,
        programa: programa,
        nota1: Number(nota1),
        nota2: Number(nota2),
        nota3: Number(nota3)

    };


    estudiantes.push(estudiante);

    mostrarEstudiantes();

    limpiarFormulario();

    alert("Estudiante registrado correctamente.");

});


// ==========================================
// BOTÓN BUSCAR
// ==========================================

document.getElementById("btnBuscar").addEventListener("click", function () {

    let documentoBuscar = document.getElementById("buscarDocumento").value;

if (documentoBuscar == "") {

    alert("El capo no puede estar vacio, Ingrese un documento para realizar la búsqueda.");

    return;

}

    let encontrado = false;

    for (let i = 0; i < estudiantes.length; i++) {

        if (estudiantes[i].documento == documentoBuscar) {

            document.getElementById("documento").value = estudiantes[i].documento;
            document.getElementById("nombre").value = estudiantes[i].nombre;
            document.getElementById("programa").value = estudiantes[i].programa;
            document.getElementById("nota1").value = estudiantes[i].nota1;
            document.getElementById("nota2").value = estudiantes[i].nota2;
            document.getElementById("nota3").value = estudiantes[i].nota3;

            indiceEditar = i;

            document.getElementById("btnRegistrar").disabled = true;
            document.getElementById("btnActualizar").disabled = false;
            document.getElementById("btnCancelar").disabled = false;

            document.getElementById("documento").readOnly = true;

            encontrado = true;

            break;

        }

    }

    if (!encontrado) {

        alert("No se encontró ningún estudiante con ese documento.");

    }

});

// ==========================================
// BOTÓN ACTUALIZAR
// ==========================================

// ==========================================
// BOTÓN ACTUALIZAR
// ==========================================

document.getElementById("btnActualizar").addEventListener("click", function () {

    let nombre = document.getElementById("nombre").value;
    let programa = document.getElementById("programa").value;

    let nota1 = document.getElementById("nota1").value;
    let nota2 = document.getElementById("nota2").value;
    let nota3 = document.getElementById("nota3").value;

    // Validar campos vacíos
    if (
        nombre == "" ||
        programa == "" ||
        nota1 == "" ||
        nota2 == "" ||
        nota3 == ""
    ) {

        alert("Todos los campos son obligatorios.");
        return;

    }

    // Validar rango de notas
    if (
        Number(nota1) < 0 || Number(nota1) > 5 ||
        Number(nota2) < 0 || Number(nota2) > 5 ||
        Number(nota3) < 0 || Number(nota3) > 5
    ) {

        alert("Las notas deben estar entre 0 y 5.");
        return;

    }

    estudiantes[indiceEditar].nombre = nombre;
    estudiantes[indiceEditar].programa = programa;
    estudiantes[indiceEditar].nota1 = Number(nota1);
    estudiantes[indiceEditar].nota2 = Number(nota2);
    estudiantes[indiceEditar].nota3 = Number(nota3);

    mostrarEstudiantes();

    limpiarFormulario();

    alert("Estudiante actualizado correctamente.");

});

// ==========================================
// BOTÓN CANCELAR
// ==========================================

document.getElementById("btnCancelar").addEventListener("click", function () {

    limpiarFormulario();

});


// ==========================================
// FUNCIÓN MOSTRAR ESTUDIANTES
// ==========================================

function mostrarEstudiantes() {

    let tabla = document.getElementById("tablaEstudiantes");

    tabla.innerHTML = "";

    for (let i = 0; i < estudiantes.length; i++) {

        let promedio = (

            estudiantes[i].nota1 +
            estudiantes[i].nota2 +
            estudiantes[i].nota3

        ) / 3;

        let estado = "";

        if (promedio >= 3) {

            estado = "Aprobado";

        } else {

            estado = "Reprobado";

        }

        tabla.innerHTML += `

        <tr>

            <td>${estudiantes[i].documento}</td>

            <td>${estudiantes[i].nombre}</td>

            <td>${estudiantes[i].programa}</td>

            <td>${promedio.toFixed(2)}</td>

            <td>${estado}</td>

            <td>
    <button class="btnEliminar" onclick="eliminarEstudiante(${i})">
    Eliminar
</button>
</td>

        </tr>

        `;

    }

}

// ==========================================
// FUNCIÓN LIMPIAR FORMULARIO
// ==========================================

function limpiarFormulario() {

    document.getElementById("documento").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("programa").value = "";
    document.getElementById("nota1").value = "";
    document.getElementById("nota2").value = "";
    document.getElementById("nota3").value = "";

    document.getElementById("buscarDocumento").value = "";

    indiceEditar = -1;

    document.getElementById("documento").readOnly = false;

    document.getElementById("btnRegistrar").disabled = false;
    document.getElementById("btnActualizar").disabled = true;
    document.getElementById("btnCancelar").disabled = true;
}
// ==========================================
// FUNCIÓN ELIMINAR ESTUDIANTE
// ==========================================

function eliminarEstudiante(indice) {

    let confirmar = confirm(
        "¿Está seguro de eliminar este estudiante?"
    );

    if (confirmar) {

        estudiantes.splice(indice, 1);

        mostrarEstudiantes();

        limpiarFormulario();

        alert("Estudiante eliminado correctamente.");

    }

}