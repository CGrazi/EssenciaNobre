import { Features } from "@/components/sections/Features";
import { GenericSection } from "@/components/sections/GenericSection";
import { Hero } from "@/components/sections/Hero";
import { Steps } from "@/components/sections/Steps";

export default function IndexPage() {
  return (
    <>
      <title>Essência Nobre · Perfumaria de nicho em São Paulo</title>
      <meta name="description" content="Perfumaria de nicho em São Paulo: perfumes amadeirados, florais e cítricos, com pedido pelo site." />
      <Hero
        id="hero"
        eyebrow="Perfumaria de nicho · São Paulo"
        title="Fragrâncias raras para quem valoriza o singular"
        subtitle="Descubra perfumes amadeirados, florais e cítricos selecionados com cuidado e faça o seu pedido sem sair de casa."
        buttonText="Ver os perfumes"
        buttonUrl="/perfumes"
        buttonSecondaryText="Nossa história"
        buttonSecondaryUrl="/historia"
        variant="minimal"
      />
      <Features
        id="categorias"
        tone="soft"
        eyebrow="Famílias olfativas"
        title="Explore por categoria"
        linkText="Ver perfumes"
        items={[
          { title: "Amadeirados", description: "Fundos profundos e quentes, com cedro, sândalo e vetiver.", url: "/perfumes?categoria=amadeirados" },
          { title: "Florais", description: "Buquês delicados e marcantes, de rosa, jasmim e íris.", url: "/perfumes?categoria=florais" },
          { title: "Cítricos", description: "Frescor luminoso de bergamota, limão siciliano e neroli.", url: "/perfumes?categoria=citricos" },
        ]}
      />
      <GenericSection
        id="historia"
        eyebrow="A marca"
        title="Perfumes que contam uma história"
        text="A Essência Nobre é uma perfumaria de nicho em São Paulo, dedicada a fragrâncias com identidade e composição cuidadosa."
        buttonText="Conheça a nossa história"
        buttonUrl="/historia"
      />
      <Steps
        id="pedido"
        tone="soft"
        title="Como fazer o seu pedido"
        items={[
          { title: "Escolha", description: "Navegue pelas categorias e adicione os perfumes ao pedido." },
          { title: "Envie", description: "Informe seus dados e envie o pedido pelo site." },
          { title: "Confirmação", description: "Entramos em contato para confirmar valores, entrega e pagamento." },
        ]}
      />
    </>
  );
}
