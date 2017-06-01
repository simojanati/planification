package com.sqli.planification.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sqli.planification.model.Annee;
import com.sqli.planification.model.Mois;
import com.sqli.planification.model.Semaine;


public interface SemaineRepository extends JpaRepository<Semaine, Long>
{

	public List<Semaine> findByAnnee(Annee annee);

	@Query(nativeQuery = true, value="SELECT count(*) FROM Semaine s WHERE s.mois=:x AND s.annee=:y")
	public int getNbrSemaineByMoisAndAnnee(@Param("x") Mois mois, @Param("y") Annee annee);

}
