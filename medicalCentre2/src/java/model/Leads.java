package model;
// Generated 27-Oct-2015 06:40:41 by Hibernate Tools 4.3.1


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Leads generated by hbm2java
 */
@Entity
@Table(name="leads"
    ,catalog="hair_uk"
)
public class Leads  implements java.io.Serializable {


     private Integer id;
     private String date;
     private String source;
     private String number;
     private String name;
     private String email;
     private String location;
     private String notes;
     private String outcome;
     private String grafts;
     private String price;
     private Integer idClient;
     private String status;
     private String dateBooked;
     private String notes2;

    public Leads() {
    }

	
    public Leads(String number, String notes, String status) {
        this.number = number;
        this.notes = notes;
        this.status = status;
    }
    public Leads(String date, String source, String number, String name, String email, String location, String notes, String outcome, String grafts, String price, Integer idClient, String status, String dateBooked, String notes2) {
       this.date = date;
       this.source = source;
       this.number = number;
       this.name = name;
       this.email = email;
       this.location = location;
       this.notes = notes;
       this.outcome = outcome;
       this.grafts = grafts;
       this.price = price;
       this.idClient = idClient;
       this.status = status;
       this.dateBooked = dateBooked;
       this.notes2 = notes2;
    }
   
     @Id @GeneratedValue(strategy=IDENTITY)

    
    @Column(name="id", unique=true, nullable=false)
    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }

    
    @Column(name="date", length=20)
    public String getDate() {
        return this.date;
    }
    
    public void setDate(String date) {
        this.date = date;
    }

    
    @Column(name="source", length=200)
    public String getSource() {
        return this.source;
    }
    
    public void setSource(String source) {
        this.source = source;
    }

    
    @Column(name="number", length=100)
    public String getNumber() {
        return this.number;
    }
    
    public void setNumber(String number) {
        this.number = number;
    }

    
    @Column(name="name", length=200)
    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    
    @Column(name="email", length=100)
    public String getEmail() {
        return this.email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }

    
    @Column(name="location", length=100)
    public String getLocation() {
        return this.location;
    }
    
    public void setLocation(String location) {
        this.location = location;
    }

    
    @Column(name="notes", length=65535)
    public String getNotes() {
        return this.notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }

    
    @Column(name="outcome", length=200)
    public String getOutcome() {
        return this.outcome;
    }
    
    public void setOutcome(String outcome) {
        this.outcome = outcome;
    }

    
    @Column(name="grafts", length=65535)
    public String getGrafts() {
        return this.grafts;
    }
    
    public void setGrafts(String grafts) {
        this.grafts = grafts;
    }

    
    @Column(name="price", length=100)
    public String getPrice() {
        return this.price;
    }
    
    public void setPrice(String price) {
        this.price = price;
    }

    
    @Column(name="id_client")
    public Integer getIdClient() {
        return this.idClient;
    }
    
    public void setIdClient(Integer idClient) {
        this.idClient = idClient;
    }

    
    @Column(name="status", nullable=false, length=500)
    public String getStatus() {
        return this.status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }

    
    @Column(name="date_booked", length=20)
    public String getDateBooked() {
        return this.dateBooked;
    }
    
    public void setDateBooked(String dateBooked) {
        this.dateBooked = dateBooked;
    }

    
    @Column(name="notes2", length=65535)
    public String getNotes2() {
        return this.notes2;
    }
    
    public void setNotes2(String notes2) {
        this.notes2 = notes2;
    }




}


