import React from "react";
import { Pressable, PressableProps, Text, View } from "react-native";

import { mmToDp } from "./kitchen-timer-style";

export type KitchenTimerButtonProps = {
  label?: string;
  fontSize?: number;
  isPressed?: boolean;
} & PressableProps;

export const KitchenTimerButton: React.FC<KitchenTimerButtonProps> = ({
  label,
  fontSize,
  isPressed,
  ...pressableProps
}) => {
  return (
    <Pressable {...pressableProps}>
      <View
        style={{
          width: mmToDp(10),
          height: mmToDp(10),
          backgroundColor: "#FFFFFF",
          borderRadius: 999999,
          elevation: isPressed ? 1 : 8,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize,
            color: "#606060",
            textAlign: "center",
          }}
          allowFontScaling={false}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
};
