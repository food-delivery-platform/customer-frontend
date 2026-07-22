# JSON Server Mock API

This directory contains mock JSON representations for the frontend DTOs, matching
the restaraunt-service (MenuService) REST contract described in
`../../restaraunt-service/README.md`:

- `Restaurant` -> `/restaurants`, `/restaurants/{id}`
- `Category` -> `/categories?restaurantId={restaurantId}`
- `MenuItem` -> `/menu-items/{id}`, `/menu-items?restaurantId={restaurantId}`
- `Order` -> `/orders`
- `OrderItem` -> `/orderItems`

Plain json-server can't reshape responses into the wrapped envelopes the real
service returns (e.g. `{ restaurants: [...] }`, `{ restaurant: { ...categories, menuItems } }`),
so `server.js` wraps `json-server`'s router with a few explicit routes instead
of relying only on `--routes` rewrites. Everything not explicitly handled
(`/orders`, `/orderItems`, and the raw `/restaurants`/`/menuItems`/`/categories`
collections) still falls through to the default json-server router.

The route rewrites in `routes.json` support the remaining frontend-shaped
endpoints:

- `/restaurants/:restaurantId/orders`
- `/orders/:orderId/items`

Note: unlike the plain `json-server --watch` CLI, `server.js` does not hot-reload
`db.json` on external edits — restart `npm run dev:api` after editing it.

Run the mock API together with Next:

```bash
npm run dev
```

Run only the mock API:

```bash
npm run dev:api
```
