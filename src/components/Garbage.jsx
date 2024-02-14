



function Garbage() {




  const [error, setError] = useState(false)
  const [image,setImage] =useState();



  setImage()
  setIsView()

  const checkValidation = () => {

    if (!collector?.name || !collector?.phone_number || !collector?.start_date || !ward) {
      console.log("please fill required fields")
      setError(true)
      return false

    }
    else {
      setError(false)
      return true
    }

  }



  const handleChange = (e, name) => {

    if (name === "image") {
      const check = Config?.fileType(e.target.files[0].name)

      if (!check) {
        console.log("not supported")
        return
      }
      console.log(e.target.files[0].name)
      let value = e.target.files[0]
      setImage(value)
    }
    else {

      const { value } = e.target
      setCollector((prevstate) => {
        return {
          ...prevstate, [name]: value
        }

      })

    }



  }




  setWard(response?.data?.ward_no)

  const check = checkValidation()

  if (!check) {
    return
  }


  
  if (image) {
    data.append("image", image)
}





  const validate = () => {

    if (!viewCollector?.employee_info?.name || !viewCollector?.employee_info?.phone_number || !viewCollector?.employee_info?.start_date || !ward) {
      console.log("please fill required fields")
      setError(true)
      return


    }
    setError(false)


  }



  const handleEditChange = (e, name) => {
    console.log("trigger")


    if (name === "image") {
      let value = e.target.files[0]

      const check = Config?.fileType(value.name)

      if (!check) {
        console.log("not supported")
        return
      }

      setImage(value)
    }
    else {
      const { value } = e.target
      setViewCollector((prevstate) => ({
        ...prevstate,
        employee_info: {
          ...prevstate.employee_info,
          [name]: value
        }

      }))
    }

  }








if (image) {
  data.append("image", image)
}














  return (

    <>
      <div class="col-lg-6 col-sm-12 col-12">
        <div class="form-group">
          <label class="form-label">Image :
            <span class="form-required">*</span></label>
          <input type="file" class="form-control"
            defaultValue={collector?.image || ""}
            onChange={(e) => handleChange(e, "image")}

            name="category_name" />
        </div>
      </div>



      <div class="col-lg-6 col-sm-12 col-12">
        <div class="form-group">
          <label class="form-label">Image :
            <span class="form-required">*</span></label>
          <input type="file" class="form-control"
           
            onChange={(e) => handleEditChange(e, "image")}

            name="category_name" />
        </div>
      </div>

      <td><img src={e?.employee_info?.image} className="emp-thumb" /></td>


      <td><img src={emp?.image ? Config.BASE_URL + emp?.image : "assets/img/profiles/no_avatar.jpg"} className="emp-thumb" /></td>



      {(error && !viewCollector?.employee_info?.name) && (
        <span className="req-text">This field is required</span>
      )}





      {(error && !ward) && (
        <span className="req-text">This field is required</span>
      )}




      {(error && !viewCollector?.employee_info?.phone_number) && (
        <span className="req-text">This field is required</span>
      )}



      {(error && !viewCollector?.employee_info?.start_date) && (
        <span className="req-text">This field is required</span>
      )}









<option disabled selected value >-----------</option>
    </>

  )
}


export default Garbage;