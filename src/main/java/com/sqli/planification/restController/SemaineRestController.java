package com.sqli.planification.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sqli.planification.model.Planning;
import com.sqli.planification.model.Semaine;
import com.sqli.planification.service.IPlanningService;
import com.sqli.planification.service.ISemaineService;
import com.sqli.planification.utils.DisplayMois;


@RestController
@CrossOrigin
@RequestMapping("/semaine")
public class SemaineRestController
{

	@Autowired
	private ISemaineService semaineService;

	@Autowired
	private IPlanningService planningService;

	@GetMapping("/getSemainesByPlanning")
	public List<Semaine> getSemainesByMoisEtAnnee(Long idPlanning)
	{
		Planning planning = planningService.getPlanning(idPlanning);
		List<Semaine> semaines = planningService.getSemainesByPlanning(planning);
		return semaines;
	}

	@GetMapping("/getMois")
	public List<DisplayMois> getMoisByPlanning(Long idPlanning)
	{
		Planning planning = planningService.getPlanning(idPlanning);
		return semaineService.getMoisByPlanning(planning);
	}

}
