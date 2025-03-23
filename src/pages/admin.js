import { useEffect, useState } from "react";
import "../styles/styles.css";
import Menu from "../components/menu";
import logoAt from "../images/logo-at.png";
import EditFuncModal from "../components/editFuncModal";
import { AlertCircle as LucideAlertCircle } from "lucide-react";
import AddFuncModal from "../components/addFuncModal";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [pesquisa, setPesquisa] = useState("");
  const [filtrosVisiveis, setFiltrosVisiveis] = useState(false);
  const [filtros, setFiltros] = useState({
    id: "",
    nome: "",
    email: "",
    nivel: "",
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const toggleFiltros = () => {
    setFiltrosVisiveis(!filtrosVisiveis);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteUser = async () => {
    const token = localStorage.getItem("token");
    if (!token || !userToDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/auth/user/${userToDelete.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir funcionário");
      }

      setUsers(users.filter((user) => user.id !== userToDelete.id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      (filtros.id ? user.id.toString().includes(filtros.id) : true) &&
      (filtros.nome ? user.nome.toLowerCase().includes(filtros.nome.toLowerCase()) : true) &&
      (filtros.email ? user.email.toLowerCase().includes(filtros.email.toLowerCase()) : true) &&
      (filtros.nivel ? user.nivel.toLowerCase().includes(filtros.nivel.toLowerCase()) : true) &&
      (pesquisa ? user.nome.toLowerCase().includes(pesquisa.toLowerCase()) : true) 
    );
  });  

  return (
    <div className="dashboard-container">
      <Menu />
      <div className="dashboard-content p-6 bg-gray-100 min-h-screen">
        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-4 flex items-center justify-start">
          <div className="flex w-full max-w-md rounded-2xl shadow-md overflow-hidden border border-gray-300">
            <input
              type="text"
              placeholder="Pesquisar por nome do usuário"
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

        <button
          className="bg-blue-900 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-800"
          onClick={toggleFiltros}
        >
          Filtros Avançados
        </button>
        <button
        className="ml-4 bg-blue-900 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-800"
        onClick={() => setIsModalOpen(true)}
        >
          Inserir novo usuário
        </button>
        {isModalOpen && <AddFuncModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}

        {filtrosVisiveis && (
          <div className="grid grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="ID"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filtros.id}
              onChange={(e) => setFiltros({ ...filtros, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Nome"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filtros.nome}
              onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
            />
            <input
              type="text"
              placeholder="Email"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filtros.email}
              onChange={(e) => setFiltros({ ...filtros, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Nível"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filtros.nivel}
              onChange={(e) => setFiltros({ ...filtros, nivel: e.target.value })}
            />
          </div>
        )}

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
                  <button
                    onClick={() => handleEditClick(user)}
                    className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-blue-800 transition duration-200 ml-4"
                  >
                    Alterar
                  </button>
                  <button
                    onClick={() => handleDeleteClick(user)}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 mr-4"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <EditFuncModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={selectedUser}
          onUpdate={handleUpdateUser}
        />

        {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <LucideAlertCircle className="w-8 h-8 text-red-600 mb-2 mx-auto" />
          <h2 className="text-lg font-bold text-gray-800 font-sans">
            Deseja excluir esse carro do estoque?
          </h2>
          <div className="mt-4 flex justify-center gap-4">
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-blue-900"
              onClick={handleDeleteUser}
            >
              Confirmar
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
