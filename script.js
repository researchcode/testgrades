let estudiantes = [];  // Variable global para almacenar los estudiantes

// Función para cargar los datos desde el archivo .txt
function cargarDatos() {
  fetch('estudiantes.txt')  // Cambiamos la extensión por .txt
    .then(response => response.text())  // Leemos el archivo como texto
    .then(data => {
      estudiantes = JSON.parse(data);  // Parseamos el texto como JSON
      console.log("Datos cargados correctamente:", estudiantes);  // Verifica que los datos sean correctos
    })
    .catch(error => {
      console.error("Error al cargar el archivo .txt", error);
    });
}



// Llamamos a la función cargarDatos cuando se cargue la página
window.onload = cargarDatos;

// Función para consultar las notas
function consultarNotas() {
  const codigo = document.getElementById("codigo").value;
  const resultado = document.getElementById("resultado");

  // Buscar el estudiante por el código
  const estudiante = estudiantes.find(e => e.codigo === codigo);

  if (estudiante) {
    // Mostrar los datos del estudiante en tabla
    resultado.innerHTML = `
      <h3>Notas de ${estudiante.nombre}</h3>
      <table>
        <thead>
          <tr>
            <th>Ítem</th>
            <th>Porcentaje</th>
            <th>Nota sobre 20</th>            
            <th>Nota sobre 50</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Quices y tareas</td>
            <td>10%</td>
            <td>${estudiante.notas.quicesYtareas}</td>           
            <td>${calcularNotaSobre50(estudiante.notas.quicesYtareas, 10)}</td>
          </tr>
          <tr>
            <td>Talleres</td>
            <td>13%</td>
            <td>${promedioTalleres(estudiante.notas.talleres)}</td>            
            <td>${calcularNotaSobre50(promedioTalleres(estudiante.notas.talleres), 13)}</td>
          </tr>
          <tr>
            <td>Actividad BD</td>
            <td>4%</td>
            <td>${estudiante.notas.actividadBD}</td>           
            <td>${calcularNotaSobre50(estudiante.notas.actividadBD, 4)}</td>
          </tr>
          <tr>
            <td>Entrega 1</td>
            <td>13%</td>
            <td>${estudiante.notas.entrega1}</td>            
            <td>${calcularNotaSobre50(estudiante.notas.entrega1, 13)}</td>
          </tr>
          <tr>
            <td><strong>Total</strong></td>
            <td>40%</td>
            <td><strong>${calcularTotal(estudiante)}</strong></td>            
            <td class="verde"><strong>${Math.round(calcularNotaSobre50(calcularTotal(estudiante), 20))}</strong></td>
          </tr>
        </tbody>
      </table>
    `;
  } else {
    // Si no se encuentra al estudiante
    resultado.innerHTML = `<p>Estudiante no encontrado. Verifica el código ingresado.</p>`;
  }
}

// Función para calcular el promedio de los talleres
function promedioTalleres(talleres) {
  const total = talleres.reduce((sum, taller) => sum + taller, 0);
  return (total / talleres.length);
}

// Función para calcular la nota sobre 20
function calcularNotaSobre20(nota, porcentaje) {
  return ((nota * porcentaje) / 20).toFixed(2);
}

// Función para calcular la nota sobre 50
function calcularNotaSobre50(nota, notaBase) {
  return ((nota * 50) / notaBase).toFixed(2);
}

// Función para calcular el total de la
