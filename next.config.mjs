/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URL: "mongodb+srv://h-loc:6pS3qvpeUQxuubKi@cluster0.kvimrln.mongodb.net/shift?retryWrites=true&w=majority",
        // MONGODB_URL: "mongodb://h-loc:6pS3qvpeUQxuubKi@ac-5djtpn4-shard-00-00.qs9wtoh.mongodb.net:27017,ac-5djtpn4-shard-00-01.qs9wtoh.mongodb.net:27017,ac-5djtpn4-shard-00-02.qs9wtoh.mongodb.net:27017/bulletin?ssl=true&replicaSet=atlas-d75adp-shard-0&authSource=admin&retryWrites=true&w=majority",
        HOMEPAGE_URL_: "https://bulletin-board-one.vercel.app/",
        HOMEPAGE_URL: "http://localhost:3000/",
        FTP_URL: "https://locpham.blog/",
    }
};

export default nextConfig;
