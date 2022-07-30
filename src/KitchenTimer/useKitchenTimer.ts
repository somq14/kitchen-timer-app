import { Reducer, useEffect, useReducer } from "react";

import { KitchenTimerProps } from "./KitchenTimer";

export type KitchenTimerState = {
  state: "init" | "count-down" | "beep";
  displayTime: number;
  endUnixTime: number;
  minPressed: boolean;
  secPressed: boolean;
  startStopPressed: boolean;
};

const initialState: KitchenTimerState = {
  state: "init",
  displayTime: 0,
  endUnixTime: NaN,
  minPressed: false,
  secPressed: false,
  startStopPressed: false,
};

export type KitchenTimerAction =
  | { type: "CLOCK" }
  | { type: "MIN_BUTTON/PRESS_IN" }
  | { type: "MIN_BUTTON/PRESS_OUT" }
  | { type: "SEC_BUTTON/PRESS_IN" }
  | { type: "SEC_BUTTON/PRESS_OUT" }
  | { type: "START_STOP_BUTTON/PRESS_IN" }
  | { type: "START_STOP_BUTTON/PRESS_OUT" };

const reducer = (
  prev: KitchenTimerState,
  action: KitchenTimerAction,
): KitchenTimerState => {
  switch (action.type) {
    case "CLOCK": {
      if (prev.state !== "count-down") {
        return prev;
      }

      const remain = Math.max(prev.endUnixTime - Date.now(), 0);
      return remain > 0
        ? {
            ...prev,
            displayTime: remain,
          }
        : {
            ...prev,
            state: "beep",
            displayTime: 0,
            endUnixTime: NaN,
          };
    }
    case "MIN_BUTTON/PRESS_IN": {
      const isReset = prev.secPressed;
      return {
        ...prev,
        state: "init",
        displayTime: isReset ? 0 : prev.displayTime + 60 * 1000,
        endUnixTime: NaN,
        minPressed: true,
      };
    }
    case "MIN_BUTTON/PRESS_OUT": {
      return { ...prev, minPressed: false };
    }
    case "SEC_BUTTON/PRESS_IN": {
      const isReset = prev.secPressed;
      return {
        ...prev,
        state: "init",
        displayTime: isReset ? 0 : prev.displayTime + 1000,
        endUnixTime: NaN,
        secPressed: true,
      };
    }
    case "SEC_BUTTON/PRESS_OUT": {
      return { ...prev, secPressed: false };
    }
    case "START_STOP_BUTTON/PRESS_IN": {
      switch (prev.state) {
        case "init": {
          return {
            ...prev,
            state: "count-down",
            endUnixTime: Date.now() + prev.displayTime,
            startStopPressed: true,
          };
        }
        case "count-down": {
          return {
            ...prev,
            state: "init",
            endUnixTime: NaN,
            startStopPressed: true,
          };
        }
        case "beep": {
          return {
            ...prev,
            state: "init",
            endUnixTime: NaN,
            startStopPressed: true,
          };
        }
      }
    }
    // eslint-disable-next-line no-fallthrough
    case "START_STOP_BUTTON/PRESS_OUT": {
      return { ...prev, startStopPressed: false };
    }
  }
};

export const useKitchenTimer = (): KitchenTimerProps => {
  const [state, dispatch] = useReducer<
    Reducer<KitchenTimerState, KitchenTimerAction>
  >(reducer, initialState);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      dispatch({ type: "CLOCK" });
    }, 50);
    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (state.state !== "beep") {
      return;
    }

    const intervalId = window.setInterval(() => {
      console.info("beep!");
    }, 500);
    return () => {
      window.clearInterval(intervalId);
    };
  }, [state.state]);

  return {
    displayTime: Math.round(state.displayTime / 1000),
    minButton: {
      isPressed: state.minPressed,
      onPressIn: () => {
        dispatch({ type: "MIN_BUTTON/PRESS_IN" });
      },
      onPressOut: () => {
        dispatch({ type: "MIN_BUTTON/PRESS_OUT" });
      },
    },
    secButton: {
      isPressed: state.secPressed,
      onPressIn: () => {
        dispatch({ type: "SEC_BUTTON/PRESS_IN" });
      },
      onPressOut: () => {
        dispatch({ type: "SEC_BUTTON/PRESS_OUT" });
      },
    },
    startStopButton: {
      isPressed: state.startStopPressed,
      onPressIn: () => {
        dispatch({ type: "START_STOP_BUTTON/PRESS_IN" });
      },
      onPressOut: () => {
        dispatch({ type: "START_STOP_BUTTON/PRESS_OUT" });
      },
    },
  };
};
