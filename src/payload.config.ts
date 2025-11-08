import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { AiLogs } from './collections/AiLogs'
import { Categories } from './collections/Categories'
import { FAQs } from './collections/FAQs'
import { Icons } from './collections/Icons'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { NotFound } from './NotFound/config'
import { PostsSettings } from './PostsSettings/config'
import { AiSettings } from './AiSettings/config'
import { plugins } from './plugins'
import { richText } from '@/fields/richText'
import { getServerSideURL } from './utilities/getURL'
import { resendAdapter } from '@payloadcms/email-resend'
import { RichTextBlockConfig } from './blocks/RichTextBlock'
import { InlineCardBlockConfig } from './blocks/InlineCardBlock'
import { MediaBlock } from './blocks/MediaBlock/config'
import { SpacerBlockConfig } from './blocks/SpacerBlock'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Configure logger for production optimization
  logger:
    process.env.NODE_ENV === 'production'
      ? { options: { level: 'warn' } } // Only warnings and errors in production
      : undefined, // Use default in development
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
      // Custom TDS branding for admin panel
      graphics: {
        Logo: '@/components/payload-ui/Logo',
        Icon: '@/components/payload-ui/Icon',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: richText(),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || process.env.DATABASE_URI || 'mongodb://localhost:27017/tds-website',
    // MongoDB connection options
    connectOptions: {
      // Recommended options for production
      maxPoolSize: 20, // Maximum number of sockets the MongoDB driver will keep open
      minPoolSize: 2,  // Minimum number of sockets the MongoDB driver will keep open
      serverSelectionTimeoutMS: 5000, // How long to keep trying to send operations to a server
      socketTimeoutMS: 45000, // How long a socket stays open when inactive
    },
  }),
  collections: [Pages, Posts, Media, Categories, FAQs, Icons, Users, AiLogs],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, NotFound, PostsSettings, AiSettings],
  blocks: [RichTextBlockConfig, InlineCardBlockConfig, MediaBlock, SpacerBlockConfig],
  plugins: [
    ...plugins,
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      // IMPORTANT: clientUploads disabled to enable Sharp image processing
      // This means formatOptions (WebP conversion) and resizeOptions will work
      // Trade-off: Server uploads limited to 4.5MB on Vercel (educate users to compress large images before upload)
      clientUploads: false,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  upload: {
    limits: {
      fileSize: 4500000, // 4.5MB limit to stay within Vercel serverless limits
    },
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
  email: resendAdapter({
    defaultFromAddress: 'info@thedigitalstride.co.uk',
    defaultFromName: 'The Digital Stride',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
})
