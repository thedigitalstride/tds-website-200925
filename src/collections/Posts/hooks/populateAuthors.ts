import type { CollectionAfterReadHook } from 'payload'
import { User } from 'src/payload-types'

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors and contributors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use alternative `populatedAuthors` and `populatedContributors` fields to populate the user data, hidden from the admin UI
export const populateAuthors: CollectionAfterReadHook = async ({ doc, req, req: { payload } }) => {
  // Populate Authors
  if (doc?.authors && doc?.authors?.length > 0) {
    const authorDocs: User[] = []

    for (const author of doc.authors) {
      try {
        const authorDoc = await payload.findByID({
          id: typeof author === 'object' ? author?.id : author,
          collection: 'users',
          depth: 1,
          req,
        })

        if (authorDoc) {
          authorDocs.push(authorDoc)
        }
      } catch {
        // swallow error
      }
    }

    if (authorDocs.length > 0) {
      doc.populatedAuthors = authorDocs.map((authorDoc) => ({
        id: authorDoc.id,
        name: authorDoc.name,
        nickname: authorDoc.nickname,
        avatar: authorDoc.avatar,
      }))
    }
  }

  // Populate Contributors
  if (doc?.contributors && doc?.contributors?.length > 0) {
    const contributorDocs: User[] = []

    for (const contributor of doc.contributors) {
      try {
        const contributorDoc = await payload.findByID({
          id: typeof contributor === 'object' ? contributor?.id : contributor,
          collection: 'users',
          depth: 1,
          req,
        })

        if (contributorDoc) {
          contributorDocs.push(contributorDoc)
        }
      } catch {
        // swallow error
      }
    }

    if (contributorDocs.length > 0) {
      doc.populatedContributors = contributorDocs.map((contributorDoc) => ({
        id: contributorDoc.id,
        name: contributorDoc.name,
        nickname: contributorDoc.nickname,
        avatar: contributorDoc.avatar,
      }))
    }
  }

  return doc
}
