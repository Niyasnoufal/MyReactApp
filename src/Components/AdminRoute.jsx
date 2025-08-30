// src/components/AdminRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (cancelled) return;

      if (!user) {
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setUser(user);

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const admin = snap.exists() && snap.data()?.role === "admin";
        if (!cancelled) setIsAdmin(admin);
      } catch (err) {
        console.error("Admin check failed:", err);
        if (!cancelled) setIsAdmin(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
