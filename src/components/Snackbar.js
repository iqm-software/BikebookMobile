import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Snackbar } from "react-native-paper";

const CustomSnackbar = ({ visible, setVisible, text, position = "bottom" }) => {
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      wrapperStyle={position == "bottom" ? styles.snackbarWrapperBottom : styles.snackbarWrapperTop}
      style={styles.snackbar}
    >
      {text}
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  snackbarWrapperBottom: {
    bottom: 30,
    elevation: 10,
  },
  snackbarWrapperTop: {
    bottom: 400,
    elevation: 10,
  },
  snackbar: {
    backgroundColor: "rgb(237, 108, 2)",
  },
});

export default CustomSnackbar;
