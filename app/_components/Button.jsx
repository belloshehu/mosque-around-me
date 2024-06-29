import { cn } from "../utils/api";

export default function Button({ text, className }) {
  return (
    <button
      type="button"
      className={cn(
        "w-fit p-2 rounded-md px-4 bg-primary text-white",
        className
      )}>
      {text}
    </button>
  );
}
