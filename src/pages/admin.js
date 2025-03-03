import { useEffect, useState } from "react";
import "../styles/styles.css";
import Menu from "../components/menu";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token não encontrado. Faça login novamente.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/auth/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar funcionários");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="dashboard-container">
      <Menu />
      <div className="dashboard-content p-6 bg-gray-100 min-h-screen">
       <h1 className="text-2xl font-bold text-gray-800 mb-4">Funcionários Auto-Telling</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg border border-gray-300">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Nome</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Nível</th>
                <th className="py-2 px-0 border" style={{ width: "200px" }}>Ações</th> {/* Largura ajustada para 200px */}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{user.id}</td>
                  <td className="py-2 px-4 border">{user.nome}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border">{user.nivel}</td>
                  <td className="py-2 px-0 border text-center flex justify-center gap-3">
                    {/* Botões com margens ajustadas */}
                    <button className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-blue-800 transition duration-200 ml-4">
                      Alterar 
                    </button>
                    <button className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 mr-4">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
