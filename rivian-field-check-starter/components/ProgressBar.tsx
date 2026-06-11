export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="progressTrack" aria-label={`progress ${value}%`}>
      <div className="progressFill" style={{ width: `${value}%` }} />
    </div>
  );
}
