// This was used as a reference. It is code copied from Tech Educators simplified version of the cookie game
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) i(n);
  new MutationObserver((n) => {
    for (const o of n)
      if (o.type === "childList")
        for (const u of o.addedNodes)
          u.tagName === "LINK" && u.rel === "modulepreload" && i(u);
  }).observe(document, {
    childList: !0,
    subtree: !0,
  });
  function r(n) {
    const o = {};
    return (
      n.integrity && (o.integrity = n.integrity),
      n.referrerPolicy && (o.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : n.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function i(n) {
    if (n.ep) return;
    n.ep = !0;
    const o = r(n);
    fetch(n.href, o);
  }
})();
const p = [
  {
    name: "Grandma",
    price: 10,
    increase: 1,
  },
  {
    name: "Oven",
    price: 100,
    increase: 10,
  },
  {
    name: "Factory",
    price: 1000,
    increase: 100,
  },
  {
    name: "Mine",
    price: 10000,
    increase: 1000,
  },
  {
    name: "Bank",
    price: 100000,
    increase: 10000,
  },
];
let c = 0,
  s = [];
const g = document.getElementById("thebutton"),
  y = document.getElementById("numberOfCookies"),
  h = document.getElementById("cookiesPerSecond"),
  l = document.getElementById("errorMessage"),
  I = document.getElementById("resetButton");
g.addEventListener("click", () => {
  f();
});
I.addEventListener("click", () => b());
function d() {
  localStorage.setItem("cookies", c),
    localStorage.setItem("purchasedItems", JSON.stringify(s));
}
function v() {
  (c = localStorage.getItem("cookies") || 0),
    (s = JSON.parse(localStorage.getItem("purchasedItems")) || []);
}
function a() {
  (y.innerHTML = c), (h.innerHTML = L() + " cps");
}
function E(e) {
  let t = 0;
  for (let r of s) r.name.toLowerCase() === e.toLowerCase() && t++;
  return t;
}
function L() {
  let e = 0;
  for (let t of s) e += t.increase;
  return e + 1;
}
function k(e) {
  return c >= e.price
    ? ((c -= e.price), !0)
    : (console.log("Not enough cookies"), B("Not enough cookies"), !1);
}
function B(e) {
  (l.innerText = e),
    (l.style.display = "block"),
    setTimeout(() => {
      l.style.display = "none";
    }, 5000);
}
function m() {
  const e = document.getElementById("shop");
  (e.innerHTML = ""),
    p.forEach((t) => {
      const r = document.createElement("div");
      (r.className = "shop-item"),
        (r.innerHTML = `
      <div>
        ${E(t.name)}</div>
      <div>
        ${t.name} </div>
      <div>$C 
        ${t.price}</div>
      <div>+
        ${t.increase}</div>
      
        `);
      const i = document.createElement("button");
      (i.innerHTML = "Buy"),
        i.addEventListener("click", () => {
          k(t) && (s.push(t), d(), a(), m());
        }),
        r.appendChild(i),
        e.appendChild(r);
    });
}
function O() {
  c++;
  for (let e of s) c += e.increase;
}
function b() {
  (c = 0), (s = []), d(), a(), m();
}
function f() {
  O(), a(), d();
}
function M() {
  v(),
    m(),
    a(),
    setInterval(() => {
      console.log("tick"), f();
    }, 1000);
}
M();
