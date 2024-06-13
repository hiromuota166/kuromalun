'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

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
  // ✅Supabaseクライアント
  const supabase = createClient()

  // フォームからデータ取得
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // ✅サインアップ
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp(data)

  // サインアップエラーの場合
  if (signUpError) {
    console.error('SignUp Error:', signUpError)
    console.log('SignUp Error:', signUpError)
    redirect(`/error?message=${encodeURIComponent(signUpError.message)}`)    // 「/error」はまだ作っていない。後で作る。
    return
  }

  // サインアップが成功した場合
  if (signUpData?.user) {
    // データ挿入
    const { insertError } = await insertData(formData, signUpData.user.id)

    // データ挿入エラーの場合
    if (insertError) {
      console.error('Insert Data Error:', insertError)
      redirect(`/error?message=${encodeURIComponent(insertError.message)}`)
      return
    }
  }

  // トップページのlayoutを再検証
  revalidatePath('/', 'layout')
  // トップページへリダイレクト
  redirect('/')
}

/**
 * データ挿入
 * @param formData - フォームデータ
 * @param userId - サインアップしたユーザーのID
 */
async function insertData(formData: FormData, userId: string) {
  // Supabaseクライアントを作成
  const supabase = createClient()

  // フォームから入力値を取得
  const inputs = {
    displayName: formData.get('displayName') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

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
