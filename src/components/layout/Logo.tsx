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
        // Width follows the logo's own proportions (it includes the tagline), sized to sit inside the navbar bar
        className="h-[38px] w-auto max-w-none lg:h-[46px] on-dark:brightness-0 on-dark:invert"
      />
    </Link>
  );
}
