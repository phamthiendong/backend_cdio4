export default function PostCard({ p }) {
  return (
    <div className="border rounded-xl p-4 bg-white hover:shadow-md cursor-pointer">
      <div className="font-semibold text-gray-800 mb-1">{p.title}</div>
      <div className="text-sm text-gray-600 mb-2">{p.excerpt}</div>
      <div className="text-xs text-blue-600">
        {p.tag} • {p.reading}
      </div>
    </div>
  );
}
