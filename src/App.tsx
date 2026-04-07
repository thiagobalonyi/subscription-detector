import { useState } from "react";

function App() {
  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState<string[]>([]);
  const analisarTexto = () => {
    const palavrasChave = [
      "netflix",
      "spotify",
      "amazon",
      "prime",
      "disney",
      "hbo",
    ];

    const textoNormalizado = texto.toLowerCase();

    const encontrados = palavrasChave.filter((palavra) =>
    textoNormalizado.includes(palavra)
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
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;