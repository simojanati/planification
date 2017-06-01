package com.sqli.planification.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity(name = "projet")
public class Projet implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5034002872564307729L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_projet")
	private Long idProjet;

	@Column(name = "titre_projet")
	private String titreProjet;

	@Column(name = "description_projet")
	private String descriptionProjet;

	@OneToMany(mappedBy = "planificationId.projet", orphanRemoval = true, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Planification> planifications;
	
	@OneToMany(mappedBy = "collaborateurProjetId.projet", orphanRemoval = true, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<CollaborateurProjet> collaborateurProjets ;
	
	@OneToMany(mappedBy = "affecterId.projet", orphanRemoval = true, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Affecter> affecters;

	public List<Planification> getPlanifications() {
		return planifications;
	}

	public void setPlanifications(List<Planification> planifications) {
		this.planifications = planifications;
	}

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

	public Long getIdProjet() {
		return idProjet;
	}

	public void setIdProjet(Long idProjet) {
		this.idProjet = idProjet;
	}

	public String getTitreProjet() {
		return titreProjet;
	}

	public void setTitreProjet(String titreProjet) {
		this.titreProjet = titreProjet;
	}

	public String getDescriptionProjet() {
		return descriptionProjet;
	}

	public void setDescriptionProjet(String descriptionProjet) {
		this.descriptionProjet = descriptionProjet;
	}

	public Projet(String titreProjet, String descriptionProjet) {
		super();
		this.titreProjet = titreProjet;
		this.descriptionProjet = descriptionProjet;
	}

	public Projet(Long idProjet, String titreProjet, String descriptionProjet)
	{
		super();
		this.idProjet = idProjet;
		this.titreProjet = titreProjet;
		this.descriptionProjet = descriptionProjet;
	}

	public Projet() {
		super();
		// TODO Auto-generated constructor stub
	}

}
