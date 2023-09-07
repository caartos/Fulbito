import React, { useState } from "react";
import { ImageBackground, View } from "react-native";
import { useCreateNewUser } from "../../hooks/useCreateNewUser";
import { useFontStyle } from "../../hooks/useFontStyle";
import LoadingSpinner from "../../components/spinner/Spinner";
import FormUser from "../../components/form/FormUser";
import ButtonSubmitUser from "../../components/buttons/ButtonSubmitUser";
import ButtonReturn from "../../components/buttons/ButtonReturn";
import createAccountStyles from "../../styles/createAccountStyles";
import userFields from "../../config/createAccountConfig";

const CreateAccount = () => {
  const [completeUser, setCompleteUser] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { createNewUser, loading } = useCreateNewUser({ completeUser });
  const styles = useFontStyle(createAccountStyles);

  return (
    <ImageBackground
      source={require("./../../public/images/fondoApp.png")}
      style={styles.image}
      resizeMode="cover"
    >
      <LoadingSpinner loading={loading} />
      <View style={{ flex: "0.9", marginTop: 60 }}>
        <FormUser
          title={"Create Account"}
          setData={setCompleteUser}
          fieldConfig={userFields}
          styles={styles}
        />
        <ButtonSubmitUser
          title={"Create User"}
          onSubmit={createNewUser}
          styles={styles}
        />
        <ButtonReturn direction={"Main"} styles={styles} />
      </View>
    </ImageBackground>
  );
};

export default CreateAccount;
