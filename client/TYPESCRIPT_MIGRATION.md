# TypeScript Strict Mode Migration Guide

## Overview
Your project now has strict TypeScript mode enabled. This guide helps you fix common type errors.

## Common Type Errors & Solutions

### 1. **Possibly Undefined Values**

❌ **Before:**
```tsx
function Component({ user }) {
  return <div>{user.name}</div>; // Error: user might be undefined
}
```

✅ **After:**
```tsx
interface Props {
  user?: User;
}

function Component({ user }: Props) {
  return <div>{user?.name ?? 'Guest'}</div>;
  // or
  if (!user) return null;
  return <div>{user.name}</div>;
}
```

### 2. **Missing Type Annotations**

❌ **Before:**
```tsx
const handleClick = (event) => { // Error: parameter needs type
  console.log(event);
};
```

✅ **After:**
```tsx
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log(event);
};
```

### 3. **Implicit Any Types**

❌ **Before:**
```tsx
function processData(data) { // Error: implicit any
  return data.map(item => item.value);
}
```

✅ **After:**
```tsx
interface DataItem {
  value: string;
}

function processData(data: DataItem[]) {
  return data.map(item => item.value);
}
```

### 4. **Object Property Access**

❌ **Before:**
```tsx
const config = getConfig();
const value = config['someKey']; // Error: no index signature
```

✅ **After:**
```tsx
interface Config {
  [key: string]: any; // or be more specific
}

const config: Config = getConfig();
const value = config['someKey'];
```

### 5. **State Initialization**

❌ **Before:**
```tsx
const [user, setUser] = useState(null); // Error: null not assignable
```

✅ **After:**
```tsx
const [user, setUser] = useState<User | null>(null);

// Later when using:
if (user) {
  console.log(user.name); // Now safe
}
```

### 6. **Event Handlers**

❌ **Before:**
```tsx
const onChange = (e) => { // Error: needs type
  setValue(e.target.value);
};
```

✅ **After:**
```tsx
const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
```

### 7. **useRef with DOM Elements**

❌ **Before:**
```tsx
const ref = useRef(); // Error: needs type
```

✅ **After:**
```tsx
const ref = useRef<HTMLDivElement>(null);

// Usage
<div ref={ref}>Content</div>
```

### 8. **Optional Chaining for Arrays**

❌ **Before:**
```tsx
const first = items[0].name; // Error: items might be undefined
```

✅ **After:**
```tsx
const first = items?.[0]?.name;
// or
const first = items && items.length > 0 ? items[0].name : undefined;
```

### 9. **Function Return Types**

❌ **Before:**
```tsx
function getData() { // Consider adding explicit return type
  return fetch('/api/data').then(r => r.json());
}
```

✅ **After:**
```tsx
async function getData(): Promise<DataType> {
  const response = await fetch('/api/data');
  return response.json();
}
```

### 10. **Props with Children**

❌ **Before:**
```tsx
function Layout({ children }) { // Error: needs type
  return <div>{children}</div>;
}
```

✅ **After:**
```tsx
interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return <div>{children}</div>;
}
```

## Common React Type Patterns

### Component Props
```tsx
interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

function Button({ label, onClick, disabled = false, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}
```

### Form Events
```tsx
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // handle form
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
```

### Custom Hooks
```tsx
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState<number>(initialValue);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  
  return { count, increment, decrement };
}
```

### API Responses
```tsx
interface ApiResponse<T> {
  data: T;
  error?: string;
  success: boolean;
}

async function fetchUser(id: string): Promise<ApiResponse<User>> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

## Useful Type Utilities

```tsx
// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<User>;

// Pick specific properties
type UserName = Pick<User, 'name' | 'email'>;

// Omit specific properties
type UserWithoutId = Omit<User, 'id'>;

// Extract keys as type
type UserKeys = keyof User;

// Non-nullable type
type NonNullableUser = NonNullable<User | null>;
```

## Quick Fixes

### For Third-Party Libraries Without Types
```tsx
// Create a declaration file: types/library-name.d.ts
declare module 'library-name' {
  export function someFunction(arg: any): any;
}
```

### Temporarily Disable Strict Checking (Not Recommended)
```tsx
// For a specific line
// @ts-ignore
const value = someUntypedFunction();

// For a file
// @ts-nocheck
```

## Tools to Help

### Check all type errors
```bash
npm run type-check
```

### VS Code Settings
Add to `.vscode/settings.json`:
```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Resources
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

---

**Pro Tip:** Use VS Code's Quick Fix (Ctrl/Cmd + .) to get automatic suggestions for fixing type errors!
