export function StatCard({ label, value, tone = "default" }: { label: string; value: string | number; tone?: "default" | "red" | "orange" | "blue" }) {
  return (
    <div className={`statCard tone-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
