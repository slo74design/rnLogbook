import clsx from "clsx"; // Opcional, pero muy recomendado
import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

type SLButtonProps = {
  title: string;
  onPress?: () => void;
  theme?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  className?: string; // Agrega esto para aceptar la className
} & PressableProps;

export default function SLButton({
  title,
  onPress,
  theme = "primary",
  disabled,
  className, // Desestructura la className
  ...rest
}: SLButtonProps) {
  const isPrimary = theme === "primary";
  const isSecondary = theme === "secondary";
  const isTertiary = theme === "tertiary";

  const baseClasses = `
    flex-row items-center justify-center rounded-xl px-5 py-3 mb-4 border
    ${isPrimary && "bg-rose-500 border-transparent"}
    ${isSecondary && "bg-white border-white"}
    ${isTertiary && "bg-transparent border-white"}
    ${disabled && "opacity-50"}
  `;

  // Fusiona las clases internas con las clases externas
  const mergedClasses = clsx(baseClasses, className); // Usando clsx
  // Alternativa manual: const mergedClasses = `${baseClasses} ${className || ''}`;

  return (
    <Pressable
      onPress={onPress}
      className={mergedClasses} // Usa la cadena de clases fusionada
      disabled={disabled}
      {...rest}
    >
      <Text
        className={`
          text-xl uppercase font-WorkSansBold
          ${(isPrimary || isTertiary) && "text-rose-100"}
          ${isSecondary && "text-SL-dark"}
        `}
      >
        {title}
      </Text>
    </Pressable>
  );
}
