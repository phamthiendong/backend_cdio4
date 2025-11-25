export default function SectionHeader({ icon, title, action, onAction }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
      </div>
      {action && (
        <button
          onClick={onAction}
          className="text-sky-600 hover:underline font-medium"
        >
          {action}
        </button>
      )}
    </div>
  );
}
