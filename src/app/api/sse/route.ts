import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET() {
  const encoder = new TextEncoder();

  const customReadable = new ReadableStream({
    start(controller) {
      let counter = 0;
      
      // 1초마다 메시지 전송
      const interval = setInterval(() => {
        // First check if we should stop
        if (counter >= 100) {  // Changed from > to >= to be more precise
          clearInterval(interval);
          controller.close();
          return;  // Important: return early to prevent further execution
        }

        const message = { time: new Date().toISOString(), count: counter++ };
        
        // SSE 형식으로 데이터 전송
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(message)}\n\n`));
      }, 1000);
    },
  });

  return new NextResponse(customReadable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
