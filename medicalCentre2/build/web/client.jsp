<%-- 
    Document   : paciente
    Author     : Alexis
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
  
    <%
    String nombreusuario = "", apellidousuario="", nick="", perfil="";
    int iduser=0;
    try{
        HttpSession sesion = request.getSession(true);
        //perfil = sesion.getAttribute("perfilSesion").toString();
        nombreusuario = sesion.getAttribute("nombreUsuarioSesion").toString();
        apellidousuario = sesion.getAttribute("apellidosUsuarioSesion").toString();
        nick = sesion.getAttribute("nickUsuarioSesion").toString();
        iduser= Integer.parseInt(sesion.getAttribute("IdUsuarioSesion").toString());
    }catch(Exception e){ nombreusuario = ""; }
    if( apellidousuario.equals("") ){ 
%>
        <jsp:forward page="sessionExpirada.jsp"></jsp:forward>
<%  } %>

<script type="text/javascript">
    var d = new Date();
    var dia     = d.getDate();
    var mes     = d.getMonth()+1;
    var anio    = d.getFullYear();
    var hora    = d.getHours();
    var minuto  = d.getMinutes();
    var segundo = d.getSeconds();
    if( dia < 10 ){    dia = "0"+dia; }
    if( mes < 10 ){    mes = "0"+mes; }
    if( hora < 10 ){   hora = "0"+hora; }
    if( minuto < 10 ){ minuto = "0"+minuto; }
    var fechahora = "Guayaquil, "+dia+"/"+mes+"/"+anio+" "+hora+":"+minuto+":"+segundo;
</script>

    <head>
        <meta charset="utf-8">
        <title>UK HAIR - WELCOME</title>

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta name="apple-mobile-web-app-capable" content="yes">    
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/bootstrap-responsive.min.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet">

        <link href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,400,600" rel="stylesheet">
        <link href="css/font-awesome.css" rel="stylesheet">
        <link href="css/pages/dashboard.css" rel="stylesheet">
        <script src="js/jquery-1.7.2.min.js"></script>
        <script src="js/bootstrap.js"></script>
        <script src="js/base.js"></script>
        
        <link href="css/metro/blue/jtable.css" rel="stylesheet" type="text/css" />
        <link href="css/jquery-ui-1.10.3.custom.css" rel="stylesheet" type="text/css" />
        <!-- Include jTable script file. -->
        <script src="js/jquery-1.8.2.js" type="text/javascript"></script>
        <script src="js/jquery-ui-1.10.3.custom.js" type="text/javascript"></script>
        <script src="js/jquery.jtable.js" type="text/javascript"></script>
        <script type="text/javascript">
	$(document).ready(function() {
		$('#LeadsTableContainer').jtable({
			title : 'Leads List',
                        paging: true, //Set paging enabled
                        pageSize: 10,
                        sorting: true, //Enable sorting
                        defaultSorting: 'Name ASC', //Sort by Name by default
                        actions : {
                                    listAction: 'Clients?action=list',
                                    createAction:'Clients?action=create',
                                    updateAction: 'Clients?action=update',
                                    deleteAction: 'Clients?action=delete'                      
                        },
			fields : {
				id : {
					title : 'Id',
					width : '5%',
					key : true,
					list : true,
					create : true
				},
                                date : {
					title : 'Date',
					width : '5%',
					edit : true
				},
                                source : {
					title : 'Source',
					width : '10%',
					edit : true
				},
                                name : {
					title : 'Name',
					width : '10%',
					edit : true
				},
                                number : {
					title : 'Number',
					width : '10%',
					edit : true
				},
                                email : {
					title : 'Email',
					width : '20%',
					edit : true
				},
                                location : {
					title : 'Location',
					width : '10%',
					edit : true
				},
                                notes2 : {
					title : 'Time to Call',
					width : '20%',
					edit : true
				},
                                notes : {
					title : 'Notes',
					width : '30%',
					edit : true
				},
                                
				outcome : {
					title : 'Outcome',
					width : '30%',
					edit : true
				},
				grafts : {
					title : 'Grafts',
					width : '30%',
					edit : true
				},
				price : {
					title : 'Price',
					width : '20%',
					edit : true
				},
                                status : {
					title : 'Status',
					width : '20%',
					edit : true
				}
			}
		});
                
                //Re-load records when user click 'load records' button.
                $('#LoadRecordsButton').click(function (e) {
                    e.preventDefault();
                    $('#LeadsTableContainer').jtable('load', {
                        name: $('#name').val()                        
                    });
                });

                //Load all records when page is first shown
                $('#LoadRecordsButton').click();

		//$('#LeadsTableContainer').jtable('load');
	});
        </script>

    </head>

    <body>
        <div class="navbar navbar-fixed-top">
            <div class="navbar-inner">
                    <div class="container">
                            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                            </a>

                            <a class="brand" href="profile.jsp">
                                    UK HAIR				
                            </a>		

                            <div class="nav-collapse">
                                    <ul class="nav pull-right">
                                            <li class="dropdown">						
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                                            <i class="icon-user"></i> 
                                                               <%=perfil%>: <%=nick%>
                                                            <b class="caret"></b>
                                                    </a>

                                                    <ul class="dropdown-menu">
                                                            <li><a href="/medicalCentre2/Administracion?action=saliraplicacion">Log out</a></li>
                                                    </ul>						
                                            </li>
                                    </ul>

                                    <!--<form class="navbar-search pull-right">
                                            <input type="text" class="search-query" placeholder="Search">
                                    </form>-->

                            </div><!--/.nav-collapse -->
                    </div> <!-- /container -->
            </div> <!-- /navbar-inner -->
    </div> <!-- /navbar -->
    
    
        <div class="subnavbar">
            <div class="subnavbar-inner">
                    <div class="container">
                            <ul class="mainnav">
                                    <li class="active">					
                                            <a href="client.jsp">
                                                    <i class="icon-bar-chart"></i>
                                                    <span>Clients</span>
                                            </a>  									
                                    </li>
                            </ul>
                    </div> <!-- /container -->
            </div> <!-- /subnavbar-inner -->
    </div> <!-- /subnavbar -->

   
    <div class="main">
        <div class="main-inner">
            <div class="container">
                <div class="row">
                    <div class="span_1">
                        
                        <form action="UploadFile" method="post" enctype="multipart/form-data">
                            <input type="file" name="file" /> 
                            <input type="submit" value="upload" />
                        </form>
          <!-- /widget --> 
                  </div>
                <!-- /span6 --> 
                </div>
      <!-- /row --> 
            </div>
            <!-- /container --> 
          </div>
          <!-- /main-inner --> 
        </div>
        <!-- /main -->
        <div style="margin-right: 5%; margin-left: 5%; text-align: center;">
            <div class="filtering">
                <form>
                    Name: <input type="text" name="name" id="name" />
                    <button type="submit" id="LoadRecordsButton">Load records</button>
                </form>
            </div>

            <div id="LeadsTableContainer"></div>
	</div>
        
    </body>
</html>




