import React from "react";
import { View } from "react-native";

import {
  KitchenTimerButton,
  KitchenTimerButtonProps,
} from "./KitchenTimerButton";
import { KitchenTimerDisplay } from "./KitchenTimerDisplay";
import { mmToDp } from "./kitchen-timer-style";

export type KitchenTimerProps = {
  displayTime?: number;
  minButton?: Partial<KitchenTimerButtonProps>;
  secButton?: Partial<KitchenTimerButtonProps>;
  startStopButton?: Partial<KitchenTimerButtonProps>;
};

export const KitchenTimer: React.FC<KitchenTimerProps> = (props) => {
  return (
    <View
      style={{
        width: mmToDp(54),
        height: mmToDp(70),
        borderRadius: mmToDp(4),
        elevation: 16,
        backgroundColor: "#F0F000",
        paddingTop: mmToDp(12),
        paddingHorizontal: mmToDp(8),
      }}
    >
      <KitchenTimerDisplay displayTime={props.displayTime} />
      <View
        style={{
          marginTop: mmToDp(10),
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <KitchenTimerButton fontSize={18} label="MIN" {...props.minButton} />
        <KitchenTimerButton fontSize={18} label="SEC" {...props.secButton} />
        <KitchenTimerButton
          fontSize={14}
          label="START STOP"
          {...props.startStopButton}
        />
      </View>
    </View>
  );
};
