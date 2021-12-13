import "./formularioestudiante.css";
import React, { useState } from "react";
import Imgalumnos from "../components/Imagenalumno";
import { db, storage } from "../utils/firebase";


const rol1 = [
    {
      rol: "Alumno"
    }];



function Formulario_estudiantes() {
  const [data, setData] = useState({
    nombre: "",
    matricula: "",
    GradoGrupo: "",
    correo: "",
    password: "",
    rol: "",
    image: null,
  });

  function HandleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function RegistrarAlumno(e) {
    try {
      console.log(data);
      e.preventDefault();
      const uploadTask = storage
        .ref("alumno/" + data.image.name)
        .put(data.image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progress;
          progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref("alumno")
            .child(data.image.name)
            .getDownloadURL()
            .then((imageUrl) => {
              db.collection("alumnos")
                .doc()
                .set({
                  nombre: data.nombre,
                  matricula: data.matricula,
                  GradoGrupo: data.GradoGrupo,
                  correo: data.correo,
                  password: data.password,
                  rol: data.rol,
                  image: imageUrl,
                })
                .then(() => {
                  setData({
                    nombre: "",
                    matricula: "",
                    GradoGrupo: "",
                    correo: "",
                    password: "",
                    rol: "",
                    image: null,
                  });
                });
            });
        }
      
     
      );
    } catch (error) {
      console.log(error);
    }
   window.alert("Alumno Registrado");
  }
  return (
    <>
      <div className="Contenedor">
        <div className="Contenedor__form">
          <form className="form">
            <h1 className="Titulo__form"> Registro de Alumnos</h1>
            <label className="titulo__input">Nombre del Alumno</label>
            <input
              className="form__input"
              type="text"
              name="nombre"
              onChange={HandleChange}
              value={data.nombre}
            />

            <label className="titulo__input">Matricula</label>
            <input
              className="form__input"
              type="text"
              name="matricula"
              onChange={HandleChange}
              value={data.matricula}
            />

            <label className="titulo__input">Grado y Grupo</label>
            <input
              className="form__input"
              type="text"
              name="GradoGrupo"
              value={data.GradoGrupo}
              onChange={HandleChange}
            />

            <label className="titulo__input">Correo</label>
            <input
              className="form__input"
              type="email"
              name="correo"
              onChange={HandleChange}
              value={data.correo}
            />

            <label className="titulo__input">Contraseña Alumno</label>
            <input
              className="form__input"
              type="password"
              name="password"
              onChange={HandleChange}
              value={data.password}
            />
            <Imgalumnos setData={setData} />


            <select className="select__form" name="rol" value={data.rol}  onChange={HandleChange}>
            <option value="" disabled="disabled" selected>
              Seleccione rol
            </option>
            {rol1.map((item, i) => (
              <option key={"rol" + i} value={item.rol}>
                {item.rol}
              </option>
            ))}
            </select>
            <button  className="btn__form" style={{ marginTop: "10px" }} onClick={RegistrarAlumno}>
              Registrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Formulario_estudiantes;
