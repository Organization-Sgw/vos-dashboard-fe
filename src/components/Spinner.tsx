interface SpinnerProps {
  size?: number // default 24px
  border?: number // default 4px
  color?: string // Tailwind color class
}

export function Spinner({ size = 24, border = 4, color = 'border-blue-500' }: SpinnerProps) {
  return (
    <div
      className={`animate-spin cursor-pointer rounded-full border-t-transparent ${color}`}
      style={{
        width: size,
        height: size,
        borderWidth: border,
        borderStyle: 'solid',
      }}
    ></div>
  )
}
