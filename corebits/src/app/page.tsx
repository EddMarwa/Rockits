import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-8">
      <p>
        Go to <Link className="text-blue-600 hover:underline" href="/en">English</Link> or{' '}
        <Link className="text-blue-600 hover:underline" href="/zh">中文</Link>
      </p>
    </div>
  );
}
