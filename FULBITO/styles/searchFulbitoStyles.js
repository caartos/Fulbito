import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  mainTitle: {
    fontSize: 22,
    textAlign: "center",
    color: "#1d4b26",
    margin: 20,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    color: "#1d4b26",
    margin: 2,
    alignSelf: "center",
    width: "100%",
  },
  button: {
    borderRadius: 5,
    borderColor: "#1d4b26",
    borderWidth: 2,
    backgroundColor: "#a681ef",
    width: 150,
    height: 40,
    marginTop: 60,
  },
  buttonText: {
    color: "#baffc9",
    fontSize: 20,
    textAlign: "center",
    padding: 8,
  },
  textInput: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 200,
    alignSelf: "center",
    borderColor: "#1d4b26",
    borderWidth: 2,
  },
  container: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkBoxLeague: {
    alignSelf: "center",
    color: "#1d4b26",
    fontSize: 20,
    textAlign: "center",
    padding: 8,
  },
  buttonCreate: {
    borderRadius: 5,
    borderColor: "#1d4b26",
    borderWidth: 2,
    backgroundColor: "#a681ef",
    width: 220,
    height: "auto",
    marginTop: 40,
    padding: 8,
  },
  resultItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignSelf: "center",
    width: "75%",
  },
  selectedItem: {
    width: "75%",
    backgroundColor: "#61ec69",
    borderWidth: "1px",
    borderColor: "#1d4b26",
  },
  scrollContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  return: {
    fontSize: 22,
    textAlign: "center",
    color: "#1d4b26",
    margin: 20,
    marginTop: 70,
    marginBottom: 20,
  },
});

export default styles;