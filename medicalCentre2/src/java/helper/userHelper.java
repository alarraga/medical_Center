/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package helper;

import java.util.List;
import model.User;
import org.hibernate.Query;
import org.hibernate.Session;
import recursos.HibernateUtil;

/**
 *
 * @author Alexis
 */
public class userHelper {
    Session session = null;

    public userHelper() {
        this.session = HibernateUtil.getSessionFactory().getCurrentSession();
    }
    
    public User getUserByID(int id){
        User u = null;
        List<User> userList = null;
        try {
            org.hibernate.Transaction tx = session.beginTransaction();
            Query q = session.createQuery ("from User as user where user.id ='" + id + "'");
            userList = (List<User>) q.list();
            u = userList.get(0);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return u;
    }
    
    
    public User existeUser(String user, String pass){
        User u = null;
        List<User> userList = null;
        try {
            org.hibernate.Transaction tx = session.beginTransaction();
            Query q = session.createQuery ("from User as user where user.username='"+user+"' and password='"+pass+"'");
            userList = (List<User>)q.list();
            u = userList.get(0);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return u;
    }
    
    public int editUser(User uNew, int id){
        int modifications =0;
        try {
            org.hibernate.Transaction tx = session.beginTransaction();
            Query q = session.createQuery ("update User set forenames=:nombres, surnames=:apellidos, email=:email, username=:username, contrasena=:contrasena where id=:id");
            q.setString("nombres", uNew.getForenames());
            q.setString("apellidos", uNew.getSurnames());
            q.setString("email", uNew.getEmail());
            q.setString("username", uNew.getUsername());
            q.setString("contrasena", uNew.getPassword());
            q.setInteger("id", id);
            modifications=q.executeUpdate();
            tx.commit();
 
            
        } catch (Exception e) {
            e.printStackTrace();
        }

        return modifications;
        

    }
    
    public int deleteUsuario(int id){
        int modifications =0;
        try {
            org.hibernate.Transaction tx = session.beginTransaction();
            Query q = session.createQuery ("update Usuario set estado='I' where id=:id");
            q.setInteger("id", id);
            
            modifications=q.executeUpdate();
            tx.commit();
 
            
        } catch (Exception e) {
            e.printStackTrace();
        }

        return modifications;
        

    }
    
    
    public List getUsers(){
        List<User> userList = null;
        try {
            org.hibernate.Transaction tx = session.beginTransaction();
            Query q = session.createQuery ("from User as us where us.estado='A'");
            userList = (List<User>)q.list();
            
        } catch (Exception e) {
            e.printStackTrace();
        }

        return userList;
    }
     
    
}
