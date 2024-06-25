import { supabase } from "../utils/supabase";

interface AuthProps {
  email: string;
  password: string;
  displayName: string;
  setIsLoading: (isLoading: boolean) => void;
}

export const handleLogin = async (props: AuthProps): Promise<boolean> => {
  const { email, password, displayName, setIsLoading } = props;
  try {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    alert("Login successful!");
    return true;
  } catch (error) {
    alert("Login failed!");
    return false;
  } finally {
    setIsLoading(false);
  }
};

export const handleSignUp = async (props: AuthProps): Promise<boolean> => {
  const { email, password, displayName, setIsLoading } = props;
  try {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    if (!data.user) throw new Error('User sign-up failed');

    // Insert user information into the users table
    const { error: dbError } = await supabase
      .from('users')
      .insert({
        email,
        displayName,
        userId: data.user.id,
        password,
      });

    if (dbError) throw dbError;

    alert("Sign up successful!");
    return true;
  } catch (error: any) {
    alert(`Error: ${error.message || error}`);
    return false;
  } finally {
    setIsLoading(false);
  }
};
