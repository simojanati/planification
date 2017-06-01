package com.sqli.planification.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sqli.planification.dao.AnneeRepository;
import com.sqli.planification.dao.SemaineRepository;
import com.sqli.planification.model.Annee;
import com.sqli.planification.model.Mois;
import com.sqli.planification.model.Planning;
import com.sqli.planification.model.Semaine;
import com.sqli.planification.service.ISemaineService;
import com.sqli.planification.utils.Calendrier;
import com.sqli.planification.utils.DisplayMois;
import com.sqli.planification.utils.MoisAnnee;

@Service
public class SemaineService implements ISemaineService {
	@Autowired
	private SemaineRepository semaineRepository;

	@Autowired
	private AnneeRepository anneeRepository;

	@Autowired
	private PlanningService planningService;

	@Override
	@Transactional
	public void addSemainesByAnnee(List<Semaine> semaines, String annee) {
		if (getAnnee(annee) == null) {
			anneeRepository.save(new Annee(annee));
			for (Semaine semaine : semaines) {
				semaineRepository.save(semaine);
			}
		}

	}

	@Override
	@Transactional
	public List<DisplayMois> getMoisByPlanning(Planning planning) {
		List<Semaine> semaines = planningService.getSemainesByPlanning(planning);
		List<MoisAnnee> moisAnnee = new ArrayList<MoisAnnee>();
		List<DisplayMois> mois = new ArrayList<DisplayMois>();
		for (Semaine semaine : semaines) {
			if (!moisAnnee.contains(new MoisAnnee(semaine.getMois().getMois(), semaine.getAnnee().getAnnee()))) {
				moisAnnee.add(new MoisAnnee(semaine.getMois().getMois(), semaine.getAnnee().getAnnee()));
				mois.add(new DisplayMois(
						semaineRepository.getNbrSemaineByMoisAndAnnee(semaine.getMois(), semaine.getAnnee()),
						semaine.getMois().getMois(), semaine.getAnnee().getAnnee()));
				System.out.println("--------------> "
						+ semaineRepository.getNbrSemaineByMoisAndAnnee(semaine.getMois(), semaine.getAnnee()));
			}
		}
		return mois;
	}

