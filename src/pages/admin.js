import { useEffect, useState } from "react";
import "../styles/styles.css";
import Menu from "../components/menu";
import logoAt from "../images/logo-at.png";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [pesquisa, setPesquisa] = useState("");

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

  const filteredUsers = users.filter(user => 
    user.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <Menu />
      <div className="dashboard-content p-6 bg-gray-100 min-h-screen">
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4 flex items-center justify-start">
          <div className="flex w-full max-w-md rounded-2xl shadow-md overflow-hidden border border-gray-300">
            <input
              type="text"
              placeholder="Pesquisar por nome do funcionário"
              className="p-3 w-full focus:outline-none text-gray-700 placeholder-gray-400"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
            <button className="bg-blue-900 text-white p-3 hover:bg-blue-800 transition duration-500">
              🔍︎
            </button>
          </div>
          <div className="ml-auto">
            <img src={logoAt} alt="logo da auto-telling" />
          </div>
        </div>
        <table className="w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Nome</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Nível</th>
              <th className="py-2 px-0 border" style={{ width: "200px" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{user.id}</td>
                <td className="py-2 px-4 border">{user.nome}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">{user.nivel}</td>
                <td className="py-2 px-0 border text-center flex justify-center gap-3">
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
  );
};

export default Admin;