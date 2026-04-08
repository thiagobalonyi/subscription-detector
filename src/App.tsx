import { useState } from "react";

function App() {
  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState<{nome: string; chave: string}[]>([]);
  const analisarTexto = () => {
    const servicos = [
      { nome: "NetFlix", chave: "netflix" },
      { nome: "Spotify", chave: "spotify" },
      { nome: "Amazon Prime", chave: "amazon prime" },
      { nome: "Disney+", chave: "disney" },
      { nome: "HBO Max", chave: "hbo max" },
    ];

    const textoNormalizado = texto.toLowerCase();

    const encontrados = servicos.filter((servico) =>
    textoNormalizado.includes(servico.chave)
    );

    setResultado(encontrados);
  };

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
            <li key={index}>{item.nome}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;