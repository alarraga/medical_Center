/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function AJAX()
{
	var xRequest=null;
	if(window.XMLHttpRequest){
		xRequest=new XMLHttpRequest();
	}
	else if(typeof ActiveXObject != "undefined"){
           	xRequest=new ActiveXObject("Microsoft.XMLHTTP");
	}
        
	return xRequest;  
}

function cargarCita(id)
{
    //document.getElementById("empresas").innerHTML = "<img src='css/images/load.gif'>";
    //var iduser = document.getElementById("idruta").value;
    
    var ajax = AJAX();
    ajax.open("POST","Citas?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                var elem = resp.split('%');
                
                document.getElementById("fechaCita_edit").value=elem[0];
                document.getElementById("hora_edit").value=elem[1];
                document.getElementById("descripcion_edit").value=elem[2];
                document.getElementById("cedula_edit").value=elem[3];                  
                document.getElementById("nombres_edit").value=elem[4]; 
                document.getElementById("apellidos_edit").value=elem[5];  
                document.getElementById("idcita_edit").value=elem[6];  
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=getcita&id="+id);    
}


function cargarAllCitas()
{
    var ajax = AJAX();
    ajax.open("POST","Citas?",true);
    
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                if(resp!=""){
                    var elem = resp.split('%');
                    
                    var HTML = "<table id='example' class='display table table-striped table-bordered' ><thead><tr>";
                    HTML += "<th>Day</th><th>Hour</th><th>GP</th><th>Forenames</th><th>Surnames</th><th>Description</th>"+
                            "<th class='td-actions'></th><th class='td-actions'></th></tr></thead><tbody>";

                    for(j=0;j<elem.length;j++)
                    {
                        HTML += "<tr>";
                        var lista = elem[j].split(',');
                        for(i=0;i<lista.length-1;i++)
                        {
                            HTML += "<td>"+lista[i]+"</td>";
                        }
                       // HTML += "<td class='td-actions'> <a href='modify/"+lista[lista.length-1]+
                       //     "' class='btn btn-small btn-success'><i class='btn-icon-only icon-ok'></i></a>"+
                       //     "<a href='delete/"+lista[lista.length-1]+"' class='btn btn-danger btn-small'>"+
                       //     "<i class='btn-icon-only icon-remove'></i></a></td></tr>";

                       //HTML += "<td class='td-actions'><a href='' class='editor_edit btn btn-small btn-success'><i class='btn-icon-only icon-ok'></i></a>"+
                       //    "<a href='' class='editor_remove btn btn-danger btn-small'><i class='btn-icon-only icon-remove'></i></a></td></tr>";

                        HTML += "<td><p data-placement='top' data-toggle='tooltip' title='Edit'><button class='btn btn-primary btn-xs' data-title='Edit' data-toggle='modal' data-target='#edit' onclick='cargarCita("+lista[lista.length-1]+")' >Edit</button></p></td>"+
                                "<td><p data-placement='top' data-toggle='tooltip' title='Delete'><button class='btn btn-danger btn-xs' data-title='Delete' data-toggle='modal' data-target='#delete' onclick=javascript:document.getElementById('idcita_delete').value=('"+lista[lista.length-1]+"'); >Delete</button></p></td>";
                    }
                    HTML += "</tbody></table>";
                    document.getElementById("outputDiv").innerHTML = HTML;
                }
                
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=getcitas");    
}


function updateRecordCita(){
    
    var hora= document.getElementById("hora_edit").value;   
    var dia= document.getElementById("fechaCita_edit").value;   
    var desc = document.getElementById("descripcion_edit").value;  
    var id = document.getElementById("idcita_edit").value;  
                
    var ajax = AJAX();
    ajax.open("POST","Citas?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                
                if(resp=="1"){
                    alert("Update successfull!");
                    location.reload();
                }
                   
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=editcita&id="+id+"&desc="+desc+"&dia="+dia+"&hora="+hora);       
}


function deleteRecordCita(){
    
    var id = document.getElementById("idcita_delete").value;  
                
    var ajax = AJAX();
    ajax.open("POST","Citas?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                
                if(resp=="1"){
                    alert("Operation successfull!");
                    location.reload();
                }
                   
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=deletecita&id="+id);       
}



function cargarPacienteByCed()
{
    //document.getElementById("empresas").innerHTML = "<img src='css/images/load.gif'>";
    //var iduser = document.getElementById("idruta").value;
    
    if(document.getElementById("BTN1").disabled == true){
        $("#tabla_create tr").slice(-7).remove();
        document.getElementById("BTN1").disabled = false;
        document.getElementById('nombres_create').disabled = true;
        document.getElementById('apellidos_create').disabled = true;
        document.getElementById('cedula_create').disabled = true;
    }
        
    
    var ced = document.getElementById("paciente_buscar").value;
    var ajax = AJAX();
    ajax.open("POST","Citas?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                
                if(resp!="")
                {
                    var elem = resp.split('%');               
                    document.getElementById("nombres_create").value=elem[0];
                    document.getElementById("apellidos_create").value=elem[1];
                    document.getElementById("cedula_create").value=elem[2];
                    document.getElementById("id_pac_create").value=elem[3];
                }
                else
                    document.getElementById("noDatos").innerHTML = "<div id='NoPaciente' class='textoNotificacionError'>No existe paciente</div>";
            }   
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=getpacienteByCed&ced="+ced);    
}


function llenarPaciente(){
    var HTML = "<tr class='add_info'><th>Gender:</th><td>Female <input type='radio' name='genero_create'>Male"+
               "<input type='radio' name='genero_create'></td></tr><tr class='add_info'><th>Date of Birth:</th>"+
               "<td><input type='text' type='text' class='form-control' id='fechaNac_create' maxlength='10'>"+
               "<span class='add-on'><i class='icon-th'></i></span></td></tr><script type='text/javascript'>"+
               "$('#fechaNac_create').datepicker({});</script><tr class='add_info'><th>Phone:</th><td><input "+
               "id='telefono_create' class='form-control' type='text' maxlength='10'></td></tr><tr class='add_info'><th>Address:</th>"+
               "<td><textarea rows='2' id='direccion_create' class='form-control' maxlength='200'></textarea></td></tr>"+
               "<tr class='add_info'><th>City:</th><td><input id='ciudad_create' class='form-control' type='text' maxlength='20'></td>"+
               "</tr><tr class='add_info'><th>Email:</th><td><input id='email_create' class='form-control' type='text' maxlength='100'></td>"+
               "</tr><tr class='add_info'><th>GP Address:</th><td><input id='sangre_create' class='form-control' type='text' maxlength='2'>"+
               "</td></tr>";
    
    $("#tabla_create tr:last").after(HTML);
    document.getElementById('nombres_create').disabled = false;
    document.getElementById('apellidos_create').disabled = false;
    document.getElementById('cedula_create').disabled = false;
    document.getElementById("noDatos").innerHTML = "";// mensaje de no existe paciente
    document.getElementById('paciente_buscar').value="";
    document.getElementById('paciente_buscar').value="";
    document.getElementById("BTN1").disabled = true;    
}


function crearPacienteCita(){
    
    var nombres = document.getElementById("nombres_create").value;
    var apellidos= document.getElementById("apellidos_create").value;
    var ced = document.getElementById("cedula_create").value;
    var genero= $('input[name="genero_create"]:checked').val();               
    var fecha = document.getElementById("fechaNac_create").value;  
    var fono = document.getElementById("telefono_create").value;  
    var dir =document.getElementById("direccion_create").value;   
    var ciudad= document.getElementById("ciudad_create").value;   
    var email= document.getElementById("email_create").value;   
    var sangre = document.getElementById("sangre_create").value; 
    
    var ajax = AJAX();
    ajax.open("POST","Pacientes?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                if(resp!="0"){
                    crearCita(resp);
                }else
                    alert("Incorrect data of the appointment, try again!");
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=crearpaciente&nombres="+nombres+"&apellidos="+apellidos+"&ced="+ced+"&genero="+genero+"&fecha="+fecha+"&fono="+fono+"&dir="+dir+"&ciudad="+ciudad+"&email="+email+"&sangre="+sangre);       
    
}

function crearCitaPaciente(){
    var idpac = document.getElementById("id_pac_create").value;
    
    if(idpac != "")
        crearCita(idpac);
    else
        crearPacienteCita();  
}

function crearCita(id){   
    var hora = document.getElementById("hora_create").value;
    var dia= document.getElementById("fechaCita_create").value;
    var paciente = id;
    var descripcion= document.getElementById("descripcion_create").value;                
    
    var ajax = AJAX();
    ajax.open("POST","Citas?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                if(resp=="1"){
                    alert("Operation successfull!");
                    location.reload();
                }else
                    alert("Incorrect data of the appointment, try again!");
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=crearcita&hora="+hora+"&dia="+dia+"&paciente="+paciente+"&desc="+descripcion); 
}