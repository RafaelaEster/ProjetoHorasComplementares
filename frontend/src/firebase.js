import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Importando o Firebase Authentication
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Importando Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyAMTBWdn8f9XKGvUKe0HydYl_Q97RmnFfs",
  authDomain: "horascomplementares-6e16e.firebaseapp.com",
  projectId: "horascomplementares-6e16e",
  storageBucket: "horascomplementares-6e16e.appspot.com",
  messagingSenderId: "666474479752",
  appId: "1:666474479752:web:97f63a4cb12c28e52c9f3d",
  measurementId: "G-LBJNFRKPR3"
};

const app = initializeApp(firebaseConfig);

// Inicializando o Firestore, Authentication e Storage
const db = getFirestore(app);
const auth = getAuth(app); // Inicializando a autenticação
const storage = getStorage(app);

// Função para fazer upload de arquivo para o Firebase Storage
const uploadFile = async (file) => {
  const storageRef = ref(storage, `comprovantes/${file.name}`); // Cria uma referência para o arquivo
  await uploadBytes(storageRef, file); // Faz o upload do arquivo para o Firebase Storage
  const fileURL = await getDownloadURL(storageRef); // Obtém a URL do arquivo após o upload
  return fileURL; // Retorna a URL do arquivo
};

export { db, addDoc, collection, auth, storage, uploadFile }; // Exportando todos os serviços
