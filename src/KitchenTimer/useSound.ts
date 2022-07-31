import { Audio } from "expo-av";
import { useCallback, useEffect, useMemo, useState } from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type Sound = {
  pi: () => Promise<void>;
  pipipipi: () => () => void;
};

export const useSound = (): Sound | undefined => {
  const [sound, setSound] = useState<Audio.Sound>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-var-requires
    void Audio.Sound.createAsync(require("./pi.mp3")).then((res) =>
      setSound(res.sound),
    );
  }, []);

  useEffect(() => {
    return () => {
      setSound(undefined);
      void sound?.unloadAsync();
    };
  }, [sound]);

  const pi = useCallback(async () => {
    await sound?.replayAsync();
  }, [sound]);

  const pipipipi = useCallback(() => {
    const intervalId = setInterval(async () => {
      await sound?.replayAsync();
      await sleep(1000);
      await sound?.replayAsync();
      await sleep(1000);
      await sound?.replayAsync();
      await sleep(1000);
      await sound?.replayAsync();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [sound]);

  return useMemo(() => ({ pi, pipipipi }), [pi, pipipipi]);
};
