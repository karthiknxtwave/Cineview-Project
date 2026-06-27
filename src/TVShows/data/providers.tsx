import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";

import { TVShowDetailStore } from "./stores/TVShowDetailStore";
import { SeasonDetailStore } from "./stores/SeasonDetailStore";

const TVShowDetailStoreContext = createContext<TVShowDetailStore | null>(null);
const SeasonDetailStoreContext = createContext<SeasonDetailStore | null>(null);

export function TVShowDetailStoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  const storeRef = useRef<TVShowDetailStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = new TVShowDetailStore();
  }

  return (
    <TVShowDetailStoreContext.Provider value={storeRef.current}>
      {children}
    </TVShowDetailStoreContext.Provider>
  );
}

export function SeasonDetailStoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  const storeRef = useRef<SeasonDetailStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = new SeasonDetailStore();
  }

  return (
    <SeasonDetailStoreContext.Provider value={storeRef.current}>
      {children}
    </SeasonDetailStoreContext.Provider>
  );
}

export function useTVShowDetailStore() {
  const store = useContext(TVShowDetailStoreContext);

  if (!store) {
    throw new Error(
      "useTVShowDetailStore must be used within TVShowDetailStoreProvider",
    );
  }

  return store;
}

export function useSeasonDetailStore() {
  const store = useContext(SeasonDetailStoreContext);

  if (!store) {
    throw new Error(
      "useSeasonDetailStore must be used within SeasonDetailStoreProvider",
    );
  }

  return store;
}
