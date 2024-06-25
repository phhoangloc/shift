/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'locpham.free.nf',
                port: "",
                pathname: "/**"
            },
        ],
    },
    env: {
        MONGODB_URL: "mongodb+srv://h-loc:6pS3qvpeUQxuubKi@cluster0.kvimrln.mongodb.net/shift?retryWrites=true&w=majority",
        // MONGODB_URL: "mongodb://h-loc:6pS3qvpeUQxuubKi@ac-5djtpn4-shard-00-00.qs9wtoh.mongodb.net:27017,ac-5djtpn4-shard-00-01.qs9wtoh.mongodb.net:27017,ac-5djtpn4-shard-00-02.qs9wtoh.mongodb.net:27017/bulletin?ssl=true&replicaSet=atlas-d75adp-shard-0&authSource=admin&retryWrites=true&w=majority",
        HOMEPAGE_URL: "https://shift-xi.vercel.app/",
        HOMEPAGE_URL_: "http://localhost:3000/",
        FTP_URL: "http://locpham.free.nf/",
    }
};

export default nextConfig;
