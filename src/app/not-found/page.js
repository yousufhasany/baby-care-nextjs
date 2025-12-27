export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded shadow text-center">
        <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-6">Sorry, the page you are looking for does not exist.</p>
        <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Back to Home</a>
      </div>
    </div>
  );
}
