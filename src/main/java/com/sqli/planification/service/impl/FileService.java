package com.sqli.planification.service.impl;

import com.sqli.planification.dao.FileRepository;
import com.sqli.planification.model.File;
import com.sqli.planification.service.IFileService;
import com.sqli.planification.utils.IDataToExcel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public File addFile(String nom, Long idPlanning) {
        try {
            String path = excel.convert2(nom, idPlanning);
            System.out.println(idPlanning + " - " + nom + " - " + path);
            File file = getFileByNom(nom);
            if (file != null) {
                return file;
            } else {
                file = new File(path, nom);
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
}
