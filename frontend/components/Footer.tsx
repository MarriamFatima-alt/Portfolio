export default function Footer({ name }: { name: string }) {
  return (
    <footer className="border-t border-line px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 font-mono text-xs text-muted sm:flex-row">
        <span>© {new Date().getFullYear()} {name}</span>
        <span>built with next.js + fastapi</span>
        {/*
          TODO: FlyRank graduate badge.
          Get your personal badge snippet + verification-page URL from the
          intern portal (Completion / Resources tab) and drop it in here,
          e.g.:

          <a
            href="https://internship.flyrank.ai/verify/<your-credential-id>"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <img src="/flyrank-badge.svg" alt="FlyRank Verified Graduate" className="h-6" />
          </a>
        */}
      </div>
    </footer>
  );
}
