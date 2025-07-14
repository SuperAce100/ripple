import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function ChatInput({ handleSubmit, input, handleInputChange }: { handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void, input: string, handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <form onSubmit={handleSubmit}  className="flex flex-row items-center justify-center  rounded-xl w-full relative">
        <Input name="prompt" value={input} onChange={handleInputChange} className="w-full text-lg p-6 py-8 rounded-xl" />
        <Button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2">
            <Search className="w-4 h-4" />
        </Button>
    </form>
  );
}