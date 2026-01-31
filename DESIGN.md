# Design System

**Version:** 1.0.0  
**Last Updated:** 2026-01-31

This document defines our visual design language, brand identity, and design patterns. All designers and developers must follow these guidelines to ensure consistency across the application.

## Table of Contents
- [Brand Identity](#brand-identity)
- [Colors](#colors)
- [Typography](#typography)
- [Spacing](#spacing)
- [Components](#components)
- [Icons](#icons)
- [Imagery](#imagery)
- [Motion](#motion)
- [Breakpoints](#breakpoints)
- [Accessibility](#accessibility)

---

## Brand Identity

### Brand Voice
- **Personality:** [Professional | Friendly | Playful | Authoritative]
- **Tone:** [Warm | Conversational | Direct | Inspiring]
- **Values:** [Innovation, Simplicity, Trust, Excellence]

### Design Principles
1. **Clarity** - Every element has a purpose
2. **Consistency** - Patterns repeat throughout
3. **Simplicity** - Remove, don't add
4. **Accessibility** - Design for everyone

---

## Colors

### Primary Palette
```css
/* Primary - Main brand color */
--color-primary-50: #eff6ff;
--color-primary-100: #dbeafe;
--color-primary-200: #bfdbfe;
--color-primary-300: #93c5fd;
--color-primary-400: #60a5fa;
--color-primary-500: #3b82f6; /* Main */
--color-primary-600: #2563eb;
--color-primary-700: #1d4ed8;
--color-primary-800: #1e40af;
--color-primary-900: #1e3a8a;

/* Secondary - Accent color */
--color-secondary-500: #8b5cf6;
--color-secondary-600: #7c3aed;
--color-secondary-700: #6d28d9;
```

### Neutrals
```css
/* Grays - Text and backgrounds */
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;

/* White/Black */
--color-white: #ffffff;
--color-black: #000000;
```

### Semantic Colors
```css
/* Success - Green */
--color-success-50: #f0fdf4;
--color-success-500: #22c55e;
--color-success-700: #15803d;

/* Warning - Yellow */
--color-warning-50: #fffbeb;
--color-warning-500: #eab308;
--color-warning-700: #a16207;

/* Error - Red */
--color-error-50: #fef2f2;
--color-error-500: #ef4444;
--color-error-700: #b91c1c;

/* Info - Blue */
--color-info-50: #eff6ff;
--color-info-500: #3b82f6;
--color-info-700: #1d4ed8;
```

### Usage Guidelines
```typescript
// ✅ Correct usage
Background: primary-50 (lightest) → primary-900 (darkest)
Text on primary-500: white
Primary button: primary-600, hover: primary-700
Secondary button: gray-200, hover: gray-300

// ❌ Incorrect
Don't use primary-500 for text on light backgrounds (poor contrast)
Don't mix primary and secondary as equivalents
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          // ... (full scale)
          900: '#1e3a8a',
        },
        // Add all custom colors
      },
    },
  },
}
```

---

## Typography

### Font Families
```css
/* Primary - Interface */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Secondary - Headings (optional) */
--font-display: 'Poppins', 'Inter', sans-serif;

/* Monospace - Code */
--font-mono: 'Fira Code', 'Courier New', monospace;
```

### Type Scale
```css
/* Font sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */

/* Line heights */
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;

/* Font weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Typography Hierarchy
```typescript
// Headings
H1: text-4xl font-bold leading-tight (36px, 700)
H2: text-3xl font-bold leading-tight (30px, 700)
H3: text-2xl font-semibold leading-snug (24px, 600)
H4: text-xl font-semibold leading-snug (20px, 600)
H5: text-lg font-medium leading-normal (18px, 500)
H6: text-base font-medium leading-normal (16px, 500)

// Body
Body Large: text-lg leading-relaxed (18px, 1.625)
Body: text-base leading-normal (16px, 1.5)
Body Small: text-sm leading-normal (14px, 1.5)

// UI
Button: text-sm font-medium (14px, 500)
Caption: text-xs leading-normal (12px, 1.5)
Label: text-sm font-medium (14px, 500)
```

### Usage Examples
```typescript
// Page title
<h1 className="text-4xl font-bold text-gray-900">
  Dashboard
</h1>

// Section heading
<h2 className="text-2xl font-semibold text-gray-800 mb-4">
  Recent Activity
</h2>

// Body text
<p className="text-base text-gray-600 leading-relaxed">
  Lorem ipsum dolor sit amet...
</p>

// Small caption
<span className="text-xs text-gray-500">
  Last updated 2 hours ago
</span>
```

---

## Spacing

### Spacing Scale
```css
/* Based on 4px base unit */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
```

### Spacing Guidelines
```typescript
// Component padding
Card: p-6 (24px)
Button: px-4 py-2 (16px/8px)
Input: px-3 py-2 (12px/8px)
Modal: p-8 (32px)

// Component gaps
Stack items: gap-4 (16px)
Grid items: gap-6 (24px)
Form fields: gap-4 (16px)

// Section spacing
Between sections: mb-12 (48px)
Between elements: mb-4 (16px)
Tight grouping: mb-2 (8px)
```

---

## Components

### Buttons

#### Primary Button
```typescript
<button className="
  px-4 py-2 
  bg-primary-600 hover:bg-primary-700 
  text-white text-sm font-medium
  rounded-lg
  transition-colors
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Primary Action
</button>
```

#### Secondary Button
```typescript
<button className="
  px-4 py-2 
  bg-gray-200 hover:bg-gray-300 
  text-gray-800 text-sm font-medium
  rounded-lg
  transition-colors
">
  Secondary Action
</button>
```

#### Sizes
```typescript
Small: px-3 py-1.5 text-xs
Medium: px-4 py-2 text-sm (default)
Large: px-6 py-3 text-base
```

### Inputs

#### Text Input
```typescript
<input
  type="text"
  className="
    w-full px-3 py-2
    border border-gray-300 rounded-lg
    text-gray-900 text-sm
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
    placeholder:text-gray-400
  "
  placeholder="Enter text..."
/>
```

#### Error State
```typescript
<input
  className="
    border-error-500 
    focus:ring-error-500
  "
/>
<p className="mt-1 text-sm text-error-600">
  Error message here
</p>
```

### Cards
```typescript
<div className="
  bg-white 
  border border-gray-200 
  rounded-lg 
  p-6
  shadow-sm
  hover:shadow-md
  transition-shadow
">
  Card content
</div>
```

### Modals
```typescript
<div className="
  fixed inset-0 
  bg-black/50 
  flex items-center justify-center
  p-4
">
  <div className="
    bg-white 
    rounded-xl 
    p-8
    max-w-md w-full
    shadow-2xl
  ">
    Modal content
  </div>
</div>
```

---

## Icons

### Icon Library
**Recommended:** Lucide React (https://lucide.dev)

```typescript
import { User, Mail, Settings } from 'lucide-react'

<User className="w-5 h-5 text-gray-600" />
```

### Icon Sizes
```typescript
Small: w-4 h-4 (16px)
Medium: w-5 h-5 (20px) - Default
Large: w-6 h-6 (24px)
XLarge: w-8 h-8 (32px)
```

### Icon Colors
```typescript
// Match text color
text-gray-600 // Standard
text-gray-400 // Subtle
text-primary-600 // Accent
text-error-600 // Error state
```

---

## Imagery

### Image Guidelines
- **Format:** WebP with PNG fallback
- **Optimization:** Compress all images
- **Lazy loading:** Use `loading="lazy"`
- **Alt text:** Always provide descriptive alt text
- **Aspect ratios:** 
  - Hero: 16:9
  - Profile: 1:1
  - Thumbnail: 4:3

### Placeholder Images
```typescript
// Use gradient placeholders while loading
<div className="
  w-full h-48 
  bg-gradient-to-r from-gray-200 to-gray-300
  animate-pulse
  rounded-lg
" />
```

---

## Motion

### Transitions
```css
/* Duration */
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;

/* Easing */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Usage
```typescript
// Hover states
className="transition-colors duration-200"

// Modal entrance
className="transition-all duration-300 ease-out"

// Loading states
className="animate-pulse"
```

### Animation Principles
- **Subtle:** Animations should enhance, not distract
- **Fast:** Keep under 300ms
- **Purposeful:** Every animation serves a function
- **Reduced motion:** Respect `prefers-reduced-motion`

---

## Breakpoints

### Responsive Breakpoints
```css
/* Mobile first approach */
sm: 640px   /* Tablet portrait */
md: 768px   /* Tablet landscape */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### Usage
```typescript
// Mobile first
<div className="
  w-full         /* Mobile */
  md:w-1/2       /* Tablet+ */
  lg:w-1/3       /* Desktop+ */
">
  Responsive content
</div>
```

---

## Accessibility

### Color Contrast
- **WCAG AA:** 4.5:1 for normal text
- **WCAG AAA:** 7:1 for normal text
- **Large text:** 3:1 minimum

### Focus States
```typescript
// Always provide visible focus
className="
  focus:outline-none 
  focus:ring-2 
  focus:ring-primary-500 
  focus:ring-offset-2
"
```

### Screen Readers
```typescript
// Provide context
<button aria-label="Close dialog">
  <X className="w-5 h-5" />
</button>

// Hide decorative elements
<img src="decoration.svg" alt="" aria-hidden="true" />
```

---

## Design Tokens (Tailwind Config)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Import from this document
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      fontSize: {
        // Import from this document
      },
      spacing: {
        // Import from this document
      },
    },
  },
}
```

---

## Evolution

### Updating Design System
1. Propose change to team
2. Update this document
3. Update Figma library (if applicable)
4. Increment version
5. Notify developers

### Version History
- **1.0.0** (2026-01-31) - Initial design system

---

**Tools:**
- Figma: [Design library link]
- Storybook: [Component showcase link]
- Color contrast checker: https://webaim.org/resources/contrastchecker/

**Resources:**
- Tailwind CSS: https://tailwindcss.com
- Lucide Icons: https://lucide.dev
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
