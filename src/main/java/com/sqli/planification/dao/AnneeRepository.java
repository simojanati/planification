package com.sqli.planification.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sqli.planification.model.Annee;


public interface AnneeRepository extends JpaRepository<Annee, String>
{

}
