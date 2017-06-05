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

    @GetMapping("/getFile")
    public File getFile(@RequestParam("idPlanning") Long idPlanning, @RequestParam("type") String type) {

        String nom = "";

        if (type.equals("colab_projet"))
            nom = "FileCollaborateurProjet" + idPlanning;
        else if (type.equals("colab"))
            nom = "FileCollaborateur" + idPlanning;
        else if (type.equals("projet"))
            nom = "FileProjet" + idPlanning;
        System.out.println(type + " : " + nom);
        return fileService.addFile(nom, type, idPlanning);
    }

    @GetMapping("/getFilesByIdPlanning")
    public List<File> getFilesByIdPlanning(@RequestParam("idPlanning") Long idPlanning) {
        return fileService.getFilesByIdPlanning(idPlanning);
    }


}
