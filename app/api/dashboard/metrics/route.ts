import { NextResponse } from "next/server";

// Dashboard Metrics API
// ---------------------
// Simula endpoint real de SaaS backend
// Usado para practicar data fetching con React Query

export async function GET() {
  return NextResponse.json({
    activeUsers: 1284,
    revenue: 12400,
    conversion: 3.2,
  });
}