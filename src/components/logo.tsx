import Image from "next/image";

interface LogoProps {
  variant?: "color" | "white";
  className?: string;
  height?: number;
}

export function Logo({ variant = "color", className, height = 40 }: LogoProps) {
  const src =
    variant === "white"
      ? "/logo/app-logo-black.png"
      : "/logo/app-logo-removebg-preview.png";

  return (
    <Image
      src={src}
      alt="Roamly"
      width={height * 2}
      height={height}
      className={className}
      style={{ height, width: "auto" }}
      priority
    />
  );
}
