import cuid from 'cuid'
import { useState } from 'react'
import { useSupabase } from 'use-supabase'
import { useForm } from 'react-hook-form'
import { Box, Stack, Text, Button } from '@chakra-ui/react'

import { convertImageNameToURL } from '../utils/supabase'

/**
 * Upload form using Supabase Storage
 */
export const UploadImageForm = ({
  appendImageUrl = (newUrl) => {
    // console.info({ newUrl })
  },
}) => {
  const [loading, setLoading] = useState(false)
  const supabase = useSupabase()
  const { register, handleSubmit, watch, reset } = useForm()

  const watchImages = watch('images', false)
  const isImageSelected = watchImages?.length ? Boolean(watchImages[0]) : false

  const handleSubmitUploadImage = async (data) => {
    // Only try to upload if there is data.images
    if (data.images[0]) {
      try {
        setLoading(true)
        const singleImage = data.images[0] // event.target.files[0]
        // console.info(`Uploading ${singleImage.name}`)

        const { data: response, error } = await supabase.storage
          .from('images')
          .upload(`${singleImage.name}`, singleImage, {
            cacheControl: '3600',
            upsert: true,
          })
        // console.info({ response, error })

        const formattedURL = convertImageNameToURL(response.Key)
        appendImageUrl(formattedURL)
        reset()
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Stack
      as="form"
      align="flex-start"
      onSubmit={handleSubmit(handleSubmitUploadImage)}
    >
      <input {...register('images')} type="file" name="images" />
      <Button
        colorScheme="orange"
        type="submit"
        size="sm"
        disabled={!isImageSelected || loading}
      >
        {loading ? 'Mengunggah...' : 'Unggah Gambar'}
      </Button>
    </Stack>
  )
}

export default UploadImageForm
