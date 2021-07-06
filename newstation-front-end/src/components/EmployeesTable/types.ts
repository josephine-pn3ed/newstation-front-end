export interface Props {
  employees: (string | JSX.Element)[][];
  handleFormLoaded : (open: boolean) => void;
  formLoaded: boolean;
}
