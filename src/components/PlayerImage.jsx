import { User } from "lucide-react";

export const PlayerImage = ({ src, alt = "Jogador" }) => {
  if (!src) {
    return (
      <div className="w-20 h-20 rounded object-cover border border-neutral-600 bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center">
        <User size={32} className="text-neutral-400" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-20 h-20 rounded object-cover border border-neutral-600"
      onError={(e) => {
        e.target.style.display = "none";
        e.target.parentElement.innerHTML =
          '<div class="w-20 h-20 rounded border border-neutral-600 bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-neutral-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>';
      }}
    />
  );
};
