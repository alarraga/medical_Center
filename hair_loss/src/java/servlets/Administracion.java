/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import helper.userHelper;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import jxl.*;
import jxl.read.biff.BiffException;
import model.User;

/**
 *
 * @author ale
 */
public class Administracion extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, BiffException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        HttpSession sesion = ((HttpServletRequest)request).getSession();
        RequestDispatcher dispatcher = null;
        
        //variables
        String action = "", user="", password="", file="",nombres="", apellidos="", estado="";
        String idperfil_str="", idusuario_str="", email="", telefono="", direccion="";
        int idperfil=0, idusuario=0, modificaciones=0;
        
        //interfaces y objetos
        //usuarioInterface U = new usuarioService();
        User Us = new User();
        userHelper userhelp= new userHelper();
        
        try{ 
            action = request.getParameter("action"); 
        }catch(Exception e){ 
            action=""; 
        } 
        
        if( action.equals("loginAutenticar") )
        {
            user = request.getParameter("user");
            password = request.getParameter("passw");            
            
            try{ Us = userhelp.existeUser(user, password); }catch(Exception e){ Us = null; }
            try{
                if ( Us != null )
                {
                    //pe= userhelp.getPerfil(Us.getIdPerfil());
                    sesion.setAttribute("IdUsuarioSesion", Us.getId() );
                    sesion.setAttribute("nickUsuarioSesion", Us.getUsername());
                    sesion.setAttribute("nombreUsuarioSesion", Us.getForenames());
                    sesion.setAttribute("apellidosUsuarioSesion", Us.getSurnames());   
                    //#################################################################
                    //Actualiza ultimo acceso que tiene el usuario al sistema
                    
                    //modificaciones= userhelp.editUser(Us, Us.getId());
                    //#################################################################
                    dispatcher = request.getRequestDispatcher("client.jsp");
		    dispatcher.forward(request, response);
                    
                    

                }else{ 
                        //Guargar log en Bitácora                       
                        dispatcher = request.getRequestDispatcher("index.jsp?resp=Usuario y/o " +
				"contraseña incorrectos");
			dispatcher.forward(request, response);
                       
                }
                
                //dispatcher.forward(request, response);    
            }catch(Exception e){
                    
            }      
        }
        
        else if( action.equals("saliraplicacion") )
        {
            try{                    
                sesion.setAttribute("IdUsuarioSesion", null );
                sesion.setAttribute("nickUsuarioSesion", null );
                sesion.setAttribute("nombreUsuarioSesion", null );
                sesion.setAttribute("apellidosUsuarioSesion", null );  
                sesion.setAttribute("IdPerfilSesion", null );                        
                sesion.invalidate();
                response.sendRedirect(response.encodeRedirectURL("index.jsp"));

            }catch(Exception e){ out.print("error"); }

        }
        else if( action.equalsIgnoreCase("cargarCliente"))
        {
            try
            {
                file = request.getParameter("fileField");

                System.out.println("este es:" + file);
                Workbook workbook = Workbook.getWorkbook(new File(file)); //Pasamos el excel que vamos a leer
                Sheet sheet = workbook.getSheet(0); //Seleccionamos la hoja que vamos a leer
                String nombre;

                for (int fila = 1; fila < sheet.getRows(); fila++) { //recorremos las filas            
                    for (int columna = 0; columna < sheet.getColumns(); columna++) 
                    { //recorremos las columnas
                        nombre = sheet.getCell(columna, fila).getContents(); //setear la celda leida a nombre
                        System.out.print(nombre + ""); // imprimir nombre
                    }
                }

                dispatcher = request.getRequestDispatcher("client.jsp");
                dispatcher.forward(request, response);
    
                //dispatcher.forward(request, response);    
            }catch(Exception e){
                    
            }      
        }
        else if( action.equalsIgnoreCase("getusuario") ){
                
                Us = new User();
                idusuario_str = request.getParameter("iduser");
                idusuario = idusuario_str.equals("") ? 0 : Integer.parseInt(idusuario_str);
                Us = userhelp.getUserByID(idusuario);
                String resp = "", separador="%";
                
       //         resp =  Us.getUsuario()+separador+Us.getNombres()+separador+Us.getApellidos()+separador+Us.getEmail()+separador+
       //                 Us.getIdPerfil()+separador+idusuario+separador+Us.getContrasena()+separador+Us.getTelefono()+separador+Us.getDireccion();
                        
                        //Us.setFechaCreacion(diaHoraActual);
                        //Us.setFechaModificacion(diaHoraActual);                
                out.write(resp);
        }
        
        else if( action.equalsIgnoreCase("getDataUser") ){
                
                Us = new User();
                idusuario_str = request.getParameter("iduser");
                idusuario = idusuario_str.equals("") ? 0 : Integer.parseInt(idusuario_str);
                Us = userhelp.getUserByID(idusuario);
                String resp = "", separador="%";
                
       //         resp =  Us.getUsuario()+separador+Us.getNombres()+separador+Us.getApellidos()+separador+Us.getEmail()+separador+
       //                 Us.getIdPerfil()+separador+idusuario+separador+Us.getContrasena()+separador+Us.getTelefono()+separador+Us.getDireccion();
                        
                        //Us.setFechaCreacion(diaHoraActual);
                        //Us.setFechaModificacion(diaHoraActual);                
                out.write(resp);
        }
        
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (BiffException ex) {
            Logger.getLogger(Administracion.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (BiffException ex) {
            Logger.getLogger(Administracion.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
