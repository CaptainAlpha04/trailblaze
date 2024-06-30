    import { NextResponse } from 'next/server';
    import generalized from '../middleware/generalized.mjs';
    import personalized from '../middleware/personalized.mjs';

    export async function POST(req) {
        try {
            const body = await req.json(); // Parse the JSON bod
            if (body.career) {
                const { career } = body;
                console.log(career);
                console.time('generate Content');
                const data = await generalized(career);
                console.timeEnd('generate Content');
                console.log('hello world')
                console.log(data);
                return NextResponse.json({ message: data}, { status: 200 });
            } else {
                console.log(body)
                console.time('generate Content');
                const data = await personalized(body); // Assuming model returns the required data structure
                console.timeEnd('generate Content');
                console.log(data);
                return NextResponse.json({ message: data}, { status: 200 });
            }
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
        }
    }
