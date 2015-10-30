/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import helper.clientHelper;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;
import model.Leads;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class UploadFile extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private final String UPLOAD_DIRECTORY = "/opt/tomcat/temp";
    //private final String UPLOAD_DIRECTORY = "C:/Users/ale/Documents/medec";


    @Override
    protected void doPost(HttpServletRequest request,
                HttpServletResponse response) throws ServletException, IOException {
        boolean isMultipart = ServletFileUpload.isMultipartContent(request);
        

        // process only if its multipart content
        if (isMultipart) {
                // Create a factory for disk-based file items
                FileItemFactory factory = new DiskFileItemFactory();

                // Create a new file upload handler
                ServletFileUpload upload = new ServletFileUpload(factory);
                try {
                    // Parse the request
                    List<FileItem> multiparts = upload.parseRequest(request);

                    for (FileItem item : multiparts) {
                        if (!item.isFormField()) {
                            String name = new File(item.getName()).getName();
                            item.write(new File(UPLOAD_DIRECTORY + File.separator + name));
                            processExcelFile(new File(UPLOAD_DIRECTORY + File.separator + name));
                        }
                    }
                        
                // File uploaded successfully
                request.setAttribute("message", "Your file has been uploaded!");
                } 
                catch (Exception e) 
                {
                 request.setAttribute("message", "File Upload Failed due to " + e);
                }
        } else 
        {
            request.setAttribute("message", "This Servlet only handles file upload request");
        }
        request.getRequestDispatcher("/client.jsp").forward(request, response);
    }
    
    
    private void processExcelFile(File file) throws IOException{
        try {
            Workbook workbook = Workbook.getWorkbook(file); //Pasamos el excel que vamos a leer
            Sheet sheet = workbook.getSheet(0); //Seleccionamos la hoja que vamos a leer
            
            clientHelper ch= new clientHelper();
            //SELECCIONAR LA FILA 0 CON LOS TITULOS Y 
            //DETECTAR EL NOMBRE DE LA FILA DE ACUERDO A LA VARIABLE
            List batch = new ArrayList();
            
            for (int fila = 1; fila < sheet.getRows(); fila++) { //recorremos las filas
                Leads l = new Leads();
                l.setDate(sheet.getCell(0, fila).getContents());
                l.setSource(sheet.getCell(1, fila).getContents());
                l.setName(sheet.getCell(2, fila).getContents());
                l.setNumber(sheet.getCell(3, fila).getContents());
                l.setEmail(sheet.getCell(4, fila).getContents());
                l.setLocation(sheet.getCell(5, fila).getContents());
                l.setNotes2(sheet.getCell(6, fila).getContents());
                l.setNotes(sheet.getCell(7, fila).getContents());
                l.setOutcome(sheet.getCell(8, fila).getContents());
                l.setGrafts(sheet.getCell(9, fila).getContents());
                l.setPrice(sheet.getCell(10, fila).getContents());
                l.setStatus(sheet.getCell(11, fila).getContents());
                l.setDateBooked(this.date_obtenerDiaHoraActual());
                
                batch.add(l);
                /*for (int columna = 0; columna < sheet.getColumns(); columna++) { //recorremos las columnas
                nombre = sheet.getCell(columna, fila).getContents(); //setear la celda leida a nombre
                System.out.print(nombre + ""); // imprimir nombre
                }*/
            }
            
            ch.crearClientesArray(batch);
            System.out.println("\n");
            System.out.println("————————————-");
                
            
        } catch (BiffException ex) {
            Logger.getLogger(UploadFile.class.getName()).log(Level.SEVERE, null, ex);
        }
    }   
    
    public String date_obtenerDiaHoraActual()
    {
        String fechaResult="";
        java.util.Calendar fecha = java.util.Calendar.getInstance();
        
        int dia  = fecha.get(java.util.Calendar.DATE);
        int mes  = fecha.get(Calendar.MONTH)+1;
        int anio = fecha.get(java.util.Calendar.YEAR);
        
        fechaResult = ""+dia+"-"+mes+"-"+anio;
        
        return fechaResult;
    }     
    
}