import { GenericSection } from "@/components/sections/GenericSection";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";

export default function HistoriaPage() {
  return (
    <>
      <title>Nossa história · Essência Nobre</title>
      <meta name="description" content="Conheça a história e a filosofia da Essência Nobre, perfumaria de nicho em São Paulo." />
      <Hero
        id="hero"
        eyebrow="Nossa história"
        title="Perfumaria feita para ser lembrada"
        subtitle="A Essência Nobre nasceu em São Paulo do desejo de reunir fragrâncias raras, com personalidade, longe do óbvio."
        variant="minimal"
      />
      <GenericSection
        id="story"
        tone="soft"
        title="Uma perfumaria de nicho"
        text={"Acreditamos que um perfume é uma assinatura pessoal. Por isso selecionamos fragrâncias de composição cuidadosa, pensadas para quem busca algo singular.\n\nCada perfume é apresentado por família olfativa — amadeirados, florais e cítricos — para que você encontre o seu com calma, e com a nossa orientação."}
      />
      <Features
        id="values"
        eyebrow="O que nos guia"
        title="Nossos princípios"
        items={[
          { title: "Curadoria", description: "Poucas fragrâncias, escolhidas com critério e paixão." },
          { title: "Singularidade", description: "Aromas com identidade, para quem não quer ser mais um." },
          { title: "Atendimento próximo", description: "Cada pedido é confirmado pessoalmente com você." },
        ]}
      />
      <GenericSection id="cta" title="Encontre a sua essência" buttonText="Ver os perfumes" buttonUrl="/perfumes" />
    </>
  );
}
