package com.sqli.planification.service;

import java.util.List;

import com.sqli.planification.model.Affecter;
import com.sqli.planification.model.AffecterId;
import com.sqli.planification.utils.MsgError;


public interface IAffecterService
{

	public MsgError addAffectation(Long idCollaborateur, Long idSemaine, Long idProjet, int nbrJour);

	public void deleteAffectation(Long idCollaborateur,Long idProjet);

	public List<Affecter> getAllAffectation();
	
	public List<Affecter> getAllAffectationByPlanning(Long idPlanning);

	public List<Affecter> getAffectationByCollaborateurSemaine(Long idCollaborateur, Long idSemaine);
}
