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
  loadingScrollView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 35,
    top: 130,
    zIndex: 1000,
    opacity: 0.6, 
  },
  roundPredictionContainer: {
    backgroundColor: "#cef5bb",
    width: "95%",
    height: "auto",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: "#1d4b26",
    borderWidth: "1px",
  },
  roundPredictionContainerLoading: {
    backgroundColor: "#cef5bb",
    width: "95%",
    height: "auto",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: "#1d4b26",
    borderWidth: "1px",

  },

  title: {
    fontSize: 22,
    textAlign: "center",
    color: "#1d4b26",
    margin: 2,
    alignSelf: "center",
  },
  buttonText: {
    color: "#baffc9",
    fontSize: 20,
    textAlign: "center",
    padding: 8,
  },
  checkBoxLeague: {
    paddingLeft: 9,
    color: "#1d4b26",
    fontSize: 18,
    textAlign: "center",
  },
  homeVsAwayText: {
    color: "#1d4b26",
    fontSize: 20,
    textAlign: "center",
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
  picker: {
    height: 50,
    width: 220,
    alignSelf: "center",
  },
  disabledCheckBox: {
    opacity: 0.6,
    maxWidth: "95%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  enableCheckBox: {
    maxWidth: "95%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  checkboxGreen: {
    color: "green",
  },
  checkboxRed: {
    color: "red",
  },
  return: {
    fontSize: 22,
    textAlign: "center",
    color: "#1d4b26",
    margin: 20,
    marginTop: 70,
    marginBottom: 50,
  },
});

export default styles;
