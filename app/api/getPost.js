import { NextResponse } from 'next/server';
// import { db } from '@/lib/firebaseAdmin'

// Get all post for homepage
export async function GET() {
    try {
        const postRef = ""// use db.collection()
        const snapshot = "" // use await collection.get()

        const posts = "" // turn snapshot into array use snapshot.docs.map(doc => { id: doc.id, ...doc.data() })

        return NextResponse.json(posts)
    } catch (error) {
        return
    }
}

// Get post by post id
export async function GET(request) {
    try {
        const postID = await request.json()

        if (!postID.id) {
            return NextResponse.json({ error: 'Post ID is required'}, { status: 400 });
        }

        const postRef = ""// use db.collection()
        const snapshot = "" // use await collection.get()

        if (!snapshot.exists) {
            console.log("No Post Found!")
            return null;
        }

        const post = "" // { id: snapshot.id, ...snapshot.data()}

        return NextResponse.json(post)
   } catch(err) {
        return NextResponse.json({ error: 'Internal Server Error'}, { status: 500})
   }
}