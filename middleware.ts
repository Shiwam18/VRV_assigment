import { url } from "inspector";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req:any){

    const session = await getToken({req})
    if(!session){
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }
    
    return NextResponse.next();

}
export const config = {
    matcher: ['/dashboard/:path*']
};