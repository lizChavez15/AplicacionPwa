import React, { useState } from "react";
import { db, storage } from "../utils/firebase";
import "./formulariomaestro.css";
import Imgmaestro from "../components/ImageMaestro"




const rol1 = [
    {
      rol: "Docente"
    }];

function Formulario_maestros() {

    const [data, setData] = useState({
        nombre: "",
        materia: "",
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
    
      function RegistrarMaestro(e) {
        try {
          console.log(data);
          e.preventDefault();
          const uploadTask = storage
            .ref("docentes/" + data.image.name)
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
                .ref("docentes")
                .child(data.image.name)
                .getDownloadURL()
                .then((imageUrl) => {
                  db.collection("Maestros")
                    .doc()
                    .set({
                      nombre: data.nombre,
                      materia: data.materia,
                      correo: data.correo,
                      password: data.password,
                      rol: data.rol,
                      image: imageUrl,
                    })
                    .then(() => {
                      setData({
                        nombre: "",
                        materia: "",
                        correo: "",
                        password: "",
                        rol: "",
                        image: null,
                      });
                    });
                });
            }
        
          );
          window.alert("Maestro Registrado");
        } catch (error) {
          console.log(error);
        }
       
      }

    return (
        <>
        <div className="Contenedor1">
          <div className="Contenedor__form">
            <form className="form">
              <h1 className="Titulo__form"> Registro del Maestro</h1>
              <label className="titulo__input">Nombre del Maestro</label>
              <input
                className="form__input"
                type="text"
                name="nombre"
                onChange={HandleChange}
                value={data.nombre}
              />
  
              <label className="titulo__input">Materia asignada</label>
              <input
                className="form__input"
                type="text"
                name="materia"
                onChange={HandleChange}
                value={data.materia}
              />
  
  
              <label className="titulo__input">Correo</label>
              <input
                className="form__input"
                type="email"
                name="correo"
                onChange={HandleChange}
                value={data.correo}
              />
  
              <label className="titulo__input">Contraseña Maestro</label>
              <input
                className="form__input"
                type="password"
                name="password"
                onChange={HandleChange}
                value={data.password}
              />
              <Imgmaestro setData={setData} />
  
  
              <select className="select__form" name="rol" value={data.rol}  onChange={HandleChange}>
              <option value={data.rol} disabled="disabled" selected>
                Seleccione rol
              </option>
              {rol1.map((item, i) => (
                <option key={"rol" + i} value={item.rol}>
                  {item.rol}
                </option>
              ))}
              </select>
              <button  className="btn__form" style={{ marginTop: "10px" }} onClick={RegistrarMaestro}>
                Registrar
              </button>
            </form>
          </div>
        </div>
      </>
    )
}

export default Formulario_maestros
