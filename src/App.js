import api from "./services/api";
import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  // useState
  const [repositories, setRepositories] = useState([]);

  //useEffect
  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: ` novo repositório ${Date.now()}`,
      url: "https://github.com/allefreis",
      techs: ["React", "Node.js"],
      id: "123",
    });
    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);
  }
  //deletar
  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    //const repositorie = response.data;
    setRepositories(repositories.filter((repository) => repository.id !== id));
    //  const newRepositories = await api.get("/repositories");
    // setRepositories([...newRepositories.data]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repositorie) => (
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
