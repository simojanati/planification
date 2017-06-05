package com.sqli.planification.model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by simoj on 04/06/2017.
 */

@Entity(name = "file")
public class File implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idFile;

    @Column(name = "path", unique = true)
    private String path;

    @Column(name = "nom", unique = true)
    private String nom;

    @Column(name = "id_planning")
    private Long idPlanning;

    @Column(name = "type")
    private String type;

    public Long getIdFile() {
        return idFile;
    }

    public void setIdFile(Long idFile) {
        this.idFile = idFile;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Long getIdPlanning() {
        return idPlanning;
    }

    public void setIdPlanning(Long idPlanning) {
        this.idPlanning = idPlanning;
    }

    public File(String path, String nom, Long idPlanning, String type) {
        this.path = path;
        this.nom = nom;
        this.idPlanning = idPlanning;
        this.type = type;
    }

    public File() {
    }
}
