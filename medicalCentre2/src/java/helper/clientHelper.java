/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package helper;

import java.util.List;
import model.Leads;
import org.hibernate.Query;
import org.hibernate.Session;
import recursos.HibernateUtil;

/**
 *
 * @author Alexis
 */
public class clientHelper {
    Session session = null;
   
    public clientHelper() {
        this.session = HibernateUtil.getSessionFactory().getCurrentSession();
    }
    /*
    public Leads getPacienteByID(int id){
        Paciente u = null;
        List<Paciente> pacienteList = null;
        try {
            org.hibernate.Transaction tx = session.beginTransaction();
            Query q = session.createQuery ("from Paciente as pac where pac.id ='" + id + "'");
            pacienteList = (List<Paciente>) q.list();
            u = pacienteList.get(0);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return u;
    }
    */
    
    public List getLeads(int jtStartIndex, int jtPageSize, String jtSorting, String param1){
        List<Leads> leadsList = null;
        try {
            if (session.getTransaction() != null && session.getTransaction().isActive()) {
                session.getTransaction();
            } else {
                session.beginTransaction();
            }
            
            String query = "from Leads as l";
            if (!param1.isEmpty()) query = query + " WHERE l.name like '%"+param1+"%'";
            query = query + " ORDER BY "+jtSorting;
            
            Query q = session.createQuery (query);
            q.setFirstResult(jtStartIndex);
            q.setMaxResults(jtPageSize);
            
            leadsList = (List<Leads>)q.list();
    //        session.getTransaction().commit();
            
        } catch (Exception e) {
            e.printStackTrace();
        }

        return leadsList;
    }
        
    public long getClientsCount(String param1)
    {
        long count = 0;
        
        try {
            if (session.getTransaction() != null && session.getTransaction().isActive()) {
                session.getTransaction();
            } else {
                session.beginTransaction();
            }
            
            String query = "select count(*) from Leads";
            if (!param1.isEmpty()) query = query + " WHERE name like '%"+param1+"%'";
            
            count = (Long) session.createQuery(query).uniqueResult();
            
            session.getTransaction().commit();
            
        } catch (Exception e) {
            e.printStackTrace();
        }

        return count;
    }
    
    public List<Leads> getlistLeads(){
        List<Leads> leadsList = null;
        try {
            org.hibernate.Transaction tx = session.beginTransaction();
            Query q = session.createQuery ("from Leads as l where l.status='A'");
            leadsList = (List<Leads>) q.list();
            
        } catch (Exception e) {
            e.printStackTrace();
        }

        return leadsList;
    }
    
    /*
    public Paciente existePaciente(String cedula){
        Paciente u = null;
        List<Paciente> pacienteList = null;
        try {
            org.hibernate.Transaction tx = session.beginTransaction();
            Query q = session.createQuery ("from Paciente as pac where pac.cedula='"+cedula+"'");
            pacienteList = (List<Paciente>)q.list();
            u = pacienteList.get(0);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return u;
    }
    
    public int editPaciente(Paciente pacNew, int id){
        int modifications =0;
        try {
            org.hibernate.Transaction tx = session.beginTransaction();
            Query q = session.createQuery ("update Paciente set nombres=:nombres, apellidos=:apellidos, genero=:genero, fechaNac=:fechaNac, telefono=:fono, direccion=:dir, cedula=:cedula, ciudad=:ciudad, grupoSanguineo=:sangre, email=:email where id=:id");
            q.setString("nombres", pacNew.getNombres());
            q.setString("apellidos", pacNew.getApellidos());
            q.setString("cedula", pacNew.getCedula());
            q.setString("genero", pacNew.getGenero());
            q.setString("fechaNac", pacNew.getFechaNac());
            q.setString("fono", pacNew.getTelefono());
            q.setString("dir", pacNew.getDireccion());
            q.setString("ciudad", pacNew.getCiudad());
            q.setString("email", pacNew.getEmail());
            q.setString("sangre", pacNew.getGrupoSanguineo());
            q.setInteger("id", id);
            
            modifications=q.executeUpdate();
            tx.commit();
 
            
        } catch (Exception e) {
            e.printStackTrace();
        }

        return modifications;
        

    }
    
    public int deletePaciente(int id){
        int modifications =0;
                
        try {
            org.hibernate.Transaction tx = session.beginTransaction();
            Query q = session.createQuery ("update Paciente set estado='I' where id=:id");
            Query q1 = session.createQuery ("update Cita set estado='I' where id_paciente=:id_paciente");
            
            q.setInteger("id", id);
            q1.setInteger("id_paciente", id);
            
            modifications=q1.executeUpdate();
            modifications=q.executeUpdate();
            
            tx.commit();            
            
        } catch (Exception e) {
            e.printStackTrace();
        }

        return modifications;
        

    }
    
    */
    
