import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { CodeBlock, CodeBlockCode } from "./code-block";

function extractLanguage(className?: string): string {
  if (!className) return "plaintext"
  const match = className.match(/language-(\w+)/)
  return match ? match[1] : "plaintext"
}


const components: Components = {
  a: ({ href, children }: { href: string | undefined, children: React.ReactNode }) => {
    return <a href={href ?? ''} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-600">{children}</a>
  },
  p: ({ children }: { children: React.ReactNode }) => {
    return <p className="mb-4">{children}</p>
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
  code: function CodeComponent({ className, children, ...props }) {
    const isInline =
      !props.node?.position?.start.line ||
      props.node?.position?.start.line === props.node?.position?.end.line

    if (isInline) {
      return (
        <span
          className={cn(
            "bg-primary-foreground text-primary rounded-sm px-1 font-mono text-sm",
            className
          )}
          {...props}
        >
          {children}
        </span>
      )
    }

    const language = extractLanguage(className)

    return (
      <CodeBlock className={cn("my-4", className)}>
        <CodeBlockCode code={children as string} language={language} />
      </CodeBlock>
    )
  },
  pre: function PreComponent({ children }) {
    return <>{children}</>
  },
  hr: () => {
    return <hr className="my-4 border-t border-primary/20" />
  },
  table: ({ children }: { children: React.ReactNode }) => {
    return <table className="w-full border-collapse border border-gray-300">{children}</table>
  },
  th: ({ children }: { children: React.ReactNode }) => {
    return <th className="border border-gray-300 p-2">{children}</th>
  },
  td: ({ children }: { children: React.ReactNode }) => {
    return <td className="border border-gray-300 p-2">{children}</td>
  },
  
}

export default function Markdown({ children, className }: { children: string, className?: string }) {

  return (
    <div className={cn("w-full", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{children}</ReactMarkdown>
    </div>
  );
}