package com.sqli.planification.service.impl;

import com.sqli.planification.dao.FileRepository;
import com.sqli.planification.model.File;
import com.sqli.planification.service.IFileService;
import com.sqli.planification.utils.IDataToExcel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by simoj on 04/06/2017.
 */

@Service
@Transactional
public class FileService implements IFileService {

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private IDataToExcel excel;

    @Override
    public File addFile(String nom, String type, Long idPlanning) {
        try {
            String result = "";
            if (type.equals("colab_projet"))
                result = excel.convertColabProjet(nom, idPlanning);
            else if (type.equals("colab"))
                result = excel.convertColab(nom, idPlanning);
            else if (type.equals("projet"))
                result = excel.convertProjet(nom, idPlanning);

            File file = getFileByNom(nom);
            if (file != null) {
                return file;
            } else {

                if (type.equals("colab_projet"))
                    file = new File("/download/colabProjet/" + nom + ".xls", nom, idPlanning,type);
                else if (type.equals("projet"))
                    file = new File("/download/projet/" + nom + ".xls", nom, idPlanning,type);
                else if (type.equals("colab"))
                    file = new File("/download/colab/" + nom + ".xls", nom, idPlanning,type);
                return fileRepository.save(file);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public File getFileByNom(String nom) {
        return fileRepository.getFileByNom(nom);
    }

    @Override
    public List<File> getFilesByIdPlanning(Long idPlanning) {
        return fileRepository.getFileByIdPlanning(idPlanning);
    }
}
