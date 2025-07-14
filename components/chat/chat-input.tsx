import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function ChatInput({ handleSubmit, input, handleInputChange, placeholder }: { handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void, input: string, handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string }) {
  return (
    <form onSubmit={handleSubmit}  className="flex flex-row items-center justify-center  rounded-xl w-full relative">
        <Input name="prompt" value={input} onChange={handleInputChange} className="w-full text-lg p-6 py-8 rounded-3xl shadow-2xl shadow-primary/20 delay-75" placeholder={placeholder} />
        <Button type="submit" size="icon" variant="ghost" className="absolute right-4 top-1/2 -translate-y-1/2 scale-150 text-primary">
            <Search className="w-4 h-4 text-primary" />
        </Button>
    </form>
  );
}