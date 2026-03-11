const BirdMascot = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="36" rx="18" ry="16" fill="hsl(280, 35%, 75%)" />
    <ellipse cx="32" cy="36" rx="14" ry="12" fill="hsl(330, 50%, 92%)" />
    <circle cx="26" cy="30" r="3" fill="hsl(270, 30%, 20%)" />
    <circle cx="38" cy="30" r="3" fill="hsl(270, 30%, 20%)" />
    <circle cx="27" cy="29" r="1" fill="white" />
    <circle cx="39" cy="29" r="1" fill="white" />
    <ellipse cx="32" cy="26" rx="10" ry="8" fill="hsl(280, 35%, 75%)" />
    <path d="M30 34 L32 38 L34 34" fill="hsl(30, 80%, 60%)" />
    <ellipse cx="22" cy="28" rx="3" ry="2" fill="hsl(280, 35%, 70%)" transform="rotate(-20 22 28)" />
    <ellipse cx="42" cy="28" rx="3" ry="2" fill="hsl(280, 35%, 70%)" transform="rotate(20 42 28)" />
    <path d="M14 38 Q10 30 16 32" fill="hsl(280, 40%, 68%)" />
    <path d="M50 38 Q54 30 48 32" fill="hsl(280, 40%, 68%)" />
    <circle cx="24" cy="36" r="3" fill="hsl(330, 60%, 85%)" opacity="0.6" />
    <circle cx="40" cy="36" r="3" fill="hsl(330, 60%, 85%)" opacity="0.6" />
  </svg>
);

export default BirdMascot;
