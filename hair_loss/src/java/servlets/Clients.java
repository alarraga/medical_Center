package servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import helper.clientHelper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.PrintWriter;
import java.util.Calendar;
import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpSession;
import model.Leads;


public class Clients extends HttpServlet {
    
    private static final long serialVersionUID = 1L;
    private HashMap<String, Object> JSONROOT = new HashMap<String, Object>();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        HttpSession sesion = ((HttpServletRequest)request).getSession();
        RequestDispatcher dispatcher = null;
            
        clientHelper ch= new clientHelper();
        
        String action = request.getParameter("action");
        
        List<Leads> leadsList = new ArrayList<Leads>();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        response.setContentType("application/json");

	if (action != null) {
                try {
                        if (action.equals("list")) {
                                // Fetch Data from Lead Table
                                int startPageIndex = Integer.parseInt(request.getParameter("jtStartIndex"));
                                int recordsPerPage = Integer.parseInt(request.getParameter("jtPageSize"));
                                String param1 = request.getParameter("name");
                                
                                
                                String sort = request.getParameter("jtSorting");
                                

                                leadsList = ch.getLeads(startPageIndex, recordsPerPage, sort, param1);
                                
                                long leadsCount = ch.getClientsCount(param1);


                                // Return in the format required by jTable plugin
                                JSONROOT.put("Result", "OK");
                                JSONROOT.put("Records", leadsList);
                                JSONROOT.put("TotalRecordCount", leadsCount);
        
                                // Convert Java Object to Json
                                String jsonArray = gson.toJson(JSONROOT);

                                response.getWriter().print(jsonArray);
                        } else if (action.equals("create") || action.equals("update")) {
                                Leads l = new Leads();

                                if (request.getParameter("id") != null) {
                                        int id = Integer.parseInt(request.getParameter("id"));
                                        l.setId(id);
                                }

                                if (request.getParameter("date") != null) {
                                        String date = request.getParameter("date");
                                        l.setDate(date);
                                }

                                if (request.getParameter("source") != null) {
                                        String source = request.getParameter("source");
                                        l.setSource(source);
                                }

                                if (request.getParameter("number") != null) {
                                        String number = request.getParameter("number");
                                        l.setNumber(number);
                                }

                                if (request.getParameter("name") != null) {
                                        String name = request.getParameter("name");
                                        l.setName(name);
                                }

                                if (request.getParameter("email") != null) {
                                        String email = request.getParameter("email");
                                        l.setEmail(email);
                                }

                                if (request.getParameter("location") != null) {
                                        String location = request.getParameter("location");
                                        l.setLocation(location);
                                }

                                if (request.getParameter("notes") != null) {
                                        String notes = request.getParameter("notes");
                                        l.setNotes(notes);
                                }
                                
                                if (request.getParameter("notes2") != null) {
                                        String notes2 = request.getParameter("notes2");
                                        l.setNotes2(notes2);
                                }

                                if (request.getParameter("outcome") != null) {
                                        String outcome = request.getParameter("outcome");
                                        l.setOutcome(outcome);
                                }

                                if (request.getParameter("grafts") != null) {
                                        String grafts = request.getParameter("grafts");
                                        l.setGrafts(grafts);
                                }

                                if (request.getParameter("price") != null) {
                                        String price = request.getParameter("price");
                                        l.setPrice(price);
                                }

                                if (request.getParameter("status") != null) {
                                        String status = request.getParameter("status");
                                        l.setStatus(status);
                                }
                                
                                l.setDateBooked(this.date_obtenerDiaHoraActual());

                                if (action.equals("create")) {
                                        // Create new record
                                        ch.crearCliente(l);
                                        
                                } else if (action.equals("update")) {
                                        // Update existing record
                                        ch.editLead(l);
                                }

                                // Return in the format required by jTable plugin
                                JSONROOT.put("Result", "OK");
                                JSONROOT.put("Record", l);

                                // Convert Java Object to Json
                                String jsonArray = gson.toJson(JSONROOT);
                                response.getWriter().print(jsonArray);
                        } else if (action.equals("delete")) {
                                // Delete record
                                if (request.getParameter("id") != null) {
                                        int id = Integer.parseInt(request.getParameter("id"));
                                        ch.deleteLead(id);

                                        // Return in the format required by jTable plugin
                                        JSONROOT.put("Result", "OK");

                                        // Convert Java Object to Json
                                        String jsonArray = gson.toJson(JSONROOT);
                                        response.getWriter().print(jsonArray);
                                }
                        }
                } catch (Exception ex) {
                        JSONROOT.put("Result", "ERROR");
                        JSONROOT.put("Message", ex.getMessage());
                        String error = gson.toJson(JSONROOT);
                        response.getWriter().print(error);
                }
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