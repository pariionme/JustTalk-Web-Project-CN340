import { NextResponse } from 'next/server';
// import { db } from '@/lib/firebaseAdmin'

// Login 
export async function POST(request) {
    try {
        const body = await request.json();
        
        if (!body.email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        //fetch by email and check password match

        return NextResponse.json({ message: "User login successfully"})
    } catch (err) {
        return NextResponse.json({ error: 'Internal Server Error'}, { status: 500})
    }
}