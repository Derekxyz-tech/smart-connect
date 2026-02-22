-- Ajoute la colonne raison_blocage pour afficher la raison lors de la tentative de connexion
ALTER TABLE users
ADD COLUMN IF NOT EXISTS raison_blocage TEXT;

COMMENT ON COLUMN users.raison_blocage IS 'Raison du blocage affichée à l''utilisateur à la connexion';
