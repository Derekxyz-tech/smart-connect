-- Migration : ajouter la colonne commentaire à reponses_quiz (commentaire du prof pour les notes manuelles)
-- Exécuter si la table reponses_quiz existe déjà sans cette colonne.

ALTER TABLE reponses_quiz ADD COLUMN IF NOT EXISTS commentaire TEXT;
