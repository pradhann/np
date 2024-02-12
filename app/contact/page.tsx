import MainLayout from '@/layouts/MainLayout'; // Importing MainLayout
import { FaTwitter, FaEnvelope, FaGithub } from 'react-icons/fa'; // Importing icons
import Link from 'next/link'; // Importing Link from Next.js (not MUI)

// Define your socials array
const socials = [
  {
    Icon: FaTwitter,
    href: 'https://twitter.com/nripeshpradhan',
    label: 'Twitter',
    handle: '@nripeshpradhan',
  },
  {
    Icon: FaEnvelope,
    href: 'mailto:dev@gmail.com',
    label: 'Email',
    handle: 'npradhan@chippercash.com',
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
      <div className="space-y-2 pt-6 pb-8 md:space-y-5 ">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Contact
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Reach out if you have any questions or just want to say hi!
        </p>
      </div>
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
