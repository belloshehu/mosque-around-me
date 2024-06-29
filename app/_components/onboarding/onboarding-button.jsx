import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { cn } from "../../utils/api";

export default function OnboardingButton({
  text,
  className = "",
  after = false,
  clickHandler,
}) {
  if (after) {
    return (
      <button
        aria-label="next button"
        type="button"
        onClick={clickHandler}
        className={cn(
          "flex items-center gap-2 p-1 hover:text-primary",
          className
        )}>
        {text} <FaArrowRight />
      </button>
    );
  }
  return (
    <button
      type="button"
      aria-label="previous button"
      onClick={clickHandler}
      className={cn(
        "flex items-center gap-2 p-1 hover:text-primary",
        className
      )}>
      <FaArrowLeft />
      {text}
    </button>
  );
}
