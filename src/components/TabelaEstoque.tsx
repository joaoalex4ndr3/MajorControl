import { useState } from "react";

type Produto = {
  id: number;
  nome: string;
  sku: string;
  seg: number;
  ter: number;
  qua: number;
  qui: number;
  sex: number;
  meta: number;
};

const dadosIniciais: Produto[] = [
  { id: 1, nome: "Espuma Facial", sku: "03", seg: 0, ter: 0, qua: 0, qui: 0, sex: 0, meta: 10 },
  { id: 2, nome: "Esfoliante Facial", sku: "05", seg: 0, ter: 0, qua: 0, qui: 0, sex: 0, meta: 10 },
];

export default function TabelaEstoque() {
  const [produtos, setProdutos] = useState(dadosIniciais);

  const atualizar = (id: number, campo: string, valor: string) => {
    setProdutos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, [campo]: Number(valor) } : p
      )
    );
  };

  return (
    <div className="w-full overflow-auto">
      <table className="w-full border text-sm">
        <thead className="bg-gray-100 text-xs">
          <tr>
            <th className="p-2 border">Produto</th>
            <th className="p-2 border">Seg</th>
            <th className="p-2 border">Ter</th>
            <th className="p-2 border">Qua</th>
            <th className="p-2 border">Qui</th>
            <th className="p-2 border">Sex</th>
            <th className="p-2 border">Meta</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.nome}</td>

              {["seg", "ter", "qua", "qui", "sex", "meta"].map((campo) => (
                <td key={campo} className="border p-1">
                  <input
                    type="number"
                    value={p[campo as keyof Produto] as number}
                    onChange={(e) =>
                      atualizar(p.id, campo, e.target.value)
                    }
                    className="w-full bg-transparent text-center outline-none"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}