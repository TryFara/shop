// ---------------------------------------------------------------
// Product catalogue — edit this list to change what the shop sells.
// `color` is the shirt colour, `ink` the print colour, `bg` the
// background behind the product image.
// ---------------------------------------------------------------
const PRODUCTS = [
  { id: "tf-01", name: "Stylish Classic", price: 32, color: "#f2efe6", ink: "#111",    bg: "#b9a7d6", print: "TRYFARA",   art: "wordmark" },
  { id: "tf-02", name: "Hoodie Weight Tee", price: 38, color: "#1a1a1a", ink: "#f8f5e4", bg: "#e9e6dc", print: "STAY BOLD", art: "stack" },
  { id: "tf-03", name: "Business Casual", price: 34, color: "#2c3a4f", ink: "#ffd95a", bg: "#2a2a2a", print: "TF",        art: "badge" },
  { id: "tf-04", name: "Sunburst Graphic", price: 36, color: "#ffd95a", ink: "#111",    bg: "#f05a3a", print: "GOOD DAYS", art: "sun" },
  { id: "tf-05", name: "Essential Boxy", price: 28, color: "#ffffff", ink: "#111",    bg: "#7fc9e8", print: "",          art: "pocket" },
  { id: "tf-06", name: "Mint Condition", price: 34, color: "#a6eee6", ink: "#111",    bg: "#f8f5e4", print: "MINT",      art: "stack" },
  { id: "tf-07", name: "Coral Wave", price: 36, color: "#f7a08c", ink: "#111",    bg: "#3b3b3b", print: "~ ~ ~",     art: "wave" },
  { id: "tf-08", name: "Midnight Logo", price: 32, color: "#0d0d0d", ink: "#a6eee6", bg: "#c9c3b3", print: "TRYFARA",   art: "wordmark" },
  { id: "tf-09", name: "Lilac Dream", price: 34, color: "#b9a7d6", ink: "#111",    bg: "#ffd95a", print: "DREAM",     art: "badge" },
];

const byId = (id) => PRODUCTS.find((p) => p.id === id);
const money = (n) => "£" + n.toFixed(2);

// Builds a t-shirt SVG for a product so the site works without photos.
function teeSVG(p) {
  const prints = {
    wordmark: `<text x="150" y="150" text-anchor="middle" font-family="Syncopate, Arial Black" font-weight="700" font-size="22" fill="${p.ink}">${p.print}</text>`,
    stack: `<text x="150" y="140" text-anchor="middle" font-family="Syncopate, Arial Black" font-weight="700" font-size="24" fill="${p.ink}">${p.print.split(" ")[0]}</text>
            <text x="150" y="172" text-anchor="middle" font-family="Syncopate, Arial Black" font-weight="700" font-size="24" fill="${p.ink}">${p.print.split(" ")[1] || ""}</text>`,
    badge: `<circle cx="150" cy="150" r="40" fill="none" stroke="${p.ink}" stroke-width="4"/>
            <text x="150" y="160" text-anchor="middle" font-family="Syncopate, Arial Black" font-weight="700" font-size="${p.print.length > 3 ? 13 : 28}" fill="${p.ink}">${p.print}</text>`,
    sun: `<circle cx="150" cy="140" r="30" fill="${p.ink}"/>
          ${Array.from({ length: 12 }, (_, i) => {
            const a = (i * Math.PI) / 6;
            return `<line x1="${150 + Math.cos(a) * 40}" y1="${140 + Math.sin(a) * 40}" x2="${150 + Math.cos(a) * 54}" y2="${140 + Math.sin(a) * 54}" stroke="${p.ink}" stroke-width="5" stroke-linecap="round"/>`;
          }).join("")}
          <text x="150" y="222" text-anchor="middle" font-family="Syncopate, Arial Black" font-weight="700" font-size="15" fill="${p.ink}">${p.print}</text>`,
    pocket: `<rect x="176" y="104" width="34" height="38" rx="3" fill="none" stroke="${p.ink}" stroke-opacity=".35" stroke-width="2"/>
             <text x="193" y="128" text-anchor="middle" font-family="Syncopate, Arial Black" font-weight="700" font-size="9" fill="${p.ink}">TF</text>`,
    wave: [0, 1, 2].map((i) => `<path d="M95 ${125 + i * 22} q14 -14 28 0 t28 0 t28 0 t28 0" fill="none" stroke="${p.ink}" stroke-width="6" stroke-linecap="round"/>`).join(""),
  };
  const gid = "g" + p.id;
  return `<svg viewBox="0 0 300 300" role="img" aria-label="${p.name} t-shirt">
    <defs>
      <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".18"/>
        <stop offset=".6" stop-color="#000" stop-opacity="0"/>
        <stop offset="1" stop-color="#000" stop-opacity=".2"/>
      </linearGradient>
    </defs>
    <ellipse cx="150" cy="290" rx="100" ry="8" fill="#000" opacity=".15"/>
    <path d="M108 30 C122 48 178 48 192 30 L254 54 L292 112 L248 134 L236 116 L236 280 L64 280 L64 116 L52 134 L8 112 L46 54 Z"
          fill="${p.color}" stroke="#000" stroke-opacity=".12" stroke-width="2" stroke-linejoin="round"/>
    <path d="M108 30 C122 48 178 48 192 30 L254 54 L292 112 L248 134 L236 116 L236 280 L64 280 L64 116 L52 134 L8 112 L46 54 Z" fill="url(#${gid})"/>
    <path d="M108 30 C122 52 178 52 192 30" fill="none" stroke="#000" stroke-opacity=".22" stroke-width="5"/>
    <path d="M64 116 L64 140 M236 116 L236 140" stroke="#000" stroke-opacity=".08" stroke-width="2"/>
    ${prints[p.art] || ""}
  </svg>`;
}

