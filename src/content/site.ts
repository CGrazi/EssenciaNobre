export type NavLink = { label: string; href: string; description?: string };
export type NavItem = NavLink & { children?: NavLink[] };
export type FooterLink = { label: string; url: string };

export type Site = {
  name: string;
  tagline: string;
  logo: string;
  language: string;
  contact: { email: string; phone: string; whatsapp: string; address: string };
  social: Record<string, string>;
  header: { ctaText: string; ctaUrl: string; sticky: boolean };
  navigation: NavItem[];
  footer: { tagline: string; variant: string; showSocial: boolean; bottomText: string; links: FooterLink[]; columns: { title: string; links: FooterLink[] }[] };
  seo: { title: string; description: string };
  /** Texts the components show on their own (buttons, form messages). */
  ui: Record<"send" | "sending" | "sent" | "error" | "name" | "email" | "phone" | "message" | "select" | "field" | "yes" | "challenge" | "result", string>;
  /** The Micronuage project this site belongs to: leads go to its inbox. */
  micronuage: { apiBase: string; slug: string };
};

export const site: Site = {
  "name": "Essência Nobre",
  "tagline": "Perfumaria de nicho em São Paulo.",
  "logo": "",
  "language": "pt-BR",
  "contact": {
    "email": "",
    "phone": "",
    "whatsapp": "5511900000000",
    "address": "São Paulo/SP"
  },
  "social": {
    "instagram": "",
    "facebook": "",
    "linkedin": "",
    "youtube": ""
  },
  "header": {
    "ctaText": "Fazer pedido",
    "ctaUrl": "/perfumes",
    "sticky": true
  },
  "navigation": [
    { "label": "Início", "href": "/" },
    { "label": "Perfumes", "href": "/perfumes" },
    { "label": "Nossa história", "href": "/historia" }
  ],
  "footer": {
    "tagline": "Perfumaria de nicho em São Paulo. Fragrâncias raras para quem valoriza o que é singular.",
    "variant": "centered",
    "showSocial": true,
    "bottomText": "",
    "links": [
      { "label": "Perfumes", "url": "/perfumes" },
      { "label": "Nossa história", "url": "/historia" }
    ],
    "columns": []
  },
  "seo": {
    "title": "Essência Nobre · Perfumaria de nicho em São Paulo",
    "description": "Perfumes amadeirados, florais e cítricos, com pedido pelo site."
  },
  "ui": {
    "send": "Enviar",
    "sending": "Enviando…",
    "sent": "Mensagem enviada. Obrigado!",
    "error": "Não foi possível enviar. Tente de novo.",
    "name": "Nome",
    "email": "E-mail",
    "phone": "Telefone",
    "message": "Mensagem",
    "select": "Selecione",
    "field": "Campo",
    "yes": "Sim",
    "challenge": "Desafio",
    "result": "Resultado"
  },
  "micronuage": {
    "apiBase": "https://micronuage.com.br",
    "slug": "essencia-nobre"
  }
};
