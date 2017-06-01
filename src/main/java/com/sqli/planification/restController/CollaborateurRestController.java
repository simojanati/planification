package com.sqli.planification.restController;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sqli.planification.model.Collaborateur;
import com.sqli.planification.service.ICollaborateurService;

@RestController
@CrossOrigin
@RequestMapping("/collaborateur")
public class CollaborateurRestController {

	@Autowired
	private ICollaborateurService collaborateurService;

	@GetMapping("/getCollaborateurs")
	public List<Collaborateur> getCollaborateurs() {
		return collaborateurService.getAllCollaborateur();
	}

	@PostMapping(value = "/addCollaborateur")
	public Collaborateur addCollaborateur(@RequestParam(value = "nom", required = true) String nom,
			@RequestParam(value = "prenom", required = true) String prenom,
			@RequestParam(value = "email", required = true) String email,
			@RequestParam(value = "tel", required = true) String tel,
			@RequestParam(value = "dateRecrutement", required = true) Date dateRecrutement) {
		System.out.println("---------------- add collaborateur ---------------");
		Collaborateur collaborateur = new Collaborateur(email, nom, prenom, tel, dateRecrutement);
		return collaborateurService.addCollaborateur(collaborateur);
	}

	@PostMapping(value = "/updateCollaborateur")
	public Collaborateur updateCollaborateur(
			@RequestParam(value = "idCollaborateur", required = true) Long idCollaborateur,
			@RequestParam(value = "nom", required = true) String nom,
			@RequestParam(value = "prenom", required = true) String prenom,
			@RequestParam(value = "email", required = true) String email,
			@RequestParam(value = "tel", required = true) String tel,
			@RequestParam(value = "dateRecrutement", required = true) Date dateRecrutement) {
		System.out.println("---------------- update collaborateur ---------------");
		System.out.println(prenom);
		Collaborateur collaborateur = new Collaborateur(idCollaborateur, email, nom, prenom, tel, dateRecrutement);
		return collaborateurService.updateCollaborateur(collaborateur);
	}

	@GetMapping("/deleteCollaborateur")
	public String deleteCollaborateurs(@RequestParam("idCollaborateur") Long idCollaborateur) {
		try {
			collaborateurService.deleteCollaborateur(idCollaborateur);
			return "success";
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return e.getMessage();
		}
	}
}
