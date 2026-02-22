# ClassConnect – Plateforme éducative numérique

**Documentation technique et fonctionnelle**  
Version 1.0

---

## Table des matières

1. [Présentation générale du projet](#1-présentation-générale-du-projet)
2. [Fonctionnalités principales](#2-fonctionnalités-principales)
3. [Parcours utilisateur](#3-parcours-utilisateur)
4. [Structure de la plateforme](#4-structure-de-la-plateforme)
5. [Sécurité et gestion des données](#5-sécurité-et-gestion-des-données)
6. [Avantages de ClassConnect](#6-avantages-de-classconnect)
7. [Évolutivité et perspectives](#7-évolutivité-et-perspectives)

---

## 1. Présentation générale du projet

### Contexte et problème que ClassConnect résout

Les établissements scolaires doivent aujourd’hui gérer de nombreuses tâches en parallèle : diffusion des cours, suivi des devoirs, évaluations, annonces, calendrier et communication. Ces activités sont souvent réparties entre plusieurs outils (courriels, logiciels de vie scolaire, espaces de stockage), ce qui complique le travail des équipes et la visibilité des élèves et des familles.

**ClassConnect** répond à ce besoin en proposant **un seul espace numérique** où sont regroupés les cours, les devoirs, les évaluations, les avis et le calendrier scolaire. L’objectif est de simplifier le quotidien des acteurs de l’école tout en garantissant un accès sécurisé et adapté à chaque profil.

### Objectifs principaux de la plateforme

- **Centraliser** les ressources pédagogiques (cours, devoirs, quiz) et les informations de vie scolaire (avis, dates importantes, programme de l’année).
- **Faciliter** la création et la diffusion des contenus pour les professeurs, et l’accès aux cours et devoirs pour les élèves.
- **Sécuriser** les données et les échanges grâce à une authentification par code unique et un contrôle strict des accès selon le rôle (administrateur, professeur, élève).
- **Structurer** le suivi pédagogique : soumission des devoirs, correction, attribution des notes et consultation des résultats par les élèves.

### Public cible

| Public | Description |
|--------|-------------|
| **Administration scolaire** | Personnes en charge de la gestion de l’établissement : création des comptes (élèves et professeurs), diffusion des avis et des dates importantes, consultation des statistiques globales. |
| **Professeurs** | Enseignants qui créent et publient des cours, des devoirs et des quiz, corrigent les travaux, attribuent les notes et communiquent les avis à leurs classes. |
| **Élèves** | Élèves qui consultent les cours, rendent leurs devoirs, passent les évaluations et suivent leurs notes et le calendrier scolaire. |
| **Parents** | La plateforme actuelle ne propose pas encore de compte dédié aux parents. Les informations destinées aux familles (réunions parents-professeurs, avis importants) peuvent être relayées via les avis et le calendrier consultables par les élèves, ou faire l’objet d’une évolution future (espace parent, codes d’accès famille). |

---

## 2. Fonctionnalités principales

### 2.1 Fonctionnalités pour les administrateurs

| Fonctionnalité | Description | Exemple d’usage |
|----------------|-------------|-----------------|
| **Tableau de bord** | Vue d’ensemble avec des indicateurs : nombre d’élèves et de professeurs actifs, élèves bloqués, nombre d’avis et de dates importantes. Affiche aussi les derniers comptes créés et les changements de statut récents. | L’administrateur ouvre le tableau de bord pour avoir une vision globale de l’activité de la plateforme. |
| **Gestion des élèves** | Liste des élèves, modification des informations, activation ou blocage des comptes. Possibilité de préciser une raison de blocage. | Un élève quitte l’établissement : l’admin bloque son compte et indique « Fin de scolarité ». |
| **Gestion des professeurs** | Liste des professeurs, modification des informations, activation ou blocage des comptes. | Un professeur est en arrêt : son compte peut être temporairement bloqué. |
| **Création de comptes** | Création de comptes élève ou professeur. La plateforme génère automatiquement un **code de connexion unique** (format type INS-XXXXXX) et un mot de passe. Ces identifiants sont à communiquer de manière sécurisée à l’utilisateur. | En début d’année, l’admin crée les comptes de tous les élèves de 6e et remet les codes aux professeurs principaux pour distribution. |
| **Identifiants** | Consultation et régénération des codes de connexion pour les élèves et les professeurs. Utile en cas de perte ou de changement de code. | Un élève a perdu son code : l’admin régénère un nouveau code et le transmet via un canal sécurisé. |
| **Avis** | Publication d’annonces à destination des élèves et/ou des professeurs. Les avis peuvent être marqués comme urgents et ciblés par classe si besoin. | Annonce d’une réunion parents-professeurs ou d’un changement d’emploi du temps pour une classe donnée. |
| **Dates importantes** | Gestion du calendrier scolaire : examens, vacances, réunions, événements. Ces dates sont visibles par les professeurs et les élèves. | Saisie des dates de conseils de classe et des vacances pour que tout le monde les voie au même endroit. |
| **Programme de l’année** | Définition et partage du programme annuel (objectifs, thèmes, planning). Consultable par les professeurs et les élèves. | L’admin ou un responsable pédagogique met en ligne le programme de l’année pour chaque niveau ou matière. |

### 2.2 Fonctionnalités pour les professeurs

| Fonctionnalité | Description | Exemple d’usage |
|----------------|-------------|-----------------|
| **Tableau de bord** | Vue d’ensemble des cours, devoirs et quiz, avec accès rapide aux dernières activités. | Le professeur voit en un coup d’œil combien de fiches de cours, devoirs et quiz sont en ligne et peut accéder aux détails. |
| **Fiches de cours** | Création et publication de cours avec titre, description, matière, contenu texte et pièce jointe optionnelle (document PDF, etc.). Les cours peuvent être associés à une classe. | Publication d’une fiche « Pythagore » en mathématiques pour la 4e A avec un PDF d’exercices. |
| **Devoirs** | Création de devoirs avec titre, description, matière, date limite de rendu et barème (points). Les devoirs sont assignés à une ou plusieurs classes. | Devoir « Rédaction chapitre 3 » en français pour les 5e, à rendre avant le 15 mars, sur 20 points. |
| **Quiz et évaluations** | Création de quiz avec des questions (stockées de manière structurée), durée limitée en minutes, barème total et date limite. Les quiz peuvent être notés automatiquement ou manuellement. | Quiz de 10 questions en histoire-géographie, 15 minutes, barème sur 20, à faire avant la fin de la semaine. |
| **Correction et notes** | Consultation des copies et des réponses aux quiz soumis par les élèves, saisie des notes et des commentaires. Les élèves voient ensuite leur note et le retour du professeur. | Le professeur ouvre la liste des soumissions pour un devoir, corrige chaque copie, met une note et un commentaire. |
| **Avis** | Publication d’annonces à destination des élèves (éventuellement par classe). | Annonce « Contrôle de mathématiques jeudi 10h » pour la 4e B. |
| **Dates importantes** | Consultation du calendrier scolaire (dates importantes et événements). Certaines plateformes permettent aussi aux professeurs de proposer des dates ; ici, la priorité est la consultation. | Vérification des dates de vacances et des examens avant de planifier un devoir. |
| **Programme de l’année** | Consultation du programme annuel défini par l’administration. | Le professeur s’aligne sur le programme pour construire ses séquences. |

### 2.3 Fonctionnalités pour les élèves

| Fonctionnalité | Description | Exemple d’usage |
|----------------|-------------|-----------------|
| **Vue d’ensemble (tableau de bord)** | Récapitulatif : nombre de fiches de cours, devoirs et évaluations disponibles, avis et dates importantes. Affichage des derniers cours et du dernier avis. | L’élève se connecte et voit immédiatement les nouveautés et ce qu’il doit faire. |
| **Fiches de cours** | Consultation des cours publiés par les professeurs, filtrés par sa classe. Possibilité d’ouvrir le détail d’un cours (contenu et pièce jointe). | Révision du cours de SVT « La cellule » avant un contrôle. |
| **Devoirs** | Liste des devoirs à faire (avec date limite et barème). Pour chaque devoir : consultation du sujet, dépôt d’une réponse (texte et/ou fichier). Après correction, consultation de la note et du commentaire du professeur. | L’élève ouvre le devoir « Rédaction chapitre 3 », rédige sa réponse, joint un fichier et soumet avant la date limite. Plus tard, il consulte sa note et le commentaire. |
| **Évaluations** | Liste des quiz à passer. Passage du quiz dans le temps imparti, envoi des réponses. Une fois corrigé (automatiquement ou par le professeur), consultation de la note. | L’élève clique sur « Quiz Histoire – Révolution française », répond aux questions dans les 15 minutes, soumet. Il voit ensuite sa note sur 20. |
| **Avis importants** | Lecture des annonces publiées par l’administration et les professeurs (éventuellement filtrées par classe). Les avis urgents sont mis en avant. | Consultation de l’annonce « Réunion parents-professeurs le 20 octobre ». |
| **Dates importantes** | Consultation du calendrier scolaire : examens, vacances, événements. | Vérification de la date du conseil de classe ou des vacances. |
| **Programme de l’année** | Consultation du programme annuel. | L’élève voit les thèmes prévus sur l’année pour s’organiser. |
| **Suivi des notes** | Les notes sont visibles dans le détail de chaque devoir ou évaluation une fois la correction effectuée. Il n’y a pas nécessairement une page « carnet » unique ; le suivi se fait devoir par devoir et quiz par quiz. | Après correction, l’élève ouvre « Devoirs », clique sur un devoir rendu et consulte sa note et le commentaire. |

---

## 3. Parcours utilisateur

### 3.1 Comment un administrateur utilise la plateforme

1. **Connexion** : L’administrateur se rend sur la page de connexion et saisit son code de connexion et son mot de passe. Il est redirigé vers le tableau de bord administrateur.
2. **Vue d’ensemble** : Sur le tableau de bord, il consulte les statistiques (élèves, professeurs, avis, dates importantes) et les derniers comptes créés ou modifiés.
3. **Gestion des comptes** :  
   - Il va dans « Créer des comptes » pour ajouter des élèves ou des professeurs. Il renseigne au minimum le nom ; la plateforme génère un code unique et un mot de passe qu’il transmet à l’utilisateur.  
   - Il utilise « Élèves » et « Professeurs » pour modifier des profils ou bloquer/débloquer des comptes.  
   - En cas de perte d’identifiant, il utilise « Identifiants » pour consulter ou régénérer les codes.
4. **Communication et calendrier** : Il publie des avis (avec option « urgent » et ciblage par classe si disponible) et gère les dates importantes (calendrier scolaire, événements).
5. **Programme** : Il renseigne ou met à jour le programme de l’année pour que professeurs et élèves puissent le consulter.

### 3.2 Comment un professeur crée et gère ses cours et devoirs

1. **Connexion** : Le professeur se connecte avec son code et son mot de passe, puis accède au tableau de bord professeur.
2. **Création d’une fiche de cours** : Il va dans « Fiches de cours », crée un nouveau cours, remplit le titre, la matière, la classe, le contenu et optionnellement joint un fichier. Il enregistre et publie ; les élèves de la classe concernée voient le cours dans leur espace.
3. **Création d’un devoir** : Il va dans « Devoirs », crée un devoir avec titre, description, matière, classe, date limite et barème. Les élèves voient le devoir dans leur liste et peuvent soumettre une réponse (texte et/ou fichier) jusqu’à la date limite.
4. **Création d’un quiz** : Il va dans « Quiz & Évaluations », crée un quiz, ajoute les questions, définit la durée, le barème et la date limite. Les élèves passent le quiz dans le temps imparti ; la note peut être calculée automatiquement ou saisie par le professeur.
5. **Correction** : Il va dans « Correction & Notes », ouvre la liste des soumissions (devoirs ou quiz), consulte chaque travail, saisit la note et le commentaire. L’élève peut ensuite voir sa note et le retour.
6. **Avis et calendrier** : Il consulte les dates importantes et peut publier des avis pour ses classes (selon les droits configurés).

### 3.3 Comment un élève accède aux cours et soumet ses devoirs

1. **Connexion** : L’élève se connecte avec le code qui lui a été remis (par exemple INS-XXXXXX) et son mot de passe. Il arrive sur sa vue d’ensemble.
2. **Consultation des cours** : Il va dans « Fiche de Cours », voit la liste des cours disponibles pour sa classe, clique sur un cours pour lire le contenu et télécharger les pièces jointes.
3. **Devoirs** : Il ouvre « Devoirs », voit la liste des devoirs avec dates limites. Pour rendre un devoir, il clique sur le devoir, lit le sujet, rédige sa réponse et/ou joint un fichier, puis soumet. Après correction, il revient sur le devoir pour voir sa note et le commentaire du professeur.
4. **Évaluations** : Il ouvre « Évaluations », choisit un quiz à passer, répond aux questions dans le temps imparti et soumet. Une fois corrigé, il consulte sa note (et éventuellement les bonnes réponses si l’interface le permet).
5. **Avis et calendrier** : Il consulte « Avis importants » et « Dates importantes » pour rester informé des annonces et du calendrier scolaire.
6. **Programme** : Il peut consulter le « Programme de l’année » pour voir les thèmes et le planning.

---

## 4. Structure de la plateforme

### 4.1 Pages principales

| Page | Rôle | Description |
|------|------|-------------|
| **Page d’accueil (racine)** | Tous | Redirection : si l’utilisateur est déjà connecté, il est envoyé vers son tableau de bord selon son rôle ; sinon vers la page de connexion. |
| **Page de connexion** | Public | Formulaire « Code de connexion » + « Mot de passe ». Après authentification, redirection vers le tableau de bord administrateur, professeur ou élève. En cas d’erreur (mauvais identifiants, compte bloqué), un message explicite s’affiche. |
| **Tableau de bord (admin)** | Administrateur | Statistiques globales, derniers comptes créés, changements de statut. Accès rapide à toutes les sections de gestion. |
| **Tableau de bord (prof)** | Professeur | Vue d’ensemble des cours, devoirs et quiz. Accès aux fiches de cours, devoirs, quiz, correction, avis, dates importantes et programme. |
| **Tableau de bord (élève)** | Élève | Récapitulatif des cours, devoirs, évaluations, avis et dates importantes. Liens directs vers les sections détaillées. |
| **Cours / Fiches de cours** | Prof + Élève | Côté prof : liste et création/édition de cours. Côté élève : liste et consultation des cours (détail avec contenu et pièce jointe). |
| **Devoirs** | Prof + Élève | Côté prof : liste, création et consultation des soumissions par devoir. Côté élève : liste des devoirs, détail d’un devoir, page de soumission (réponse + fichier), consultation de la note après correction. |
| **Quiz / Évaluations** | Prof + Élève | Côté prof : liste, création et édition des quiz, consultation des résultats. Côté élève : liste des quiz, passage d’un quiz, consultation de la note après correction. |
| **Correction & Notes** | Professeur | Liste des devoirs et quiz avec les soumissions à corriger ; saisie des notes et commentaires. |
| **Avis** | Admin + Prof + Élève | Admin/Prof : création et gestion des avis (urgent, cible). Élève : consultation des avis. |
| **Dates importantes** | Admin + Prof + Élève | Admin : création et gestion des événements et dates. Prof/Élève : consultation du calendrier. |
| **Programme de l’année** | Admin + Prof + Élève | Admin : définition du programme. Prof/Élève : consultation. |
| **Gestion des comptes (admin)** | Administrateur | Pages dédiées : Élèves, Professeurs, Créer des comptes, Identifiants. |
| **Paramètres / Déconnexion** | Tous | Depuis la barre de navigation ou le menu : déconnexion (effacement de la session et redirection vers la page de connexion). |

### 4.2 Rôle de chaque page

- **Landing / Accueil** : Point d’entrée unique ; oriente l’utilisateur connecté vers son espace, sinon vers la connexion.
- **Connexion** : Authentification et attribution de la session ; redirection selon le rôle.
- **Tableaux de bord** : Synthèse et accès rapide aux fonctionnalités selon le rôle.
- **Cours, Devoirs, Quiz** : Cœur pédagogique : création et diffusion (prof), consultation et soumission (élève), correction (prof).
- **Avis et Dates importantes** : Communication et vie scolaire : publication (admin/prof) et consultation (tous selon droits).
- **Programme de l’année** : Cadrage pédagogique partagé entre l’établissement, les professeurs et les élèves.
- **Gestion des comptes (admin)** : Création, modification, blocage et gestion des identifiants pour un fonctionnement sécurisé de la plateforme.

---

## 5. Sécurité et gestion des données

### 5.1 Gestion des comptes et des rôles

- **Rôles** : Trois rôles distincts — **admin**, **prof**, **eleve**. Chaque utilisateur ne peut accéder qu’aux pages et actions autorisées pour son rôle.
- **Création des comptes** : Réservée aux administrateurs. Les comptes élève et professeur sont créés avec un **code de connexion unique** (généré par la plateforme) et un mot de passe. Aucun utilisateur ne peut s’inscrire seul ; cela évite les comptes non contrôlés.
- **Activation et blocage** : Les comptes peuvent être désactivés (bloqués) par l’administrateur, avec possibilité d’indiquer une raison. Un compte bloqué ne peut plus se connecter.
- **Identifiants** : La consultation et la régénération des codes de connexion sont limitées aux administrateurs, pour maîtriser la distribution des accès.

### 5.2 Protection des données scolaires

- **Mots de passe** : Les mots de passe sont stockés de manière sécurisée (hachage avec algorithme adapté), et ne sont jamais affichés en clair après la création du compte.
- **Sessions** : La connexion repose sur un jeton de session (JWT) stocké dans un cookie sécurisé (httpOnly), avec une durée de validité limitée (par exemple 7 jours). La déconnexion invalide la session.
- **Base de données** : Les données sont stockées dans une base de données (PostgreSQL) avec des règles d’accès (Row Level Security) pour limiter les lectures et écritures selon le contexte (rôle, utilisateur).
- **Fichiers** : Les fichiers uploadés (pièces jointes aux cours, devoirs) sont stockés dans un espace dédié et accessibles uniquement via la plateforme, selon les droits des utilisateurs.

### 5.3 Contrôle des accès

- **Middleware et routes** : Chaque requête vers les espaces admin, prof ou élève est contrôlée : présence d’une session valide et rôle correspondant. En cas d’absence de session ou de rôle incorrect, l’utilisateur est redirigé vers la page de connexion.
- **API** : Les routes d’API qui manipulent des données sensibles vérifient l’identité et le rôle de l’utilisateur avant d’exécuter une action (création, modification, suppression, consultation).
- **Données par classe** : Lorsque la notion de classe est utilisée (cours, devoirs, avis), les contenus sont filtrés pour que les élèves ne voient que ce qui concerne leur classe.

---

## 6. Avantages de ClassConnect

### Pour les écoles

- **Un seul outil** pour les cours, devoirs, évaluations, avis et calendrier, ce qui limite la dispersion des outils et des informations.
- **Maîtrise des accès** : création des comptes par l’administration, codes uniques, blocage possible des comptes.
- **Traçabilité** : les soumissions, notes et corrections sont enregistrées et consultables dans le cadre défini par l’établissement.
- **Communication centralisée** : avis et dates importantes visibles par tous les acteurs concernés, avec possibilité de cibler par rôle ou par classe.

### Pour les professeurs

- **Gain de temps** : publication des cours et des devoirs au même endroit, correction et notation dans une interface dédiée.
- **Clarté** : vue d’ensemble des devoirs et quiz, suivi des soumissions et des corrections à faire.
- **Flexibilité** : pièces jointes pour les cours, barèmes et dates limites pour les devoirs, quiz avec durée et barème.
- **Communication** : diffusion d’avis ciblés vers les élèves ou les classes.

### Pour les élèves

- **Simplicité** : un seul lien et un seul code pour accéder aux cours, devoirs, évaluations, avis et calendrier.
- **Transparence** : vision claire des devoirs à rendre et des évaluations à passer, avec dates limites et barèmes.
- **Suivi des notes** : consultation des notes et des commentaires du professeur après correction, directement depuis la fiche du devoir ou de l’évaluation.
- **Information** : accès aux avis et au calendrier scolaire pour s’organiser.

---

## 7. Évolutivité et perspectives

### Possibilités d’amélioration futures

- **Espace parents** : Comptes ou accès dédiés aux parents (par exemple lien parent–élève) pour consulter les avis, le calendrier et éventuellement un résumé des notes et des devoirs, dans le respect du cadre juridique (RGPD, délégation d’autorité parentale).
- **Carnet de notes** : Page dédiée « Carnet » pour l’élève (et éventuellement les parents) regroupant toutes les notes par matière ou par période.
- **Messagerie** : Module de messagerie interne (prof–élève, admin–prof, etc.) pour les échanges formels sans quitter la plateforme.
- **Notifications** : Alertes (par exemple par e-mail ou dans l’interface) pour rappels de devoirs, nouveaux avis ou nouvelles notes.
- **Multi-établissements** : Gestion de plusieurs établissements ou niveaux dans une même instance, avec droits d’administration par établissement.
- **Exports et rapports** : Export des notes (bulletins, relevés) et tableaux de bord pour les équipes de direction.

### Nouvelles fonctionnalités possibles

- **Devoirs en groupe** : Possibilité d’assigner un devoir à un groupe d’élèves et de gérer les rendus de groupe.
- **Banque de questions** : Réutilisation de questions entre quiz et partage entre professeurs.
- **Activités et parcours** : Séquences d’activités (cours → devoir → quiz) pour structurer un chapitre.
- **Accessibilité et mobilité** : Renforcement de l’accessibilité (lecteurs d’écran, contraste) et version mobile ou application dédiée pour un usage nomade.
- **Intégrations** : Connexion avec des outils de vie scolaire ou des environnements numériques de travail (ENT) existants (authentification, annuaire, affichage des notes).

---

*Document rédigé pour la plateforme ClassConnect. Ton clair, simple et professionnel, adapté à un public non technique.*