	@Override
	@Transactional
	public List<Semaine> getSemainesByMoisEtAnnee(String moisDebut, String anneeDebut, String moisFin,
			String anneeFin) {
		boolean annee1Exist = false;
		boolean annee2Exist = false;
		Annee annee1 = new Annee(anneeDebut);
		Annee annee2 = new Annee(anneeFin);

		List<Annee> annees = anneeRepository.findAll();

		for (Annee annee : annees) {
			if (annee.equals(annee1)) {
				annee1Exist = true;
			}
			if (annee.equals(annee2)) {
				annee2Exist = true;
			}
		}
		List<Semaine> semaines = new ArrayList<>();
		if (annee1Exist == true && annee2Exist == true) {

			if (anneeDebut.equals(anneeFin)) {
				List<Mois> mois = new ArrayList<>();
				List<Semaine> semainesD = semaineRepository.findByAnnee(annee1);
				boolean existe = false;
				for (Semaine semaine : semainesD) {
					if (existe == false) {
						if (getMonthByNom(semaine.getMois().getMois()) == getMonthByNom(moisDebut)) {
							existe = true;
							for (int i = getMonthByNom(moisDebut); i <= getMonthByNom(moisFin); i++) {
								mois.add(new Mois(getMonthByNumber(i)));
							}

						}
					}
					for (Mois mois1 : mois) {
						if (semaine.getMois().equals(mois1))
							semaines.add(semaine);
					}
				}

			} else {
				int difAnnee = (Integer.valueOf(anneeFin) - Integer.valueOf(anneeDebut));

				List<Semaine> semainesD = semaineRepository.findByAnnee(annee1);
				List<Semaine> semainesF = semaineRepository.findByAnnee(annee2);

				List<Mois> moisD = new ArrayList<>();
				List<Mois> moisF = new ArrayList<>();

				boolean existeD = false;
				boolean existeF = false;

				for (Semaine semaine : semainesD) {
					if (existeD == false) {
						if (getMonthByNom(semaine.getMois().getMois()) == getMonthByNom(moisDebut)) {
							existeD = true;
							for (int i = getMonthByNom(moisDebut); i <= 12; i++) {
								moisD.add(new Mois(getMonthByNumber(i)));
							}
						}
					}
					for (Mois mois1 : moisD) {
						if (semaine.getMois().equals(mois1))
							semaines.add(semaine);
					}

				}
				if (difAnnee > 1) {
					for (int i = 1; i < difAnnee; i++) {
						String anneeAct = String.valueOf(Integer.valueOf(anneeDebut) + i);
						List<Semaine> semainesM = semaineRepository.findByAnnee(new Annee(anneeAct));
						for (Semaine semaine : semainesM) {
							semaines.add(semaine);
						}
					}
				}
				for (Semaine semaine : semainesF) {
					if (existeF == false) {
						existeF = true;
						for (int i = 1; i <= getMonthByNom(moisFin); i++) {
							moisF.add(new Mois(getMonthByNumber(i)));
						}

					}
					for (Mois mois1 : moisF) {
						if (semaine.getMois().equals(mois1))
							semaines.add(semaine);
					}
				}

			}
		} else {
			System.out.println("---------------------------------------else 2---------------------------------------");

			Calendrier calendrier = new Calendrier();

			if (annee1Exist == false) {
				System.out.println(
						"--------------------------------------- Anne 1---------------------------------------");

				calendrier.getSemaines(Integer.valueOf(anneeDebut));
				addSemainesByAnnee(calendrier.getSemaines(), anneeDebut);

			} else if (annee2Exist == false) {
				System.out.println(
						"--------------------------------------- Anne 1---------------------------------------");

				calendrier.getSemaines(Integer.valueOf(anneeFin));
				addSemainesByAnnee(calendrier.getSemaines(), anneeFin);

			}
			semaines = getSemainesByMoisEtAnnee(moisDebut, anneeDebut, moisFin, anneeFin);

		}
		return semaines;
	}

	@Override
	@Transactional
	public Annee getAnnee(String annee) {
		return anneeRepository.findOne(annee);
	}

	@Override
	@Transactional
	public List<Semaine> getSemaine(String annee) {
		List<Semaine> semaines = null;

		if (semaineRepository.findByAnnee(new Annee(annee)) != null) {
			semaines = semaineRepository.findByAnnee(new Annee(annee));
		}

		return semaines;
	}

	private static int getMonthByNom(String mois) {

		switch (mois) {
		case "Janvier":
			return 1;
		case "Février":
			return 2;
		case "Mars":
			return 3;
		case "Avril":
			return 4;
		case "Mai":
			return 5;
		case "Juin":
			return 6;
		case "Juillet":
			return 7;
		case "Août":
			return 8;
		case "Septembre":
			return 9;
		case "Octobre":
			return 10;
		case "Novembre":
			return 11;
		case "Décembre":
			return 12;
		default:
			return 0;
		}

	}

	private static String getMonthByNumber(int num) {

		switch (num) {
		case 1:
			return "Janvier";
		case 2:
			return "Février";
		case 3:
			return "Mars";
		case 4:
			return "Avril";
		case 5:
			return "Mai";
		case 6:
			return "Juin";
		case 7:
			return "Juillet";
		case 8:
			return "Août";
		case 9:
			return "Septembre";
		case 10:
			return "Octobre";
		case 11:
			return "Novembre";
		case 12:
			return "Décembre";

		default:
			return "n'exist pas";
		}

	}

	@Override
	public Semaine getSemainById(Long idSemaine) {
		return semaineRepository.findOne(idSemaine);
	}

}
