# reassurance-back

API REST NestJS + MariaDB (TypeORM) pour la gestion de la réassurance :
référentiel, acteurs, polices, quittances d'acceptation, cessions, flux
financiers et sinistres — modélisée à partir des diagrammes de classes
fournis (vue par packages, REASSURANCE-ACCEPTATION, REASSURANCE-CESSION,
REASSURANCE-SINISTRE).

## Démarrage

```bash
cp .env.example .env
docker compose up -d          # démarre MariaDB
npm install
npm run start:dev             # http://localhost:3000, Swagger sur /docs
```

En développement, `DB_SYNCHRONIZE=true` (dans `.env`) crée automatiquement
le schéma à partir des entités. Pour une base existante ou pour la prod,
passez `DB_SYNCHRONIZE=false` et utilisez les migrations TypeORM :

```bash
npm run migration:generate -- src/migrations/Init
npm run migration:run
```

## Organisation du code

Chaque module correspond à un package du diagramme "Architecture du
Système - Vue par Packages" :

| Module              | Contenu                                                                 |
| -------------------- | ------------------------------------------------------------------------ |
| `referentiel`        | Branche, SousBranche, DomaineActivite, Campagne, Mouvement, CompteType, NatureCession, Region, Pays |
| `acteurs`             | Acteur, Assure, Contact                                                  |
| `polices`             | Police                                                                    |
| `quittances`          | Quittance, QuittanceCession, ObjetAssure, EcheancePmd                     |
| `flux-financier`      | Bordereau, CompteTraite, CompteTraiteDetail, NoteDebitCredit, Reglement, ReglementDetail |
| `sinistres`           | Sinistre, SinistreStatut, SinistreTypeEvaluation, SinistreDeclaration, SinistreEvaluation, SinistreQuittance, SinistreReglement (+ Detail/Cession/CessionDetail), SinistreEvaluationQuittance(Cession) |

Chaque entité vit dans `<module>/entities/*.entity.ts` avec les
relations TypeORM (`@ManyToOne`/`@OneToMany`) déduites des associations du
diagramme.

### Pattern CRUD générique

Pour éviter de répéter le même code sur ~25 entités, `src/common/crud/`
fournit :

- `CrudService<T>` : `findAll`, `findOne`, `create`, `update`, `remove` au-dessus d'un `Repository<T>` TypeORM
- `CrudController<T, CreateDto, UpdateDto>` : les 5 routes REST standard (`GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id`)

Chaque entité "principale" a donc un service et un contrôleur très
courts qui étendent ces classes (voir par ex. `branche.service.ts` /
`branche.controller.ts`).

### Entités "sous-ressources" sans contrôleur dédié

Certaines tables du diagramme sont des lignes de détail ou de
ventilation plutôt que des ressources autonomes : `ObjetAssure`,
`CompteTraiteDetail`, `ReglementDetail`, `SinistreQuittance`,
`SinistreReglementDetail`, `SinistreReglementCession`,
`SinistreReglementCessionDetail`, `SinistreEvaluationQuittance`,
`SinistreEvaluationQuittanceCession`.

Elles sont déclarées dans leur module (`TypeOrmModule.forFeature`) et
disponibles via leur `Repository`, mais n'exposent pas de route REST
propre pour l'instant — à ajouter au besoin en suivant exactement le
même patron (DTO + service + contrôleur qui étendent `CrudService` /
`CrudController`), typiquement imbriquée sous la route de leur parent
(ex. `POST /comptes-traite/:id/details`).

## Points à valider avec vous

- **Devise** : les diagrammes référencent `deviseId` partout mais aucune
  classe `Devise` n'apparaît sur les images fournies ; le champ est
  conservé en `int` simple (pas de relation) en attendant ce référentiel.
- **Numérotation de compte / séquences métier** (numéro de police, de
  quittance, de bordereau...) : générée côté client pour l'instant,
  aucune règle de génération n'était visible sur les diagrammes.
- Les contraintes d'unicité, index composites et règles de validation
  métier plus fines (ex. cohérence isCession/isProportionnel/isFac) sont
  à affiner selon vos règles de gestion réelles.
