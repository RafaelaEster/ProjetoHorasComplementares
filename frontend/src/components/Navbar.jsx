import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between bg-gray-100 p-4 border-b">
      {/* Título */}
      <h1 className="text-lg font-semibold">
        <Link to="/" className="hover:underline">
          Horas Complementares
        </Link>
      </h1>

      {/* Links ou Botões */}
      <div className="flex items-center space-x-4">
        {user?.displayName ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-700">
              Olá, {user.displayName}
            </span>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/signin"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
