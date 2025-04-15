/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configurar proxy para desarrollo local (opcional)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development' 
          ? 'http://localhost:5000/api/:path*' 
          : '/api/:path*',
      },
    ]
  },
  // Configuración webpack para manejar módulos Node.js en el cliente
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Configuración para módulos que solo funcionan en Node.js
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util/'),
        buffer: require.resolve('buffer/'),
        process: require.resolve('process/browser'),
        fs: false,
        path: false,
        net: false,
        tls: false
      };
    }
    
    return config;
  }
}

module.exports = nextConfig 