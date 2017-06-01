package com.sqli.planification.utils;

import java.io.Serializable;

public class MoisAnnee implements Serializable {

	private String mois;
	private String annee;

	public String getMois() {
		return mois;
	}

	public void setMois(String mois) {
		this.mois = mois;
	}

	public String getAnnee() {
		return annee;
	}

	public void setAnnee(String annee) {
		this.annee = annee;
	}

	public MoisAnnee(String mois, String annee) {
		super();
		this.mois = mois;
		this.annee = annee;
	}

	public MoisAnnee() {
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
		MoisAnnee other = (MoisAnnee) obj;
		if (annee == null) {
			if (other.annee != null)
				return false;
		} else if (!annee.equals(other.annee))
			return false;
		if (mois == null) {
			if (other.mois != null)
				return false;
		} else if (!mois.equals(other.mois))
			return false;
		return true;
	}

}
