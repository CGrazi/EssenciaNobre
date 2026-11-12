export type CategoryId = "amadeirados" | "florais" | "citricos";

export const categories: { id: CategoryId; label: string; description: string }[] = [
  { id: "amadeirados", label: "Amadeirados", description: "Fundos profundos e quentes, com cedro, sândalo e vetiver." },
  { id: "florais", label: "Florais", description: "Buquês delicados e marcantes, de rosa, jasmim e íris." },
  { id: "citricos", label: "Cítricos", description: "Frescor luminoso de bergamota, limão siciliano e neroli." },
];

export type Product = { id: string; name: string; category: CategoryId; notes: string; description: string };

/** Catálogo de exemplo — substitua pelos perfumes reais da loja. */
export const products: Product[] = [
  { id: "noite-de-cedro", name: "Noite de Cedro", category: "amadeirados", notes: "Cedro, vetiver, âmbar", description: "Madeiras secas e um fundo âmbar, para noites longas." },
  { id: "santal-reservado", name: "Santal Reservado", category: "amadeirados", notes: "Sândalo, couro, baunilha", description: "Cremoso e envolvente, com um toque de couro." },
  { id: "bosque-antigo", name: "Bosque Antigo", category: "amadeirados", notes: "Patchouli, musgo, incenso", description: "Um passeio por uma floresta úmida ao entardecer." },
  { id: "rosa-de-veludo", name: "Rosa de Veludo", category: "florais", notes: "Rosa, peônia, almíscar", description: "Rosa aveludada, elegante e atemporal." },
  { id: "jasmim-noturno", name: "Jasmim Noturno", category: "florais", notes: "Jasmim, flor de laranjeira, âmbar", description: "Floral intenso que se abre devagar na pele." },
  { id: "iris-de-seda", name: "Íris de Seda", category: "florais", notes: "Íris, violeta, cedro", description: "Pó fino e sofisticado, com delicadeza." },
  { id: "bergamota-solar", name: "Bergamota Solar", category: "citricos", notes: "Bergamota, gengibre, musgo branco", description: "Abertura radiante com fundo limpo." },
  { id: "limao-siciliano", name: "Limão Siciliano", category: "citricos", notes: "Limão, neroli, cedro", description: "Frescor vivo e elegante para o dia a dia." },
  { id: "neroli-branco", name: "Neroli Branco", category: "citricos", notes: "Neroli, laranja amarga, almíscar", description: "Cítrico floral, claro e sofisticado." },
];
