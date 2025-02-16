export function TypographyH1({ children }: { children: React.ReactNode }) {
  return <h1 className="scroll-m-20 md:text-3xl lg:text-3xl">{children}</h1>;
}

export function TypographyP({ children }: { children: React.ReactNode }) {
  return <p className="leading-7 [&:not(:first-child)]:mt-2">{children}</p>;
}

export function TypographyH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="scroll-m-20 border-b pb-1 mb-2 text-xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}
