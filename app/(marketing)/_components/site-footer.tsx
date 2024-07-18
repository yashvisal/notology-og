import { TwitterLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const footerSocials = [
  {
    href: "https://x.com/notology_ai",
    name: "Twitter",
    icon: <TwitterLogoIcon className="h-4 w-4" />,
  },
  {
    href: "https://www.instagram.com/notology_ai/",
    name: "Instagram",
    icon: <InstagramLogoIcon className="h-4 w-4" />,
  },
];

export function SiteFooter() {
  return (
    <footer>
      <div className="mx-auto w-full bg-white border-t max-w-screen-xl xl:pb-2">
        <div className="flex flex-col sm:flex-row sm:flex sm:items-center sm:justify-between rounded-md border-neutral-700/20 py-4 px-8 gap-2">
          <div className="flex space-x-5 sm:justify-center sm:mt-0">
            {footerSocials.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-600 fill-gray-500 hover:fill-gray-900 dark:hover:fill-gray-600"
              >
                {social.icon}
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </div>
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            Copyright © {new Date().getFullYear()}{" "}
            <Link href="/" className="cursor-pointer">
              Notology
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}