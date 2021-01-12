import React, { useEffect, useState } from "react";

import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Novo Repository ${Date.now()}`,
      url: `http://github.com/teste/adicinar`,
      techs: ["ReactJS, node"],
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if (response.status !== 204) return;

    const index = repositories.findIndex((repo) => repo.id === id);
    if (index < 0) return;

    repositories.splice(index, 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <div>
        <ul data-testid="repository-list">
          {repositories &&
            repositories.map((repository) => {
              const { title } = repository;
              return (
                <li key={repository.id}>
                  { title }
                  <button onClick={() => handleRemoveRepository(repository.id)}>
                    Remover
                  </button>
                </li>
              );
            })}
        </ul>
      </div>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
