import Link from "next/link";
import { Twitter, Github, Instagram, Mail,Linkedin } from "lucide-react";

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
          <Link
            href="https://twitter.com/Arjun_R_A"
            className="hover:underline"
          >
            <Twitter />
          </Link>
          <Link
            href="https://www.linkedin.com/in/arjun-r-a-3362aa147/"
            className="hover:underline"
          >
            <Linkedin />
          </Link>
          <Link
            href="https://github.com/ArjunJunna"
            className="hover:underline"
          >
            <Github />
          </Link>
          <Link href="mailto:arjun9852@gmail.com" className="hover:underline">
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
