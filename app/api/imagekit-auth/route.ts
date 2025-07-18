import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {

    try {
        const authenticationParameters = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, 
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
        })
    
        return Response.json({ 
            authenticationParameters, 
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY 
        })
    } catch (err) {
        return Response.json({ 
            message: "Authentication for Imagekit failed",
            error: err,
        }, { status: 500})
    }
}