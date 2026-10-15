import { useEffect, useRef, useState, type HTMLAttributes } from "react";

type BlurTextProps = HTMLAttributes<HTMLElement> & {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
};

export function BlurText({ text, as = "p", delay = 90, className = "", ...props }: BlurTextProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const Tag = as;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} className={className} {...props}>
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} className={`inline-block transition-[filter,opacity,transform] duration-500 ease-out ${visible ? "translate-y-0 opacity-100 blur-0" : "translate-y-3 opacity-0 blur-sm"}`} style={{ transitionDelay: `${index * delay}ms` }}>
          {word}{index < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
