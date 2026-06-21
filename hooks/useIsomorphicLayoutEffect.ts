import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect on the client, useEffect on the server — avoids the SSR
 * "useLayoutEffect does nothing on the server" warning while keeping
 * synchronous, pre-paint behaviour in the browser (important for GSAP).
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
