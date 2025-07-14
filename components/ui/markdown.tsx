import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

const components: Components = {
  a: ({ href, children }: { href: string | undefined, children: React.ReactNode }) => {
    return <a href={href ?? ''} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-600">{children}</a>
  },
  p: ({ children }: { children: React.ReactNode }) => {
    return <p className="">{children}</p>
  },
  h1: ({ children }: { children: React.ReactNode }) => {
    return <h1 className="mt-6 mb-2 text-3xl font-semibold tracking-tight">{children}</h1>
  },
  h2: ({ children }: { children: React.ReactNode }) => {
    return <h2 className="mt-4 mb-2 text-2xl font-medium tracking-tight border-b border-primary/20 pb-2">{children}</h2>
  },
  h3: ({ children }: { children: React.ReactNode }) => {
    return <h3 className="mt-4 mb-2 text-lg font-medium tracking-tight text-primary">{children}</h3>
  },
  h4: ({ children }: { children: React.ReactNode }) => {
    return <h4 className="mt-4 text-base font-medium tracking-tight text-primary mb-2">{children}</h4>
  },
  ul: ({ children }: { children: React.ReactNode }) => {
    return <ul className="list-disc list-outside ml-6 my-2">{children}</ul>
  },
  ol: ({ children }: { children: React.ReactNode }) => {
    return <ol className="list-decimal list-outside ml-6 my-2">{children}</ol>
  },
  li: ({ children }: { children: React.ReactNode }) => {
    return <li className="mb-2 ml-2">{children}</li>
  },
  img: ({ src, alt }: { src: string, alt: string }) => {
    return <img src={src} alt={alt} className="w-full max-w-md my-4 float h-auto rounded-md" />
  },
  blockquote: ({ children }: { children: React.ReactNode }) => {
    return <blockquote className="text-sm text-muted-foreground border-l-4 border-primary/20 pl-4 py-2 bg-muted/50 rounded-md">{children}</blockquote>
  },
  code: ({ children }: { children: React.ReactNode }) => {
    return <code className="text-sm text-muted-foreground">{children}</code>
  },
  pre: ({ children }: { children: React.ReactNode }) => {
    return <pre className="text-sm text-muted-foreground">{children}</pre>
  },
  hr: () => {
    return <hr className="my-4 border-t border-primary/20" />
  }
}

export default function Markdown({ children, className }: { children: string, className?: string }) {

  return (
    <div className={cn("w-full", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{children}</ReactMarkdown>
    </div>
  );
}