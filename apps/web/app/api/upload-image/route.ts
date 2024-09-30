import { NextRequest, NextResponse } from 'next/server';
import { uploadImageToServer } from '../../lib/actions/token/token';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('image') as File;

  if (!file) {
    return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
  }

  const fileName = await uploadImageToServer(file);

  if (fileName != '') {
    return NextResponse.json({ success: true, file: fileName, message: 'File uploaded successfully' });
  } else {
    return NextResponse.json({ success: false, file: '', message: 'File upload failed' }, { status: 500 });
  }
}
