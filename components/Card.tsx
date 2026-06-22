interface CardProps {
  icon: string;
  title: string;
  description: string;
  tag?: string;
  tagColor?: string;
}

export default function Card({ icon, title, description, tag, tagColor }: CardProps) {
  return (
    <div
      className="glass animate-fade-in-up"
      style={{ padding: "28px 24px", cursor: "default" }}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center mb-4"
        style={{
          width: 52,
          height: 52,
          borderRadius: "var(--radius-sm)",
          background: "rgba(76,175,80,0.10)",
          fontSize: 26,
        }}
      >
        {icon}
      </div>

      {/* Tag */}
      {tag && (
        <span
          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 uppercase tracking-wider"
          style={{
            background: `${tagColor || "var(--primary)"}18`,
            color: tagColor || "var(--primary)",
          }}
        >
          {tag}
        </span>
      )}

      <h3 className="m-0 text-lg font-bold" style={{ color: "var(--foreground)" }}>
        {title}
      </h3>
      <p className="mt-2 mb-0 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {description}
      </p>
    </div>
  );
}
