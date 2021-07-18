import { supabase } from '@qopnet/util-supabase'

import * as express from 'express'
const router = express.Router()

/**
 * Just to check where the image is located,
 * not being used in actual frontend app
 * https://supabase.io/docs/reference/javascript/storage-from-getpublicurl
 */
router.get('/:imageParam', async (req, res) => {
  // https://rryitovbrajppywbpmit.supabase.co/storage/v1/object/public/images/kasur.jpg
  const { publicURL, error } = await supabase.storage
    .from('images')
    .getPublicUrl(req.params.imageParam)

  res.send({ publicURL, error })
})

export default router
