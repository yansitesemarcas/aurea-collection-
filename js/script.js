/* Auréa Collection — scripts */
const WHATSAPP = "5519996748141";
const PRODUTOS = [
  { nome: "Bracelete de Coração", categoria: "Braceletes", descricao: "Bracelete delicado com acabamento dourado e detalhes em formato de coração. Uma peça minimalista que combina elegância e romantismo.", preco: 59.90, imagem: "assets/bracelete-coracao.jpg", alt: "Bracelete dourado com dois corações nas extremidades, sobre fundo turquesa" },
  { nome: "Brinco Estrela-do-Mar", categoria: "Brincos", descricao: "Brinco delicado em formato de estrela-do-mar, com acabamento prateado e design inspirado na beleza do oceano.", preco: 39.90, imagem: "assets/brinco-estrela-mar.jpg", alt: "Par de brincos prateados em formato de estrela-do-mar, sobre fundo turquesa" },
  { nome: "Colar Coração Azul", categoria: "Colares", descricao: "Colar delicado com corrente prateada e pingente de coração azul intenso. Uma peça charmosa para complementar diferentes estilos.", preco: 69.90, imagem: "assets/colar-coracao-azul.jpg", alt: "Colar prateado com pingente de coração azul, sobre fundo turquesa" }
];
const formatarPreco = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
function linkWhatsApp(produto) {
  const msg = `Olá! Gostaria de saber mais sobre o ${produto.nome} da Auréa Collection.`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}
function renderCatalogo() {
  const grade = document.getElementById("catalogo");
  if (!grade) return;
  grade.innerHTML = "";
  PRODUTOS.forEach((p) => {
    const card = document.createElement("article"); card.className = "card";
    const foto = document.createElement("div"); foto.className = "card__foto";
    const img = document.createElement("img"); img.src = p.imagem; img.alt = p.alt; img.loading = "lazy"; img.width = 768; img.height = 1024;
    foto.appendChild(img);
    const corpo = document.createElement("div"); corpo.className = "card__corpo";
    const cat = document.createElement("p"); cat.className = "card__cat"; cat.textContent = p.categoria;
    const nome = document.createElement("h3"); nome.textContent = p.nome;
    const desc = document.createElement("p"); desc.className = "card__desc"; desc.textContent = p.descricao;
    const preco = document.createElement("p"); preco.className = "card__preco"; preco.textContent = formatarPreco(p.preco);
    const btn = document.createElement("a"); btn.className = "btn"; btn.textContent = "COMPRAR PELO WHATSAPP"; btn.href = linkWhatsApp(p); btn.target = "_blank"; btn.rel = "noopener";
    corpo.append(cat, nome, desc, preco, btn); card.append(foto, corpo); grade.appendChild(card);
  });
}
const toggle = document.querySelector(".nav__toggle");
const menu = document.getElementById("menu");
function fecharMenu() {
  if (!menu || !toggle) return;
  menu.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Abrir menu");
}
if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const aberto = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(aberto)); toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", fecharMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecharMenu(); });
  const links = [...menu.querySelectorAll("a")];
  const secoes = links.map((a) => document.querySelector(a.getAttribute("href")));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secoes.forEach((s) => s && observer.observe(s));
  }
}
const video = document.querySelector(".hero__video");
if (video) {
  video.muted = true;
  const tentar = () => video.play().catch(() => {});
  tentar();
  document.addEventListener("touchstart", tentar, { once: true, passive: true });
}
renderCatalogo();