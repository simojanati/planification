package com.sqli.planification.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "collaborateur_projet")
public class CollaborateurProjet implements Serializable
{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1521700036011237536L;

	@Id
	private CollaborateurProjetId collaborateurProjetId;

	@Column(name = "libelle")
	private String libelle;

	@Column(name = "id_Collab_Projet")
	private int idCollabProjet;
	
	
	public int getIdCollabProjet()
	{
		return idCollabProjet;
	}

	public void setIdCollabProjet(int idCollabProjet)
	{
		this.idCollabProjet = idCollabProjet;
	}

	public CollaborateurProjetId getCollaborateurProjetId() {
		return collaborateurProjetId;
	}

	public void setCollaborateurProjetId(CollaborateurProjetId collaborateurProjetId) {
		this.collaborateurProjetId = collaborateurProjetId;
	}

	public String getLibelle() {
		return libelle;
	}

	public void setLibelle(String libelle) {
		this.libelle = libelle;
	}


	public Collaborateur getCollaborateur() {
		return this.getCollaborateurProjetId().getCollaborateur();
	}

	public void setCollaborateur(Collaborateur collaborateur) {
		this.getCollaborateurProjetId().setCollaborateur(collaborateur);
	}

	public Projet getProjet() {
		return this.getCollaborateurProjetId().getProjet();
	}

	public void setProjet(Projet projet) {
		this.getCollaborateurProjetId().setProjet(projet);
	}

	public CollaborateurProjet(CollaborateurProjetId collaborateurProjetId) {
		super();
		this.collaborateurProjetId = collaborateurProjetId;
		this.idCollabProjet = formatIdCollabProjet(this.collaborateurProjetId);
		this.libelle = formatLibelle(this.collaborateurProjetId);
	}

	public CollaborateurProjet() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	private int formatIdCollabProjet(CollaborateurProjetId collaborateurProjetId) {
		String idCollabProjet = collaborateurProjetId.getCollaborateur().getIdCollaborateur()+""+collaborateurProjetId.getProjet().getIdProjet();
		return Integer.parseInt(idCollabProjet);
	}

	private String formatLibelle(CollaborateurProjetId collaborateurProjetId) {
		String libelle = collaborateurProjetId.getCollaborateur().getNom() + " " + collaborateurProjetId.getCollaborateur().getPrenom()
				+ " - Projet : " + collaborateurProjetId.getProjet().getTitreProjet();
		return libelle;
	}

}
