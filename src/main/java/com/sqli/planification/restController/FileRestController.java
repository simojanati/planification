package com.sqli.planification.restController;

import com.sqli.planification.model.File;
import com.sqli.planification.model.Projet;
import com.sqli.planification.service.IFileService;
import com.sqli.planification.service.IProjetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/file")
public class FileRestController {
    @Autowired
    private IFileService fileService;

    @GetMapping("/getFileCollabAndProjet")
    public File getFile(@RequestParam("idPlanning") Long idPlanning) {
        String nom = "FileCollaborateurProjet" + idPlanning;
        return fileService.addFile(nom, idPlanning);
    }


}
