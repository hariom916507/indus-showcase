import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Placeholder for email/DB service integration
        console.log('Demo Request Received:', body);

        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json({
            success: true,
            message: "Request received successfully. Our team will contact you shortly."
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "An error occurred while processing your request."
        }, { status: 500 });
    }
}
