npx create-next-app@latest
npm i react-icons   

<!-- next auth -->
npm install next-auth
<!-- go to guide  -->
<!-- Add this code  -->
/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"

const handler = NextAuth({
  ...
})

export { handler as GET, handler as POST }
<!-- go to provide and then google and copy paste this code in above handler -->
providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })
]

<!-- npm install firebase -->

https://github.com/rrs301/pinterest-clone/blob/master/app/components/Header.jsx