export interface Props {
    administrators: (string | JSX.Element)[][];
    handleFormLoaded : (open: boolean) => void;
    formLoaded: boolean;
  }
  