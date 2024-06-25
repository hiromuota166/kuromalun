'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

interface FormDataInputs {
  email: string;
  password: string;
  displayName: string;
}

/**
 * サインアップとデータ挿入
 *
 * サインアップが成功した場合はデータを挿入し、トップページへリダイレクトする。
 * サインアップに失敗した場合はエラーページへリダイレクトする。
 *
 * @param formData - フォームから受け取ったデータ
 * @returns void
 */
export async function signup(formData: FormData) {
  // Supabaseクライアント
  const supabase = createClient()

  // フォームからデータ取得
  const data = getFormData(formData)

  if (!data) {
    redirect('/error?message=Invalid form data')
    return
  }

  // サインアップ
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })

  // サインアップエラーの場合
  if (signUpError) {
    redirect(`/error?message=${encodeURIComponent(signUpError.message)}`)
    return
  }

  // サインアップが成功した場合
  if (signUpData?.user) {
    // データ挿入
    const { insertError } = await addUserData(data, signUpData.user.id)

    // データ挿入エラーの場合
    if (insertError) {
      redirect(`/error?message=${encodeURIComponent(insertError.message)}`)
      return
    }
  }

  redirect('/circleCreateEdit')
}

/**
 * データ挿入
 * @param inputs - フォームデータ
 * @param userId - サインアップしたユーザーのID
 */
async function addUserData(inputs: FormDataInputs, userId: string) {
  // Supabaseクライアントを作成
  const supabase = createClient()

  // データ挿入
  const { error } = await supabase
    .from('users')
    .insert({ 
      displayName: inputs.displayName,
      email: inputs.email, 
      password: inputs.password,
      userId: userId,
    })

  return { insertError: error }
}

/**
 * フォームデータを取得し、型をチェックするヘルパー関数
 * @param formData - フォームデータ
 * @returns フォームデータのオブジェクトまたは null
 */
function getFormData(formData: FormData): FormDataInputs | null {
  const email = formData.get('email')
  const password = formData.get('password')
  const displayName = formData.get('displayName')

  if (typeof email === 'string' && typeof password === 'string' && typeof displayName === 'string') {
    return {
      email,
      password,
      displayName,
    }
  }

  return null
}
