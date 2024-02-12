import MainLayout from '@/layouts/MainLayout'; // Importing MainLayout
import { FaTwitter, FaEnvelope, FaGithub } from 'react-icons/fa'; // Importing icons
import Link from 'next/link'; // Importing Link from Next.js (not MUI)

// Define your socials array
const socials = [
  {
    Icon: FaTwitter,
    href: 'https://twitter.com/chronark_',
    label: 'Twitter',
    handle: '@nripeshpradhan',
  },
  {
    Icon: FaEnvelope,
    href: 'mailto:nripeshpradhan@gmail.com',
    label: 'Email',
    handle: 'dev@chronark.com',
  },
  {
    Icon: FaGithub,
    href: 'https://github.com/pradhann',
    label: 'Github',
    handle: 'pradhann',
  },
];

export default function Contact() {
  return (
    <MainLayout>
      <div className="socials-grid">
        {socials.map(({ Icon, href, label, handle }) => (
          <div key={label} className={`social-item`}>
            {' '}
            {/* Opacity change on hover */}
            <Link href={href} aria-label={label} legacyBehavior>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center space-y-4"
              >
                <Icon className="text-4xl md:text-5xl text-current mb-8" /> {/* Increased space */}
                <h3 className="text-md lg:text-lg font-bold text-gray-900 dark:text-gray-100">
                  {handle}
                </h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
