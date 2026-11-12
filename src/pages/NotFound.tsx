import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-32 text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="mt-3 font-heading text-4xl font-semibold">Página não encontrada</h1>
      <p className="mt-4 opacity-75">O endereço que você abriu não existe ou mudou.</p>
      <ButtonLink href="/" className="mt-8">
        Voltar ao início
      </ButtonLink>
    </div>
  );
}
