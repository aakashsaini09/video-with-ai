'use client'; // if you're in the `app` directory

import { Video } from '@imagekit/next';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Your Videos</h1>

      <Video
        urlEndpoint="https://ik.imagekit.io/your_imagekit_id"
        src="/video.mp4"
        controls
        width={500}
        height={500}
      />
    </div>
  );
}
