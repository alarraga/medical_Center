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

function cargarPaciente(id)
{
    //document.getElementById("empresas").innerHTML = "<img src='css/images/load.gif'>";
    //var iduser = document.getElementById("idruta").value;
    
    var ajax = AJAX();
    ajax.open("POST","Pacientes?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                var elem = resp.split('%');               
                
                document.getElementById("nombres_edit").value=elem[0];
                document.getElementById("apellidos_edit").value=elem[1];
                document.getElementById("cedula_edit").value=elem[2];
                jQuery("input[value='"+elem[3]+"']").attr('checked', true);
                document.getElementById("fechaNac_edit").value=elem[4];  
                document.getElementById("telefono_edit").value=elem[5];  
                document.getElementById("direccion_edit").value=elem[6];   
                document.getElementById("ciudad_edit").value=elem[7];   
                document.getElementById("email_edit").value=elem[8];   
                document.getElementById("sangre_edit").value=elem[9];  
                document.getElementById("id_edit").value=elem[10];  
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=getpaciente&id="+id);    
}


function cargarAnalisis(id)
{
    //document.getElementById("empresas").innerHTML = "<img src='css/images/load.gif'>";
    //var iduser = document.getElementById("idruta").value;
    
    var ajax = AJAX();
    ajax.open("POST","Pacientes?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                var elem = resp.split('%');               
                
                document.getElementById("dia_edit").value=elem[0];
                document.getElementById("receta_edit").value=elem[1];
                document.getElementById("diagnostico_edit").value=elem[2];
                document.getElementById("idanalisis_edit").value=elem[3];  
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=getanalisis&id="+id);    
}


function cargarAllClients()
{
    
    var ajax = AJAX();
    ajax.open("POST","Clients?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                if(resp!=""){
                    var elem = resp.split('%');

                    var HTML = "<table id='example' class='display table table-striped table-bordered' ><thead><tr>";
                    HTML += "<th>GP</th><th>Forenames</th><th>Surnames</th><th>Date of Registration</th>"+
                            "<th class='td-actions'></th><th class='td-actions'></th></th>";
                    if(perfil!="Asistente")   
                        HTML += "<th class='td-actions'></th></tr></thead><tbody>";
                    else HTML += "</tr></thead><tbody>";

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

                        HTML += "<td><p data-placement='top' data-toggle='tooltip' title='Edit'><button class='btn btn-primary btn-xs' data-title='Edit' data-toggle='modal' data-target='#edit' onclick='cargarPaciente("+lista[lista.length-1]+")' >Edit</button></p></td>"+
                                "<td><p data-placement='top' data-toggle='tooltip' title='Delete'><button class='btn btn-danger btn-xs' data-title='Delete' data-toggle='modal' data-target='#delete' onclick=javascript:document.getElementById('id_delete').value=('"+lista[lista.length-1]+"'); >Delete</button></p></td>";

                        HTML += "<td><a class='btn btn-large btn-success' href='medicalHistory.jsp?id="+lista[lista.length-1]+"'><i class='btn-icon-only icon-zoom-in'> </i></a></td>";

                    }
                    HTML += "</tbody></table>";
                    document.getElementById("outputDiv").innerHTML = HTML;
                }
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=getclientes");    
}


function updateRecordPaciente(){
    
    var nombres = document.getElementById("nombres_edit").value;
    var apellidos= document.getElementById("apellidos_edit").value;
    var ced = document.getElementById("cedula_edit").value;                
    var genero= $('input[name="genero_edit"]:checked').val();               
    var fecha = document.getElementById("fechaNac_edit").value;  
    var fono = document.getElementById("telefono_edit").value;  
    var dir =document.getElementById("direccion_edit").value;   
    var ciudad= document.getElementById("ciudad_edit").value;   
    var email= document.getElementById("email_edit").value;   
    var sangre = document.getElementById("sangre_edit").value;  
    var id = document.getElementById("id_edit").value;  
                
    var ajax = AJAX();
    ajax.open("POST","Pacientes?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                
                if(resp=="1"){
                    alert("Information Updated!");
                    location.reload();
                }
                   
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=editpaciente&id="+id+"&nombres="+nombres+"&apellidos="+apellidos+"&ced="+ced+"&genero="+genero+"&fecha="+fecha+"&fono="+fono+"&dir="+dir+"&ciudad="+ciudad+"&email="+email+"&sangre="+sangre);       
}


function deleteRecordPaciente(){
    
    var id = document.getElementById("id_delete").value;  
                
    var ajax = AJAX();
    ajax.open("POST","Pacientes?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                
                if(resp=="1"){
                    alert("Information deleted!");
                    location.reload();
                }
                   
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=deletepaciente&id="+id);       
}


function crearPaciente(){
    
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
                    alert("Successful!");
                    location.reload();
                }else
                    alert("Try Again!");
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=crearpaciente&nombres="+nombres+"&apellidos="+apellidos+"&ced="+ced+"&genero="+genero+"&fecha="+fecha+"&fono="+fono+"&dir="+dir+"&ciudad="+ciudad+"&email="+email+"&sangre="+sangre);       
    
}


function cargaridHC(){
    var idHC = document.getElementById("idhc").value;
    
}

function crearAnalisis(id)
{
    var receta = document.getElementById("receta_create").value;
    var dia= document.getElementById("dia_create").value;
    var diagnostico = document.getElementById("diagnostico_create").value;
    
    var ajax = AJAX();
    ajax.open("POST","Pacientes?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                
                if(resp=="1"){
                    alert("Operacion exitosa!");
                    location.reload();
                }else
                    alert("Ingreso incorrecto de datos, intenta de nuevo!");
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=crearanalisis&dia="+dia+"&receta="+receta+"&diagnostico="+diagnostico+"&id="+id);       
}



function mostrarDetallesHCPaciente(id)
{
    //document.getElementById("empresas").innerHTML = "<img src='css/images/load.gif'>";
    //var iduser = document.getElementById("idruta").value;
    var ajax = AJAX();
    ajax.open("POST","Pacientes?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                var elem = resp.split('%');               
                
                document.getElementById("nombres").value=elem[0];
                document.getElementById("apellidos").value=elem[1];
                document.getElementById("genero").value=elem[2];                
                document.getElementById("fechaNac").value=elem[3];   
                document.getElementById("sangre").value=elem[4];  
                //document.getElementById("otros").value=elem[5];
                document.getElementById("idpaciente").value=elem[6];
                document.getElementById("idhc").value=elem[7];    
                                
                cargarAllAnalisis(elem[7]);
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=gethistoriaclinica&idpac="+id);    
}


function updateAnalisisMedico()
{
    var dia = document.getElementById("dia_edit").value;
    var receta= document.getElementById("receta_edit").value;
    var diagnostico = document.getElementById("diagnostico_edit").value;
    var id = document.getElementById("idanalisis_edit").value;  
                
    var ajax = AJAX();
    ajax.open("POST","Pacientes?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                
                if(resp=="1"){
                    alert("Actualizacion exitosa!");
                    location.reload();
                }
                   
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=editanalisis&id="+id+"&dia="+dia+"&receta="+receta+"&diagnostico="+diagnostico);       
}


function cargarAllAnalisis(id)
{
    var ajax = AJAX();
    ajax.open("POST","Pacientes?",true);
    
    ajax.onreadystatechange = function()
    {
        if(ajax.readyState == 4){
            if(ajax.status == 200)
            {
                var resp = ajax.responseText;
                
                if(resp!="")
                {
                    var elem = resp.split('%');
                    var HTML = "<table id='example' class='display table table-striped table-bordered' ><thead><tr>";
                
                    HTML += "<th>Receta</th><th>Diagnostico</th><th>Dia</th>"+
                            "<th class='td-actions'></th><th class='td-actions'></th><th class='td-actions'></th><tbody>";

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

                        HTML += "<td><p data-placement='top' data-toggle='tooltip' title='Edit'><button class='btn btn-primary btn-xs' data-title='Edit' data-toggle='modal' data-target='#edit' onclick='cargarAnalisis("+lista[lista.length-1]+")' >Editar</button></p></td>"+
                                "<td><p data-placement='top' data-toggle='tooltip' title='Imprimir'><button class='btn btn-primary btn-xs' data-title='Imprimir' onclick='imprimirReceta("+lista[lista.length-1]+")' >Imprimir Receta</button></p></td>"+
                                "<td><p data-placement='top' data-toggle='tooltip' title='Imprimir'><button class='btn btn-primary btn-xs' data-title='Imprimir' onclick='imprimirCertificado("+lista[lista.length-1]+")' >Certificado</button></p></td>";
                                
                    }
                    HTML += "</tbody></table>";
                    document.getElementById("outputDiv2").innerHTML = HTML;
                }
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=getallanalisis&id="+id);    
}


function imprimirReceta(id)
{
    var ajax = AJAX();
    ajax.open("POST","Pacientes?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                if(resp!="0"){
                    window.open("./pdf/"+resp);
                }
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=getreceta&idanalisis="+id);    
}

function imprimirCertificado(id)
{
    var ajax = AJAX();
    ajax.open("POST","Pacientes?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                if(resp!="0"){
                    window.open("./pdf/"+resp);
                }
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=getcertificado&idanalisis="+id);    
}

