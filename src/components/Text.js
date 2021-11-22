import React from "react";
import { Text } from "react-native";
export default CustomText = (props) => {
  return (
    <Text style={{ fontFamily: "PublicSans_400Regular" }} {...props}>
      {props.children}
    </Text>
  );
};
