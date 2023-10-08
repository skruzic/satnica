'use client';

interface HeadingProps {
  title: string;
  description?: string;
}

export const Heading = ({ title, description }: HeadingProps) => (
  <div>
    <h2 className="text-3xl font-bold tracking-light">{title}</h2>
    {description && (
      <p className="text-sm text-muted-foreground">{description}</p>
    )}
  </div>
);
