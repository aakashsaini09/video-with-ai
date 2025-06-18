import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
export default withAuth(
    function middleware(){
        return NextResponse.next()
    },{
        callbacks: {
            authorized({ req, token}){
                // if(token) return true;  //if token means user in authenticated
                const { pathname } = req.nextUrl
                if(
                    pathname.startsWith("/api/auth") ||
                    pathname === "/login" ||
                    pathname === "/register"
                )return true;
                if(pathname === '/' || pathname.startsWith("/api/videos")){
                    return true;
                }
                return !!token;
                // or
                // if(token) return true;
            }
        }
    }
);

export const config = {
    matcher: [
/*
        Match all request paths except: 
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - _favicon.ico (favicon files)
        * - public folder
*/ 
        "/((?!_next/static|_next/image|favicon.ico|public/).*)",
    ]
}