export function capitalize(str: string): string {
  if (!str) return "";
  return str[0].toUpperCase() + str.slice(1);
}

export function reverseString(str: string): string {
  return str.split("").reverse().join("");
}
