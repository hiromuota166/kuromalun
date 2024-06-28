import { supabase } from "../utils/supabase";

interface AuthProps {
  email: string;
  password: string;
  displayName: string;
  setIsLoading: (isLoading: boolean) => void;
  setAlertMessage: (message: string | null) => void;
  setAlertColorScheme: (color: string) => void;
}

export const handleLogin = async (props: AuthProps): Promise<boolean> => {
  const { email, password, displayName, setIsLoading, setAlertMessage, setAlertColorScheme } = props;
  try {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setAlertMessage("Login successful!");
    setAlertColorScheme('blue');
    return true;
  } catch (error) {
    setAlertMessage("メールを認証してください。");
    setAlertColorScheme('red');
    return false;
  } finally {
    setIsLoading(false);
  }
};

export const handleSignUp = async (props: AuthProps): Promise<boolean> => {
  const { email, password, displayName, setIsLoading, setAlertMessage, setAlertColorScheme } = props;
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

    setAlertMessage("Sign up successful!");
    setAlertColorScheme('blue');
    return true;
  } catch (error: any) {
    setAlertMessage(`Error: ${error.message || error}`);
    setAlertColorScheme('red');
    return false;
  } finally {
    setIsLoading(false);
  }
};
