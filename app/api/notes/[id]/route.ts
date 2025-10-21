 
 
import {  NextResponse, NextRequest } from 'next/server';
import { api, ApiError } from '../../api';
import { cookies } from 'next/headers';

 

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }) {
    const params = await context.params;
  const { id } = params;

  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();  
 
  try {
    const { data } = await api.get(`/notes/${id}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status ?? 500 }
    );
  }
}



export async function DELETE(request: NextRequest,
  context: { params: Promise<{ id: string }> }) {
  
  const params = await context.params;
  const { id } = params;

  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();
 
  try {
    await api.delete(`/notes/${id}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status ?? 500 }
    );
  }
}

export async function PATCH(request: NextRequest,
  context: { params: Promise<{ id: string }> }) {
  
   const params = await context.params;
  const { id } = params;
  
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();
  const body = await request.json();
 
  try {
    const { data } = await api.patch(`/notes/${id}`, body, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status ?? 500 }
    );
  }
}
