# Déployer sur Vercel

## Option 1 : Via le site Vercel (recommandé)

1. **Pousser le code sur GitHub** (si ce n’est pas déjà fait)
   - Créez un dépôt sur [github.com](https://github.com)
   - Depuis le dossier du projet (`class_connect-main` qui contient `package.json`) :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/VOTRE_USER/VOTRE_REPO.git
   git push -u origin main
   ```

2. **Connecter le projet à Vercel**
   - Allez sur [vercel.com](https://vercel.com) et connectez-vous (ou créez un compte)
   - Cliquez sur **Add New** → **Project**
   - Importez votre dépôt GitHub
   - **Root Directory** : si votre dépôt contient directement `package.json` et `app/`, laissez vide. Si tout est dans un sous-dossier (ex. `class_connect-main`), indiquez ce dossier
   - Cliquez sur **Deploy**

3. **Variables d’environnement**
   - Dans le projet Vercel : **Settings** → **Environment Variables**
   - Ajoutez les mêmes variables que dans `.env.local` :
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `JWT_SECRET`
     - `NEXT_PUBLIC_APP_URL` = l’URL de votre projet Vercel (ex. `https://votre-projet.vercel.app`)
   - Redéployez après avoir ajouté les variables (**Deployments** → **…** → **Redeploy**)

---

## Option 2 : Via la CLI Vercel

1. **Installer la CLI et se connecter**
   ```bash
   npm i -g vercel
   vercel login
   ```

2. **Déployer**
   - Dans le dossier du projet (celui qui contient `package.json`) :
   ```bash
   vercel
   ```
   - Suivez les questions (lien au projet existant ou nouveau)
   - Pour un déploiement en production :
   ```bash
   vercel --prod
   ```

3. **Variables d’environnement en CLI**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   vercel env add JWT_SECRET
   vercel env add NEXT_PUBLIC_APP_URL
   ```
   Puis redéployez : `vercel --prod`

---

## À vérifier après déploiement

- **Root Directory** : Vercel doit builder le dossier qui contient `package.json` et `app/`. Si votre repo a une structure du type `mon-repo/class_connect-main/`, définissez **Root Directory** = `class_connect-main` dans les paramètres du projet.
- **Build** : la commande par défaut est `next build` ; elle est correcte pour ce projet.
- **Cookie de session** : en production, le cookie doit être envoyé sur le domaine Vercel. Si vous utilisez un domaine personnalisé, adaptez `NEXT_PUBLIC_APP_URL` et la config cookie dans `lib/auth.ts` si besoin (SameSite, Secure).
