import { Catalog } from "@/components/sections/Catalog";

export default function PerfumesPage() {
  return (
    <>
      <title>Perfumes · Essência Nobre</title>
      <meta name="description" content="Perfumes amadeirados, florais e cítricos da Essência Nobre. Monte o seu pedido e envie pelo site." />
      <h1 className="sr-only">Perfumes da Essência Nobre</h1>
      <Catalog />
    </>
  );
}
