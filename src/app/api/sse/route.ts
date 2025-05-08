import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

const companyInfo = {
  name: "GreenDA AI",
  description: "Creating a sustainable future through AI innovation",
  mainProducts: [
    {
      name: "GreenDA Platform",
      description: "AI-powered ESG Assessment and Management Platform",
      features: [
        "ESG Data Collection and Analysis",
        "AI-based ESG Evaluation",
        "Automated Sustainability Reporting",
        "Carbon Emission Monitoring"
      ]
    },
    {
      name: "GreenDA Analytics",
      description: "Enterprise ESG Data Analytics Solution",
      features: [
        "Real-time ESG Data Analysis",
        "Industry Benchmarking",
        "Risk Prediction",
        "Improvement Recommendations"
      ]
    }
  ],
  services: [
    "ESG Consulting",
    "Sustainable Management Strategy",
    "Carbon Neutrality Roadmap",
    "ESG Training Programs"
  ],
  achievements: [
    "2023 Korea ESG Excellence Award",
    "Global Top 10 ESG Assessment Platform",
    "Partnership with 100+ Enterprises Annually",
    "10,000 Tons Carbon Reduction Achievement"
  ]
};
export async function GET() {

  const encoder = new TextEncoder();

  const customReadable = new ReadableStream({
    start(controller) {
      let counter = 0;
      
      // 100ms마다 메시지 전송 (1초에서 0.1초로 변경)
      const interval = setInterval(() => {
        if (counter >= 100) {
          clearInterval(interval);
          controller.close();
          return;
        }

        // 회사 정보를 포함한 복잡한 메시지 생성
        const message = {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          counter: counter++,
          company: {
            ...companyInfo,
            currentStatus: {
              activeProjects: Math.floor(Math.random() * 50) + 100,
              clientSatisfaction: (Math.random() * 1 + 4).toFixed(1),
              recentUpdates: [
                "New AI Model Deployment",
                "Global Market Expansion",
                "New Patent Registration",
                "Enhanced ESG Metrics"
              ],
              marketTrends: {
                esgAdoption: "Increasing",
                aiIntegration: "Accelerating",
                globalExpansion: "In Progress",
                sustainabilityFocus: "Strengthening"
              }
            },
            insights: {
              industryTrends: [
                "Growing Demand for AI-based ESG Assessment",
                "Strengthening Global Carbon Neutrality Policies",
                "Rising Importance of Sustainable Management",
                "ESG Data Standardization Progress"
              ],
              futureVision: {
                shortTerm: "Expand Domestic Market Share",
                midTerm: "Enter Asian Markets",
                longTerm: "Lead Global ESG Platform Market"
              },
              companyHighlights: {
                innovation: "Leading AI Technology in ESG",
                sustainability: "Carbon Neutral Operations",
                impact: "Supporting Global Sustainability Goals",
                recognition: "Industry-Leading ESG Solutions Provider"
              }
            },
            keyMetrics: {
              clientBase: Math.floor(Math.random() * 200) + 300,
              sustainabilityScore: (Math.random() * 10 + 90).toFixed(1),
              marketPresence: [
                "South Korea",
                "Japan",
                "Singapore",
                "United States",
                "European Union"
              ],
              impactMetrics: {
                carbonReduced: Math.floor(Math.random() * 5000) + 10000,
                companiesAssisted: Math.floor(Math.random() * 50) + 150,
                sustainabilityReports: Math.floor(Math.random() * 300) + 500
              }
            }
          },
          dataTimestamp: new Date().toISOString()
        };
        
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(message)}\n\n`));
      }, 100); // 1000ms에서 100ms로 변경
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
