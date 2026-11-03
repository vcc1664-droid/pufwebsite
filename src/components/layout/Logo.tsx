import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo/puf-logo.png";

export function Logo() {
  return (
    <Link href="/" aria-label="Synergy PUF — home" data-tone className="flex items-center">
      <Image
        src={logo}
        alt="Synergy PUF"
        priority
        className="h-[26px] w-auto max-w-none lg:h-[32px] header-dark:brightness-0 header-dark:invert on-dark:brightness-0 on-dark:invert"
      />
    </Link>
  );
}
