package com.sqli.planification.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sqli.planification.dao.PlanificationRepository;
import com.sqli.planification.model.Planification;
import com.sqli.planification.model.PlanificationId;
import com.sqli.planification.model.Planning;
import com.sqli.planification.service.IPlanificationService;

@Service
@Transactional
public class PlanificationService implements IPlanificationService {

	@Autowired
	private PlanificationRepository planificationRepository;

	@Override
	public Planification addPlanification(Planification planification) {
		return planificationRepository.save(planification);
	}

	@Override
	public void deletePlanification(PlanificationId planificationId) {
		planificationRepository.delete(planificationId);
	}

	@Override
	public List<Planification> getAllPlanification() {
		return planificationRepository.findAll();
	}

	@Override
	public List<Planification> getPlanificationByPlanning(Planning planning) {
		List<Planification> planifications = planificationRepository.findAll();
		List<Planification> planificationsByPlanning = new ArrayList<>();
		for (Planification planification : planifications) {
			if (planification.getPlanning().equals(planning)){
				planificationsByPlanning.add(planification);
			}
		}
		return planificationsByPlanning;
	}

}
