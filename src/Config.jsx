
import Cookies from "js-cookie";

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
  
    config : {
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
    }



};
export default Config;


