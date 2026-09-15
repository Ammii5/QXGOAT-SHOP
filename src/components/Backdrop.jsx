export default function Backdrop({ onClick, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px] transition-opacity ${className}`}
    />
  )
}Please verify that my filestoreList and filestoreUpload functions accept the current API Secret Key through the x-api-key header, allow CORS requests from my Vercel domain, support OPTIONS preflight, and return public/signed URLs for uploaded files.