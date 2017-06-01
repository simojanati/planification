package com.sqli.planification.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sqli.planification.model.Affecter;
import com.sqli.planification.model.AffecterId;


public interface AffecterRepository extends JpaRepository<Affecter, AffecterId>
{
	@Query(nativeQuery = true, value = "SELECT * FROM affect a WHERE a.id_collaborateur=:x AND a.id_semaine=:y")
	public List<Affecter> getAffectationByCollabAndSemaine(@Param("x") Long idCollaborateur, @Param("y") Long idSemaine);

	@Query(nativeQuery = true, value = "SELECT * FROM affect a WHERE a.id_collaborateur=:x AND a.id_projet=:y")
	public List<Affecter> getAffeterByCollabAndProjet(@Param("x") Long idCollaborateur, @Param("y") Long idProjet);
	
	@Query(nativeQuery = true, value = "SELECT a.* FROM affect a,planification pl where a.id_projet=pl.id_projet and pl.id_planning=:x")
	public List<Affecter> getAffeter(@Param("x") Long idPlanning);

}
