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
            <td>${calcularNotaSobre20(estudiante.notas.quicesYtareas*0.10)}</td>           
            <td>${calcularNotaSobre50(estudiante.notas.quicesYtareas*0.10, 20)}</td>
          </tr>
          <tr>
            <td>Talleres</td>
            <td>13%</td>
            <td>${calcularNotaSobre20(promedioTalleres(estudiante.notas.talleres*0.13))}</td>            
            <td>${calcularNotaSobre50(estudiante.notas.talleres*0.13, 20)}</td>
          </tr>
          <tr>
            <td>Actividad BD</td>
            <td>4%</td>
            <td>${calcularNotaSobre20(estudiante.notas.actividadBD*0.04)}</td>           
            <td>${calcularNotaSobre50(estudiante.notas.actividadBD*0.04, 20)}</td>
          </tr>
          <tr>
            <td>Entrega 1</td>
            <td>13%</td>
            <td>${calcularNotaSobre20(estudiante.notas.entrega1*0.13)}</td>            
            <td>${calcularNotaSobre50(estudiante.notas.entrega1*0.13, 20)}</td>
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
function calcularNotaSobre20(nota) {
  return ((nota * 20) / 50).toFixed(2);
}

// Función para calcular la nota sobre 50
function calcularNotaSobre50(nota, notaBase) {
  return ((nota * 50) / notaBase).toFixed(2);
}


// Función para calcular el total de la nota
function calcularTotal(estudiante) {
  const quicesYtareas = estudiante.notas.quicesYtareas * 0.10;
  const talleres = promedioTalleres(estudiante.notas.talleres) * 0.13;
  const actividadBD = estudiante.notas.actividadBD * 0.04;
  const entrega1 = estudiante.notas.entrega1 * 0.13;
  return (quicesYtareas + talleres + actividadBD + entrega1).toFixed(2);
}



