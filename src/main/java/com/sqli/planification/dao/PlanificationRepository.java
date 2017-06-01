package com.sqli.planification.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sqli.planification.model.Planification;
import com.sqli.planification.model.PlanificationId;

public interface PlanificationRepository extends JpaRepository<Planification, PlanificationId>
{

	
}
