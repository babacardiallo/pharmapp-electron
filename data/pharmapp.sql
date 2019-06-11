CREATE TABLE IF NOT EXISTS `associer` (
  `id` int(11) NOT NULL,
  `cip` varchar(13) NOT NULL,
  PRIMARY KEY (`id`,`cip`),
  KEY `FK_associer_cip` (`cip`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `chiffreaffaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(11) NOT NULL,
  `numsecu` char(15) DEFAULT NULL,
  `docid` int(11) DEFAULT NULL,
  `cip` varchar(13) NOT NULL,
  `quantite` int(11) NOT NULL,
  `prixtotal` float NOT NULL,
  `prixtotalreduit` float DEFAULT NULL,
  `datevente` date NOT NULL,
  `pharmaid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pharmaid` (`pharmaid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `classe` (
  `nom` varchar(75) NOT NULL,
  PRIMARY KEY (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `classe` (`nom`) VALUES
('Allergologie'),
('Anesthésie, réanimation'),
('Antalgiques'),
('Anti-inflammatoires'),
('Cancérologie et hématologie'),
('Cardiologie et angéiologie'),
('Contraception et interruption de grossesse'),
('Dermatologie'),
('Endocrinologie'),
('Gastro-entéro-hépatologie'),
('Gynécologie'),
('Hémostase et sang'),
('Immunologie'),
('Infectiologie - Parasitologie'),
('Métabolisme et nutrition'),
('Neurologie-psychiatrie'),
('Ophtalmologie'),
('Oto-rhino-laryngologie'),
('Pneumologie'),
('Produits diagnostiques ou autres produits thérapeutiques'),
('Rhumatologie'),
('Souches homéopathiques'),
('Stomatologie'),
('Toxicologie'),
('Urologie néphrologie');

CREATE TABLE IF NOT EXISTS `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `secu` char(15) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `datenaissance` date NOT NULL,
  `adresse` varchar(50) NOT NULL,
  `telephone` char(10) NOT NULL,
  `portable` char(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `ville` varchar(50) NOT NULL,
  `codepostal` char(5) NOT NULL,
  `regimeoblig` varchar(50) DEFAULT NULL,
  `ald` tinyint(1) NOT NULL,
  `invalidite` tinyint(1) NOT NULL,
  `accident` tinyint(1) NOT NULL,
  `regimecomp` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `regimeoblig` (`regimeoblig`),
  KEY `regimecomp` (`regimecomp`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `composer` (
  `id` int(11) NOT NULL,
  `id_Employe` int(11) NOT NULL,
  PRIMARY KEY (`id`,`id_Employe`),
  KEY `FK_composer_id_Employe` (`id_Employe`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `comprendre` (
  `cip` varchar(13) NOT NULL DEFAULT '',
  `principeactif` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`cip`,`principeactif`),
  KEY `FK_comprendre_principeactif` (`principeactif`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `contenir` (
  `id` int(11) NOT NULL,
  `cip` varchar(13) NOT NULL,
  PRIMARY KEY (`id`,`cip`),
  KEY `FK_contient_cip` (`cip`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `docteur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cabinet` varchar(50) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `adresse` varchar(70) NOT NULL,
  `codepostal` char(5) NOT NULL,
  `ville` varchar(40) NOT NULL,
  `telephone` char(10) NOT NULL,
  `fax` char(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `employe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `datenaissance` date NOT NULL,
  `telephone` char(10) NOT NULL,
  `portable` char(10) DEFAULT NULL,
  `adresse` varchar(100) DEFAULT NULL,
  `ville` varchar(50) DEFAULT NULL,
  `codepostal` char(5) DEFAULT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `forme` (
  `libelle` varchar(55) NOT NULL,
  PRIMARY KEY (`libelle`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `forme` (`libelle`) VALUES
('Autre'),
('Bâton'),
('Cachet'),
('Capsule à enveloppe molle'),
('Cataplasme'),
('Collyre'),
('Comprimé'),
('Comprimé avec applicateur buccal'),
('Crème'),
('Dragée'),
('Emplâtres médicamenteux'),
('Émulsion buvable'),
('Gel'),
('Gélule'),
('Gomme à mâcher'),
('Goutte otique'),
('Granulé'),
('Granules'),
('Infusion'),
('Inhalateur à poudre'),
('Inhalateur pressurisé à valve doseuse'),
('Insert ophtalmique'),
('Liniment'),
('Liquide oral'),
('Lotion'),
('Mousse'),
('Nébuliseur'),
('Ovule'),
('Pastille'),
('Pâte'),
('Pilule'),
('Pommade'),
('Poudre lyophilisée stérile pour injection'),
('Poudre orale ou pour application cutanée'),
('Sachet'),
('Shampooing'),
('Sirop'),
('Suppositoire'),
('Suspension buvable'),
('Systèmes transdermiques'),
('Vernis');

CREATE TABLE IF NOT EXISTS `laboratoire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `adresse` varchar(50) NOT NULL,
  `telephone` char(10) NOT NULL,
  `fax` char(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `ville` varchar(50) DEFAULT NULL,
  `codepostal` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `ordonnance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_ordo` date NOT NULL,
  `id_Client` int(11) NOT NULL,
  `id_Docteur` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Ordonnance_id_Client` (`id_Client`),
  KEY `FK_Ordonnance_id_Docteur` (`id_Docteur`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `pharmacie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(35) NOT NULL,
  `adresse` varchar(100) DEFAULT NULL,
  `telephone` char(10) DEFAULT NULL,
  `fax` char(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `ville` varchar(50) DEFAULT NULL,
  `codepostal` char(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `principeactif` (
  `nom` varchar(50) NOT NULL,
  PRIMARY KEY (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `principeactif` (`nom`) VALUES
('Abacavir'),
('Abatacept'),
('Abciximab'),
('Acamprosate'),
('Acarbose'),
('Acébutolol'),
('Acéclidine'),
('Acéclofénac'),
('Acédobène'),
('Acénocoumarol'),
('Acépromazine'),
('Acétarsol'),
('Acétazolamide'),
('Acétorphan'),
('Acétylcholine'),
('Acétylcystéine'),
('Acétylleucine'),
('Aciclovir'),
('Acide acétylsalicylique'),
('Acide acéxamique'),
('Acide alendronique'),
('Acide alginique'),
('Acide amidotrizoïque'),
('Acide ascorbique'),
('Acide aspartique'),
('Acide azélaïque'),
('Acide borique'),
('Acide canrénoïque'),
('Acide chondroïtine sulfurique'),
('Acide clavulanique'),
('Acide clodronique'),
('Acide cromoglicique'),
('Acide désoxyribonucléique'),
('Acide dimécrotique'),
('Acide édétique'),
('Acide étidronique'),
('Acide flavodique'),
('Acide folinique'),
('Acide folique'),
('Acide fusidique'),
('Acide gabodénique'),
('Acide gadopenténique'),
('Acide gadotérique'),
('Acide glutamique'),
('Acide gras oméga 3'),
('Acide ibandronique'),
('Acide ioxaglique'),
('Acide ioxitalamique'),
('Acide lactique'),
('Acide méfénamique'),
('Acide N-aspartylglutamique'),
('Acide nicotinique'),
('Acide niflumique'),
('Acide oxoglurique'),
('Acide pamidronique'),
('Acide panthoténique'),
('Acide para-aminobenzoïque'),
('Acide para-aminosalicylique'),
('Acide pipémidique'),
('Acide résidronique'),
('Acide salicylique'),
('Acide ténoïque'),
('Acide tiaprofénique'),
('Acide tiludronique'),
('Acide tranexamique'),
('Acide undécylénique'),
('Acide ursodésoxycholique'),
('Acide valproïque'),
('Acide zolédronique'),
('Acitrétine'),
('Acriflavine'),
('Actinoquinol'),
('Adalimumab'),
('Adapalène'),
('Adéfovir'),
('Adénine'),
('Adénosine'),
('Adesleukine'),
('Adrafinil'),
('Adrénaline'),
('Aescine'),
('Albendazole'),
('Albumine'),
('Alcool benzylique'),
('Alemtuzumab'),
('Alfacalcidol'),
('Alfentanil'),
('Alfuzosine'),
('Alimémazine'),
('Alizapride'),
('Allantoïne'),
('Allopurinol'),
('Alminiprofène'),
('Almitrine'),
('Almotriptan'),
('Aloès'),
('Alpha hydroxyvitamineD3'),
('Alpha-amylase'),
('Alpha-tocophérol'),
('Alprazolam'),
('Alprostadil'),
('Altéplase'),
('Altizide'),
('Altrétinoïne'),
('Aluminium'),
('Alvérine'),
('Amantadine'),
('Ambémonium chlorure'),
('Ambroxol'),
('Amifostine'),
('Amiloride'),
('Amiodarone'),
('Amisulpride'),
('Amitryptiline'),
('Amlodipine'),
('Amodiaquine'),
('Amorolfine'),
('Amoxapine'),
('Amoxicilline'),
('Amphotéricine B'),
('Ampicilline'),
('Amyléine'),
('Amylmétacrésol'),
('Anagrélide'),
('Anakinra'),
('Anastrozole'),
('Androstanolone'),
('Anétholtrithione'),
('Antithrombine humaine'),
('Apraclonidine'),
('Aprénavir'),
('Aprépitant'),
('Aprotinine'),
('Argent'),
('Arginine'),
('Aripiprazole'),
('Arnica extrait'),
('Arnica teinture'),
('Arsenic'),
('Artéméther'),
('Articaïne'),
('Asparaginase'),
('Atazanvir'),
('Aténolol'),
('Atorvastatine'),
('Atosiban'),
('Atovaquone'),
('Atracurium bésilate'),
('Atropine'),
('Auranofine'),
('Aurithiopropanolsulfonate'),
('Azathioprine'),
('Azélastine'),
('Azithromycine'),
('AZR'),
('Aztréonam'),
('Baclofene'),
('Benazapril'),
('Betahistine'),
('Bethamethasone'),
('Bicalutamide'),
('Bisoprolol'),
('Borax'),
('Bromazepam'),
('Bromocriptine'),
('Budesonide'),
('Buprenorphine'),
('Buspirone'),
('Candesartan'),
('Captopril'),
('Carbamazepine'),
('Carbidopa'),
('Carbocisteine'),
('Carvedilol'),
('Cefaclor'),
('Cefixime'),
('Cefpodoxime'),
('Cefuroxime'),
('Celiprolol'),
('Chlorhexidine'),
('Chlormadinone'),
('Ciclétanine'),
('Ciclopirox'),
('Ciclopiroxolamine'),
('Ciprofloxacine'),
('Citalopram'),
('Clarithromycine'),
('Clobétasol'),
('Clopidogrel'),
('Clozapine'),
('Codeine'),
('Cotrimoxazole'),
('Cyproterone'),
('Desloratadine'),
('Desogestrel'),
('Diacereine'),
('Diazepam'),
('Diclofenac'),
('Diltiazem'),
('Diosmine'),
('Domperidone'),
('Donezepil'),
('Dorzolamide'),
('Doxycycline'),
('Drosera teinture'),
('Ebastine'),
('Econazole'),
('Enalapril'),
('Esomeprazole'),
('Ethinylestradiol'),
('Exemestane'),
('Fenofibrate'),
('Fentanyl'),
('Fexofenadine'),
('Finasteride'),
('Flecainide'),
('Fluconazole'),
('Fluoxetine'),
('Fluvastatine'),
('Fosfomycine'),
('Fosinopril'),
('Furosemide'),
('Fusidate de sodium'),
('Gabapentine'),
('Gestodene'),
('Glibenclamide'),
('Glicazide'),
('Glimeripide'),
('Hexamidine'),
('Hexetidine'),
('Hydrochlorothiazide'),
('Hydrocortancyl'),
('Hydroxyzine'),
('Ibuprofene'),
('Indapamide'),
('Ipratropium'),
('Irbesartan'),
('Isotretinoine'),
('Ketoconazole'),
('Ketoprofene'),
('Lactulose'),
('Lamotrigine'),
('Lansoprazole'),
('Latanoprost'),
('Lercanidipine'),
('Levetiracetam'),
('Levocetirizine'),
('Levodopa'),
('Levofloxacine'),
('Levonorgestrel'),
('Levothyroxine'),
('Loperamide'),
('Loratadine'),
('Lorazepam'),
('Losartan'),
('Macrogol'),
('Madofinil'),
('Magnesium'),
('Manidipine'),
('Mebeverine'),
('Meloxicam'),
('Memantine'),
('Metformine'),
('Metoclopramide'),
('Metroprolol'),
('Mianserine'),
('Minoxidil'),
('Mirtazapine'),
('Molsidomine'),
('Montelukast'),
('Nebivolol'),
('Nifuroxazide'),
('Ofloxacine'),
('Olmesartan'),
('Omeprazole'),
('Ondansetron'),
('Oxomemazine'),
('Oxybutynine'),
('Pantoprazole'),
('Paracétamol'),
('Paroxetine'),
('Perindopril'),
('Phloroglucinol'),
('Pinaverium'),
('Piracetam'),
('Piroxicam'),
('Pravastatine'),
('Prazepam'),
('Prednisolone'),
('Prednisone'),
('Progesterone'),
('Propanolol'),
('Quinapril'),
('Quinine'),
('Rabeprazole'),
('Raloxifene'),
('Ramipril'),
('Ranitidine'),
('Repaglinide'),
('Rosuvastatine'),
('Sotalol'),
('Spiramycine'),
('Spironolactone'),
('Sulfamethoxazole'),
('Sulpiride'),
('Sumatriptan'),
('Tamoxifene'),
('Tamsulosine'),
('Terazosine'),
('Terbinafine'),
('Terbutaline'),
('Tetrazepam'),
('Thiocolchicoside'),
('Tiapride'),
('Timolol'),
('Tobramycine'),
('Topiramate'),
('Tramadol'),
('Trimebutine'),
('Trimetadizine'),
('Trolamine'),
('Valaciclovir'),
('Valproate de sodium'),
('Valsartan'),
('Venlafaxine'),
('Verapimil'),
('Zolmitriptan'),
('Zolpidem'),
('Zopiclone');

CREATE TABLE IF NOT EXISTS `prix` (
  `datechange` date NOT NULL,
  `prix` float DEFAULT NULL,
  `cip` varchar(13) NOT NULL,
  PRIMARY KEY (`datechange`,`cip`),
  KEY `FK_Prix_cip` (`cip`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `produit` (
  `cip` varchar(13) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `description` text,
  `boitede` int(11) DEFAULT NULL,
  `dosage` int(11) DEFAULT NULL,
  `nom_Classe` varchar(35) NOT NULL,
  `libelle` varchar(25) NOT NULL,
  `quantite` int(11) NOT NULL,
  `couleur` varchar(15) NOT NULL,
  PRIMARY KEY (`cip`),
  KEY `FK_Produit_quantite` (`quantite`),
  KEY `FK_Produit_nom_Classe` (`nom_Classe`),
  KEY `FK_Produit_libelle` (`libelle`),
  KEY `FK_Produit_couleur` (`couleur`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `regimecomp` (
  `nom` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `regimecomp` (`nom`) VALUES
(' Harmonie Mutuelle'),
('AG2R La Mondiale'),
('Allianz'),
('AXA'),
('Covéa (MAAF, MMA, GMF)'),
('Eovi MCD Mutuelle'),
('Generali'),
('Groupama GAN'),
('Groupe BTP Prévoyance'),
('Groupe des Assurances du Crédit Mutuel'),
('Groupe Humanis'),
('Groupe Istya'),
('Groupe Malakoff Médéric'),
('La Mutuelle Générale'),
('Swiss Life Prévoyance et Santé');

CREATE TABLE IF NOT EXISTS `regimeoblig` (
  `nom` varchar(50) NOT NULL,
  PRIMARY KEY (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `regimeoblig` (`nom`) VALUES
('CPAM'),
('LMDE'),
('MEP');

CREATE TABLE IF NOT EXISTS `relier` (
  `id` int(11) NOT NULL,
  `id_Laboratoire` int(11) NOT NULL,
  PRIMARY KEY (`id`,`id_Laboratoire`),
  KEY `FK_relier_id_Laboratoire` (`id_Laboratoire`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `vignette` (
  `couleur` varchar(15) NOT NULL,
  `pourcentage` float DEFAULT NULL,
  PRIMARY KEY (`couleur`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `vignette` (`couleur`, `pourcentage`) VALUES
('Blanche', 0.65),
('Blanche barrée', 1),
('Bleue', 0.3),
('Orange', 0.15),
('Pas de couleur', NULL);

--
-- Contraintes pour la table `associer`
--
ALTER TABLE `associer`
  ADD CONSTRAINT `FK_associer_cip` FOREIGN KEY (`cip`) REFERENCES `produit` (`cip`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_associer_id` FOREIGN KEY (`id`) REFERENCES `ordonnance` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `chiffreaffaire`
--
ALTER TABLE `chiffreaffaire`
  ADD CONSTRAINT `FK_pharmacie_id` FOREIGN KEY (`pharmaid`) REFERENCES `pharmacie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `FK_regimecomp_nom` FOREIGN KEY (`regimecomp`) REFERENCES `regimecomp` (`nom`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_regimeoblig_nom` FOREIGN KEY (`regimeoblig`) REFERENCES `regimeoblig` (`nom`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `composer`
--
ALTER TABLE `composer`
  ADD CONSTRAINT `FK_composer_id` FOREIGN KEY (`id`) REFERENCES `pharmacie` (`id`),
  ADD CONSTRAINT `FK_composer_id_Employe` FOREIGN KEY (`id_Employe`) REFERENCES `employe` (`id`);

--
-- Contraintes pour la table `comprendre`
--
ALTER TABLE `comprendre`
  ADD CONSTRAINT `FK_comprendre_cip` FOREIGN KEY (`cip`) REFERENCES `produit` (`cip`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_comprendre_principeactif` FOREIGN KEY (`principeactif`) REFERENCES `principeactif` (`nom`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `contenir`
--
ALTER TABLE `contenir`
  ADD CONSTRAINT `FK_contenir_id` FOREIGN KEY (`id`) REFERENCES `pharmacie` (`id`),
  ADD CONSTRAINT `FK_contient_cip` FOREIGN KEY (`cip`) REFERENCES `produit` (`cip`);

--
-- Contraintes pour la table `ordonnance`
--
ALTER TABLE `ordonnance`
  ADD CONSTRAINT `FK_Ordonnance_id_Client` FOREIGN KEY (`id_Client`) REFERENCES `client` (`id`),
  ADD CONSTRAINT `FK_Ordonnance_id_Docteur` FOREIGN KEY (`id_Docteur`) REFERENCES `docteur` (`id`);

--
-- Contraintes pour la table `prix`
--
ALTER TABLE `prix`
  ADD CONSTRAINT `FK_Prix_cip` FOREIGN KEY (`cip`) REFERENCES `produit` (`cip`);

--
-- Contraintes pour la table `produit`
--
ALTER TABLE `produit`
  ADD CONSTRAINT `FK_Produit_couleur` FOREIGN KEY (`couleur`) REFERENCES `vignette` (`couleur`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Produit_libelle` FOREIGN KEY (`libelle`) REFERENCES `forme` (`libelle`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Produit_nom_Classe` FOREIGN KEY (`nom_Classe`) REFERENCES `classe` (`nom`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `relier`
--
ALTER TABLE `relier`
  ADD CONSTRAINT `FK_relier_id` FOREIGN KEY (`id`) REFERENCES `pharmacie` (`id`),
  ADD CONSTRAINT `FK_relier_id_Laboratoire` FOREIGN KEY (`id_Laboratoire`) REFERENCES `laboratoire` (`id`);