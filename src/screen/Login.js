import React,{useState} from 'react'
import firebaseApp from '../utils/firebase';
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import {getFirestore, doc ,setDoc} from "firebase/firestore"


function Login() {
    const [IsRegistrando, setIsRegistrando] = useState(false)
    const auth =getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp)

    async function registrarUsuarios(email, password, rol){
      const infoUsuario = await createUserWithEmailAndPassword(auth, email, password).then ((usuarioFirebase) => {
          return usuarioFirebase
      });

      console.log(infoUsuario.user.uid);
      const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}` );
      setDoc(docuRef,{correo:email, rol:rol});
    }


    function submitHandler (e){
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password= e.target.elements.password.value;
        const rol1= e.target.elements.rol.value;
       

        console.log("submit",email,password,rol1);

        if (IsRegistrando){
            registrarUsuarios(email, password, rol1,);
        }else{
            signInWithEmailAndPassword();
        }
    }



    return (
        <div>
            <h1>{IsRegistrando ? "Registrate": "Inicia Sesion"}</h1>
            <form onSubmit={submitHandler}>
                <label>
                    Correo electronico:
                    <input type="email" id="email"/>
                </label>
                <label>
                    Contraseña
                    <input type="password" id="password"/>
                </label>
                <label>
                    Rol:
                    <select id="rol">
                        <option value="maestro">Maestro</option>
                        <option value="estudiante">Alumno</option>
                    </select>
                </label>

                <input type="submit" value={IsRegistrando ? "Registrar": "Iniciar sesion"}/>
            </form>
            <button onClick ={() => setIsRegistrando(!IsRegistrando)}>
                {IsRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}
            </button>
        </div>
    )
}

export default Login;
