import type { DependencyList, EffectCallback } from "react";
import { useEffect, useRef } from "react";

export function useDidMountEffect(
  effect: EffectCallback,
  deps?: DependencyList
) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) effect();
    else didMount.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useDidMountEffect;
