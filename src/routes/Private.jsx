import { useState } from "react";
import PropTypes from 'prop-types';
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

export function Private({ children }) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useState(() => {
    const onsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
    });

    return () => {
      onsub();
    };
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
}

Private.propTypes = {
  children: PropTypes.node.isRequired
};
