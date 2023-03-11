import { StyleSheet, useWindowDimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 50,
  },
  navbar: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center"
    // backgroundColor: "black",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  mainC: {
    marginTop: 50,
    padding: 40,
    marginHorizontal: 10,
    backgroundColor: "lightblue",
    borderRadius: 45,
    position: "relative"
  },
  heroText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  forSearch: {
    flexDirection: "row",
    marginTop: 40,
    backgroundColor: "whitesmoke",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white"
  },
  searchImage: {
    width: 34,
    height: 34,
  },
  heroInput: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    height: 45,
    fontSize: 14,
    flex: 1,
  },
  warningC: {
    marginTop: 20,
  },
  warningText: {
    color: "orange",
    textAlign: "center"
  },
  theWarning: {
    color: "red"
  }

});

export default styles;
