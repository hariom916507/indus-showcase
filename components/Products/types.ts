export interface ProductType {
    id: string;
    category: string;
    title: string;
    tagline: string;
    description: string;
    features: string[];
    image: string;
    bg: string;        // Tailwind class for panel bg
    accent: string;    // Tailwind text-* class (legacy / fallback)
    hex: string;       // Hex color for inline styles (reliable in all contexts)
}
