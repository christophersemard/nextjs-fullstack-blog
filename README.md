<div align="center">

# ▲ Application full-stack Next.js

### Blog, authentification et espace d'administration

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma_6-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

</div>

---

## 🎯 Présentation

Ce projet rassemble plusieurs fonctionnalités de **Next.js App Router** dans une
application full-stack : pages rendues côté serveur et côté client, consommation
d'API, formulaire validé, blog dynamique, authentification et administration des
articles.

Il a été construit progressivement dans le cadre d'un cours Next.js, puis complété
avec une base PostgreSQL et une authentification personnalisée.

## ✨ Fonctionnalités

### Frontend

- navigation commune avec App Router ;
- pages d'accueil, à propos et contact ;
- page 404 personnalisée avec animation Lottie ;
- appels d'API côté serveur et côté client ;
- états de chargement avec Suspense ;
- formulaire de contact validé avec Zod et retours toast.

### Blog et administration

- liste et détail des articles ;
- création, modification et suppression depuis l'espace administrateur ;
- persistance PostgreSQL avec Prisma ;
- invalidation du cache après une modification.

### Authentification

- inscription et connexion ;
- hachage des mots de passe avec bcrypt ;
- session signée avec JWT dans un cookie HTTP-only ;
- protection des routes d'administration par middleware.

---

## 🧭 Architecture

~~~mermaid
flowchart LR
    U[Utilisateur]
    N[Next.js App Router]
    A[Server Actions]
    P[Prisma ORM]
    D[(PostgreSQL)]

    U --> N
    N --> A
    A --> P
    P --> D
~~~

| Élément | Rôle |
|---|---|
| **src/app** | Pages, layouts, routes et Server Actions |
| **src/components** | Composants partagés et gestion des articles |
| **src/context** | État d'authentification côté client |
| **src/lib/auth.ts** | JWT, cookies et hachage des mots de passe |
| **src/middleware.ts** | Protection de l'espace administrateur |
| **prisma/schema.prisma** | Modèle des utilisateurs et articles |

---

## 🚀 Lancer le projet localement

### Prérequis

- Node.js 20 ou plus récent ;
- une base PostgreSQL locale.

### Installation

~~~bash
git clone https://github.com/christophersemard/cours-nextjs.git
cd cours-nextjs
npm ci
cp .env.example .env
~~~

Renseignez ensuite les deux variables du fichier local :

| Variable | Description |
|---|---|
| **DATABASE_URL** | URL de connexion PostgreSQL utilisée par Prisma |
| **AUTH_SECRET** | longue valeur aléatoire utilisée pour signer les sessions |

Initialisez le schéma puis démarrez l'application :

~~~bash
npx prisma generate
npx prisma db push
npm run dev
~~~

L'application est disponible sur <http://localhost:3000>.

### Routes principales

| Route | Contenu |
|---|---|
| **/** | Accueil |
| **/meilleurs-films** | Appel d'API côté serveur |
| **/films-recents** | Appel d'API côté client |
| **/contact** | Formulaire validé avec Zod |
| **/blog** | Liste des articles |
| **/connexion** et **/inscription** | Authentification |
| **/admin** | Gestion protégée des articles |

---

## ✅ Qualité

~~~bash
npm run lint
npm run build
~~~

Le workflow GitHub Actions exécute automatiquement ESLint sur les pushes et les
pull requests.

---

## 🔒 Sécurité et limites

- aucune valeur secrète n'est suivie dans le dépôt ; le fichier **.env.example**
  contient uniquement des exemples ;
- les mots de passe sont hachés et les sessions sont stockées dans un cookie
  HTTP-only signé ;
- le projet ne possède pas de gestion avancée des rôles, de limitation de débit ou
  de récupération de compte ;
- le formulaire de contact valide les données mais n'envoie aucun email ;
- il s'agit d'un projet pédagogique, pas d'une application prête pour la
  production.

---

## 📁 Organisation

~~~text
.
├── .github/workflows/     # Vérification ESLint
├── prisma/                # Schéma de données
├── public/                # Illustrations et animation 404
├── src/
│   ├── app/               # Routes et Server Actions
│   ├── components/
│   ├── context/
│   └── lib/
├── .env.example
└── README.md
~~~

---

## 👤 Auteur

Projet réalisé par [Christopher Semard](https://github.com/christophersemard)
dans le cadre de sa formation de développeur full-stack.
