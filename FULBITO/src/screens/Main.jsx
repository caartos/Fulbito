import React, { useState } from "react";
import { useSingIn } from "../../hooks/useSignIn";
import { useFontStyle } from "../../hooks/useFontStyle";
import { View, ImageBackground } from "react-native";
import LoadingSpinner from "../../components/spinner/Spinner";
import mainStyles from "../../styles/mainStyles";
import ButtonMainLogIn from "../../components/buttons/ButtonMainLogIn";
import ButtonMainAccount from "../../components/buttons/ButtonMainAccount";
import FormUser from "../../components/form/FormUser";
import userFields from "../../config/mainConfig";

const Main = () => {
  const [completeUser, setCompleteUser] = useState({
    email: "",
    password: "",
  });
  const { logIn, loading } = useSingIn(completeUser);
  const styles = useFontStyle(mainStyles);

  return (
    <ImageBackground
      source={require("../../public/images/fut.png")}
      style={styles.image}
      resizeMode="cover"
    >
      <LoadingSpinner loading={loading} />
      <View style={styles.formContainer}>
        <FormUser
          setData={setCompleteUser}
          fieldConfig={userFields}
          styles={styles}
        />
        <ButtonMainLogIn logIn={logIn} styles={styles} />
        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          <ButtonMainAccount
            title={"¿Forgot your password?"}
            navigate={"ForgotPassword"}
            styles={styles}
          />
          <ButtonMainAccount
            title={"CREATE ACCOUNT"}
            navigate={"CreateAccount"}
            styles={styles}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Main;
