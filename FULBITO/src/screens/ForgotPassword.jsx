import React, { useState } from "react";
import { View, ImageBackground } from "react-native";
import { useGetNewPassword } from "../../hooks/useGetNewPassord";
import forgotPasswordStyles from "../../styles/forgotPasswordStyles";
import { useFontStyle } from "../../hooks/useFontStyle";
import FormUser from "../../components/form/FormUser";
import ButtonSubmitUser from "../../components/buttons/ButtonSubmitUser";
import ButtonLogIn from "../../components/buttons/ButtonLogIn";
import userFields from "../../config/forgotPasswordConfig";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { newPassword } = useGetNewPassword(email);
  const styles = useFontStyle(forgotPasswordStyles);

  return (
    <ImageBackground
      source={require("../../public/images/fondoApp.png")}
      style={styles.image}
      resizeMode="cover"
    >
      <View style={{ flex: "0.9", justifyContent: "center" }}>
        <FormUser
          title="Forgot Password"
          setData={setEmail}
          fieldConfig={userFields}
          styles={styles}
        />
        <ButtonSubmitUser title="Send new password" onSubmit={newPassword} styles={styles}/>
        <ButtonLogIn styles={styles}/>
      </View>
    </ImageBackground>
  );
};

export default ForgotPassword;
