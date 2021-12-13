import React from "react";
import * as Md from "react-icons/md";
import * as Fa from "react-icons/fa";


export const DatosMenu = [
  {
    title: "Registrar Alumno",
    path: "/",
    icon: <Md.MdSchool />,
    CName: "nav-text",
  },
  {
    title: "Registrar Maestro",
    path: "/registrar_maestro",
    icon: <Fa.FaChalkboardTeacher />,
    CName: "nav-text",
  },
  {
    title: "Alumnos",
    path: "/alumnos",
    icon: <Fa.FaUserGraduate/>,
    CName: "nav-text",
  },
  {
    title: "Maestros",
    path: "/maestros",
    icon: <Fa.FaUserTie/>,
    CName: "nav-text",
  },
];

export default DatosMenu;
