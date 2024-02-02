import { useRef } from "react";

export const UPLOAD_ACCEPT_FILE_TYPE = {
  PDF: "application/pdf",
};
export const UploadFileComponent = ({
  buttonLabel,
  handleChange,
  multiple,
  allowedFileTypes,
}) => {
  const inputRef = useRef(null);

  const uploadSingleFile = (event) => {
    inputRef.current.click();
  };
  return (
    <div>
      <button onClick={uploadSingleFile}>{buttonLabel}</button>
      <input
        multiple={multiple ?? false}
        type="file"
        ref={inputRef}
        accept={allowedFileTypes}
        onChange={(e) => {
          handleChange(Array.prototype.slice.call(e.target.files));
        }}
        style={{ display: "none" }}
      />
    </div>
  );
};
