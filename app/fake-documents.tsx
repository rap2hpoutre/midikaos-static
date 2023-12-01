export default function FakeDocuments() {
  return (
    <div className="animate-pulse opacity-50">
      <div className="flex justify-end mr-5 text-sm text-gray-200">
        ... results
      </div>
      <ul>
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <li
            className="border border-gray-400 shadow-md m-5 p-5 rounded-md"
            key={k}
          >
            <div className="h-5 bg-pink-200 m-2 rounded w-48"></div>
            <div className="text-sm">
              <div className="h-4 bg-gray-300  m-2 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300  m-2 rounded w-32"></div>
              <div className="h-4 bg-gray-300  m-2 rounded w-16"></div>
              <div className="h-4 bg-gray-300  m-2 rounded w-3/4"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
