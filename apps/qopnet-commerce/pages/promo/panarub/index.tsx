import { Flex, Image } from '@chakra-ui/react'
import { Layout } from '@qopnet/qopnet-ui'

export const CreatePromoPanarubPage = () => {
  const iframe =
    '<script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script><iframe class="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrpk4LQ10HJYuQVz?backgroundColor=yellow" frameborder="0" onmousewheel="" width="100%" height="1902" style="background: transparent; border: 1px solid #ccc;"></iframe>'

  return (
    <Layout pt={10}>
      <Flex flexDirection="column">
        <Image src="https://rryitovbrajppywbpmit.supabase.in/storage/v1/object/public/images/promo/promo-banner-panarub.jpg" />
        <div dangerouslySetInnerHTML={{ __html: iframe }}></div>
      </Flex>
    </Layout>
  )
}

export default CreatePromoPanarubPage
