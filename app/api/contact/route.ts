import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Placeholder for Contact Form processing
        console.log('Contact Form Submission:', body);

        await new Promise(resolve => setTimeout(resolve, 800));

        return NextResponse.json({
            success: true,
            message: "Message sent! We'll get back to you soon."
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to send message."
        }, { status: 500 });
    }
}
