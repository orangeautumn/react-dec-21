import { useRef, useState } from "react";
import {
  UPLOAD_ACCEPT_FILE_TYPE,
  UploadFileComponent,
} from "./UploadFileComponent";

export const UploadFiles = () => {
  const [singleFile, setSingleFile] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState([]);

  const handleSingleFileUpload = (inputFile) => {
    setSingleFile(inputFile);
  };

  const handleMultipleFilesUpload = (inputFile) => {
    console.log("inputFile-->, ", inputFile);
    multipleFiles.push(inputFile);

    setMultipleFiles([...multipleFiles]);
  };

  const removeItem = (index) => {
    multipleFiles.splice(index, 1);
    setMultipleFiles([...multipleFiles]);
  };

  return (
    <div>
      Upload files
      <div>
        Single file Upload
        <br />
        <UploadFileComponent
          buttonLabel={"upload  "}
          handleChange={handleSingleFileUpload}
          key="singleFileKey"
          allowedFileTypes={UPLOAD_ACCEPT_FILE_TYPE.PDF}
        />
        <br />
        {singleFile.map((item) => item.name)}
        <br />
      </div>
      <br />
      <div>
        Multiple file Upload
        <br />
        <UploadFileComponent
          buttonLabel={"upload "}
          handleChange={handleMultipleFilesUpload}
          key="singleFileKey"
          multiple
          allowedFileTypes={UPLOAD_ACCEPT_FILE_TYPE.PDF}
        />
        <br />
        {multipleFiles.map((item, index) => {
          return (
            <div>
              {item.name} {"    "}
              <button
                onClick={() => {
                  removeItem(index);
                }}
              >
                remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
