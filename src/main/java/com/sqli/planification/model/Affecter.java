package com.sqli.planification.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "affect")
public class Affecter implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1250698874455186255L;

	@Id
	private AffecterId affecterId;

	@Column(name = "nbr_jour")
	private int nbrJour;

	@Column(name = "information")
	private String information;

	public AffecterId getAffecterId() {
		return affecterId;
	}

	public void setAffecterId(AffecterId affecterId) {
		this.affecterId = affecterId;
	}

	public int getNbrJour() {
		return nbrJour;
	}

	public void setNbrJour(int nbrJour) {
		this.nbrJour = nbrJour;
	}

	public String getInformation() {
		return information;
	}

	public void setInformation(String information) {
		this.information = information;
	}

	public Collaborateur getCollaborateur() {
		return this.getAffecterId().getCollaborateur();
	}

	public void setCollaborateur(Collaborateur collaborateur) {
		this.getAffecterId().setCollaborateur(collaborateur);
	}

	public Projet getProjet() {
		return this.getAffecterId().getProjet();
	}

	public void setProjet(Projet projet) {
		this.getAffecterId().setProjet(projet);
	}

	public Semaine getSemaine() {
		return this.getAffecterId().getSemaine();
	}

	public void setSemaine(Semaine semaine) {
		this.getAffecterId().setSemaine(semaine);
	}

	public Affecter(AffecterId affecterId, int nbrJour) {
		super();
		this.affecterId = affecterId;
		this.nbrJour = nbrJour;
		this.information = this.getProjet().getTitreProjet() + ", Nombre jour : " + this.nbrJour;
	}

	public Affecter() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Affecter other = (Affecter) obj;
		if (affecterId == null) {
			if (other.affecterId != null)
				return false;
		} else if (!affecterId.equals(other.affecterId))
			return false;
		if (nbrJour != other.nbrJour)
			return false;
		return true;
	}

}
