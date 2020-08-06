import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "native-base";

export const IconButton = ({
  name,
  stylesContainer,
  stylesIcon,
  onPress,
  hitSlop
}) => (
  <TouchableOpacity
    style={stylesContainer}
    onPress={onPress}
    hitSlop={hitSlop ? hitSlop : {}}
  >
    <Icon name={name} style={stylesIcon} />
  </TouchableOpacity>
);

IconButton.defaultProps = {
  hitSlop: { top: 30, right: 30, bottom: 0, left: 30 }
};
