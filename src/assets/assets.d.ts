/**
 * Assets module declarations.
 * Easier to give project opportunity to use assets without ts issues.
 */

type StaticImageData = {
  src: string;
  width: number;
  height: number;
  placeholder?: string;
};

/* Media declarations */
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}
declare module '*.png' {
  const content: StaticImageData;
  export default content;
}
declare module '*.jpg' {
  const content: StaticImageData;
  export default content;
}
declare module '*.jpeg' {
  const content: StaticImageData;
  export default content;
}
declare module '*.gif' {
  const content: StaticImageData;
  export default content;
}
declare module '*.webp' {
  const content: StaticImageData;
  export default content;
}
declare module '*.ico' {
  const content: StaticImageData;
  export default content;
}
declare module '*.bmp' {
  const content: StaticImageData;
  export default content;
}

declare module '*.otf';
