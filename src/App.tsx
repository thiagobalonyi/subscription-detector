import { useState } from "react";

function App() {
  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState<{nome: string; valor?: string}[]>([]);
  const servicos = [
  { nome: "Netflix", chaves: ["netflix"] },
  { nome: "Spotify", chaves: ["spotify"] },
  { nome: "Amazon Prime", chaves: ["amazon", "prime"] },
  { nome: "Disney+", chaves: ["disney"] },
  { nome: "HBO Max", chaves: ["hbo"] },
];

const extrairNumero = (valor: string) => {
  return Number(
    valor
      .replace("R$", "")
      .replace(",",".")
      .trim()
  );
};

const limparTudo = () => {
    setResultado([]);
    localStorage.removeItem("assinaturas");
  };

  const analisarTexto = () => {
    const linhas = texto.split("\n");

    const resultados: { nome: string; valor?: string }[] = [];

    linhas.forEach((linha) => {
      const linhaLower = linha.toLowerCase ();

    servicos.forEach((servico) => {
      if (servico.chaves.some((chave) => 
      linhaLower.includes(chave)
    )
  ) {
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
      <h1>Detector de Assinaturas</h1>

    <input
      placeholder="Cole aqui suas assinaturas..."
      value={texto}
      onChange={(e) => setTexto(e.target.value)}
      style={{
        padding: 10,
        width: 300,
        borderRadius: 6,
        border: "1px solid #333",
        marginRight: 10,
      }}
    />

    <button 
      onClick={analisarTexto}
      style={{
        padding: "10px 16px",
        borderRadius: 6,
        backgroundColor: "#6c5ce7",
        color: "#fff",
        border: "none,",
        cursor: "pointer",
      }}
    >
      Analisar
    </button>

      {resultado.length === 0 ? (
        <p>Nenhuma Assinatura Encontrada</p>
      ) : (
        <div style={{ marginTop: 20 }}>
          {resultado.map((item, index) =>(
            <div 
              key={index}
              style={{
                display:"flex",
                justifyContent: "space-between",
                padding: "12px 16px",
                marginBottom: 10,
                borderRadius: 8,
                backgroundColor: "#1e1e2f",
              }}
              >
                <span>{item.nome}</span>
                <strong>{item.valor}</strong>
            </div>
          ))}
        </div>
      )}
      <p>
        Total mensal: R$ {total.toFixed(2)}
      </p>

      <button
      onClick={limparTudo}
      style={{
        marginTop: 20,
        padding: "10px 16px",
        borderRadius: 6,
        backgroundColor: "#ff6b6b",
        color: "#fff",
        border: "none",
        cursor: "pointer",
      }}
      >
        Limpar Tudo
      </button>

    </div>
  );
}

export default App;