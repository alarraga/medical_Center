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

function cargarPerfil(iduser)
{
    //document.getElementById("empresas").innerHTML = "<img src='css/images/load.gif'>";
    //var iduser = document.getElementById("idruta").value;
    
    var ajax = AJAX();
    ajax.open("POST","Administracion?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                var elem = resp.split('%');
                document.getElementById("usuario").value=elem[0];
                document.getElementById("nombres").value=elem[1];
                document.getElementById("apellidos").value=elem[2];
                document.getElementById("email").value=elem[3];  
                document.getElementById("idperfil").value=elem[4];   
                document.getElementById("id").value=elem[5];
                document.getElementById("contrasena").value=elem[6];  
                document.getElementById("contrasena2").value=elem[6];   
                document.getElementById("telefono").value=elem[7]; 
                document.getElementById("direccion").value=elem[8];
                
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=getusuario&iduser="+iduser);    
}




function cargarListaPerfiles(){
    var ajax = AJAX();
    ajax.open("POST","Administracion?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
               
                document.getElementById("outputPerfiles").innerHTML = resp;
                
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=getperfiles");   
}


function cargarUsuarioPerfiles(id){
    var ajax = AJAX();
    ajax.open("POST","Administracion?",true);
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                document.getElementById("outputPerfiles1").innerHTML = resp;
                cargarUser(id);
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=getperfilesEdit");   
}

function cargarUser(iduser)
{
    //document.getElementById("empresas").innerHTML = "<img src='css/images/load.gif'>";
    //var iduser = document.getElementById("idruta").value;
    alert("cvcvc");
    var ajax = AJAX();
    ajax.open("POST","Administracion?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                
                var resp = ajax.responseText;
                var elem = resp.split('%');
                document.getElementById("user_edit").value=elem[0];
                document.getElementById("nombres_edit").value=elem[1];
                document.getElementById("apellidos_edit").value=elem[2];
                document.getElementById("email_edit").value=elem[3];  
                document.getElementById("perfil_edit").value=elem[4];   
                document.getElementById("id_edit").value=elem[5];
                document.getElementById("pass_edit").value=elem[6];     
                document.getElementById("telefono_edit").value=elem[7]; 
                document.getElementById("direccion_edit").value=elem[8];
                
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=getusuario&iduser="+iduser);    
}

function updateRecordUsuario()
{
    var nombres = document.getElementById("nombres_edit").value;
    var apellidos= document.getElementById("apellidos_edit").value;
    var user = document.getElementById("user_edit").value;
    var pass= document.getElementsByName("pass_edit").value;    
    var fono = document.getElementById("telefono_edit").value;  
    var dir =document.getElementById("direccion_edit").value;   
    var email= document.getElementById("email_edit").value;   
    var id = document.getElementById("id_edit").value;  
                
    var ajax = AJAX();
    ajax.open("POST","Administracion?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                
                if(resp=="1"){
                    alert("Successful Update!");
                    location.reload();
                }
                   
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=editUser&nombres="+nombres+"&apellidos="+apellidos+"&user="+user+"&pass="+pass+"&id="+id+"&fono="+fono+"&dir="+dir+"&email="+email);       
    
}


function crearUsuario(){
    
    var nombres = document.getElementById("nombres_create").value;
    var apellidos= document.getElementById("apellidos_create").value;
    var user = document.getElementById("user_create").value;
    var pass= document.getElementById("pass_create").value;                
    var perfil = document.getElementById("perfil_create").value;  
    var fono = document.getElementById("telefono_create").value;  
    var dir =document.getElementById("direccion_create").value;   
    var email= document.getElementById("email_create").value;   
    
    var ajax = AJAX();
    ajax.open("POST","Administracion?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                
                if(resp=="1"){
                    alert("Operation successfull!");
                    location.reload();
                }else
                    alert("Ingreso incorrecto de datos, intenta de nuevo!");
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=addUsuario&nombres="+nombres+"&apellidos="+apellidos+"&user="+user+"&pass="+pass+"&idperfil="+perfil+"&fono="+fono+"&dir="+dir+"&email="+email);       
    
}



function deleteRecordUsuario(){
    
    var id = document.getElementById("id_delete").value;  
                
    var ajax = AJAX();
    ajax.open("POST","Administracion?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                
                if(resp=="1"){
                    alert("Operation successful!");
                    location.reload();
                }
                   
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=deleteusuario&id="+id);       
}



function cargarAllUsers()
{
    var ajax = AJAX();
    ajax.open("POST","Administracion?",true);
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                var resp = ajax.responseText;
                if(resp!="")
                {
                    var elem = resp.split('%');
                    var HTML = "<table id='example' class='display table table-striped table-bordered' ><thead><tr>";
                    HTML += "<th>Forenames</th><th>Surnames</th><th>User</th><th>Date of Registration</th>"+
                            "<th class='td-actions'></th><th class='td-actions'></th></th></tr></thead><tbody>";

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

                        HTML += "<td><p data-placement='top' data-toggle='tooltip' title='Edit'><button class='btn btn-primary btn-xs' data-title='Edit' data-toggle='modal' data-target='#edit' onclick='cargarUsuarioPerfiles("+lista[lista.length-1]+")' >Edit</button></p></td>"+
                                "<td><p data-placement='top' data-toggle='tooltip' title='Delete'><button class='btn btn-danger btn-xs' data-title='Delete' data-toggle='modal' data-target='#delete' onclick=javascript:document.getElementById('id_delete').value=('"+lista[lista.length-1]+"'); >Delete</button></p></td>";

                    }
                    HTML += "</tbody></table>";
                    document.getElementById("outputDiv").innerHTML = HTML;
                }
            }   
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("action=getAllusers");    
}
