package com.sqli.planification.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name="annee")
public class Annee implements Serializable
{
	@Id
	@Column(name="annee")
	private String annee;

	public String getAnnee()
	{
		return annee;
	}

	public void setAnnee(String annee)
	{
		this.annee = annee;
	}

	public Annee(String annee)
	{
		super();
		this.annee = annee;
	}

	public Annee()
	{
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public boolean equals(Object obj)
	{
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Annee other = (Annee) obj;
		if (annee == null)
		{
			if (other.annee != null)
				return false;
		}
		else if (!annee.equals(other.annee))
			return false;
		return true;
	}



}
