
import Cookies from "js-cookie";
import { RotatingLines } from 'react-loader-spinner'

export let userState = JSON.parse(
    typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) !=
        "undefined"
        ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME)
        : null
);



const Config = {
    userState: userState,
    HOST_URL: "../../../",
    BASE_URL: import.meta.env.VITE_APP_BASE_URL,
    LOGIN_URL: import.meta.env.VITE_APP_LOGIN_URL,
    MEDIA_URL: import.meta.env.VITE_APP_MEDIA_URL,

    config: {
        headers: { Authorization: `Bearer ${userState?.token}` }
    },

    logout: function (props) {
        if (Config.userState !== null)
            Cookies.remove(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME, {
                domain: Config.COOKIE_DOMAIN,
            });

        setTimeout(() => {
            window.location.href = import.meta.env.VITE_APP_LOGIN_URL;
        }, 200);
    },

    fileType: (e) => {
        const supported = ["jpg", "png"]
        let ext = e.split(".").pop()
        return supported.includes(ext)
    },

    loader: <RotatingLines
        visible={true}
        height="20"
        width="20"
        // color="white"
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
    />,
    errString :"This Field is Required",

    modelStyle: {
        // position: 'absolute',
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)',
    },


    toast: function (alertText = "", type = "success", dismiss = false) {


        // console.log("triggered")
      
        //Toast alert depricated
        // toast?.configure();
        toast.clearWaitingQueue();
    
    
        // dismiss/remove all toast
        if (dismiss) {  
          toast.dismiss();
          return;
        }
    
        console.log("triggered",type)
        let AlertContent = () => (
          <div className="toast-align">
            <span className="toast-img">
            </span>
            <div className="classWithFontStyleOrWhatever">{alertText}</div>
          </div>
        );
        switch (type) {
          case "warning": {
            // To show warnings
            AlertContent = () => (
              <div className="toast-align">
                <span className="toast-img">
                </span>
                <div className="classWithFontStyleOrWhatever">{alertText}</div>
              </div>
            );
            console.log(type)
    
            return toast(<AlertContent />, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              // transition: Bounce,
              });
            // return toast(<AlertContent />, {
            //   transition: Slide,
            //   position: "top-center",
            //   autoClose: 3000,
            //   hideProgressBar: true,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            // });
          }
          case "info": {
            //To show information
            AlertContent = () => (
              <div className="toast-align">
                <span className="toast-img">
                </span>
                <div className="classWithFontStyleOrWhatever">{alertText}</div>
              </div>
            );
            return toast.info(<AlertContent />, {
              transition: Slide,
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          case "error": {
            //To show error messages
            AlertContent = () => (
              <div className="toast-align">
                <span className="toast-img">
                </span>
                <div className="classWithFontStyleOrWhatever">{alertText}</div>
              </div>
            );
            return toast.error(<AlertContent />, {
              transition: Slide,
              position: "top-center",
              // autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              limit: 1,
            });
          }
          default: {
            // To show success alert
            return toast.success(<AlertContent />, {
              transition: Slide,
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      },
    // avatar : `${Config?.HOST_URL}assets/img/profiles/avator1.jpg`,
    avatar: "assets/img/profiles/avator1.jpg",

    truncateText: (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        } else {
            return text.substring(0, maxLength);
        }
    },
    dateTime: (isoDatetimeString) => {
        // console.log(isoDatetimeString)
        // const dateTimeParts = isoDatetimeString.split(/[T\+-]/);
        // const datePart = dateTimeParts[0];
        // const timePart = dateTimeParts[1].split('.')[0];
        // const offset = dateTimeParts[2];

        // const [year, month, day] = datePart.split('-');
        // const [hour, minute, second] = timePart.split(':');

        // const dateTime = new Date(Date.UTC(year, month - 1, day, hour, minute, second));

        // // Adjust for the timezone offset
        // const offsetHours = parseInt(offset.substring(0, 3));
        // const offsetMinutes = parseInt(offset.substring(3));
        // const offsetMilliseconds = (offsetHours * 60 + offsetMinutes) * 60 * 1000;
        // dateTime.setTime(dateTime.getTime() - offsetMilliseconds);

        // console.log(dateTime.toString()); // Output the datetime as a string
        // // return dateTime.toString()
        // return isoDatetimeString




        const dateTime = new Date(isoDatetimeString);

        const options = {
            timeZone: 'Asia/Kolkata', // Replace 'Asia/Kolkata' with the desired timezone
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };

        const dateString = dateTime.toLocaleDateString('en-US', options);
        console.log(dateString);
        return dateString

    }



};
export default Config;


