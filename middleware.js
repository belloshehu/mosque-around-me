export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export default withAuth({
//   callbacks: {
//     authorized: ({ req, token }) => {
//       const path = req.nextUrl.pathname;

//       // const isPublicPath = publicPaths.find((publicPath) => publicPath === path);
//       const isPublicPath = path === "/auth/login" || path === "/auth/signup";
//       if (isPublicPath) {
//         return NextResponse.redirect(new URL("/", req.nextUrl));
//       }
//       return true;
//     },
//   },
// });

export const config = { matcher: ["/profile", "/notifications"] };
