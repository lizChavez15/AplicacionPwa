import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import "./Registroalumno.css"

function Registro_alumnos() {
    const [allDocs, setDocs] = useState([]);

    //funcion que nos ayudara a traer los datos de la base de datos
    const getAlumnos = async () => {
      db.collection("alumnos").onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setDocs(docs);
        console.log(allDocs);
      });
    };
  
    useEffect(() => {
      getAlumnos();
      // eslint-disable-next-line
    }, []);
  
    const eliminar = async (id) => {
        if (window.confirm("Esta seguro que desea eliminar el producto")) {
          await db.collection("alumnos").doc(id).delete();
        }
      };
    


    return (
        <>

        <div className="contenedor__table">
       <table>
  <tr>
    <td>Imagen alumno</td>
    <td>Nombre del alumno</td>
    <td>Matricula</td>
    <td>Grado y Grupo</td>
    <td>Correo</td>
    <td>Contraseña</td>
    <td>rol</td>

  </tr>
  {allDocs.map((doc) => {
          return (
  <tr>
    <td><img className="alumno_img"src={doc.image} alt="alumnos" /></td>
    <td>{doc.nombre}</td>
    <td>{doc.matricula}</td>
    <td>{doc.GradoGrupo}</td>
    <td>{doc.correo}</td>
    <td>{doc.password}</td>
    <td>{doc.rol}</td>
    <button
                    className="btn-eliminar"
                    onClick={() => eliminar(doc.id)}
                    style={{ marginTop: "10px" }}
                  >
                    Eliminar
                  </button>
  </tr>
         );
        })}
</table>
</div>
        </>
    )
}

export default Registro_alumnos
