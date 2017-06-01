package com.sqli.planification.utils;

import java.io.Serializable;

public class AffecterCollaborateurSemaine implements Serializable {

	private Long idCollaborateur;
	private Long idSemaine;
	private Long idProjet;
	private String information;
	private int nbrJourTotal;

	public String getInformation() {
		return information;
	}

	public void setInformation(String information) {
		this.information = information;
	}

	public Long getIdProjet() {
		return idProjet;
	}

	public void setIdProjet(Long idProjet) {
		this.idProjet = idProjet;
	}

	public Long getIdCollaborateur() {
		return idCollaborateur;
	}

	public void setIdCollaborateur(Long idCollaborateur) {
		this.idCollaborateur = idCollaborateur;
	}

	public Long getIdSemaine() {
		return idSemaine;
	}

	public void setIdSemaine(Long idSemaine) {
		this.idSemaine = idSemaine;
	}

	public int getNbrJourTotal() {
		return nbrJourTotal;
	}

	public void setNbrJourTotal(int nbrJourTotal) {
		this.nbrJourTotal = nbrJourTotal;
	}

	public AffecterCollaborateurSemaine(Long idCollaborateur, Long idSemaine, Long idProjet, String information,
			int nbrJourTotal) {
		super();
		this.idCollaborateur = idCollaborateur;
		this.idSemaine = idSemaine;
		this.information = information;
		this.nbrJourTotal = nbrJourTotal;
		this.idProjet = idProjet;
	}

	public AffecterCollaborateurSemaine() {
		super();
		// TODO Auto-generated constructor stub
	}

}
