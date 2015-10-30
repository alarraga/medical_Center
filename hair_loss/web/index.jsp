<%-- 
    Document   : index
    Author     : Alexis
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>UK HAIR - WELCOME</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/> 
    
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css" />

        <link href="css/font-awesome.css" rel="stylesheet">
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,400,600" rel="stylesheet">
    
        <link href="css/style.css" rel="stylesheet" type="text/css">
        <link href="css/pages/signin.css" rel="stylesheet" type="text/css">
        


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
			
                    <a class="brand" href="index.jsp">
			UK HAIR - WELCOME			
                    </a>		
			
                    <!--div class="nav-collapse">
                    	<ul class="nav pull-right">
                            <li class="">						
                                <a href="signup.jsp" class="">
                                    No tienes cuenta?
				</a>
                            </li>
                            <li class="">						
                                <a href="index.jsp" class="">
                                    <i class="icon-chevron-left"></i>
                                        Regresar
				</a>
						
                            </li>
			</ul>
				
                    </div--><!--/.nav-collapse -->	
		</div> <!-- /container -->		
            </div> <!-- /navbar-inner -->	
      </div> <!-- /navbar -->
        
      
     
<div class="account-container">
	
	<div class="content clearfix">
		
		<form id="formInicio" name="formInicio" method="POST" target="_self" action="Administracion">
		
			<h1>Login</h1>		
			
			<div class="login-fields">
				
                                <div class="textoNotificacionError"><%= request.getParameter("resp")!=null?request.getParameter("resp"):""%></div>
				<p>Please, write your credentials</p>
				
				<div class="field">
					<label for="username">Username</label>
					<input type="text" id="user" name="user" value="" placeholder="User" class="login username-field form-control" />
				</div> <!-- /field -->
				
				<div class="field">
					<label for="password">Password</label>
					<input type="password" id="passw" name="passw" value="" placeholder="Password" class="login password-field form-control"/>
				</div> <!-- /password -->
				
			</div> <!-- /login-fields -->
			
			<div class="login-actions">
				
				<span class="login-checkbox">
					<input id="Field" name="Field" type="checkbox" class="field login-checkbox" value="First Choice" tabindex="4" />
					<label class="choice" for="Field">Remember me</label>
				</span>
									
				<button class="button btn btn-success btn-large">Log in</button>
                                <input type="hidden" name="action" id="action" value="loginAutenticar" />
				
			</div> <!-- .actions -->
			
		</form>
		
            </div> <!-- /content -->
	
        </div> <!-- /account-container -->



        <!--<div class="login-extra">
                <a href="#">Reset Password</a>
        </div> <!-- /login-extra -->


        <script src="js/jquery-1.7.2.min.js"></script>
        <script src="js/bootstrap.js"></script>

        <script src="js/signin.js"></script>
        <script type="text/javascript" src="js/validator.js"></script>

    </body>

</html>

