export function CardCustomer() {
  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
      <h2>
        <a className="font-bold">Nome: Mercado Silva</a>
      </h2>
      <p>
        <a className="font-bold">Email: teste@teste.com</a>
      </p>
      <p>
        <a className="font-bold">Telefone: 45984051369</a>
      </p>
      <button className="bg-red-500 px-4 rounded text-white mt-2 self-start">
        Deletar
      </button>
    </article>
  );
}
