import { View } from "react-native";

import { KitchenTimer } from "./KitchenTimer";

export const App: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <KitchenTimer displayTime={123} />
    </View>
  );
};
