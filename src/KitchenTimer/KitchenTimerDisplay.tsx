import React from "react";
import { Text, View } from "react-native";

import { mmToDp } from "./kitchen-timer-style";

export type KitchenTimerDisplayProps = {
  displayTime?: number;
};

export const KitchenTimerDisplay: React.FC<KitchenTimerDisplayProps> = (
  props,
) => {
  return (
    <View
      style={{
        height: mmToDp(20),
        backgroundColor: "#708070",
        borderRadius: mmToDp(1),
        padding: mmToDp(1),
      }}
    >
      <View
        style={{
          backgroundColor: "#778877",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.displayTime !== undefined && (
          <Text
            style={{
              fontSize: mmToDp(14),
              color: "#303030",
            }}
            allowFontScaling={false}
          >
            {format(props.displayTime)}
          </Text>
        )}
      </View>
    </View>
  );
};

const format = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return [`0${m}`.slice(-2), ":", `0${s}`.slice(-2)].join("");
};
