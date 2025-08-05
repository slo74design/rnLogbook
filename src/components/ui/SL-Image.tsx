import clsx from "clsx";
import React from "react";
import { Image, ImageProps } from "react-native";

type SLImageProps = {
  source?: string;
  alt?: string;
  shape?: "circle" | "rounded" | "square";
  className?: string;
} & ImageProps;

export default function SLImage({
  source,
  alt = "",
  shape = "rounded",
  className = "",
  ...rest
}: SLImageProps & {
  source: ImageProps["source"];
}) {
  const isCircle = shape === "circle";
  const isRounded = shape === "rounded";
  const isSquare = shape === "square";

  const baseClasses = `
    w-full h-full object-cover 
    ${isCircle && "rounded-full"}
    ${isRounded && "rounded-3xl"}
    ${isSquare && "rounded-none"}
  `;

  // Fusiona las clases internas con las clases externas
  const mergedClasses = clsx(baseClasses, className); // Usando clsx

  return <Image source={source} alt={alt} className={mergedClasses} />;
}
