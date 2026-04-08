# Frontend Development - Quick Reference Guide

## 🚀 Quick Start Commands

```bash
# Create project
npx create-next-app@latest emp-management --typescript --tailwind --eslint --app

# Install dependencies
npm install zustand @tanstack/react-query axios zod date-fns lucide-react
npm install react-hot-toast @hookform/react framer-motion
npm install @shadcn/ui @radix-ui/react-dialog @radix-ui/react-dropdown-menu

# Start development
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

---

## 📁 File Structure Quick Reference

```
app/
  ├── page.tsx              (Home)
  ├── login/page.tsx        (Login)
  ├── signup/page.tsx       (Signup)
  ├── dashboard/page.tsx    (Dashboard)
  ├── employees/
  │   ├── page.tsx          (List)
  │   ├── [id]/page.tsx     (Detail)
  │   └── new/page.tsx      (Create)
  ├── departments/page.tsx
  ├── attendance/page.tsx
  ├── leave/page.tsx
  └── performance/page.tsx

components/
  ├── common/
  │   ├── Navbar.tsx
  │   ├── Sidebar.tsx
  │   └── Header.tsx
  ├── forms/
  │   ├── LoginForm.tsx
  │   ├── EmployeeForm.tsx
  │   └── DepartmentForm.tsx
  ├── tables/
  │   ├── EmployeeTable.tsx
  │   └── DataTable.tsx
  ├── dashboard/
  │   ├── MetricsCard.tsx
  │   ├── Charts.tsx
  │   └── RecentActivity.tsx
  ├── layouts/
  │   ├── MainLayout.tsx
  │   ├── AuthLayout.tsx
  │   └── DashboardLayout.tsx
  └── ui/
      ├── button.tsx
      ├── input.tsx
      ├── card.tsx
      └── ...

hooks/
  ├── useAuth.ts
  ├── useApi.ts
  ├── useEmployees.ts
  └── useDepartments.ts

lib/
  ├── api-client.ts
  ├── types.ts
  ├── utils.ts
  └── constants.ts

store/
  └── useStore.ts
```

---

## 🎨 Color Palette

```typescript
// Primary Colors
primary-50:  #f0f6ff
primary-500: #0066cc
primary-600: #0052a3
primary-700: #003d7a
primary-900: #001a33

// Status Colors
success: #10b981
warning: #f59e0b
error:   #ef4444
info:    #0ea5e9

// Neutral
gray-50:  #f9fafb
gray-100: #f3f4f6
gray-600: #4b5563
gray-900: #1f2937
```

---

## 🧩 Common Component Patterns

### Button
```typescript
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>
```

### Card
```typescript
<Card className="p-6">
  <h2>Title</h2>
  <p>Content</p>
</Card>
```

### Form Input
```typescript
<Input
  type="text"
  placeholder="Enter value"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Badge
```typescript
<Badge variant="default">Active</Badge>
<Badge variant="secondary">Pending</Badge>
<Badge variant="destructive">Rejected</Badge>
```

### Table
```typescript
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column 1</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## 🔐 Authentication Pattern

```typescript
// Store auth state
const { user, token, setAuth, logout } = useAuthStore()

// Protected route
if (!isAuthenticated) {
  redirect('/login')
}

// API with token
const response = await fetch('/api/employees', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

// Login form
const handleLogin = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
  const { user, token } = await response.json()
  setAuth(user, token)
}
```

---

## 📊 Form Handling

```typescript
// Form state
const [formData, setFormData] = useState({
  name: '',
  email: '',
})

// Handle change
const handleChange = (e) => {
  const { name, value } = e.target
  setFormData(prev => ({ ...prev, [name]: value }))
}

// Form submission
const handleSubmit = async (e) => {
  e.preventDefault()
  
  // Validate
  if (!formData.name) {
    toast.error('Name is required')
    return
  }
  
  // Submit
  try {
    const response = await fetch('/api/employees', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    const data = await response.json()
    toast.success('Created successfully')
  } catch (error) {
    toast.error('Failed to create')
  }
}
```

---

## 🎣 Custom Hook Pattern

```typescript
// Data fetching hook
export function useEmployees(page = 1) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetch = async () => {
    setLoading(true)
    try {
      const res = await apiClient.get(`/employees?page=${page}`)
      setData(res)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [page])

  return { data, loading, error, refetch: fetch }
}

// Usage
const { data: employees, loading } = useEmployees(1)
```

---

## 💾 State Management with Zustand

```typescript
// Store definition
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'auth-store' }
  )
)

// Usage in component
const { user, setAuth, logout } = useAuthStore()
```

---

## 🎯 Responsive Design Breakpoints

```typescript
// Tailwind breakpoints
// sm:  640px
// md:  768px
// lg:  1024px
// xl:  1280px
// 2xl: 1536px

// Usage
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Mobile: 1 column, Tablet: 2, Desktop: 3 */}
</div>

<div className="hidden lg:block">
  {/* Only visible on desktop */}
</div>

<div className="flex gap-2 flex-col md:flex-row">
  {/* Stack on mobile, row on tablet+ */}
</div>
```

---

## 🔔 Toast Notifications

```typescript
import toast from 'react-hot-toast'

// Success
toast.success('Operation successful!')

// Error
toast.error('Something went wrong')

// Loading
const id = toast.loading('Loading...')
setTimeout(() => toast.success('Done!', { id }), 2000)

// Custom
toast((t) => (
  <div>
    <p>Custom message</p>
    <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
  </div>
))
```

---

## 🔄 API Client Usage

```typescript
// GET request
const employees = await apiClient.get('/employees', {
  page: 1,
  limit: 10
})

