let estudiantes=[];function consultarNotas(){const e=document.getElementById("codigo").value;var t=document.getElementById("resultado"),a=estudiantes.find(t=>t.codigo===e);t.innerHTML=a?`
  <h3>Notas corte 1 - 2025-1</h3>
  <p>${a.codigo}</p> 
  <table>
  <thead>
      <tr>
        <th>Quices y tareas</th>
        <th>Nota sobre 50</th>            
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Quiz 1</td>            
        <td>${a.notas.quicesYtareas[0]} puntos</td>                       
      </tr>
      <tr>
        <td>Tarea HTML, CSS, JS</td>            
        <td>${a.notas.quicesYtareas[1]} puntos</td>                       
      </tr>          
      <tr>
        <td><strong>Total</strong></td>            
        <td>${Math.round((a.notas.quicesYtareas[0]+a.notas.quicesYtareas[1])/2)}</td>                       
      </tr>
    </tbody>
  </table>
  <hr>     
  <table>
  <thead>
      <tr>
        <th>Talleres</th>
        <th>Nota sobre 50</th>            
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Taller 1</td>            
        <td>${a.notas.talleres[0]} puntos</td>                       
      </tr>
      <tr>
        <td>Taller 2</td>            
        <td>${a.notas.talleres[1]} puntos</td>                       
      </tr>
      <tr>
        <td>Taller 3</td>            
        <td>${a.notas.talleres[2]} puntos</td>                       
      </tr>
      <tr>
        <td><strong>Total</strong></td>            
        <td>${Math.round((a.notas.talleres[0]+a.notas.talleres[1]+a.notas.talleres[2])/3)}</td>                       
      </tr>
    </tbody>
  </table>
  <hr>

  <table>
  <thead>
      <tr>
        <th>Entrega 1 - Proyecto final</th>
        <th>Nota sobre 50</th>            
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Presentación</td>            
        <td>${a.notas.entrega1[0]}</td>                       
      </tr>
      <tr>
        <td>Documento</td>            
        <td>${a.notas.entrega1[1]}</td>                       
      </tr>
      <tr>
        <td>Foro</td>            
        <td>${a.notas.entrega1[2]}</td>                       
      </tr>
      <tr>
        <td><strong>Total</strong></td>            
        <td>${a.notas.entrega1[0]+a.notas.entrega1[1]+a.notas.entrega1[2]}</td>                       
      </tr>
    </tbody>
  </table>
  <hr>
  <br>
  <p>La nota que está en <span class="verde">verde</span> es la que se subirá al sistema</p>
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
        <td>${(.1*promedioQuicesTareas(a.notas.quicesYtareas)).toFixed(2)}</td>           
        <td>${calcularNotaSobre50(.1*promedioQuicesTareas(a.notas.quicesYtareas),20)}</td>
      </tr>
      <tr>
        <td>Talleres</td>
        <td>13%</td>
        <td>${(.13*promedioTalleres(a.notas.talleres)).toFixed(2)}</td>            
        <td>${calcularNotaSobre50(.13*promedioTalleres(a.notas.talleres),20)}</td>
      </tr>
      
      <tr>
        <td>Actividad BD</td>
        <td>4%</td>
        <td>${(.04*a.notas.actividadBD).toFixed(2)}</td>           
        <td>${calcularNotaSobre50(.04*a.notas.actividadBD,20)}</td>
      </tr>
      <tr>
        <td>Entrega 1</td>
        <td>13%</td>
        <td>${(.13*(a.notas.entrega1[0]+a.notas.entrega1[1]+a.notas.entrega1[2])).toFixed(2)}</td>            
        <td>${calcularNotaSobre50(.13*(a.notas.entrega1[0]+a.notas.entrega1[1]+a.notas.entrega1[2]),20)}</td>
      </tr>
      <tr>
        <td><strong>Total</strong></td>
        <td>40%</td>
        <td><strong>${calcularTotal(a)}</strong></td>            
        <td class="verde"><strong>${Math.round(calcularNotaSobre50(calcularTotal(a),20))}</strong></td>
      </tr>          
    </tbody>
  </table>
  <hr>
  <br>
  

  
`:"<p>Estudiante no encontrado. Verifica el código ingresado.</p>"}function promedioTalleres(t){return t.reduce((t,e)=>t+e,0)/t.length}function promedioQuicesTareas(t){return t.reduce((t,e)=>t+e,0)/t.length}function calcularNotaSobre50(t,e){return(50*t/e).toFixed(2)}function calcularTotal(t){return(.1*promedioQuicesTareas(t.notas.quicesYtareas)+.13*promedioTalleres(t.notas.talleres)+.04*t.notas.actividadBD+.13*(t.notas.entrega1[0]+t.notas.entrega1[1]+t.notas.entrega1[2])).toFixed(2)}function exportarAExcel(){const e=document.getElementById("codigo").value;var t,a,r=estudiantes.find(t=>t.codigo===e);r?(t=[{"Código":r.codigo,"Taller 1":r.notas.talleres[0],"Taller 2":r.notas.talleres[1],"Taller 3":r.notas.talleres[2],"Promedio Talleres":promedioTalleres(r.notas.talleres),"Entrega 1 - Presentación":r.notas.entrega1[0],"Entrega 1 - Documento":r.notas.entrega1[1],"Entrega 1 - Foro":r.notas.entrega1[2],"Total Entrega 1":r.notas.entrega1[0]+r.notas.entrega1[1]+r.notas.entrega1[2],"Quiz 1":estudiantes.notas.quicesYtareas[0],"Tarea HTML, CSS, JS":estudiantes.notas.quicesYtareas[1],"Total Quices y Tareas (sobre 50)":calcularNotaSobre50(.1*promedioQuicesTareas(r.notas.quicesYtareas),20),"Talleres (sobre 50)":calcularNotaSobre50(.13*promedioTalleres(r.notas.talleres),20),"Actividad BD (sobre 50)":calcularNotaSobre50(.04*r.notas.actividadBD,20),"Entrega 1 (sobre 50)":calcularNotaSobre50(.13*(r.notas.entrega1[0]+r.notas.entrega1[1]+r.notas.entrega1[2]),20),"Total (sobre 50)":Math.round(calcularNotaSobre50(calcularTotal(r),20))}],(t=XLSX.utils.json_to_sheet(t)).L2.s={fill:{fgColor:{rgb:"00FF00"}},font:{bold:!0},alignment:{horizontal:"center",vertical:"center"}},a=XLSX.utils.book_new(),XLSX.utils.book_append_sheet(a,t,"Notas del Estudiante"),XLSX.writeFile(a,r.codigo+"_Notas.xlsx")):alert("Estudiante no encontrado. Verifica el código ingresado.")}estudiantes=[{codigo:"L222707",notas:{quicesYtareas:[32.6,50],talleres:[50,50,50],actividadBD:50,entrega1:[13,14,15]}}],document.getElementById("btnExportar").addEventListener("click",exportarAExcel);
