import Link from "next/link";

type AppHeaderProps = {
  title?: string;
};

export default function AppHeader({
  title,
}: AppHeaderProps) {
  return (
    <header className="border-b border-white/10 bg-[#0b0b0b]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link
          href="/dashboard"
          className="text-xl font-semibold tracking-tight"
        >
          HairForm <span className="text-amber-300">AI</span>
        </Link>

        {title ? (
          <p className="hidden text-sm font-medium text-white/45 sm:block">
            {title}
          </p>
        ) : null}

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-300 font-semibold text-black">
          R
        </div>
      </div>
    </header>
  );
}