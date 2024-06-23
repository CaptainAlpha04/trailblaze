    import { NextResponse } from 'next/server';
    import model from '../middleware/generalized.mjs';

    export async function POST(req) {
        try {
            const body = await req.json(); // Parse the JSON bod
                const { career } = body;
                console.log(career);
                const data = await model(career);
                console.log('hello world')
                console.log(data);
                return NextResponse.json({ message: data}, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
        }
    }