    public void crearClientesArray(List<Leads> lNews){
        
        Leads p = new Leads();
        Leads lNew = new Leads();
        
        
        try {
            if (session.getTransaction() != null && session.getTransaction().isActive()) {
                session.getTransaction();
            } else {
                session.beginTransaction();
            }
            
            for(int i=0; i<lNews.size(); i++){
                lNew  = lNews.get(i);
        
                //Query q = session.createQuery ("insert into Paciente nombres=:nombres, apellidos=:apellidos, genero=:genero, fecha_nac=:fechaNac, telefono=:fono, direccion=:dir, cedula=:cedula, ciudad=:ciudad, grupo_sanguineo=:sangre, email=:email");
                p.setDate(lNew.getDate());
                p.setDateBooked(lNew.getDateBooked());
                p.setEmail(lNew.getEmail());
                p.setGrafts(lNew.getGrafts());
                p.setLocation(lNew.getLocation());
                p.setName(lNew.getName());
                p.setNotes(lNew.getNotes());
                p.setNotes2(lNew.getNotes2());
                p.setNumber(lNew.getNumber());
                p.setOutcome(lNew.getOutcome());
                p.setPrice(lNew.getPrice());
                p.setSource(lNew.getSource());
                p.setStatus(lNew.getStatus());

                session.save(p);
                
                session.flush();
                session.clear();
                
            }
            
            session.getTransaction().commit();

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
    
    public void crearCliente(Leads lNew){
        Leads p = new Leads();
        
        try {
            if (session.getTransaction() != null && session.getTransaction().isActive()) {
                session.getTransaction();
            } else{
                session.beginTransaction();
            }

            //Query q = session.createQuery ("insert into Paciente nombres=:nombres, apellidos=:apellidos, genero=:genero, fecha_nac=:fechaNac, telefono=:fono, direccion=:dir, cedula=:cedula, ciudad=:ciudad, grupo_sanguineo=:sangre, email=:email");
            p.setDate(lNew.getDate());
            p.setDateBooked(lNew.getDateBooked());
            p.setEmail(lNew.getEmail());
            p.setGrafts(lNew.getGrafts());
            p.setLocation(lNew.getLocation());
            p.setName(lNew.getName());
            p.setNotes(lNew.getNotes());
            p.setNotes2(lNew.getNotes2());            
            p.setNumber(lNew.getNumber());
            p.setOutcome(lNew.getOutcome());
            p.setPrice(lNew.getPrice());
            p.setSource(lNew.getSource());
            p.setStatus(lNew.getStatus());
            
            session.save(p);
            session.getTransaction().commit();
            
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
    
    
    public void editLead(Leads lNew){
        
        try {
            if (session.getTransaction() != null && session.getTransaction().isActive()) {
                session.getTransaction();
            } else {
                session.beginTransaction();
            }
            
            //Query q = session.createQuery ("update Leads set date=:date, source=:source, number=:number, name=:name, email=:email, location=:location, notes=:notes, outcome=:outcome, grafts=:grafts, price=:price, status=:status where id=:id");
            Leads p = (Leads)session.get(Leads.class, lNew.getId()); 
            p.setDate(lNew.getDate());
            p.setDateBooked(lNew.getDateBooked());
            p.setEmail(lNew.getEmail());
            p.setGrafts(lNew.getGrafts());
            p.setLocation(lNew.getLocation());
            p.setName(lNew.getName());
            p.setNotes(lNew.getNotes());
            p.setNotes2(lNew.getNotes2());
            
            p.setNumber(lNew.getNumber());
            p.setOutcome(lNew.getOutcome());
            p.setPrice(lNew.getPrice());
            p.setSource(lNew.getSource());
            p.setStatus(lNew.getStatus());

            session.update(p); 
            session.getTransaction().commit();
            
        } catch (Exception e) {
            e.printStackTrace();
        }


    }
    
    
    public void deleteLead(int id){
        
        try {
            if (session.getTransaction() != null && session.getTransaction().isActive()) {
                session.getTransaction();
            } else {
                session.beginTransaction();
            }
            
            //Query q = session.createQuery ("update Leads set date=:date, source=:source, number=:number, name=:name, email=:email, location=:location, notes=:notes, outcome=:outcome, grafts=:grafts, price=:price, status=:status where id=:id");
            Leads p = (Leads)session.get(Leads.class, id); 
            p.setStatus("Deleted");
            
            session.update(p); 
            session.getTransaction().commit();
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    /*
    public Paciente getPacienteByCed(String ced){
        Paciente u = null;
        List<Paciente> pacienteList = null;
        try {
            org.hibernate.Transaction tx = session.beginTransaction();
            Query q = session.createQuery ("from Paciente as pac where pac.cedula ='" + ced + "'");
            pacienteList = (List<Paciente>) q.list();
            u = pacienteList.get(0);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return u;
    }*/
}
