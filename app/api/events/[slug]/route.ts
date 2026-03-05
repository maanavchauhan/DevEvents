import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Event, { IEvent } from '@/database/event.model';

/**
 * Type definition for route context containing dynamic parameters
 */
interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its unique slug identifier
 * 
 * @param request - Next.js request object (unused but required by API route signature)
 * @param context - Route context containing dynamic slug parameter
 * @returns JSON response with event data or error message
 * 
 * Response Codes:
 * - 200: Event found and returned successfully
 * - 400: Invalid or missing slug parameter
 * - 404: Event with specified slug not found
 * - 500: Database connection error or unexpected server error
 */
export async function GET(
  request: NextRequest,
  context: RouteContext
  ): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    // Extract and validate slug parameter from route context
    const { slug } = await context.params;

    // Validate slug presence
    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: 'Slug parameter is required',
        } satisfies ErrorResponse,
        { status: 400 }
      );
    }

    // Validate the slug format (alphanumeric with hyphens, not empty)
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid slug format. Slug must contain only lowercase letters, numbers, and hyphens',
        } satisfies ErrorResponse,
        { status: 400 }
      );
    }

    // Sanitize slug
    const sanitizedSlug = slug.trim().toLowerCase();

    // Establish database connection
    await connectToDatabase();

    // Query event by slug with lean() for better performance (returns plain object)
    const event = await Event.findOne({ slug:sanitizedSlug }).lean<IEvent>();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: `Event with slug "${slug}" not found`,
        } satisfies ErrorResponse,
        { status: 404 }
      );
    }

    // Return successful response with event data
    return NextResponse.json(
      {
        success: true,
        message: 'Event retrieved successfully',
        event,
      } satisfies SuccessResponse,
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (in production, use proper logging service)
    console.error('Error fetching event by slug:', error);

    // Handle specific error types
    if (error instanceof Error) {
      // Database connection errors
      if (error.message.includes('MONGODB_URI')) {
        return NextResponse.json(
          {
            success: false,
            message: 'Database configuration error',
          } satisfies ErrorResponse,
          { status: 500 }
        );
      }

      // Mongoose validation or cast errors
      if (error.name === 'CastError' || error.name === 'ValidationError') {
        return NextResponse.json(
          {
            success: false,
            message: 'Invalid data format',
            error: error.message,
          } satisfies ErrorResponse,
          { status: 400 }
        );
      }
    }

    // Generic server error fallback
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retrieve event',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      } satisfies ErrorResponse,
      { status: 500 }
    );
  }
}

/**
 * Type definitions for API responses
 */
interface SuccessResponse {
  success: true;
  message: string;
  event: IEvent;
}

interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
}
