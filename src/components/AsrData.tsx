export default function ASRCard({ asr }: { asr?: number }) {
  return (
    <div className="w-[70px] rounded-xl shadow-sm py-3">
      <h1 className="text-xs text-slate-600 text-center">ASR</h1>
      <div className="text-2xl font-bold text-slate-900 text-center">{asr}</div>
    </div>
  )
}
