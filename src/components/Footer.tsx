import Link from "next/link";
import { Twitter, Github, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mx-auto w-auto space-y-5 border-t px-3 py-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Aries</h3>
          <p className="text-sm text-muted-foreground">
            All in one app for design and documentation.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
          <Link href="#" className="hover:underline">
            <Twitter />
          </Link>
          <Link href="#" className="hover:underline">
            <Instagram />
          </Link>
          <Link href="#" className="hover:underline">
            <Github />
          </Link>
          <Link href="#" className="hover:underline">
            <Mail />
          </Link>
        </div>
      </div>
      <div className="text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Aries, Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
