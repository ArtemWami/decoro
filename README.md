# Decoro

## API Documentation

1. Components
   - located in `docs/components/{model}.yml`

```yml
schema:
  $ref: '#/components/schemas/{model}'
```

2. Paths
   - located in `docs/{v1,v2,v3}`

## Scripts

1. Apply seed

```bash
npm run seed seeders/20220315100000-insert-rooms.js
```

2. Revert seed

```bash
npm run seed:undo seeders/20220315100000-insert-rooms.js
```
