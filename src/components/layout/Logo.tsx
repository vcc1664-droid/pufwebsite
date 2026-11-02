import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo/puf-logo.png";

export function Logo() {
  return (
    <Link href="/" aria-label="Synergy PUF — home" className="flex items-center">
      <Image
        src={logo}
        alt="Synergy PUF"
        priority
        className="h-[22px] w-[122px] max-w-none header-dark:brightness-0 header-dark:invert"
      />
    </Link>
  );
}
