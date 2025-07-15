import * as React from "react"
import JsxParser from "react-jsx-parser"
import type { TProps as JsxParserProps } from "react-jsx-parser"
import { cn } from "@/lib/utils"
import * as Lucide from "lucide-react"
import * as Shadcn from "@/components/ui"

// grid grid-cols-2 gap-4 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-9 grid-cols-10 grid-cols-11 grid-cols-12 grid-cols-24 columns-2 columns-3 columns-4 columns-5 columns-6 columns-7 columns-8 columns-9 columns-10 columns-11 columns-12 columns-24 flex flex-col flex-row items-center items-start items-end justify-center justify-start justify-end justify-between justify-around space-x-2 space-x-4 space-x-6 space-x-8 space-y-2 space-y-4 space-y-6 space-y-8 gap-1 gap-2 gap-3 gap-4 gap-6 gap-8 gap-10 gap-12 p-2 p-4 p-6 p-8 px-2 px-4 px-6 px-8 py-2 py-4 py-6 py-8 m-2 m-4 m-6 m-8 mx-2 mx-4 mx-6 mx-8 my-2 my-4 my-6 my-8 w-full w-1/2 w-1/3 w-1/4 w-2/3 w-3/4 h-full h-screen h-64 h-32 h-16 bg-white bg-gray-50 bg-gray-100 bg-primary bg-secondary bg-accent text-primary text-secondary text-muted-foreground rounded rounded-md rounded-lg rounded-xl border border-border shadow shadow-md shadow-lg text-sm text-base text-lg text-xl text-2xl font-normal font-medium font-semibold font-bold

// text-green-400 text-green-500 bg-green-400 bg-green-500 border-green-400 border-green-500 text-red-500 bg-red-500 border-red-500 text-blue-400 text-blue-500 bg-blue-400 bg-blue-500 border-blue-400 border-blue-500 text-yellow-400 text-yellow-500 bg-yellow-400 bg-yellow-500 border-yellow-400 border-yellow-500 text-purple-400 text-purple-500 bg-purple-400 bg-purple-500 border-purple-400 border-purple-500 text-orange-400 text-orange-500 bg-orange-400 bg-orange-500 border-orange-400 border-orange-500 text-pink-400 text-pink-500 bg-pink-400 bg-pink-500 border-pink-400 border-pink-500 text-gray-400 text-gray-500 bg-gray-400 bg-gray-500 border-gray-400 border-gray-500 text-indigo-400 text-indigo-500 bg-indigo-400 bg-indigo-500 border-indigo-400 border-indigo-500 text-teal-400 text-teal-500 bg-teal-400 bg-teal-500 border-teal-400 border-teal-500 text-violet-400 text-violet-500 bg-violet-400 bg-violet-500 border-violet-400 border-violet-500 text-amber-400 text-amber-500 bg-amber-400 bg-amber-500 border-amber-400 border-amber-500 text-emerald-400 text-emerald-500 bg-emerald-400 bg-emerald-500 border-emerald-400 border-emerald-500 text-cyan-400 text-cyan-500 bg-cyan-400 bg-cyan-500 border-cyan-400 border-cyan-500 text-fuchsia-400 text-fuchsia-500 bg-fuchsia-400 bg-fuchsia-500 border-fuchsia-400 border-fuchsia-500 text-rose-400 text-rose-500 bg-rose-400 bg-rose-500 border-rose-400 border-rose-500 text-sky-400 text-sky-500 bg-sky-400 bg-sky-500 border-sky-400 border-sky-500 text-lime-400 text-lime-500 bg-lime-400 bg-lime-500 border-lime-400 border-lime-500 text-coral-400 text-coral-500 bg-coral-400 bg-coral-500 border-coral-400 border-coral-500 text-mint-400 text-mint-500 bg-mint-400 bg-mint-500 border-mint-4


const components = {
  ...Lucide,
  ...Shadcn,
}

function matchJsxTag(code: string | "") {
  if (!code) return null

  if (code.trim() === "") {
    return null
  }
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\s*([^>]*?)(\/)?>/
  const match = code.match(tagRegex)

  if (!match || typeof match.index === "undefined") {
    return null
  }

  const [fullMatch, tagName, attributes, selfClosing] = match

  const type = selfClosing
    ? "self-closing"
    : fullMatch.startsWith("</")
      ? "closing"
      : "opening"

  return {
    tag: fullMatch,
    tagName,
    type,
    attributes: attributes.trim(),
    startIndex: match.index,
    endIndex: match.index + fullMatch.length,
  }
}

function completeJsxTag(code: string | "" | undefined | null) {
  // Handle cases where code is undefined or null early to avoid runtime errors.
  if (!code) return ""

  const stack: string[] = []
  let result = ""
  let currentPosition = 0

  while (currentPosition < code.length) {
    const match = matchJsxTag(code.slice(currentPosition))
    if (!match) break
    const { tagName, type, endIndex } = match

    if (type === "opening") {
      stack.push(tagName)
    } else if (type === "closing") {
      stack.pop()
    }

    result += code.slice(currentPosition, currentPosition + endIndex)
    currentPosition += endIndex
  }

  return (
    result +
    stack
      .reverse()
      .map((tag) => `</${tag}>`)
      .join("")
  )
}

export type JSXPreviewProps = {
  jsx?: string | null
  isStreaming?: boolean
} & JsxParserProps

function JSXPreview({ jsx, isStreaming = false, ...props }: JSXPreviewProps) {
  const processedJsx = React.useMemo(
    () => (isStreaming ? completeJsxTag(jsx) : jsx),
    [jsx, isStreaming]
  )

  // Cast JsxParser to any to work around the type incompatibility
  const Parser = JsxParser as unknown as React.ComponentType<JsxParserProps>

  return <Parser components={components} jsx={processedJsx} {...props} className="w-full" />
}

export { JSXPreview }
