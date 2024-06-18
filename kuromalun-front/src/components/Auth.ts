import { supabase } from "../utils/supabase";

interface AuthProps {
  email: string;
  password: string;
  setIsLoading: (isLoading: boolean) => void;
}

export const handleLogin = async (props:AuthProps) => {
  const { email, password, setIsLoading } = props;
  try {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    alert("Login successful!");
  } catch (error) {
    alert("woe");
  } finally {
    setIsLoading(false);
  }
};

export const handleSignUp = async (props:AuthProps) => {
  const { email, password, setIsLoading } = props;
  try {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    alert("Sign up successful!");
  } catch (error) {
    alert("woe");
  } finally {
    setIsLoading(false);
  }
};
