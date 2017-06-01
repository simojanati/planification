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
import com.sqli.planification.model.Planification;
import com.sqli.planification.model.PlanificationId;
import com.sqli.planification.model.Planning;
import com.sqli.planification.model.Projet;
import com.sqli.planification.service.ICollaborateurService;
import com.sqli.planification.service.IPlanificationService;
import com.sqli.planification.service.IPlanningService;
import com.sqli.planification.service.IProjetService;
import com.sqli.planification.utils.AddPlanification;

@RestController
@CrossOrigin("*")
@RequestMapping("/planification")
public class PlanificationRestController {

	@Autowired
	private IPlanificationService planificationService;

	@Autowired
	private IProjetService projetService;

	@Autowired
	private ICollaborateurService collaborateurService;

	@Autowired
	private IPlanningService planningService;

	@GetMapping("/getPlanification")
	public List<Planification> getPlanificationByPlanning(Long idPlanning) {
		Planning planning = planningService.getPlanning(idPlanning);
		List<Planification> planifications = planificationService.getPlanificationByPlanning(planning);
		return planifications;
	}


	@PostMapping(value = "/addPlanification")
	public Planification addPlanification(@RequestBody AddPlanification addPlanification) {
		try {
			System.out.println("--------------------------------------------------");
			System.out.println(addPlanification.getProjets().toString());
			Planification planification = new Planification();
			Planning planning = planningService.getPlanning(addPlanification.getIdPlanning());

			for (Projet projet : addPlanification.getProjets()) {
				PlanificationId planificationId = new PlanificationId(projet, planning);
				planification = planificationService.addPlanification(new Planification(planificationId));
			}
			return planification;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

	@GetMapping("/getAllPlanification")
	public List<Planification> getAllPlanification() {
		return planificationService.getAllPlanification();
	}

}
