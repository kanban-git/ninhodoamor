import { Heart } from "lucide-react";

const FloatingHeart = ({ className = "", delay = "0s", size = 16 }: { className?: string; delay?: string; size?: number }) => (
  <Heart
    className={`text-pink-soft-medium opacity-40 animate-float ${className}`}
    style={{ animationDelay: delay }}
    size={size}
    fill="currentColor"
  />
);

export default FloatingHeart;
