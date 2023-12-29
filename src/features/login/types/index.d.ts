interface ILoginPresenterProps {
  handleSubmit: () => Promise<void>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  password: string;
}

export type { ILoginPresenterProps };
