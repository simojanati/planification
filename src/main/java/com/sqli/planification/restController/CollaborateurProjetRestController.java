package com.sqli.planification.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sqli.planification.model.Collaborateur;
import com.sqli.planification.model.CollaborateurProjet;
import com.sqli.planification.model.CollaborateurProjetId;
import com.sqli.planification.service.ICollaborateurProjetService;
import com.sqli.planification.utils.AddCollaborateurProjet;
import com.sqli.planification.utils.MsgError;


@RestController
@CrossOrigin
@RequestMapping("/collaborateurProjet")
public class CollaborateurProjetRestController
{

	@Autowired
	private ICollaborateurProjetService collaborateurProjetService;


	@GetMapping("/getCollaborateurProjet")
	public List<CollaborateurProjet> getCollaborateurProjet()
	{

		return collaborateurProjetService.getCollaborateurProjet();
	}

	@GetMapping("/getCollaborateurProjetByPlanning")
	public List<CollaborateurProjet> getCollaborateurProjetByPlanning(@RequestParam("idPlanning") Long idPlanning)
	{
		return collaborateurProjetService.getCollaborateurProjetByPlanning(idPlanning);
	}

	@GetMapping("/deleteCollaborateurProjet")
	public String deleteCollabProjet(@RequestParam("idCollaborateur") Long idCollaborateur,
			@RequestParam("idProjet") Long idProjet)
	{
		try
		{
			collaborateurProjetService.deleteCollaborateurProjet(idCollaborateur, idProjet);
			return "success";
		}
		catch (Exception e)
		{
			System.out.println(e.getMessage());
			return e.getMessage();
		}

	}

	@PostMapping("/addCollaborateurProjet")
	public MsgError addCollaborateurProjet(@RequestBody AddCollaborateurProjet addCollaborateurProjet)
	{
		try
		{
			collaborateurProjetService.addCollaborateurProjet(addCollaborateurProjet.getIdCollaborateur(),
					addCollaborateurProjet.getProjets());
			return new MsgError("success");
		}
		catch (Exception e)
		{
			return new MsgError(e.getMessage());
		}

	}

}
