import axios from "axios";
import Cookies from "js-cookie";

export let userState = JSON.parse(
    typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) !=
        "undefined"
        ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME)
        : null
);



const Config = {
    userState: userState,
    planState: import.meta.env.VITE_APP_PLAN_COOKIE_KEY_NAME,
    HOST_URL: "../../../",
    BASE_URL: import.meta.env.VITE_APP_BASE_URL,
    LOGIN_URL: import.meta.env.VITE_APP_LOGIN_URL,



    //     config: {
    //         headers: { Authorization: `Bearer ${Cookies.get("access")}` }
    //     },
    //     BASE_URL: import.meta.env.VITE_APP_BASE_URL,

    axios: (params) => {
        //Common axios handling
        let userCacheData = JSON.parse(
            typeof Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME) !=
                "undefined"
                ? Cookies.get(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME)
                : null
        );

        // refresh the page if the access token does not match
        if (userState?.token !== userCacheData?.token) {
            window.location.reload();
        }

        let token = userCacheData != null ? userCacheData?.token : "";
        let headers = {
            Accept: "application/json",
        };

        if (params.headers != null) headers = params.headers;
        if (params.auth != null) {
            //If auth needs
            if (params.auth === true) headers["Authorization"] = `Bearer ${token}`;
        }

        let axiosObj = {
            method: params.method,
            url: params.url,
            headers: headers,
        };

        if (params.method == null)
            //Define method
            params["method"] = "GET";
        if (params?.data != null || params?.formData != null)
            //If data, set the data
            axiosObj["data"] =
                params?.data != null
                    ? params.data
                    : params?.formData != null && params.formData;
        if (params?.timeout != null)
            // If timeout need
            params["timeout"] = params?.timeout;

        axios(axiosObj)
            .then((response) => {
                if (params?.success != null) params.success(response); //Callback to the param's success function
            })
            .catch((error) => {
                /*Create Refresh Token if access_token expires - start*/
                if (
                    error.response?.data?.messages !== undefined &&
                    error.response?.data?.messages.length !== 0 &&
                    error.response?.data?.messages[0]?.token_class === "AccessToken"
                ) {
                    let refreshToken = userState != null ? userState.refresh_token : "";
                    let formData = new FormData();
                    formData.append("refresh", refreshToken);
                    Config.axios({
                        url: Config.BASE_URL + "auth/jwt/refresh/",
                        method: "POST",
                        data: formData,
                        auth: true,
                        success: (response) => {
                            // console.log(response.data)
                            let userData = Config.userState;
                            userData.token = response.data.access;
                            Cookies.remove(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME, {
                                domain: Config.COOKIE_DOMAIN,
                            });
                            Cookies.set(
                                import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME,
                                JSON.stringify(userData),
                                { domain: Config.COOKIE_DOMAIN }
                            );
                            setTimeout(() => {
                                window.location.reload(false);
                            }, 500);
                            Config.axios(params);
                        },
                        error: (error) => {
                            // console.log(error.response.status);
                            if (Config.userState !== null)
                                Cookies.remove(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME, {
                                    domain: Config.COOKIE_DOMAIN,
                                });
                            window.location.href =
                                import.meta.env.VITE_APP_LOGIN_REDIRECT_URL;
                        },
                    });
                } else if (
                    error.response?.data?.msg === "Unauthorised" ||
                    error.response?.data?.code === "bad_authorization_header"
                ) {
                    //Logout if unauthorized response came
                    Config.logout();
                } else if (params.error != null) params.error(error);
                else {
                    Config.log(params.url);
                    Config.log(error);
                    Config.toast(Config.DEFAULT_ERROR_MESSAGE, "error");
                }
            })
            .finally(() => {
                if (params.finally != null) params.finally();
            });
    },

    /* 
    logout user from app 
    */
    logout: function (props) {
        //Logout the user
        if (Config.userState !== null)
            Cookies.remove(import.meta.env.VITE_APP_USER_COOKIE_KEY_NAME, {
                domain: Config.COOKIE_DOMAIN,
            });

        setTimeout(() => {
            window.location.href = import.meta.env.VITE_APP_LOGIN_URL;
        }, 200);
    },


    removeItemFromArray: (arr, item) => {
        return arr.filter((f) => f !== item);
    },

    fileType: (e) => {
        const supported = ["jpg", "png"]
        let ext = e.split(".").pop()
        console.log(ext, "image extension")
        return supported.includes(ext)
    }



};
export default Config;


