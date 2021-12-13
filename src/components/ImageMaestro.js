import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import"./imageAlumno.css"







function ImageMaestro(props) {
    const [file, setFile] = useState();
  const [previewUrl, setpreviewUrl] = useState();
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setpreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  function pickedHandler(event) {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      props.setData((prev) => {
        return { ...prev, image: pickedFile };
      });
    }
  }

  function pickedImageHandler() {
    filePickerRef.current.click();
  }


    return (
        <div className="form-controll center">
          <input
            id={props.id}
            ref={filePickerRef}
            style={{ display: "none" }}
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={pickedHandler}
          />
          <div className={`image-upload ${props.center && "center"}`}>
            <div className="image-upload__preview">
              {previewUrl && <img src={previewUrl} alt="preview" />}
              {!previewUrl && (
                <div className="center">
                  <Button
                    className="image-upload-button"
                    type="button"
                    onClick={pickedImageHandler}
                  >
                      Agregar imagen del alumno
                  </Button>
                </div>
              )}
            </div>
            <div>
              {previewUrl && (
                <div>
                  <Button
                    className="image-upload-button"
                    type="button"
                    onClick={pickedImageHandler}
                  > elegir otra imagen
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
}

export default ImageMaestro;