import { useState } from "react";

function App() {
  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState("");
  const analisarTexto = () => {
    if (texto.includes("Netflix")) {
      setResultado("Encontramos Netflix");
    } else {
      setResultado("Nenhuma Assinatura Encontrada");
    }
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

      <p>{texto}</p>
      <p>{resultado}</p>
    </div>
  );
}

export default App;