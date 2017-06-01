package com.sqli.planification.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sqli.planification.model.Projet;
import com.sqli.planification.service.IProjetService;


@RestController
@CrossOrigin("*")
@RequestMapping("/projet")
public class ProjetRestController
{
	@Autowired
	private IProjetService projetService;

	@GetMapping("/getProjets")
	public List<Projet> getProjets(@RequestParam("idCollaborateur") Long idCollaborateur)
	{
		return projetService.getProjetNonAffecter(idCollaborateur);
	}

	@PostMapping(value = "/addProjet")
	public Projet addProjet(@RequestParam(value = "titreProjet", required = true) String titreProjet,
			@RequestParam(value = "descriptionProjet", required = true) String descriptionProjet)
	{
		System.out.println("---------------- add projet ---------------");
		Projet projet = new Projet(titreProjet, descriptionProjet);
		return projetService.addProjet(projet);
	}

	@PostMapping(value = "/updateProjet")
	public Projet updateProjet(@RequestParam(value = "idProjet", required = true) Long idProjet,
			@RequestParam(value = "titreProjet", required = true) String titreProjet,
			@RequestParam(value = "descriptionProjet", required = true) String descriptionProjet)
	{
		System.out.println("---------------- update projet ---------------");
		Projet projet = new Projet(idProjet, titreProjet, descriptionProjet);
		return projetService.updateProjet(projet);
	}

	@GetMapping("/deleteProjet")
	public String deleteProjet(@RequestParam("idProjet") Long idProjet)
	{
		try
		{
			projetService.deleteProjet(idProjet);
			System.out.println("success");
			return "success";
		}
		catch (Exception e)
		{
			System.out.println(e.getMessage());
			return e.getMessage();
		}
	}

	@GetMapping("/getProjetByPlanning")
	public List<Projet> getProjetsByPlanning(@RequestParam("idPLanning") Long idPlanning)
	{
		return projetService.getProjetByPlanning(idPlanning);
	}

	@GetMapping("/getProjet")
	public List<Projet> getAllProjet()
	{
		return projetService.getAllProjet();
	}

}
