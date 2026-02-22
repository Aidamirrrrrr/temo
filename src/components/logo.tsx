/**
 * NotFound Studio logo — text-only with NF monogram block.
 */
export function Logo({
  variant = "light",
  size = "default",
}: {
  variant?: "light" | "dark";
  size?: "default" | "small";
}) {
  const isSmall = size === "small";

  return (
    <span className="group inline-flex items-center gap-2.5">
      {/* NF monogram block */}
      <span
        className={`inline-flex items-center justify-center rounded-md font-mono font-black tracking-tighter transition-all duration-500 ${
          isSmall ? "h-6 w-6 text-[10px]" : "h-7 w-7 text-xs"
        } ${
          variant === "dark"
            ? "bg-white text-black group-hover:bg-neutral-300"
            : "bg-black text-white group-hover:bg-neutral-700"
        }`}
      >
        NF
      </span>
      {/* Wordmark */}
      <span className="flex items-baseline gap-px">
        <span
          className={`font-mono font-bold tracking-tighter transition-colors duration-500 ${
            isSmall ? "text-sm" : "text-lg"
          } ${variant === "dark" ? "text-white" : "text-black"}`}
        >
          not
        </span>
        <span
          className={`font-mono font-bold tracking-tighter transition-colors duration-500 ${
            isSmall ? "text-sm" : "text-lg"
          } ${
            variant === "dark"
              ? "text-neutral-500 group-hover:text-white"
              : "text-neutral-300 group-hover:text-black"
          }`}
        >
          found
        </span>
      </span>
    </span>
  );
}
