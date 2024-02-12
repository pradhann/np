interface ProjectProps {
  index: number;
  title: string;
  url: string;
  role: string;
}

export default function ProjectItem({ title, url, role }: ProjectProps) {
  return (
    <a
      href={url}
      target="_blank"
      className="group flex w-full items-center justify-between border-b px-4 py-10 sm:px-10 sm:py-16"
      rel="noreferrer"
    >
      <h2 className="text-2xl transition-all group-hover:-translate-x-3 group-hover:scale-110 sm:text-6xl">
        {title}
      </h2>
      <p className="text-sm font-light transition-all group-hover:translate-x-3 group-hover:scale-110 sm:text-lg">
        {role}
      </p>
    </a>
  );
}
