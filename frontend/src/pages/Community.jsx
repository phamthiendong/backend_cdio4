export default function Community(){
  // có thể gọi /posts nếu backend đã có; tạm layout:
  const demo = [
    {id:1, title:"Cách đọc phim Pano/Cepha", excerpt:"Hướng dẫn đọc phim ..."},
    {id:2, title:"Viêm dạ dày nên ăn gì", excerpt:"Chia sẻ dinh dưỡng ..."},
  ];
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Cộng đồng Y khoa</h1>
      <div className="grid gap-4">
        {demo.map(p=>(
          <article key={p.id} className="p-4 border rounded hover:shadow">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-gray-600">{p.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
