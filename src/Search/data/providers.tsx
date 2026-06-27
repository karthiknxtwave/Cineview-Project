import {
    createContext,
    useContext,
    useRef,
    type ReactNode,
  } from "react";
  
  import { SearchStore } from "./stores/SearchStore";
  
  const SearchStoreContext = createContext<SearchStore | null>(null);
  
  interface SearchProviderProps {
    children: ReactNode;
  }
  
  export function SearchProvider({
    children,
  }: SearchProviderProps) {
    const storeRef = useRef<SearchStore | null>(null);
  
    if (!storeRef.current) {
      storeRef.current = new SearchStore();
    }
  
    return (
      <SearchStoreContext.Provider value={storeRef.current}>
        {children}
      </SearchStoreContext.Provider>
    );
  }
  
  export function useSearchStore() {
    const store = useContext(SearchStoreContext);
  
    if (!store) {
      throw new Error(
        "useSearchStore must be used within SearchProvider",
      );
    }
  
    return store;
  }