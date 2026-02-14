import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "./src/app/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const SEED_COUNT = 25;

async function main() {
  try {
    console.log(`🌱 Starting DB seed...`);

    // Clear articles table
    console.log("🧹 Deleting all articles...");
    await prisma.article.deleteMany();

    // Ensure at least one user exists
    console.log("🔎 Querying existing users...");
    let users = await prisma.user.findMany({ select: { id: true } });

    if (users.length === 0) {
      console.log("👤 No users found, inserting default seed user...");
      const seedUser = await prisma.user.create({
        data: {
          email: "example@gmail.com",
          hashedPassword: "123456",
          name: "Mohamed Ayman",
          imageUrl: null,
        },
      });
      users = [{ id: seedUser.id }];
    }

    const ids = users.map((u) => u.id);
    console.log(`👥 Using ${users.length} user(s)`);

    // Insert articles
    console.log("🍩 Inserting articles...");
    const articles = [
      {
        title: "Getting Started with WikiFlow",
        content: `# Getting Started with WikiFlow

Welcome to your personal wiki system! This is a comprehensive guide to help you understand how to use WikiFlow effectively.

## What is WikiFlow?

WikiFlow is a modern, user-friendly wiki system built with **Next.js** and **TypeScript**. It allows you to create, edit, and organize your knowledge in a clean, accessible format.

### Key Features

- **Markdown Support**: Write content using familiar Markdown syntax
- **Real-time Preview**: See your changes as you type
- **File Attachments**: Upload images and documents
- **Responsive Design**: Works perfectly on desktop and mobile
- **Search Functionality**: Find your content quickly

## Getting Started

### Creating Your First Article

1. Click the **"New Article"** button
2. Enter a descriptive title
3. Write your content using Markdown
4. Optionally attach files or images
5. Click **"Save Article"** to publish

### Markdown Basics

Here are some common Markdown elements you can use:

**Bold text** and *italic text*

- Bullet points
- Work great for lists
- Easy to read

1. Numbered lists
2. Are also supported
3. Perfect for step-by-step guides

> Blockquotes are perfect for highlighting important information or quotes from other sources.

### Code Examples

You can include inline \`code\` or code blocks:

\`\`\`javascript
function welcomeMessage() {
  console.log("Welcome to WikiFlow!");
  return "Happy writing!";
}
\`\`\`

### Links and References

You can easily create [links to other pages](https://example.com) or reference other articles in your wiki.

## Advanced Features

### Tables

| Feature | Description | Status |
|---------|-------------|--------|
| Markdown Editor | Rich text editing | ✅ Available |
| File Upload | Attach documents | ✅ Available |
| Search | Find content quickly | 🚧 Coming Soon |

### Images

Images can be embedded directly in your articles and will be displayed beautifully within the content.

## Tips for Success

1. **Use descriptive titles** - Make it easy to find your articles later
2. **Organize with headers** - Break up long content into sections
3. **Link related articles** - Create connections between your knowledge
4. **Regular updates** - Keep your information current and relevant

## Need Help?

If you encounter any issues or have questions about using WikiFlow, don't hesitate to reach out to our support team or check the documentation.

Happy writing! 🚀`,
      },
      {
        title: "The Rise of AI-Powered Development Tools",
        content: `# AI is Reshaping How We Code

Artificial intelligence has moved from experimental to essential in the developer toolkit. Here's how AI is transforming software development in 2026.

## AI Coding Assistants

GitHub Copilot, Cursor, and Amazon CodeWhisperer have evolved beyond simple autocomplete. They now:

- **Refactor entire codebases** with contextual understanding
- **Write tests** automatically based on function behavior
- **Generate documentation** that stays synchronized with code
- **Identify security vulnerabilities** before deployment

\`\`\`javascript
// Example: AI suggests optimization
// Before
const filteredData = data.filter(item => item.active).map(item => item.value);

// AI suggests:
const filteredData = data.reduce((acc, item) => {
  if (item.active) acc.push(item.value);
  return acc;
}, []);
// Single pass through array - 40% faster for large datasets
\`\`\`

## Prompt Engineering as a Core Skill

Writing effective prompts for AI tools is now a standard engineering competency.

### Best Practices

1. **Be specific**: "Create a React hook for localStorage with TypeScript types"
2. **Provide context**: "Using Next.js 15 App Router and Tailwind"
3. **Iterate**: Refine based on initial outputs
4. **Verify**: Always review AI-generated code for edge cases

## The Human-AI Partnership

The most productive developers aren't those who rely entirely on AI, but those who:

- **Use AI for boilerplate** while focusing on architecture
- **Validate AI suggestions** against system constraints
- **Maintain critical thinking** about performance and scalability

## Future Trajectory

By 2027, we'll see AI handling entire feature implementations from natural language specifications. The developer's role shifts from writing code to **defining problems and reviewing solutions**.

## Getting Started Today

1. Install Copilot or Cursor in your editor
2. Try AI-powered PR reviews (Graphite, CodeRabbit)
3. Experiment with Vercel's v0 for UI generation
4. Join AI engineering communities

The future isn't AI replacing developers—it's developers who use AI replacing those who don't.`,
      },
      {
        title: "Mastering Next.js 15 and the App Router",
        content: `# Next.js 15: The Full-Stack Framework

Next.js 15 has matured into the undisputed leader for React applications. This guide covers the essential patterns you need to know.

## App Router Deep Dive

The App Router isn't new anymore, but many teams still underutilize its capabilities.

### Server Components by Default

\`\`\`typescript
// app/products/page.tsx
// This is a Server Component - no "use client" needed!
import { db } from '@/lib/db';

export default async function ProductsPage() {
  const products = await db.product.findMany();
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
\`\`\`

### Advanced Caching Strategies

| Strategy | Use Case | Implementation |
|---------|---------|----------------|
| Static (SSG) | Marketing pages, blogs | \`generateStaticParams\` |
| Dynamic (SSR) | User dashboards | \`dynamic = 'force-dynamic'\` |
| ISR | Product catalogs, docs | \`revalidate = 3600\` |
| Partial Prerendering | Mixed content | \`<Suspense>\` boundaries |

## Server Actions Reimagined

Server Actions have eliminated the need for separate API routes in many cases:

\`\`\`typescript
// app/actions.ts
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');
  
  // Validate, mutate DB, revalidate cache
  await db.post.create({ title, content });
  revalidatePath('/posts');
}
\`\`\`

## Performance Optimization

### Partial Prerendering (PPR)
PPR combines static and dynamic rendering in the same page, streaming dynamic content after static shell.

### Optimized Asset Loading
Next.js 15 automatically:
- Converts images to AVIF/WebP
- Preloads critical fonts
- Optimizes third-party scripts

## Deployment Strategies

### Vercel (Recommended)
- Automatic preview deployments
- Edge config for feature flags
- Analytics included

### Self-hosted
- Docker support improved
- Node.js 20+ required
- Configure custom caching headers

## Migration Path from Pages Router

1. Start with \`app/\` alongside \`pages/\`
2. Move shared components incrementally
3. Convert layouts first, pages later
4. Use \`useRouter\` compatibility layer
5. Deploy and validate each step

## The Verdict

Next.js 15 isn't just a React framework—it's a **full-stack platform** that rivals traditional backend frameworks. Teams adopting it report 40% faster feature development and significantly better performance metrics.`,
      },
      {
        title: "State Management in 2026: Beyond Redux",
        content: `# The State Management Landscape Has Changed

Remember when Redux was the default answer for every state question? Those days are over. Here's what experienced teams are using today.

## Tier 1: Application State

### Zustand
The simplicity winner. Used by 60% of new projects.

\`\`\`javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      user: null,
      notifications: [],
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      addNotification: (msg) => 
        set((state) => ({ 
          notifications: [...state.notifications, msg] 
        })),
    }),
    { name: 'app-storage' }
  )
);
\`\`\`

### Redux Toolkit
Still relevant for massive enterprise apps with complex state logic and teams already trained on Redux patterns.

## Tier 2: Server State

Server state is fundamentally different from client state. Don't manage it like client state.

### TanStack Query (React Query)

\`\`\`javascript
function UserProfile({ userId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
  
  // Mutations with optimistic updates
  const mutation = useMutation({
    mutationFn: updateUser,
    onMutate: async (newData) => {
      await queryClient.cancelQueries(['user', userId]);
      const previous = queryClient.getQueryData(['user', userId]);
      queryClient.setQueryData(['user', userId'], newData);
      return { previous };
    },
  });
}
\`\`\`

## Tier 3: URL State

The most underrated state management tool: the URL.

- **Search params**: Filtering, sorting, pagination
- **Route params**: Which resource is active
- **Hash**: UI state, active tab

\`\`\`javascript
// Next.js 15 hook for URL state
import { useQueryState } from 'nuqs';

function ProductFilters() {
  const [category, setCategory] = useQueryState('category');
  const [page, setPage] = useQueryState('page', { defaultValue: 1 });
  
  // URL updates automatically
  return (
    <select value={category} onChange={(e) => setCategory(e.target.value)}>
      <option value="electronics">Electronics</option>
    </select>
  );
}
\`\`\`

## Tier 4: Form State

### React Hook Form + Zod

\`\`\`javascript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  
  return (
    <form onSubmit={handleSubmit(submit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
\`\`\`

## The Decision Framework

| State Type | Tool | Why |
|------------|------|-----|
| Local UI | useState/useReducer | Built-in, no deps |
| Client global | Zustand | Simple, performant |
| Server data | TanStack Query | Caching, background sync |
| URL | nuqs | Shareable, bookmarkable |
| Forms | React Hook Form | Performance, validation |

## What About Context?

Context is not a state management tool—it's a **dependency injection** mechanism. Use it for themes, i18n, and user preferences. Not for data that changes frequently.

## The Bottom Line

Stop reaching for Redux by default. Match your tool to the problem, not the other way around.`,
      },
      {
        title: "TypeScript: From Good to Great",
        content: `# TypeScript Excellence

You know TypeScript basics. Now learn the advanced patterns that separate senior from junior developers.

## Discriminated Unions

\`\`\`typescript
type ApiResponse<T> = 
  | { status: 'loading' }
  | { status: 'success'; data: T; timestamp: Date }
  | { status: 'error'; error: Error; code: number };

function handleResponse<T>(response: ApiResponse<T>) {
  // TypeScript knows exactly which properties exist
  switch (response.status) {
    case 'loading':
      return <Spinner />;
    case 'success':
      return <Data data={response.data} />; // ✅ timestamp available
    case 'error':
      return <Error message={response.error.message} />; // ✅ code available
  }
}
\`\`\`

## Template Literal Types

\`\`\`typescript
type CSSUnit = 'px' | 'em' | 'rem' | '%';
type CSSValue = \`\${number}\${CSSUnit}\`;

const width: CSSValue = '100px'; // ✅ Valid
const height: CSSValue = '50%'; // ✅ Valid
const invalid: CSSValue = '100'; // ❌ Error

// Event handler patterns
type EventName = \`on\${Capitalize<string>}\`;
// Results in: 'onClick' | 'onSubmit' | 'onChange' | ...
\`\`\`

## Generic Constraints

\`\`\`typescript
// Ensure objects have required structure
function createModel<T extends { id: string | number }>(
  data: T[]
): Map<T['id'], T> {
  return new Map(data.map(item => [item.id, item]));
}

// Works
createModel([{ id: 1, name: 'Product' }]);
// Fails - missing id
createModel([{ name: 'Product' }]);

// Type-safe event emitters
class TypedEmitter<T extends Record<string, any[]>> {
  on<K extends keyof T>(event: K, handler: (...args: T[K]) => void) {}
  emit<K extends keyof T>(event: K, ...args: T[K]) {}
}

type AppEvents = {
  login: [userId: string, timestamp: Date];
  error: [message: string, code: number];
  update: [];
};

const emitter = new TypedEmitter<AppEvents>();
emitter.on('login', (userId, timestamp) => {}); // ✅ Fully typed
\`\`\`

## Utility Types Mastery

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Create variants without redefining
type PublicUser = Omit<User, 'password'>;
type UserPreview = Pick<User, 'id' | 'name'>;
type PartialUpdate = Partial<User>;
type ImmutableUser = Readonly<User>;

// Advanced transformations
type UserWithoutDates = Omit<User, 'createdAt' | 'updatedAt'>;
type Nullable<T> = { [P in keyof T]: T[P] | null };
type UserOrNull = Nullable<User>;
\`\`\`

## Branded Types for Type Safety

\`\`\`typescript
// Prevent mixing different IDs
type UserId = string & { readonly brand: unique symbol };
type ProductId = string & { readonly brand: unique symbol };

function createUserId(id: string): UserId {
  return id as UserId;
}

function getUser(id: UserId) {
  // ...
}

const userId = createUserId('123');
const productId = '456' as ProductId;

getUser(userId); // ✅ Works
getUser(productId); // ❌ Type error
\`\`\`

## Type Predicates and Guards

\`\`\`typescript
function isError(error: unknown): error is Error {
  return error instanceof Error && 'message' in error;
}

function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

try {
  // ...
} catch (error) {
  if (isError(error)) {
    console.log(error.message); // ✅ TypeScript knows this is Error
  }
}
\`\`\`

## Configuration Excellence

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true,
    "verbatimModuleSyntax": true
  }
}
\`\`\`

## The Payoff

Teams that leverage these patterns report:
- 60% fewer runtime type errors
- 45% faster refactoring
- Better onboarding experience
- Self-documenting code

TypeScript isn't just about catching errors—it's about **expressing intent** in a way both humans and machines understand.`,
      },
      {
        title: "Web Accessibility: Beyond Compliance",
        content: `# Building for Everyone

Accessibility isn't a checklist—it's a mindset. Here's how to build applications that truly work for all users.

## The Business Case

- **$25 billion**: Annual spending power of US adults with disabilities
- **4x**: More likely to be loyal customers when accessibility needs are met
- **35%**: Of users have used accessibility features
- **Legal risk**: WCAG 2.1 AA is now legal standard in many jurisdictions

## Semantic HTML First

\`\`\`html
<!-- Don't -->
<div class="button" onclick="submit()">Submit</div>
<div class="heading">Welcome</div>

<!-- Do -->
<button type="submit">Submit</button>
<h1>Welcome</h1>
\`\`\`

### Why It Matters
- Built-in keyboard navigation
- Screen reader announcements
- No ARIA required for basic functionality
- Better SEO

## Keyboard Navigation

### Focus Indicators

\`\`\`css
/* Never do this */
*:focus {
  outline: none;
}

/* Do this */
:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
}

/* Custom focus styles that maintain visibility */
.custom-button:focus-visible {
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.5);
}
\`\`\`

### Focus Management

\`\`\`javascript
// When opening modal
function openModal() {
  dialog.show();
  focusTrap.activate(); // Keep focus inside modal
  previousFocus = document.activeElement;
}

// When closing modal
function closeModal() {
  dialog.hide();
  focusTrap.deactivate();
  previousFocus?.focus(); // Return focus
}
\`\`\`

## ARIA: The Golden Rule

**Don't use ARIA if you can use semantic HTML.**

When you must use ARIA:

\`\`\`html
<!-- Tabs pattern -->
<div role="tablist">
  <button 
    id="tab1" 
    role="tab" 
    aria-selected="true"
    aria-controls="panel1"
  >
    Details
  </button>
</div>

<div 
  id="panel1" 
  role="tabpanel" 
  aria-labelledby="tab1"
>
  Content here
</div>
\`\`\`

## Color and Contrast

### Minimum Ratios
- **4.5:1**: Normal text
- **3:1**: Large text (18pt+ or 14pt bold)
- **3:1**: UI components and graphics

### Don't Rely on Color Alone

\`\`\`css
/* Bad */
.error {
  color: red;
}

/* Good */
.error {
  color: red;
  background: #ffeeee;
  border-left: 4px solid red;
  padding-left: 12px;
}

/* With icon for extra clarity */
.error::before {
  content: "⚠️";
  margin-right: 8px;
}
\`\`\`

## Screen Reader Only Content

\`\`\`css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Usage */
<button>
  <span class="sr-only">Close</span>
  <svg aria-hidden="true"><!-- X icon --></svg>
</button>
\`\`\`

## Forms and Validation

\`\`\`html
<label for="email">Email</label>
<input 
  id="email"
  type="email"
  aria-describedby="email-hint email-error"
  aria-invalid="false"
/>
<div id="email-hint">We'll never share your email</div>
<div id="email-error" role="alert"></div>
\`\`\`

## Testing Strategy

### Automated Tools
- **axe-core**: Integration tests
- **Lighthouse**: CI pipeline
- **eslint-plugin-jsx-a11y**: In-editor

### Manual Testing
1. **Keyboard only**: Tab through entire app
2. **Screen reader**: NVDA (Windows), VoiceOver (Mac)
3. **Zoom**: 200% without horizontal scroll
4. **Reduced motion**: Check animations

\`\`\`css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\`

## The Accessibility Statement

Every serious application needs one:
1. Your commitment to accessibility
2. Current compliance level (WCAG 2.1 AA)
3. Known limitations
4. Contact information for issues
5. Date of last review

## Cultural Shift

Accessibility isn't a feature—it's a **quality attribute** like performance or security. It must be considered from day one, not bolted on at the end.

Start small, but start now.`,
      },
      {
        title: "Design Systems That Scale",
        content: `# Building Design Systems for Enterprise

Design systems are critical infrastructure, not just style guides. Here's how to build one that actually works.

## Component Architecture

### The Atomic Design Approach

\`\`\`typescript
// Atoms - Basic building blocks
export const Button: React.FC<ButtonProps> = ({ variant, size, children }) => {
  return <button className={clsx(styles.base, styles[variant], styles[size])}>
    {children}
  </button>;
};

// Molecules - Composite components
export const SearchBar: React.FC = () => {
  return (
    <div className={styles.searchBar}>
      <Input placeholder="Search..." />
      <Button variant="primary">Go</Button>
    </div>
  );
};

// Organisms - Complex sections
export const NavigationBar: React.FC = () => {
  return (
    <header className={styles.navbar}>
      <Logo />
      <SearchBar />
      <UserMenu />
    </header>
  );
};
\`\`\`

## Design Tokens

Centralize all design decisions:

\`\`\`typescript
// tokens.ts
export const tokens = {
  color: {
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a',
    },
    neutral: {
      100: '#f3f4f6',
      900: '#111827',
    }
  },
  spacing: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
    },
    fontSize: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
    }
  }
} as const;

// Type-safe usage
type ColorToken = keyof typeof tokens.color.primary;
\`\`\`

## Component API Design

### Props That Scale

\`\`\`typescript
interface ButtonProps {
  // Variant - explicit over boolean flags
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  
  // Size - limited options prevent fragmentation
  size: 'sm' | 'md' | 'lg';
  
  // Composition over configuration
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  
  // Flexible content
  children: React.ReactNode;
  
  // HTML attributes passthrough
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
\`\`\`

### Compound Components Pattern

\`\`\`typescript
// Flexible, context-aware components
const Select = ({ children }) => {
  const [selected, setSelected] = useState('');
  
  return (
    <SelectContext.Provider value={{ selected, setSelected }}>
      <div className={styles.select}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

Select.Option = ({ value, children }) => {
  const { selected, setSelected } = useContext(SelectContext);
  
  return (
    <div 
      className={clsx(styles.option, selected === value && styles.selected)}
      onClick={() => setSelected(value)}
    >
      {children}
    </div>
  );
};

// Usage
<Select>
  <Select.Option value="react">React</Select.Option>
  <Select.Option value="vue">Vue</Select.Option>
  <Select.Option value="svelte">Svelte</Select.Option>
</Select>
\`\`\`

## Documentation

### Storybook as Standard

\`\`\`typescript
// Button.stories.tsx
export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
    },
    onClick: { action: 'clicked' }
  }
} as Meta;

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Click me',
  }
};

export const WithIcons = {
  args: {
    leftIcon: <MailIcon />,
    children: 'Send email',
  }
};
\`\`\`

### Living Documentation

- **Usage guidelines**: When to use each component
- **Accessibility notes**: ARIA labels, keyboard behavior
- **Code examples**: Copy-paste ready
- **Design specs**: Figma/Zeplin links
- **Changelog**: Version history

## Versioning Strategy

\`\`\`json
{
  "name": "@company/design-system",
  "version": "2.1.0",
  // Semantic versioning
  // Major: Breaking changes
  // Minor: New features, backward compatible
  // Patch: Bug fixes
}
\`\`\`

### Migration Paths
- Codemods for automatic upgrades
- Deprecation warnings in console
- Backward compatibility layer
- Detailed migration guides

## Governance

### Contribution Process
1. **RFC**: Propose new component
2. **Design review**: Figma prototype
3. **Engineering review**: API design
4. **Accessibility audit**: WCAG compliance
5. **Documentation**: Usage examples
6. **Release**: Semver bump

### Ownership Model
- **Core team**: Infrastructure, tokens, base components
- **Chapter leads**: Domain-specific components
- **Community**: Bug fixes, documentation

## Adoption Strategy

### Phased Rollout
1. **Pilot**: 1-2 teams, 3 months
2. **Refine**: Based on feedback
3. **Scale**: Adoption incentives
4. **Enforce**: Linting rules

### Metrics
- **Adoption rate**: % of components from DS
- **Time to ship**: New features velocity
- **Consistency score**: Design audit results
- **Developer satisfaction**: NPS surveys

## Common Pitfalls

❌ **Too rigid**: Every pixel controlled
✅ **Flexible escape hatches**: \`className\` override

❌ **Documentation after code**
✅ **Documentation as code**

❌ **Design only**
✅ **Engineering + Design + PM collaboration**

## The ROI

Companies with mature design systems report:
- **47% faster** feature development
- **60% fewer** UI inconsistencies
- **3x faster** onboarding
- **31% reduced** design debt

Your design system is a product—treat it like one.`,
      },
      {
        title: "Modern CSS: Beyond the Basics",
        content: `# CSS Has Evolved

The CSS you learned 5 years ago is obsolete. Modern CSS is powerful, expressive, and solves problems that once required JavaScript.

## Container Queries

The layout revolution we've been waiting for:

\`\`\`css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (max-width: 400px) {
  .card-content {
    flex-direction: column;
  }
  
  .card-image {
    width: 100%;
  }
}

/* Container query units */
.card {
  padding: clamp(1rem, 5cqi, 3rem);
  font-size: clamp(1rem, 3cqi, 1.5rem);
}
\`\`\`

## :has() - The Parent Selector

Finally, select elements based on their children:

\`\`\`css
/* Cards with images get special styling */
.card:has(img) {
  display: grid;
  grid-template-columns: 200px 1fr;
}

/* Form validation states */
form:has(input:invalid) {
  border-color: red;
}

/* Navigation with submenu */
li:has(> ul) {
  position: relative;
  padding-right: 20px;
}

li:has(> ul)::after {
  content: "▼";
  font-size: 12px;
}
\`\`\`

## CSS Nesting

Native nesting without preprocessors:

\`\`\`css
.card {
  padding: 1rem;
  
  &:hover {
    background: #f5f5f5;
  }
  
  & > h2 {
    margin-top: 0;
  }
  
  & .title {
    font-weight: bold;
    
    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }
}
\`\`\`

## Cascade Layers

Take control of specificity wars:

\`\`\`css
@layer reset, base, components, utilities;

@layer reset {
  /* CSS reset */
  * {
    margin: 0;
    padding: 0;
  }
}

@layer base {
  /* Typography, colors */
  body {
    font-family: system-ui;
  }
}

@layer components {
  /* Component styles */
  .button {
    padding: 0.5rem 1rem;
  }
}

@layer utilities {
  /* Overrides everything */
  .hidden {
    display: none;
  }
}
\`\`\`

## Modern Layout Techniques

### Subgrid

\`\`\`css
.grid-parent {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

.grid-child {
  display: grid;
  grid-column: span 6;
  grid-template-columns: subgrid;
  /* Inherits parent columns */
}
\`\`\`

### Masonry with Grid

\`\`\`css
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: masonry;
  gap: 1rem;
}
\`\`\`

## Typography Control

\`\`\`css
/* Fluid typography */
h1 {
  font-size: clamp(2rem, 5vw + 1rem, 4rem);
  line-height: 1.1;
}

/* Variable fonts for performance */
@font-face {
  font-family: 'Inter';
  src: url('Inter.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-stretch: 75% 125%;
}

.text {
  font-variation-settings: 'wght' 450, 'wdth' 100;
}
\`\`\`

## Custom Properties Power

\`\`\`css
:root {
  --space: 1rem;
  --space-sm: calc(var(--space) * 0.5);
  --space-lg: calc(var(--space) * 2);
  
  --color-primary: #3b82f6;
  --color-primary-dim: color-mix(in srgb, var(--color-primary), black 10%);
}

/* Dynamic theming */
.theme-dark {
  --bg: #111;
  --text: #fff;
  --accent: #60a5fa;
}

.theme-light {
  --bg: #fff;
  --text: #111;
  --accent: #2563eb;
}

/* Toggle with one line */
body {
  background: var(--bg);
  color: var(--text);
}
\`\`\`

## Scroll Behavior

\`\`\`css
/* Smooth scroll with offsets */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* Fixed header offset */
}

/* Scroll snap */
.carousel {
  display: grid;
  grid-auto-flow: column;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.carousel-item {
  scroll-snap-align: start;
  scroll-margin: 20px;
}
\`\`\`

## Animation Without JavaScript

\`\`\`css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.card {
  view-timeline: --card;
  animation: fade-in 0.5s;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
\`\`\`

## Browser Support Strategy

Modern CSS is well-supported in evergreen browsers:

| Feature | Support | Fallback |
|---------|---------|----------|
| Container Queries | 84% | Media queries |
| :has() | 91% | Class toggles |
| Subgrid | 88% | Nested grids |
| Cascade Layers | 85% | !important (carefully) |

\`\`\`css
@supports (container-type: inline-size) {
  /* Modern CSS */
}

@supports not (container-type: inline-size) {
  /* Fallback */
}
\`\`\`

## The Mental Shift

Modern CSS isn't about hacks and workarounds anymore. It's a **first-class language** for describing user interfaces.

Learn it properly, and you'll write less code, solve more problems, and build better experiences.`,
      },
      {
        title: "Web Performance in 2026",
        content: `# Performance Is User Experience

In 2026, performance isn't optional—it's a core feature. Users expect instant experiences, and they leave when they don't get them.

## Core Web Vitals Evolution

Google's metrics have evolved beyond the original three:

| Metric | What It Measures | Good Threshold |
|--------|-----------------|----------------|
| LCP | Loading speed | < 2.0s |
| INP | Interactivity | < 200ms |
| CLS | Visual stability | < 0.05 |
| TTFB | Server response | < 300ms |
| FID (legacy) | First input | < 50ms |

## The Performance Budget

Start with numbers:

\`\`\`json
{
  "budgets": [
    {
      "path": "/*",
      "resourceCount": { "max": 25 },
      "resourceSizes": [
        { "resourceType": "total", "max": 500000 },
        { "resourceType": "script", "max": 250000 },
        { "resourceType": "image", "max": 150000 },
        { "resourceType": "font", "max": 50000 }
      ],
      "timings": [
        { "metric": "interactive", "max": 3500 },
        { "metric": "firstContentfulPaint", "max": 1500 }
      ]
    }
  ]
}
\`\`\`

## JavaScript Optimization

### The Cost of JavaScript

\`\`\`javascript
// Expensive: 50KB parsed and executed
import { heavyLibrary } from 'heavy-library';

// Cheap: 2KB parsed, 0KB executed until needed
const heavyLibrary = () => import('heavy-library');
\`\`\`

### Bundle Analysis

\`\`\`bash
# Analyze your bundles
npx next build --debug
npx source-map-explorer .next/static/chunks/*.js

# Common culprits
- Moment.js (use date-fns or Luxon)
- Lodash (use lodash-es or individual imports)
- Large UI libraries (consider preact or solid)
\`\`\`

### Code Splitting Strategy

\`\`\`javascript
// Route-based splitting (automatic in Next.js)
// Component-level splitting
const Editor = dynamic(() => import('@/components/Editor'), {
  loading: () => <Skeleton />,
  ssr: false // If not needed on server
});

// Library splitting
const Chart = dynamic(() => import('recharts').then(mod => mod.LineChart));
\`\`\`

## Image Optimization

### Modern Formats

\`\`\`jsx
<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  alt="Hero"
  // Next.js automatically:
  // - Generates WebP/AVIF
  // - Responsive sizes
  // - Lazy loads
  // - Prevents CLS
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={false}
/>
\`\`\`

### Manual Optimization

- **AVIF**: 50% smaller than WebP
- **WebP**: 30% smaller than JPEG
- **Responsive images**: \`srcset\` attribute
- **Lazy loading**: \`loading="lazy"\`

## Font Loading Strategy

\`\`\`css
/* Preload critical font */
<link 
  rel="preload" 
  href="/fonts/inter.woff2" 
  as="font" 
  type="font/woff2" 
  crossorigin
/>

/* Font display strategy */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap; /* FOIT -> FOUT */
  font-weight: 100 900;
}
\`\`\`

## Rendering Strategy

### Choose the Right Approach

| Type | Use Case | Performance Impact |
|------|----------|-------------------|
| Static | Marketing, blog | ⚡ Instant |
| ISR | Product catalog | 🚀 Fast with updates |
| Dynamic | User dashboard | ⚠️ Wait for data |
| Streaming | Content-heavy | ⚡ Progressive |
| Edge | Global audience | 🚀 Low latency |

### Partial Prerendering

\`\`\`jsx
// app/product/[id]/page.tsx
export default function Page({ params }) {
  return (
    <div>
      {/* Static shell - instant */}
      <Header />
      <Nav />
      
      {/* Dynamic content - streamed */}
      <Suspense fallback={<ProductSkeleton />}>
        <ProductDetails id={params.id} />
      </Suspense>
      
      {/* Static footer */}
      <Footer />
    </div>
  );
}
\`\`\`

## Network Optimization

### HTTP/3 and QUIC

- **Enabled by default** in modern browsers
- **0-RTT** connection establishment
- **Better multiplexing** without head-of-line blocking

### CDN Strategy

\`\`\`javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
\`\`\`

## Performance Monitoring

### Real User Monitoring (RUM)

\`\`\`javascript
// web-vitals library
import { onCLS, onINP, onLCP } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  navigator.sendBeacon('/analytics', body);
}

onCLS(sendToAnalytics);
onINP(sendToAnalytics);
onLCP(sendToAnalytics);
\`\`\`

### Key Metrics to Track

1. **75th percentile** for Core Web Vitals
2. **Error rates** by browser/device
3. **Long tasks** (>50ms blocking main thread)
4. **Third-party script impact**
5. **Cache hit ratios**

## The Performance Culture

### Development Workflow

1. **Design phase**: Performance budgets
2. **Development**: Lighthouse CI fails builds
3. **Code review**: Bundle size diffs
4. **QA**: Performance regression tests
5. **Production**: Real-user monitoring

### Team Accountability

- **Frontend**: Bundle size, render performance
- **Backend**: API latency, database queries
- **DevOps**: CDN config, compression
- **Product**: Feature impact on metrics

## The Bottom Line

Performance is a feature. Companies that invest in it see:

- **32% lower** bounce rate
- **28% higher** conversion
- **53% better** user satisfaction

Every millisecond counts.`,
      },
      {
        title: "Building Robust API Integrations",
        content: `# Modern API Patterns

APIs are the backbone of modern applications. Here's how to integrate them reliably at scale.

## Data Fetching Architecture

### The Three-Layer Pattern

\`\`\`typescript
// 1. API Layer - Raw HTTP calls
class ApiClient {
  private client: AxiosInstance;
  
  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 10000,
    });
    
    this.client.interceptors.request.use(this.authInterceptor);
    this.client.interceptors.response.use(
      response => response,
      this.errorInterceptor
    );
  }
  
  async get<T>(path: string): Promise<T> {
    const { data } = await this.client.get(path);
    return data;
  }
  
  async post<T, D = any>(path: string, data: D): Promise<T> {
    const { data: response } = await this.client.post(path, data);
    return response;
  }
}

// 2. Repository Layer - Domain-specific methods
class ProductRepository {
  constructor(private api: ApiClient) {}
  
  async getProducts(filters: ProductFilters): Promise<Product[]> {
    const params = new URLSearchParams(filters);
    return this.api.get(\`/products?\${params}\`);
  }
  
  async getProduct(id: string): Promise<Product> {
    return this.api.get(\`/products/\${id}\`);
  }
}

// 3. Service Layer - Business logic
class ProductService {
  constructor(private repo: ProductRepository) {}
  
  async getDiscountedProducts(): Promise<Product[]> {
    const products = await this.repo.getProducts({ active: true });
    return products
      .filter(p => p.inventory > 0)
      .map(p => ({
        ...p,
        price: p.salePrice || p.price
      }));
  }
}
\`\`\`

## State Management for Server Data

### React Query Mastery

\`\`\`typescript
// Query keys as hierarchical identifiers
export const queryKeys = {
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (filters: ProductFilters) => 
      [...queryKeys.products.lists(), filters] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: string) => 
      [...queryKeys.products.details(), id] as const,
  }
};

// Custom hooks
export const useProducts = (filters: ProductFilters) => {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () => productService.getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productService.updateProduct,
    onSuccess: (updatedProduct) => {
      // Update cache optimistically
      queryClient.setQueryData(
        queryKeys.products.detail(updatedProduct.id),
        updatedProduct
      );
      
      // Invalidate lists
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.lists()
      });
    },
  });
};
\`\`\`

## Error Handling Strategy

### Graceful Degradation

\`\`\`typescript
class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
  
  isNotFound(): boolean {
    return this.status === 404;
  }
  
  isUnauthorized(): boolean {
    return this.status === 401;
  }
  
  isRateLimited(): boolean {
    return this.status === 429;
  }
}

// Error boundary for API failures
function ApiErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => {
        if (error instanceof ApiError) {
          if (error.isNotFound()) {
            return <NotFound />;
          }
          if (error.isUnauthorized()) {
            return <LoginRequired />;
          }
        }
        return <GenericError onRetry={resetErrorBoundary} />;
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
\`\`\`

## Request Optimization

### Debouncing and Throttling

\`\`\`typescript
import { useDebounce } from 'use-debounce';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm] = useDebounce(searchTerm, 500);
  
  const { data } = useQuery({
    queryKey: ['search', debouncedTerm],
    queryFn: () => searchAPI(debouncedTerm),
    enabled: debouncedTerm.length > 2,
  });
  
  return <input onChange={(e) => setSearchTerm(e.target.value)} />;
}
\`\`\`

### Request Deduplication

\`\`\`typescript
// React Query dedupes automatically
// But for raw implementations:

const pendingRequests = new Map();

async function dedupedFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key);
  }
  
  const promise = fetcher().finally(() => {
    pendingRequests.delete(key);
  });
  
  pendingRequests.set(key, promise);
  return promise;
}
\`\`\`

## Real-time Updates

### WebSocket Strategy

\`\`\`typescript
class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private subscribers = new Map<string, Set<(data: any) => void>>();
  
  connect() {
    this.ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!);
    
    this.ws.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);
      this.subscribers.get(type)?.forEach(cb => cb(payload));
    };
    
    this.ws.onclose = () => {
      this.reconnect();
    };
  }
  
  subscribe(event: string, callback: (data: any) => void) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, new Set());
    }
    this.subscribers.get(event)!.add(callback);
    
    return () => {
      this.subscribers.get(event)?.delete(callback);
    };
  }
}
\`\`\`

## API Versioning Strategy

### Never Break Clients

\`\`\`typescript
// API Client with version support
class VersionedApiClient {
  private versions = new Map<string, ApiClient>();
  
  getClient(version = 'v1'): ApiClient {
    if (!this.versions.has(version)) {
      this.versions.set(
        version,
        new ApiClient({
          baseURL: \`\${API_URL}/\${version}\`,
        })
      );
    }
    return this.versions.get(version)!;
  }
  
  // Progressive enhancement
  async getProduct(id: string) {
    try {
      // Try v2 first (better data structure)
      const v2Client = this.getClient('v2');
      return await v2Client.get(\`/products/\${id}\`);
    } catch {
      // Fall back to v1
      const v1Client = this.getClient('v1');
      const data = await v1Client.get(\`/items/\${id}\`);
      return this.transformV1ToV2(data);
    }
  }
}
\`\`\`

## Performance Monitoring

\`\`\`typescript
// Track API performance
class AnalyticsApiInterceptor {
  onRequest(config: AxiosRequestConfig) {
    config.metadata = { startTime: performance.now() };
    return config;
  }
  
  onResponse(response: AxiosResponse) {
    const { config } = response;
    const duration = performance.now() - config.metadata.startTime;
    
    analytics.track('api_request', {
      method: config.method,
      url: config.url,
      duration,
      status: response.status,
    });
    
    return response;
  }
}
\`\`\`

## The Golden Rules

1. **Never trust the client** - Validate everything
2. **Assume failure** - Networks are unreliable
3. **Cache everything** - But know when to invalidate
4. **Monitor everything** - You can't improve what you don't measure
5. **Design for evolution** - Your API will change

Robust API integration separates professional applications from prototypes.`,
      },
      {
        title: "Authentication and Authorization in Modern Apps",
        content: `# Security From Day One

Authentication is the frontline of application security. Here's how to implement it correctly in 2026.

## The Authentication Stack

### Modern Approach

\`\`\`typescript
// Next.js 15 with NextAuth.js (Auth.js)
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Validate with database
        const user = await db.user.findUnique({
          where: { email: credentials.email }
        });
        
        const isValid = await bcrypt.compare(
          credentials.password, 
          user.password
        );
        
        if (!isValid) return null;
        
        return { id: user.id, email: user.email };
      }
    })
  ],
  session: {
    strategy: 'database', // or 'jwt'
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, user }) {
      // Attach additional user data
      session.user.id = user.id;
      session.user.role = user.role;
      return session;
    }
  }
});
\`\`\`

## Token Management

### Secure Storage

\`\`\`typescript
// ❌ Never do this
localStorage.setItem('token', jwtToken);

// ✅ Do this
// Use httpOnly cookies (automatic with NextAuth)
// Or in-memory storage with refresh rotation

class TokenManager {
  private accessToken: string | null = null;
  private refreshPromise: Promise<string> | null = null;
  
  async getToken(): Promise<string> {
    if (this.accessToken) {
      return this.accessToken;
    }
    
    if (this.refreshPromise) {
      return this.refreshPromise;
    }
    
    this.refreshPromise = this.refreshAccessToken();
    this.accessToken = await this.refreshPromise;
    this.refreshPromise = null;
    
    return this.accessToken;
  }
  
  private async refreshAccessToken(): Promise<string> {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include', // Send httpOnly cookie
    });
    
    const { token } = await response.json();
    return token;
  }
}
\`\`\`

## Route Protection

### Server-Side Protection

\`\`\`typescript
// Next.js App Router
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

// Protected layout
export default async function DashboardLayout({ children }) {
  const session = await auth();
  
  if (!session) {
    redirect('/login');
  }
  
  if (session.user.role !== 'admin') {
    redirect('/unauthorized');
  }
  
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
}

// API route protection
export async function GET(request: Request) {
  const session = await auth();
  
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // Proceed with authorized request
}
\`\`\`

### Client-Side Protection

\`\`\`typescript
'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export function ProtectedComponent({ children }) {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <Spinner />;
  }
  
  if (!session) {
    redirect('/login');
  }
  
  return children;
}
\`\`\`

## Role-Based Access Control (RBAC)

\`\`\`typescript
// Permission definitions
export const permissions = {
  'user:read': ['admin', 'manager', 'user'],
  'user:write': ['admin', 'manager'],
  'user:delete': ['admin'],
  'post:create': ['admin', 'editor', 'user'],
  'post:publish': ['admin', 'editor'],
} as const;

type Role = 'admin' | 'manager' | 'editor' | 'user';
type Permission = keyof typeof permissions;

export function hasPermission(userRole: Role, permission: Permission): boolean {
  return permissions[permission].includes(userRole);
}

// Component-level protection
export const WithPermission = ({ 
  permission, 
  children 
}: { 
  permission: Permission; 
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();
  const userRole = session?.user?.role as Role;
  
  if (!hasPermission(userRole, permission)) {
    return null;
  }
  
  return children;
};

// Usage
<WithPermission permission="post:publish">
  <PublishButton />
</WithPermission>
\`\`\`

## OAuth Best Practices

### Provider Configuration

\`\`\`typescript
// GitHub OAuth app settings
- Homepage URL: https://yourapp.com
- Authorization callback URL: https://yourapp.com/api/auth/callback/github
- Enable Device Flow? No
- Expire user authorization tokens: Yes (for security)

// Google OAuth consent screen
- Publish status: In production
- Authorized domains: yourapp.com
- Scopes: email, profile (minimal)
\`\`\`

### Security Considerations

1. **State parameter**: CSRF protection (handled by NextAuth)
2. **PKCE**: Required for mobile/native apps
3. **Minimal scopes**: Only request what you need
4. **Validate email**: Ensure emails are verified

## Password Security

\`\`\`typescript
import { hash, compare } from 'bcryptjs';
import { z } from 'zod';

// Password validation
const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain uppercase letter')
  .regex(/[a-z]/, 'Must contain lowercase letter')
  .regex(/[0-9]/, 'Must contain number')
  .regex(/[^A-Za-z0-9]/, 'Must contain special character');

// Hashing (cost factor 12 = ~0.3s)
const hashedPassword = await hash(password, 12);

// Verification
const isValid = await compare(password, user.passwordHash);
\`\`\`

## Session Management

### Concurrent Sessions

\`\`\`typescript
// Track active sessions
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  user         User     @relation(fields: [userId], references: [id])
  expires      DateTime
  createdAt    DateTime @default(now())
  lastActive   DateTime @default(now())
  userAgent    String?
  ipAddress    String?
}

// Force logout on password change
async function changePassword(userId: string, newPassword: string) {
  await db.user.update({
    where: { id: userId },
    data: { passwordHash: await hash(newPassword, 12) }
  });
  
  // Revoke all sessions except current
  await db.session.deleteMany({
    where: { 
      userId,
      NOT: { id: currentSessionId }
    }
  });
}
\`\`\`

## Security Headers

\`\`\`typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.yourapp.com;"
          }
        ]
      }
    ];
  }
};
\`\`\`

## Audit Logging

\`\`\`typescript
// Log security events
async function logSecurityEvent({
  userId,
  event,
  ipAddress,
  userAgent,
  metadata
}) {
  await db.securityLog.create({
    data: {
      userId,
      event, // 'login', 'logout', 'password_change', etc.
      ipAddress,
      userAgent,
      metadata
    }
  });
}

// Detect anomalies
const failedAttempts = await db.securityLog.count({
  where: {
    userId,
    event: 'login_failed',
    timestamp: { gte: subMinutes(new Date(), 15) }
  }
});

if (failedAttempts > 5) {
  await lockAccount(userId);
  await notifyUser(userId);
}
\`\`\`

## The Security Mindset

1. **Defense in depth** - Multiple layers of security
2. **Least privilege** - Only access what's necessary
3. **Never trust user input** - Validate everything
4. **Assume breach** - Design for worst-case
5. **Keep dependencies updated** - Regular security audits

Authentication is complex. Use battle-tested libraries and follow best practices. Your users' security depends on it.`,
      },
      {
        title: "Testing Strategies for Production Apps",
        content: `# Testing Without the Pain

Testing shouldn't be a chore. Here's how to build a testing strategy that actually works.

## The Testing Trophy

Different types of tests serve different purposes:

\`\`\`
        🏆
    E2E Tests (5%)
      Few, critical paths
      
   Integration Tests (25%)
     Component interactions
     
    Unit Tests (70%)
       Fast, numerous
       
Static Analysis
  TypeScript, ESLint
\`\`\`

## Unit Testing Excellence

### React Component Testing

\`\`\`typescript
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from './ProductCard';

const mockProduct = {
  id: '1',
  name: 'Test Product',
  price: 99.99,
  inStock: true
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });
  
  it('calls onAddToCart when button is clicked', async () => {
    const onAddToCart = jest.fn();
    const user = userEvent.setup();
    
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={onAddToCart} 
      />
    );
    
    await user.click(screen.getByRole('button', { name: /add/i }));
    
    expect(onAddToCart).toHaveBeenCalledWith('1');
  });
  
  it('disables button when out of stock', () => {
    render(
      <ProductCard 
        product={{ ...mockProduct, inStock: false }} 
      />
    );
    
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
\`\`\`

### Custom Hook Testing

\`\`\`typescript
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(result.current.count).toBe(0);
  });
  
  it('increments counter', () => {
    const { result } = renderHook(() => useCounter(10));
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(11);
  });
  
  it('respects min/max constraints', () => {
    const { result } = renderHook(() => useCounter(0, { min: 0, max: 5 }));
    
    act(() => {
      result.current.decrement(); // Can't go below 0
    });
    
    expect(result.current.count).toBe(0);
  });
});
\`\`\`

## Integration Testing

### Testing API Integration

\`\`\`typescript
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';
import { renderWithProviders } from './test-utils';
import { ProductList } from './ProductList';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ProductList integration', () => {
  it('loads and displays products', async () => {
    renderWithProviders(<ProductList />);
    
    // Loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    // Loaded state
    await screen.findByText('Wireless Headphones');
    expect(screen.getByText('$199.99')).toBeInTheDocument();
  });
  
  it('handles API errors gracefully', async () => {
    server.use(
      rest.get('/api/products', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    
    renderWithProviders(<ProductList />);
    
    await screen.findByText(/failed to load/i);
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });
});
\`\`\`

## E2E Testing with Playwright

\`\`\`typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
\`\`\`

### Critical User Journeys

\`\`\`typescript
// e2e/checkout.spec.ts
import { test, expect } from '@playwright/test';

test('user can complete purchase', async ({ page }) => {
  // Navigate to product
  await page.goto('/products');
  await page.click('text=Wireless Headphones');
  
  // Add to cart
  await page.click('button:has-text("Add to Cart")');
  await expect(page.locator('.cart-count')).toHaveText('1');
  
  // Checkout
  await page.click('text=Checkout');
  
  // Fill shipping info
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="address"]', '123 Main St');
  await page.click('button:has-text("Continue")');
  
  // Payment
  await page.fill('[name="cardNumber"]', '4242424242424242');
  await page.fill('[name="expiry"]', '12/25');
  await page.fill('[name="cvc"]', '123');
  
  await page.click('button:has-text("Pay Now")');
  
  // Success
  await expect(page.locator('h1')).toHaveText('Order Confirmed');
});
\`\`\`

## Mocking Strategies

### Service Mocks

\`\`\`typescript
// mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/products', () => {
    return HttpResponse.json([
      { id: 1, name: 'Wireless Headphones', price: 199.99 },
      { id: 2, name: 'Mechanical Keyboard', price: 149.99 },
    ]);
  }),
  
  http.post('/api/checkout', async ({ request }) => {
    const body = await request.json();
    
    if (!body.paymentMethod) {
      return new HttpResponse(null, { status: 400 });
    }
    
    return HttpResponse.json({ 
      orderId: 'ord_123',
      status: 'confirmed' 
    });
  }),
];
\`\`\`

### Module Mocks

\`\`\`typescript
// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  usePathname() {
    return '/dashboard';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock date functions
jest.useFakeTimers();
jest.setSystemTime(new Date('2026-01-01'));
\`\`\`

## Test Data Management

### Factories

\`\`\`typescript
// factories/userFactory.ts
import { faker } from '@faker-js/faker';

export function createUser(overrides = {}) {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'user',
    createdAt: faker.date.past(),
    ...overrides
  };
}

export function createAdmin(overrides = {}) {
  return createUser({ role: 'admin', ...overrides });
}

// Usage
const user = createUser();
const admin = createAdmin({ email: 'admin@example.com' });
\`\`\`

## Performance Testing

\`\`\`typescript
import { lighthouse } from '@playwright-testing-library/test';

test('performance budget', async ({ page }) => {
  const report = await lighthouse(page, {
    thresholds: {
      performance: 90,
      accessibility: 90,
      'best-practices': 90,
      seo: 90,
      'first-contentful-paint': 2000,
      'largest-contentful-paint': 2500,
      'cumulative-layout-shift': 0.1,
      'total-blocking-time': 300,
    },
  });
  
  expect(report.scores).toBeGreaterThanOrEqual(0.9);
});
\`\`\`

## Testing Philosophy

### What to Test

✅ **Public API** - What users interact with
✅ **Critical paths** - Login, checkout, core features
✅ **Edge cases** - Empty states, errors, loading
✅ **Business logic** - Calculations, validations

❌ **Implementation details** - Internal state, private methods
❌ **Third-party code** - Assume they test their own code
❌ **Constants** - They don't change
❌ **Everything** - 100% coverage is misleading

### Continuous Testing

\`\`\`yaml
# GitHub Actions workflow
name: Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run test:unit
      - run: npm run test:integration
      - run: npm run test:e2e
      
      - uses: codecov/codecov-action@v4
\`\`\`

## The Bottom Line

Good tests:
- **Run fast** (< 1s per test)
- **Are deterministic** (same result every time)
- **Test behavior, not implementation**
- **Fail meaningfully** (clear error messages)
- **Require minimal maintenance**

Test code is product code. Treat it with the same respect.`,
      },
    ];

    const articlesData = articles.map((article, i) => ({
      title: article.title,
      slug: article.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      content: article.content,
      imageUrl: null,
      count: 100 + i,
      published: true,
      authorId: ids[i % ids.length],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await prisma.article.createMany({ data: articlesData });

    console.log(`✅ Inserted ${SEED_COUNT} article(s) into the database\n`);
  } catch (err) {
    console.error("💥 Seed failed:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

void main();
