# Funda

Site de [Funda](https://funda-online.com) : appui aux apprenants en informatique à Lubumbashi
(webinaires, événements, replays) et programme **Funda Sensibilise** de sensibilisation
gratuite au numérique responsable.

- **Next.js 15** (App Router, composants serveur, ISR)
- **Sanity 4** comme CMS, Studio intégré sur `/studio`
- **Tailwind CSS 4**, GSAP pour les animations, Swiper pour le carrousel

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigner les valeurs
npm run dev                  # http://localhost:3000
```

| Script | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` / `npm start` | Build et serveur de production |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript |

## Structure

```
app/(root)/            pages publiques : accueil, /events, /sensibilise, /sensibilise/[slug]
app/studio/            Sanity Studio (accès réservé aux comptes Sanity du projet)
app/api/revalidate/    webhook Sanity → invalidation du cache
components/            composants ; motion/ = animations (client), le reste est rendu serveur
lib/                   site.ts (infos de l'organisation, SEO), date.ts (formatage des dates)
sanity/queries.ts      toutes les requêtes GROQ
sanity/types.ts        types des résultats de requêtes
sanity/schemaTypes/    schémas du contenu (event, pastEvent, sensibilisation)
scripts/               scripts de maintenance du contenu
```

## Contenu et cache

Les pages sont générées puis mises en cache (ISR). Elles sont régénérées :

- **immédiatement** après une publication dans le Studio, si le webhook est configuré ;
- sinon **au plus tard 5 minutes** après.

### Configurer le webhook Sanity

Dans [sanity.io/manage](https://www.sanity.io/manage) → projet → **API → Webhooks → Create** :

| Champ | Valeur |
|---|---|
| URL | `https://funda-online.com/api/revalidate` |
| Dataset | `production` |
| Trigger on | Create, Update, Delete |
| Filter | `_type in ["event", "pastEvent", "sensibilisation"]` |
| Projection | `{_type}` |
| HTTP method | POST |
| Secret | même valeur que `SANITY_REVALIDATE_SECRET` |

Ajouter ensuite `SANITY_REVALIDATE_SECRET` dans les variables d'environnement Vercel.

### Règles de saisie

- Un **événement à venir** disparaît automatiquement du site une fois sa date passée.
  Pour garder son replay, créer un **événement passé**.
- Titre, date et image sont obligatoires sur tous les types de contenu.

### Migration des dates des événements passés

Le champ `date` des événements passés était un texte libre (`21/03/2026`, `28 Février 2026`),
ce qui faussait le tri. Il est désormais de type date. Pour convertir les anciennes valeurs :

```bash
npx sanity login
npx sanity exec scripts/migrate-past-event-dates.ts --with-user-token            # aperçu
npx sanity exec scripts/migrate-past-event-dates.ts --with-user-token -- --apply # écriture
```

## Déploiement

Déployé sur **Vercel** (branche `main`). Variables d'environnement à définir : voir `.env.example`.
