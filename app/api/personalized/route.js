import { NextResponse } from 'next/server';
import model from '../middleware/personalized.mjs';

export async function POST(req) {
  try {
      const body = await req.json(); // Parse the JSON body
      console.log(body)
      const data = await model(body); // Assuming model returns the required data structure
      console.log(data);
      return NextResponse.json({ message: 'Success', data: data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