// POST request
const newEmployee = await apiClient.post('/employees', {
  name: 'John',
  email: 'john@example.com'
})

// PUT request
const updated = await apiClient.put(`/employees/${id}`, {
  name: 'Updated Name'
})

// DELETE request
await apiClient.delete(`/employees/${id}`)
```

---

## 📱 Mobile Navigation

```typescript
// Toggle sidebar on mobile
const [sidebarOpen, setSidebarOpen] = useState(false)

return (
  <>
    {/* Mobile menu button */}
    <Button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
      Menu
    </Button>
    
    {/* Sidebar - hidden on mobile by default */}
    <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
      {/* Navigation items */}
    </aside>
  </>
)
```

---

## 🎓 Utility Functions

```typescript
// Format date
formatDate('2024-01-15') // "January 15, 2024"

// Format currency
formatCurrency(75000) // "$75,000.00"

// Get initials
getInitials('John Doe') // "JD"

// Validate email
isValidEmail('john@example.com') // true

// Merge classes
cn('px-2 py-1', condition && 'text-red-500')
```

---

## 🧪 Testing Pattern

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders button text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick handler', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    screen.getByText('Click').click()
    expect(onClick).toHaveBeenCalled()
  })
})
```

---

## 🚀 Performance Tips

```typescript
// 1. Use dynamic imports for large components
const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <div>Loading...</div>
})

// 2. Memoize components
const MemoizedComponent = memo(MyComponent)

// 3. Use useCallback for functions
const handleClick = useCallback(() => {
  // ...
}, [])

// 4. Lazy load images
<Image src="/img.jpg" width={100} height={100} priority={false} />

// 5. Code split routes
const Dashboard = lazy(() => import('./Dashboard'))
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module" error
**Solution:**
```typescript
// Check import path is correct
import { Button } from '@/components/ui/button' // ✓ Correct
import Button from '../Button' // ✗ May cause issues

// Clear cache
rm -rf .next node_modules
npm install
```

### Issue: Hydration mismatch
**Solution:**
```typescript
'use client' // Add to top of component

// Or use dynamic import
const Component = dynamic(() => import('./Component'), {
  ssr: false
})
```

### Issue: API 401 Unauthorized
**Solution:**
```typescript
// Check token is being sent
const headers = {
  'Authorization': `Bearer ${token}`
}

// Check token is valid
// Check endpoint requires auth
```

### Issue: Styling not applying
**Solution:**
```typescript
// Use correct Tailwind syntax
className="px-4 py-2" // ✓ Correct
className="padding: 1rem" // ✗ Doesn't work

// Check tailwind.config.ts includes all files
content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}']
```

---

## 📚 Useful Resources

### Documentation
- Next.js: https://nextjs.org/docs
- React: https://react.dev
- Tailwind: https://tailwindcss.com
- TypeScript: https://www.typescriptlang.org/docs

### Libraries
- Zustand: https://zustand-demo.vercel.app/
- React Hot Toast: https://hot-toast.com/
- Lucide Icons: https://lucide.dev/
- shadcn/ui: https://ui.shadcn.com/

### Tools
- Vercel: https://vercel.com/
- VS Code: https://code.visualstudio.com/
- Chrome DevTools: Built-in
- Postman: https://www.postman.com/

---

## ⚡ Time-Saving Tips

1. **Use shadcn/ui** - Pre-styled, customizable components
2. **Copy code templates** - Don't reinvent the wheel
3. **Use AI for boilerplate** - Generate repetitive code
4. **Create reusable hooks** - DRY principle for data fetching
5. **Tailwind shortcuts** - Learn common class combinations
6. **Console.log wisely** - Use debugger for complex issues
7. **Live reload** - Dev server auto-refreshes changes
8. **TypeScript benefits** - Catch errors before runtime

---

## 🔗 Git Commands

```bash
# Initialize git
git init

# Add files
git add .

# Commit
git commit -m "Add feature"

# Create branch
git checkout -b feature/new-feature

# Push to GitHub
git push origin feature/new-feature

# Create Pull Request
# (on GitHub.com)
```

---

## 📋 Daily Workflow

```
Morning:
1. npm run dev
2. Open http://localhost:3000
3. Check console for errors

Development:
1. Make code changes
2. Hot reload auto-refreshes
3. Check TypeScript errors
4. Run tests if available

Before Commit:
1. Check all pages load
2. Test on mobile view
3. Check for console errors
4. Format code: npx prettier --write .

End of Day:
1. Commit changes
2. Push to GitHub
3. Create PR if needed
4. Close server safely
```

---

## 🎯 Development Checklist

- [ ] Project initialized
- [ ] Dependencies installed
- [ ] TypeScript configured
- [ ] Tailwind CSS working
- [ ] shadcn/ui installed
- [ ] API client set up
- [ ] State management working
- [ ] Authentication implemented
- [ ] Main pages created
- [ ] Responsive design tested
- [ ] Mobile navigation works
- [ ] Forms validating
- [ ] API integrations working
- [ ] Error handling in place
- [ ] Loading states shown
- [ ] Deployed to Vercel

---

## 💡 Pro Tips

1. **Use Chrome DevTools** for debugging
2. **Learn keyboard shortcuts** for faster coding
3. **Use extensions** like Tailwind CSS IntelliSense
4. **Create components library** early
5. **Document your code** as you go
6. **Use git commits** frequently
7. **Test on real devices** not just browser
8. **Monitor performance** in DevTools
9. **Use environment variables** for secrets
10. **Backup frequently** to GitHub

---

This is your quick reference - bookmark it! 📌
