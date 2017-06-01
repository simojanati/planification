package com.sqli.planification.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sqli.planification.model.CollaborateurProjet;
import com.sqli.planification.model.CollaborateurProjetId;

public interface CollaborateurProjetRepository extends JpaRepository<CollaborateurProjet, CollaborateurProjetId>
{
	
			
	@Query(nativeQuery = true, value = "SELECT cp.* FROM collaborateur_projet cp,projet p,planification pl WHERE p.id_projet = pl.id_projet and p.id_projet=cp.id_projet and pl.id_planning = :x order by cp.id_projet")
	public List<CollaborateurProjet> getCollaborateurProjetsByPlanning(@Param("x") Long idPlanning);
}
