import React from "react";
import { Text, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import { mmToDp } from "./kitchen-timer-style";

export type KitchenTimerButtonProps = {
  label?: string;
  fontSize?: number;
  isPressed?: boolean;
  onPressIn?: () => void;
  onPressOut?: () => void;
};

export const KitchenTimerButton: React.FC<KitchenTimerButtonProps> = ({
  label,
  fontSize,
  isPressed,
  onPressIn,
  onPressOut,
}) => {
  const gesture = Gesture.Manual()
    .onTouchesDown(() => {
      onPressIn?.();
    })
    .onTouchesUp(() => {
      onPressOut?.();
    });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
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
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
