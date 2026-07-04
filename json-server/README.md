# JSON Server Mock API

This directory contains mock JSON representations for the frontend DTOs:

- `Restaurant` -> `/restaurants`
- `MenuItem` -> `/menuItems`
- `Order` -> `/orders`
- `OrderItem` -> `/orderItems`

The route rewrites in `routes.json` also support frontend-shaped endpoints:

- `/restaurants/:restaurantId/menu`
- `/restaurants/:restaurantId/orders`
- `/orders/:orderId/items`

Run the mock API together with Next:

```bash
npm run dev
```

Run only the mock API:

```bash
npm run dev:api
```
