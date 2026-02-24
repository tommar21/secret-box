export const NAME_REGEX = /^(?=.*\p{L})[\p{L}\s\-']+$/u;

export function validateName(value: string): string {
  const trimmed = value.trim();
  if (trimmed.length === 0) return "Name is required";
  if (trimmed.length < 2) return "Name must be at least 2 characters";
  if (trimmed.length > 50) return "Name cannot exceed 50 characters";
  if (!NAME_REGEX.test(trimmed))
    return "Only letters, spaces, hyphens, and apostrophes allowed";
  return "";
}

export function validateEmail(value: string): string {
  const trimmed = value.trim();
  if (trimmed.length === 0) return "Email is required";
  if (trimmed.length > 254) return "Email cannot exceed 254 characters";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))
    return "Invalid email format";
  return "";
}
