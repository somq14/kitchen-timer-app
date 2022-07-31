import { Text, View } from "react-native";

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

      <View
        style={{
          position: "absolute",
          right: 4,
          bottom: 4,
        }}
      >
        <Text
          style={{
            fontSize: 10,
            color: "#808080",
          }}
        >
          効果音提供 オトロジック (https://otologic.jp)
        </Text>
      </View>
    </View>
  );
};
