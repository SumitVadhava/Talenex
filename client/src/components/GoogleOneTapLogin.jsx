import { useGoogleOneTapLogin } from '@react-oauth/google'

const GoogleOneTapLogin = () => {
  // const { user, token } = useAuth();
  // const isLoggedIn = !!user && !!token;

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      // if (isLoggedIn) return;

      const payload = decodeJwt(credentialResponse.credential);

      const userToSave = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        google_id: payload.sub,
      };

      // setUserProp({
      //   userName: userToSave.name,
      //   email: userToSave.email,
      //   sub: userToSave.google_id,
      //   picture: userToSave.picture,
      // });

      // api  
      //     .post("/Google_login", userToSave)
      //     .then((response) => {
      //         login(response.data.user, response.data.token);
      //     })
      //     .catch((error) => {
      //         console.error("Error saving user:", error);
      //     });
    },
    onError: () => {
      console.log("One Tap Login Failed");
    },
  });

  return null;
};

export default GoogleOneTapLogin
