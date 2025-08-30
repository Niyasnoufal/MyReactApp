// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersList);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Welcome to you Dashboard CHIEF</h2>
      <table border="1" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.name}</td>
              <td>{u.phone}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
