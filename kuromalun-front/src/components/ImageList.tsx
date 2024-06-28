import React from 'react'
import { supabase } from '@/utils/supabase'

interface ImageListProps {
  uid: string
}

const ImageList = async (props:ImageListProps) => {
  const { uid } = props
  const { data, error } = await supabase
    .from('circles')
    .select('circlesImageId')
    .eq('uid', uid)

  if (error) {
    console.error(error)
    return
  }
  return (
    <div>ImageList</div>
  )
}

export default ImageList