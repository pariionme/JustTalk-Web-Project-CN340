import { NextResponse } from 'next/server';
// import { db } from '@/lib/firebaseAdmin'

// Sign up
export async function POST(request) {
    try {
        const body = await request.json();

        if (!body.email) {
            return NextResponse.json({ error: 'Email is required'}, { status: 400 });
        }
        
        // use db var to add user to firebase db here!
        // hash password before send!
        /*
        const res = await db.collection('users').add({
        ...body,
        createdAt: new Date().toISOString()
        });
        */

        return NextResponse.json({ message: "User created successfully"})
    } catch (err) {
        return NextResponse.json({ error: 'Internal Server Error'}, { status: 500})
    }
}