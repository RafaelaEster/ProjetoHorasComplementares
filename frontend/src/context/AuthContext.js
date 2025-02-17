import { useContext, createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importando SweetAlert para exibir mensagens de erro

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // Inicializado como 'undefined' para indicar carregamento
  const navigate = useNavigate(); // Hook para redirecionamento

  // Função de login com Google
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;

      // Verificar domínio do e-mail
      if (userEmail.endsWith('@aluno.ifsc.edu.br')) {
        setUser(result.user);
        navigate('/dashboardAluno'); // Redireciona para o Dashboard do Aluno
      } else if (userEmail.endsWith('@ifsc.edu.br')) {
        setUser(result.user);
        navigate('/dashboardCoordenador'); // Redireciona para o Dashboard do Coordenador
      } else {
        Swal.fire({
          title: 'Erro!',
          text: 'E-mail inválido, use um e-mail institucional.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        await signOut(auth); // Desloga automaticamente
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível fazer login. Tente novamente.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  // Função de logout
  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // Reseta o estado do usuário
      navigate('/'); // Redireciona para a página inicial
    } catch (error) {
      console.error('Erro ao deslogar:', error);
      Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível sair da conta. Tente novamente.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  // Monitora o estado de autenticação do usuário
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userEmail = currentUser.email;

        // Verifica se o e-mail tem domínio válido
        if (userEmail.endsWith('@aluno.ifsc.edu.br') || userEmail.endsWith('@ifsc.edu.br')) {
          setUser(currentUser); // Define o estado do usuário
        } else {
          Swal.fire({
            title: 'Erro!',
            text: 'Apenas usuários com e-mail institucional têm acesso.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          await signOut(auth); // Desloga automaticamente
          setUser(null);
        }
      } else {
        setUser(null); // Remove o usuário se não estiver autenticado
      }
    });

    return () => unsubscribe(); // Remove o listener ao desmontar o componente
  }, []);

  // Exibe uma tela de carregamento enquanto o estado do usuário é verificado
  if (user === undefined) {
    return <div className="text-center text-xl">Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto de autenticação
export const UserAuth = () => {
  return useContext(AuthContext);
};