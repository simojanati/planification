package com.sqli.planification.model;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "collaborateur")
public class Collaborateur implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8029345044683748369L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_collaborateur")
	private Long idCollaborateur;

	@Column(name = "email_collaborateur", unique = true, nullable = false)
	@NotNull(message = "Login must not be null")
	private String email;

	@Column(name = "nom_collaborateur")
	private String nom;

	@Column(name = "prenom_collaborateur")
	private String prenom;

	@Column(name = "tel_collaborateur")
	@Pattern(regexp = "\\d{10}", message = "Phone number must be 10 numbers")
	private String tel;

	@Column(name = "date_recrutement_collaborateur")
	@NotNull(message = "Recruitment date must not be null")
	private Date dateRecrutement;

	@OneToMany(mappedBy = "collaborateurProjetId.collaborateur", orphanRemoval = true, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<CollaborateurProjet> collaborateurProjets;

	@OneToMany(mappedBy = "affecterId.collaborateur", orphanRemoval = true, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Affecter> affecters;
	
	public List<CollaborateurProjet> getCollaborateurProjets() {
		return collaborateurProjets;
	}

	public void setCollaborateurProjets(List<CollaborateurProjet> collaborateurProjets) {
		this.collaborateurProjets = collaborateurProjets;
	}

	public List<Affecter> getAffecters() {
		return affecters;
	}

	public void setAffecters(List<Affecter> affecters) {
		this.affecters = affecters;
	}

	public Long getIdCollaborateur() {
		return idCollaborateur;
	}

	public void setIdCollaborateur(Long idCollaborateur) {
		this.idCollaborateur = idCollaborateur;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public Date getDateRecrutement() {
		return dateRecrutement;
	}

	public void setDateRecrutement(Date dateRecrutement) {
		this.dateRecrutement = dateRecrutement;
	}

	public Collaborateur(String email, String nom, String prenom, String tel, Date dateRecrutement) {
		super();
		this.email = email;
		this.nom = nom;
		this.prenom = prenom;
		this.tel = tel;
		this.dateRecrutement = dateRecrutement;
	}

	public Collaborateur() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Collaborateur(Long idCollaborateur, String email, String nom, String prenom, String tel,
			Date dateRecrutement) {
		super();
		this.idCollaborateur = idCollaborateur;
		this.email = email;
		this.nom = nom;
		this.prenom = prenom;
		this.tel = tel;
		this.dateRecrutement = dateRecrutement;
	}

}
