export default function Backdrop({ onClick, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px] transition-opacity ${className}`}
    />
  )
}