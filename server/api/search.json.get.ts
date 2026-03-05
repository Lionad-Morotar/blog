import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const content = await queryCollectionSearchSections(event, 'content')
  return content
})