import { View } from "react-native";

import { KitchenTimer, useKitchenTimer } from "./KitchenTimer";

export const App: React.FC = () => {
  const kitchenTimer = useKitchenTimer();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <KitchenTimer {...kitchenTimer} />
    </View>
  );
};
