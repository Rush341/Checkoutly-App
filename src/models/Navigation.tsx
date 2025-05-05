export interface Navigation {
    navigate: (screen: string) => void;
    goBack: () => void;
    push: (screen: string) => void;
    replace: (screen: string) => void;
  }
