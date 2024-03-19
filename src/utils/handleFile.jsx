import DragAndDrop from "./DragandDrop";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Config from "../Config";
import { useEffect, useState } from "react";
import SelectDropDown from "./SelectDropDown";
import Link from '@mui/material/Link';



export default function FileUploader(props) {


  const { files, setFiles,
    // fileType,
    // setFileType,
    fileTypeLists,
    label, dropdownlabel,
    dropdown,
    loanFormId
  } = props

  const [selectedName, setSelectedName] = useState("");

  const [fileType, setFileType] = useState("");

  const [mounted, setMounted] = useState(false)

  const [tempFile, setTempFile] = useState()

  useEffect(() => {

    if (!mounted && files) {
      setFileType(files?.file_type)
      // setSelectedName(files?.files?.split("/").pop())
      // setTempFile()
      setMounted(true)
    }

  }, [files])


  const handleFileChange = (event) => {

    const file = event.target.files[0];
    console.log(file)
    let name = file.name;
    let lastDot = name?.lastIndexOf(".");
    let fileName = name?.substring(0, lastDot);
    let ext = "." + name?.substring(lastDot + 1);
    console.log(ext)
    if (
      ext !== ".docx" &&
      ext !== ".pdf" &&
      ext !== ".jpeg" &&
      ext !== ".jpg" &&
      // ext !== ".png" &&
      // ext !== ".gif" &&
      ext !== ".zip" &&
      // ext !== ".svg" &&
      ext !== ".xlsx"
    ) {
      // Config.toast(`${warningMsg}`, "warning");
      Config.toast(`Unsupport File Format`, "warning");
      return;
    }
    else {
      // setFiles(file)
      setTempFile(file)
      // setFiles({ ...files, "files": file });
      setSelectedName(file.name);
    }

  };

  const handleRemove = () => {
    setTempFile()
    // setFiles({ ...files, "files": "" })
    setSelectedName("");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiles({ ...files, "file_type": value });
    // setFileType(value)

  };

  console.log(files)



  const handleSave = () => {

    const data = new FormData()

    Object.entries(files).forEach(([key, value]) => {
      if (key !== "files") {
        data.append(key, value);
      }

    });
    data.append("loan_form", loanFormId)

    // data.append("files",files)
    // data.append("file_type",fileType)

    if (files?.id) {
      if (tempFile) {
        data.append("files", tempFile)
      }
      Config.axios({
        url: `${Config.BASE_URL}/user-documents/${files?.id}/`,
        method: "PUT",
        auth: true,
        data: data,
        success: (response) => {
          if (response.status === 200) {
            console.log(response.data)
            setFiles(response?.data)
            // handleNext()

          }
        },
        error: (error) => {
          Config.toast("Something went Wrong", "error");
          console.log(error);
        },
      });
    }
    else {
      if (!tempFile) {
        Config.toast("Please Upload File", "error")
        return
      }
      data.append("files", tempFile)
      Config.axios({
        url: `${Config.BASE_URL}/user-documents/`,
        method: "POST",
        auth: true,
        data: data,
        success: (response) => {
          if (response.status === 200) {
            console.log(response.data)
            setFiles(response?.data)
            // handleNext()

          }
        },
        error: (error) => {
          Config.toast("Something went Wrong", "error");
          console.log(error);
        },
      });
    }


  }

  return (

    <div className="uploader-component">

      <div className="parent">
        <label className="form-label-outside">{label}</label>
        {dropdown !== false && (
          <div className="col-md-6 mb-3">
            <SelectDropDown
              value={fileType}
              setValue={setFileType}
              lists={fileTypeLists}
              label={dropdownlabel}
              handleChange={handleChange}
            />
          </div>
        )}


        <div className="file-upload">
          {selectedName ?
            <>
              <h6> {selectedName || "Click box to upload"}</h6>
              {/* <img src="/src/assets/delete.svg" alt="upload" /> */}

            </>
            :
            <>
              <FileUploadOutlinedIcon></FileUploadOutlinedIcon>
              {/* <img src="/src/assets/upload.svg" alt="upload" /> */}
              <p>Maximun file size 10mb</p>
            </>
          }



          <input type="file" onChange={handleFileChange} />
        </div>

        {files && <>
          <div className="row mt-1">


            <div className="col text-start">
            <Link href={Config?.BASE_URL+files?.files }
            //  onClick={() => handleNavigate("/signup")}
              variant="body2">
                      {files?.files?.split("/").pop()}
                    </Link>

            </div>

            <div className="col text-end">
              <button className="button btn-save" onClick={handleSave}>Save</button>
              <button className="button btn-delete" onClick={handleRemove}>Remove</button>
            </div>
          </div>
        </>}

      </div>



    </div>
  )
};