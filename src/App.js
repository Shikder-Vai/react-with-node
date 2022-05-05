import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddBtn = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const possition = event.target.possition.value;
    const user = { name, email, possition };

    // send data to server

    fetch("http://localhost:5000/user", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUsers = [...users, data];
        setUsers(newUsers);
      });
  };

  return (
    <div className="App">
      <h1>here is my own data:{users.length}</h1>
      <form onSubmit={handleAddBtn}>
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="email" placeholder="Email" />
        <input type="text" name="possition" placeholder="Possition" />
        <input type="submit" value="Add Person" />
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {" "}
            Name:{user.name} <p>Posstion: {user.possition}</p>
            <p>Id:{user.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
