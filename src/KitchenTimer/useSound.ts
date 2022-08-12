import { Audio } from "expo-av";
import { useEffect, useMemo, useState } from "react";

export type Sound = {
  pi: () => Promise<void>;
  pipipipi: () => () => void;
};

export const useSound = (): Sound | undefined => {
  const [pi, setPi] = useState<Audio.Sound>();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-var-requires
    void Audio.Sound.createAsync(require("./pi.mp3")).then((res) =>
      setPi(res.sound),
    );
  }, []);

  const [pipipipi, setPiPiPiPi] = useState<Audio.Sound>();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-var-requires
    void Audio.Sound.createAsync(require("./pipipipi.mp3")).then((res) =>
      setPiPiPiPi(res.sound),
    );
  }, []);

  useEffect(() => {
    return () => {
      if (pi !== undefined) {
        setPi(undefined);
        void pi?.unloadAsync();
      }
    };
  }, [pi]);

  useEffect(() => {
    return () => {
      if (pipipipi !== undefined) {
        setPi(undefined);
        void pipipipi?.unloadAsync();
      }
    };
  }, [pipipipi]);

  return useMemo(
    () => ({
      pi: async () => {
        await pi?.replayAsync();
      },
      pipipipi: () => {
        const intervalId = setInterval(() => {
          void pipipipi?.replayAsync();
        }, 1000);
        return () => {
          clearInterval(intervalId);
        };
      },
    }),
    [pi, pipipipi],
  );
};
