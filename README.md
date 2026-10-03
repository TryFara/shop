# TRYFARA Shop

Storefront for TRYFARA t-shirts. Plain HTML, CSS and JavaScript — no build step.

## Run it

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

## Edit products

All products live in the `PRODUCTS` list at the top of `script.js`
(name, price, shirt colour, print colour, background, print text and art style).
The t-shirt images are drawn as SVG from that data, so the site works without photos.
To use real product photos, swap `teeSVG(p)` in `cardHTML` for an `<img>`.

## Sections

Hero · Superstars (bestsellers) · Collection marquee · Feature blocks ·
Gallery · Top picks carousel · Club newsletter · Get started footer · Cart drawer.

The cart is saved in the browser (localStorage). Checkout is a placeholder —
connect a payment provider such as Shopify Buy Button or Stripe Checkout to take orders.
