import { useState } from "react";

function App() {
  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState<{nome: string; valor?: string}[]>([]);
  const servicos = [
  { nome: "Netflix", chave: "netflix" },
  { nome: "Spotify", chave: "spotify" },
  { nome: "Amazon Prime", chave: "amazon" },
  { nome: "Disney+", chave: "disney" },
  { nome: "HBO Max", chave: "hbo" },
];

const extrairNumero = (valor: string) => {
  return Number(
    valor
      .replace("R$", "")
      .replace(",",".")
      .trim()
  );
};

  const analisarTexto = () => {
    const linhas = texto.split("\n");

    const resultados: { nome: string; valor?: string }[] = [];

    linhas.forEach((linha) => {
      const linhaLower = linha.toLowerCase ();

    servicos.forEach((servico) => {
      if (linhaLower.includes(servico.chave)) {
        const regex = /r\$\s?\d+[.,]?\d*/i;
        const match = linha.match(regex);

        resultados.push({
          nome: servico.nome,
          valor: match ? match[0] : undefined
        });
      }
    });
  });

    setResultado(resultados);

  };

  const total = resultado.reduce((acc, item) => {
      if (!item.valor) return acc;

      return acc + extrairNumero(item.valor);
    }, 0);

  return (
    <div style={{ padding: 20 }}>
      <h1>Teste useState</h1>

      <input
      value={texto}
      onChange={(e) => setTexto(e.target.value)}
      />

    <button onClick={analisarTexto}>
      Analisar
    </button>

      {resultado.length === 0 ? (
        <p>Nenhuma Assinatura Encontrada</p>
      ) : (
        <ul>
          {resultado.map((item, index) =>(
            <li key={index}>
              {item.nome} {item.valor && `- ${item.valor}`}
              </li>
          ))}
        </ul>
      )}
      <p>
        Total mensal: R$ {total.toFixed(2)}
      </p>
    </div>
  );
}

export default App;