function cardHTML(p, shape = "") {
  return `<article class="card" data-id="${p.id}" data-name="${p.name.toLowerCase()} ${p.print.toLowerCase()}">
    <div class="card-media ${shape}" style="background:${p.bg}">
      ${teeSVG(p)}
      <button class="add" data-add="${p.id}" aria-label="Add ${p.name} to bag">+ Add</button>
    </div>
    <h3 class="card-name">${p.name}</h3>
    <p class="card-price">${money(p.price)}</p>
  </article>`;
}

// ---------- render sections ----------
document.querySelector(".hero-art").innerHTML = teeSVG({ ...PRODUCTS[1], id: "hero" });

document.getElementById("stars-grid").innerHTML =
  cardHTML(PRODUCTS[0]) + cardHTML(PRODUCTS[1], "round") + cardHTML(PRODUCTS[2], "square");

const f1 = PRODUCTS[3], f2 = PRODUCTS[4];
document.getElementById("feature-1").style.background = f1.bg;
document.getElementById("feature-1").innerHTML = teeSVG(f1);
document.getElementById("feature-2").style.background = f2.bg;
document.getElementById("feature-2").innerHTML = teeSVG(f2);

document.getElementById("gallery-grid").innerHTML = [5, 6, 7, 8, 0]
  .map((i, n) => {
    const p = PRODUCTS[i];
    return `<figure class="g-item g${n + 1}" style="background:${p.bg}">${teeSVG({ ...p, id: "gal" + n })}<figcaption>${p.name}</figcaption></figure>`;
  })
  .join("");

const carousel = document.getElementById("carousel");
carousel.innerHTML = PRODUCTS.slice(3).concat(PRODUCTS.slice(0, 3)).map((p) => cardHTML({ ...p })).join("");
// cards are cloned across sections, so make gradient ids unique per instance
document.querySelectorAll("svg linearGradient").forEach((g, i) => {
  const old = g.id, fresh = old + "-" + i;
  g.id = fresh;
  g.closest("svg").querySelectorAll(`[fill="url(#${old})"]`).forEach((el) => el.setAttribute("fill", `url(#${fresh})`));
});

