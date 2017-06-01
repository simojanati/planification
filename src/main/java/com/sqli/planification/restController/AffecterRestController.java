package com.sqli.planification.restController;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sqli.planification.model.Affecter;
import com.sqli.planification.service.IAffecterService;
import com.sqli.planification.utils.AddAffectation;
import com.sqli.planification.utils.AffecterCollaborateurSemaine;
import com.sqli.planification.utils.MsgError;

@RestController
@CrossOrigin
@RequestMapping("/affecter")
public class AffecterRestController {

	@Autowired
	private IAffecterService affecterService;

	@GetMapping("/getAffectations")
	public List<Affecter> getCollaborateurs() {
		return affecterService.getAllAffectation();
	}

	@CrossOrigin
	@PostMapping(value = "/addAffectation")
	public MsgError addAffectation(@RequestBody AddAffectation addAffectation) {
		MsgError msg = affecterService.addAffectation(addAffectation.getIdCollaborateur(),
				addAffectation.getIdSemaine(), addAffectation.getIdProjet(), addAffectation.getNbrJour());
		System.out.println(msg.getMsgError());
		return msg;
	}

	@GetMapping(value = "/getAffectationCollaborateurSemaine")
	public List<AffecterCollaborateurSemaine> getAffectationBySemaineCollaborateur() {
		List<Affecter> affecters = affecterService.getAllAffectation();
		List<AffecterCollaborateurSemaine> affecterCollaborateurSemaines = new ArrayList<>();
		String information = "";
		int nbrJourTotal = 0;
		for (Affecter affecter : affecters) {
			List<Affecter> affecters2 = affecterService.getAffectationByCollaborateurSemaine(
					affecter.getCollaborateur().getIdCollaborateur(), affecter.getSemaine().getIdSemaine());
			for (Affecter affecter2 : affecters2) {
				if (affecters2.size() == 1 || affecters2.get(0).equals(affecter2)) {
					information = affecter2.getInformation();
					nbrJourTotal = affecter2.getNbrJour();
				} else {
					information = information + "<br/>" + affecter2.getInformation();
					nbrJourTotal = nbrJourTotal + affecter2.getNbrJour();
				}
			}
			affecterCollaborateurSemaines.add(new AffecterCollaborateurSemaine(
					affecter.getCollaborateur().getIdCollaborateur(), affecter.getSemaine().getIdSemaine(),
					affecter.getProjet().getIdProjet(), information, nbrJourTotal));

		}
		return affecterCollaborateurSemaines;
	}
	
	@GetMapping(value = "/getAffectationCollaborateur")
	public List<AffecterCollaborateurSemaine> getAffectationByCollaborateur() {
		List<Affecter> affecters = affecterService.getAllAffectation();
		List<AffecterCollaborateurSemaine> affecterCollaborateurSemaines = new ArrayList<>();
		String information = "";
		int nbrJourTotal = 0;
		for (Affecter affecter : affecters) {
			List<Affecter> affecters2 = affecterService.getAffectationByCollaborateurSemaine(
					affecter.getCollaborateur().getIdCollaborateur(), affecter.getSemaine().getIdSemaine());
			for (Affecter affecter2 : affecters2) {
				if (affecters2.size() == 1 || affecters2.get(0).equals(affecter2)) {
					information = affecter2.getInformation();
					nbrJourTotal = affecter2.getNbrJour();
				} else {
					information = information + "<br/>" + affecter2.getInformation();
					nbrJourTotal = nbrJourTotal + affecter2.getNbrJour();
				}
			}
			affecterCollaborateurSemaines.add(new AffecterCollaborateurSemaine(
					affecter.getCollaborateur().getIdCollaborateur(), affecter.getSemaine().getIdSemaine(),
					affecter.getProjet().getIdProjet(), information, nbrJourTotal));

		}
		return affecterCollaborateurSemaines;
	}

}
