CREATE DATABASE IF NOT EXISTS reassurance_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE reassurance_db;

-- ============================================================
-- RÉFÉRENTIEL
-- ============================================================

CREATE TABLE IF NOT EXISTS branche (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL,
  libelle VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sous_branche (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL,
  libelle VARCHAR(255) NOT NULL,
  branche_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (branche_id) REFERENCES branche(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS campagne (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL,
  libelle VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- ============================================================
-- ACTEURS
-- ============================================================

CREATE TABLE IF NOT EXISTS region (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL,
  libelle VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS pays (
  id INT AUTO_INCREMENT PRIMARY KEY,
  indicatif VARCHAR(50) NOT NULL,
  code VARCHAR(50) NOT NULL,
  libelle VARCHAR(255) NOT NULL,
  region_id INT NULL,
  FOREIGN KEY (region_id) REFERENCES region(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS domaine_activite (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL,
  libelle VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS acteur (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sigle VARCHAR(50) NOT NULL,
  raison_sociale VARCHAR(255) NOT NULL,
  email VARCHAR(255) NULL,
  is_courtier BOOLEAN DEFAULT FALSE,
  is_compagnie_assurance BOOLEAN DEFAULT FALSE,
  is_reassureur BOOLEAN DEFAULT FALSE,
  pays_id INT NULL,
  domaine_activite_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pays_id) REFERENCES pays(id) ON DELETE SET NULL,
  FOREIGN KEY (domaine_activite_id) REFERENCES domaine_activite(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS assure (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sigle VARCHAR(50) NOT NULL,
  raison_sociale VARCHAR(255) NOT NULL,
  email VARCHAR(255) NULL,
  acteur_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (acteur_id) REFERENCES acteur(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS contact (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenoms VARCHAR(100) NOT NULL,
  email VARCHAR(255) NULL,
  numero_telephone VARCHAR(50) NULL,
  acteur_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (acteur_id) REFERENCES acteur(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- POLICE
-- ============================================================

CREATE TABLE IF NOT EXISTS police (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sous_branche_id INT NOT NULL,
  branche_id INT NOT NULL,
  acteur_cedante_id INT NOT NULL,
  acteur_courtier_id INT NULL,
  id_assure INT NULL,
  numero VARCHAR(100) NOT NULL,
  is_cession BOOLEAN DEFAULT FALSE,
  is_reconduction_tacite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sous_branche_id) REFERENCES sous_branche(id),
  FOREIGN KEY (branche_id) REFERENCES branche(id),
  FOREIGN KEY (acteur_cedante_id) REFERENCES acteur(id),
  FOREIGN KEY (acteur_courtier_id) REFERENCES acteur(id) ON DELETE SET NULL,
  FOREIGN KEY (id_assure) REFERENCES assure(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- FLUX FINANCIER - Tables de référence
-- ============================================================

CREATE TABLE IF NOT EXISTS mouvement (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL,
  libelle VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS nature_cession (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL,
  libelle VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS compte_type (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL,
  libelle VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- QUITTANCE
-- ============================================================

CREATE TABLE IF NOT EXISTS quittance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mouvement_id INT NULL,
  police_id INT NOT NULL,
  devise_id INT NULL,
  numero VARCHAR(100) NOT NULL,
  is_cession BOOLEAN DEFAULT FALSE,
  is_proportionnel BOOLEAN DEFAULT FALSE,
  is_fac BOOLEAN DEFAULT FALSE,
  date_emission DATE NULL,
  date_effet DATE NULL,
  date_echeance DATE NULL,
  cours_devise FLOAT NULL,
  avis_echeance INT NULL,
  capitaux DECIMAL(15,2) DEFAULT 0,
  lci DECIMAL(15,2) DEFAULT 0,
  smp DECIMAL(15,2) DEFAULT 0,
  limite DECIMAL(15,2) DEFAULT 0,
  retention DECIMAL(15,2) DEFAULT 0,
  conservation DECIMAL(15,2) DEFAULT 0,
  capacite DECIMAL(15,2) DEFAULT 0,
  estimation_prime DECIMAL(15,2) DEFAULT 0,
  taux_cedante FLOAT DEFAULT 0,
  taux_accepte FLOAT DEFAULT 0,
  taux_commission FLOAT DEFAULT 0,
  taxe_sur_commission FLOAT DEFAULT 0,
  prime_brute DECIMAL(15,2) DEFAULT 0,
  prime_nette DECIMAL(15,2) DEFAULT 0,
  taxe_sur_prime DECIMAL(15,2) DEFAULT 0,
  nombre_echeance_pmd INT DEFAULT 0,
  sinistre_au_comptant DECIMAL(15,2) DEFAULT 0,
  avis_sinistre DECIMAL(15,2) DEFAULT 0,
  aliment DECIMAL(15,2) DEFAULT 0,
  is_annule BOOLEAN DEFAULT FALSE,
  id_quittance_annule INT NULL,
  acteur_id INT NULL,
  campagne_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (mouvement_id) REFERENCES mouvement(id) ON DELETE SET NULL,
  FOREIGN KEY (police_id) REFERENCES police(id),
  FOREIGN KEY (acteur_id) REFERENCES acteur(id) ON DELETE SET NULL,
  FOREIGN KEY (campagne_id) REFERENCES campagne(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- QUITTANCE CESSION
-- ============================================================

CREATE TABLE IF NOT EXISTS quittance_cession (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quittance_id INT NOT NULL,
  acteur_id INT NOT NULL,
  nature_cession_id INT NULL,
  taux FLOAT DEFAULT 0,
  is_cession BOOLEAN DEFAULT FALSE,
  is_proportionnel BOOLEAN DEFAULT FALSE,
  is_fac BOOLEAN DEFAULT FALSE,
  is_annule BOOLEAN DEFAULT FALSE,
  id_quittance_cession_annule INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (quittance_id) REFERENCES quittance(id),
  FOREIGN KEY (acteur_id) REFERENCES acteur(id),
  FOREIGN KEY (nature_cession_id) REFERENCES nature_cession(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- OBJET ASSURE
-- ============================================================

CREATE TABLE IF NOT EXISTS objet_assure (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quittance_id INT NOT NULL,
  libelle VARCHAR(255) NOT NULL,
  FOREIGN KEY (quittance_id) REFERENCES quittance(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- BORDEREAU
-- ============================================================

CREATE TABLE IF NOT EXISTS bordereau (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bordereau_reference VARCHAR(100) NULL,
  quittance_id INT NULL,
  quittance_cession_id INT NULL,
  montant DECIMAL(15,2) DEFAULT 0,
  is_cession BOOLEAN DEFAULT FALSE,
  is_proportionnel BOOLEAN DEFAULT FALSE,
  is_manuel BOOLEAN DEFAULT FALSE,
  is_annule BOOLEAN DEFAULT FALSE,
  bordereau_annule_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (quittance_id) REFERENCES quittance(id) ON DELETE SET NULL,
  FOREIGN KEY (quittance_cession_id) REFERENCES quittance_cession(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- ECHEANCE PMD
-- ============================================================

CREATE TABLE IF NOT EXISTS echeance_pmd (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quittance_id INT NULL,
  quittance_cession_id INT NULL,
  acteur_id INT NULL,
  numero_tranche INT DEFAULT 1,
  date_echeance DATE NULL,
  prime DECIMAL(15,2) DEFAULT 0,
  is_cession BOOLEAN DEFAULT FALSE,
  is_annule BOOLEAN DEFAULT FALSE,
  id_echeance_pmd_annule INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (quittance_id) REFERENCES quittance(id) ON DELETE SET NULL,
  FOREIGN KEY (quittance_cession_id) REFERENCES quittance_cession(id) ON DELETE SET NULL,
  FOREIGN KEY (acteur_id) REFERENCES acteur(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- COMPTE TRAITE
-- ============================================================

CREATE TABLE IF NOT EXISTS compte_traite (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quittance_retro_cession_id INT NULL,
  compte_type_id INT NOT NULL,
  acteur_id INT NOT NULL,
  devise_id INT NULL,
  cours_devise DECIMAL(10,4) DEFAULT 0,
  is_cession BOOLEAN DEFAULT FALSE,
  is_proportionnel BOOLEAN DEFAULT FALSE,
  is_en_notre_faveur BOOLEAN DEFAULT FALSE,
  is_annule BOOLEAN DEFAULT FALSE,
  id_compte_traite_annule INT NULL,
  solde DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (compte_type_id) REFERENCES compte_type(id),
  FOREIGN KEY (acteur_id) REFERENCES acteur(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS compte_traite_detail (
  id INT AUTO_INCREMENT PRIMARY KEY,
  compte_traite_id INT NOT NULL,
  code_rubrique VARCHAR(50) NOT NULL,
  libelle_rubrique VARCHAR(255) NOT NULL,
  debit DECIMAL(15,2) DEFAULT 0,
  credit DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (compte_traite_id) REFERENCES compte_traite(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- NOTE DEBIT CREDIT
-- ============================================================

CREATE TABLE IF NOT EXISTS note_debit_credit (
  id INT AUTO_INCREMENT PRIMARY KEY,
  note_debit_credit_reference VARCHAR(100) NULL,
  quittance_id INT NULL,
  quittance_cession_id INT NULL,
  reference INT NULL,
  bordereau_id INT NULL,
  compte_traite_id INT NULL,
  echeance_pmd_id INT NULL,
  sinistre_id INT NULL,
  sinistre_evaluation INT NULL,
  is_bordereau BOOLEAN DEFAULT FALSE,
  is_echeance_pmd BOOLEAN DEFAULT FALSE,
  is_compte BOOLEAN DEFAULT FALSE,
  is_cession BOOLEAN DEFAULT FALSE,
  is_proportionnel BOOLEAN DEFAULT FALSE,
  is_fac BOOLEAN DEFAULT FALSE,
  is_sinistre BOOLEAN DEFAULT FALSE,
  is_debit BOOLEAN DEFAULT FALSE,
  montant DECIMAL(15,2) DEFAULT 0,
  is_annule BOOLEAN DEFAULT FALSE,
  note_debit_credit_id_annule INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (quittance_id) REFERENCES quittance(id) ON DELETE SET NULL,
  FOREIGN KEY (quittance_cession_id) REFERENCES quittance_cession(id) ON DELETE SET NULL,
  FOREIGN KEY (bordereau_id) REFERENCES bordereau(id) ON DELETE SET NULL,
  FOREIGN KEY (compte_traite_id) REFERENCES compte_traite(id) ON DELETE SET NULL,
  FOREIGN KEY (echeance_pmd_id) REFERENCES echeance_pmd(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- REGLEMENT
-- ============================================================

CREATE TABLE IF NOT EXISTS reglement (
  id INT AUTO_INCREMENT PRIMARY KEY,
  acteur_id INT NOT NULL,
  is_courtier BOOLEAN DEFAULT FALSE,
  montant DECIMAL(15,2) DEFAULT 0,
  is_annule BOOLEAN DEFAULT FALSE,
  reglement_annule_id INT NULL,
  note_debit_credit_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (acteur_id) REFERENCES acteur(id),
  FOREIGN KEY (note_debit_credit_id) REFERENCES note_debit_credit(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS reglement_detail (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reglement_id INT NOT NULL,
  note_debit_credit_id INT NOT NULL,
  FOREIGN KEY (reglement_id) REFERENCES reglement(id) ON DELETE CASCADE,
  FOREIGN KEY (note_debit_credit_id) REFERENCES note_debit_credit(id)
) ENGINE=InnoDB;

-- ============================================================
-- SINISTRE
-- ============================================================

CREATE TABLE IF NOT EXISTS sinistre_statut (
  id INT AUTO_INCREMENT PRIMARY KEY,
  libelle VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sinistre_type_evaluation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL,
  libelle VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sinistre_declaration (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sinistre_statut_id INT NOT NULL,
  numero VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sinistre_statut_id) REFERENCES sinistre_statut(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sinistre_evaluation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sinistre_declaration_id INT NOT NULL,
  sinistre_type_evaluation_id INT NOT NULL,
  devise_id INT NULL,
  cours_devise FLOAT NULL,
  montant DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sinistre_declaration_id) REFERENCES sinistre_declaration(id),
  FOREIGN KEY (sinistre_type_evaluation_id) REFERENCES sinistre_type_evaluation(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sinistre_quittance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sinistre_declaration_id INT NOT NULL,
  quittance_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sinistre_declaration_id) REFERENCES sinistre_declaration(id),
  FOREIGN KEY (quittance_id) REFERENCES quittance(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sinistre_reglement (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sinistre_declaration_id INT NOT NULL,
  acteur_cedante_id INT NOT NULL,
  acteur_courtier_id INT NULL,
  devise_id INT NULL,
  cours_devise FLOAT NULL,
  montant DECIMAL(15,2) DEFAULT 0,
  is_annule BOOLEAN DEFAULT FALSE,
  id_sinistre_reglement_annule INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sinistre_declaration_id) REFERENCES sinistre_declaration(id),
  FOREIGN KEY (acteur_cedante_id) REFERENCES acteur(id),
  FOREIGN KEY (acteur_courtier_id) REFERENCES acteur(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sinistre_reglement_detail (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sinistre_reglement_id INT NOT NULL,
  sinistre_evaluation_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sinistre_reglement_id) REFERENCES sinistre_reglement(id) ON DELETE CASCADE,
  FOREIGN KEY (sinistre_evaluation_id) REFERENCES sinistre_evaluation(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sinistre_reglement_cession (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sinistre_id INT NOT NULL,
  sinistre_reglement_id INT NOT NULL,
  devise_id INT NULL,
  cours_devise FLOAT NULL,
  montant DECIMAL(15,2) DEFAULT 0,
  is_annule BOOLEAN DEFAULT FALSE,
  id_sinistre_reglement_cession_annule INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sinistre_reglement_id) REFERENCES sinistre_reglement(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sinistre_reglement_cession_detail (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sinistre_reglement_detail_id INT NOT NULL,
  sinistre_evaluation_id INT NOT NULL,
  sinistre_reglement_cession_id INT NOT NULL,
  devise_id INT NULL,
  cours_devise FLOAT NULL,
  montant DECIMAL(15,2) DEFAULT 0,
  is_annule BOOLEAN DEFAULT FALSE,
  id_sinistre_reglement_detail_cession_annule INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sinistre_reglement_detail_id) REFERENCES sinistre_reglement_detail(id),
  FOREIGN KEY (sinistre_evaluation_id) REFERENCES sinistre_evaluation(id),
  FOREIGN KEY (sinistre_reglement_cession_id) REFERENCES sinistre_reglement_cession(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sinistre_evaluation_quittance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quittance_id INT NOT NULL,
  sinistre_id INT NOT NULL,
  sinistre_type_evaluation_id INT NOT NULL,
  devise_id INT NULL,
  cours_devise FLOAT NULL,
  montant DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (quittance_id) REFERENCES quittance(id),
  FOREIGN KEY (sinistre_id) REFERENCES sinistre_evaluation(id),
  FOREIGN KEY (sinistre_type_evaluation_id) REFERENCES sinistre_type_evaluation(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sinistre_evaluation_quittance_cession (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quittance_id INT NOT NULL,
  quittance_cession_id INT NOT NULL,
  sinistre_type_evaluation_id INT NOT NULL,
  sinistre_id INT NOT NULL,
  sinistre_evaluation_id INT NOT NULL,
  devise_id INT NULL,
  cours_devise FLOAT NULL,
  montant DECIMAL(15,2) DEFAULT 0,
  is_annule BOOLEAN DEFAULT FALSE,
  sinistre_evaluation_cession_id_annule INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (quittance_id) REFERENCES sinistre_evaluation_quittance(id),
  FOREIGN KEY (quittance_cession_id) REFERENCES quittance_cession(id),
  FOREIGN KEY (sinistre_type_evaluation_id) REFERENCES sinistre_type_evaluation(id),
  FOREIGN KEY (sinistre_evaluation_id) REFERENCES sinistre_evaluation(id)
) ENGINE=InnoDB;

-- ============================================================
-- INFRASTRUCTURE
-- ============================================================

CREATE TABLE IF NOT EXISTS infrastructure (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  description VARCHAR(255) NULL,
  type VARCHAR(100) NOT NULL,
  url VARCHAR(255) NULL
) ENGINE=InnoDB;