document.querySelectorAll(".circle-btn").forEach((btn) =>
  btn.addEventListener("click", () => {
    const card = carousel.querySelector(".card");
    const step = card ? card.getBoundingClientRect().width + 24 : 300;
    carousel.scrollBy({ left: step * Number(btn.dataset.dir), behavior: "smooth" });
  })
);

// ---------- menu ----------
const burger = document.querySelector(".burger");
const menu = document.getElementById("menu");
burger.addEventListener("click", () => {
  const open = burger.getAttribute("aria-expanded") === "true";
  burger.setAttribute("aria-expanded", String(!open));
  menu.hidden = open;
});
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") { menu.hidden = true; burger.setAttribute("aria-expanded", "false"); }
});

// ---------- search ----------
document.getElementById("search").addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  document.querySelectorAll("#carousel .card").forEach((c) => c.classList.toggle("dim", q && !c.dataset.name.includes(q)));
});
document.getElementById("search").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const q = e.target.value.trim().toLowerCase();
    const hit = [...document.querySelectorAll("#carousel .card")].find((c) => c.dataset.name.includes(q));
    document.getElementById("lookbook").scrollIntoView();
    if (hit) carousel.scrollTo({ left: hit.offsetLeft - carousel.offsetLeft });
  }
});

// ---------- cart ----------
let cart = {};
try { cart = JSON.parse(localStorage.getItem("tryfara-cart")) || {}; } catch (_) {}

const drawer = document.querySelector(".drawer");
const overlay = document.querySelector(".overlay");
const countEl = document.querySelector(".cart-count");

function saveCart() {
  try { localStorage.setItem("tryfara-cart", JSON.stringify(cart)); } catch (_) {}
}

function renderCart() {
  const ids = Object.keys(cart).filter(byId);
  const list = document.getElementById("cart-items");
  list.innerHTML = ids.length
    ? ids.map((id) => {
        const p = byId(id);
        return `<li class="cart-item">
          <div class="cart-thumb" style="background:${p.bg}">${teeSVG({ ...p, id: "c" + id })}</div>
          <div><h4>${p.name}</h4><small>${money(p.price)}</small>
            <div class="qty"><button data-dec="${id}" aria-label="Decrease">−</button>${cart[id]}<button data-inc="${id}" aria-label="Increase">+</button></div>
          </div>
          <strong>${money(p.price * cart[id])}</strong>
        </li>`;
      }).join("")
    : `<li class="empty">Your bag is empty — go find a tee you love.</li>`;
  const count = ids.reduce((n, id) => n + cart[id], 0);
  countEl.textContent = count;
  document.getElementById("cart-total").textContent = money(ids.reduce((s, id) => s + byId(id).price * cart[id], 0));
}

function setDrawer(open) {
  drawer.classList.toggle("open", open);
  drawer.setAttribute("aria-hidden", String(!open));
  overlay.hidden = !open;
}

const toast = document.querySelector(".toast");
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
}

document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  const card = e.target.closest(".card");
  const id = add ? add.dataset.add : card && card.dataset.id;
  if (id) {
    cart[id] = (cart[id] || 0) + 1;
    saveCart(); renderCart();
    countEl.classList.remove("bump"); void countEl.offsetWidth; countEl.classList.add("bump");
    showToast(`${byId(id).name} added to your bag`);
    return;
  }
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  if (inc) { cart[inc.dataset.inc]++; saveCart(); renderCart(); }
  if (dec) {
    const d = dec.dataset.dec;
    if (--cart[d] <= 0) delete cart[d];
    saveCart(); renderCart();
  }
});

document.querySelector(".cart-btn").addEventListener("click", () => setDrawer(true));
document.querySelector(".close").addEventListener("click", () => setDrawer(false));
overlay.addEventListener("click", () => setDrawer(false));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setDrawer(false); });
document.querySelector(".checkout").addEventListener("click", () => {
  showToast(Object.keys(cart).length ? "Checkout coming soon — connect your payment provider" : "Your bag is empty");
});

// ---------- newsletter ----------
document.getElementById("email-form").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("form-note").textContent = "You're in! Welcome to the TRYFARA club.";
  e.target.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
renderCart();
