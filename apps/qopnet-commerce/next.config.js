const withNx = require('@nrwl/next/plugins/with-nx')
const withPWA = require('next-pwa')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const defaultNextConfig = {
  nx: { svgr: true },
  images: {
    domains: [
      'qopnet.id',
      'vercel.app',
      'catamyst.com',
      'imagekit.io',
      'placekitten.com',
    ],
  },
}

const pwaNextConfig = withPWA({ ...defaultNextConfig, pwa: { dest: 'public' } })

/**
 * Only run next-pwa when not in development
 * Setup is ready for Vercel
 */
const nextConfig =
  process.env.NODE_ENV === 'development' ? defaultNextConfig : pwaNextConfig

module.exports = withNx(nextConfig)
