# Admin Order Details Modal - Visual Guide

## 🎨 Modal Layout Preview

```
╔════════════════════════════════════════════════════════════════════╗
║  Order Details                                              [X]    ║
║  Order #1001 • ORD-MHG1QGTB-QB0BDE                                ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐        ║
║  │ Order Status  │  │Payment Status │  │  Order Date   │        ║
║  │  Processing   │  │     Paid      │  │  01 Nov 2025  │        ║
║  └───────────────┘  └───────────────┘  └───────────────┘        ║
║                                                                    ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ 👤 Customer Information                                      │ ║
║  │ ┌──────────────────────┐  ┌──────────────────────┐         │ ║
║  │ │ 👤 Name              │  │ 📞 Phone             │         │ ║
║  │ │ John Doe             │  │ +91 9876543210       │         │ ║
║  │ └──────────────────────┘  └──────────────────────┘         │ ║
║  │ ┌──────────────────────┐                                    │ ║
║  │ │ 📧 Email             │                                    │ ║
║  │ │ john@example.com     │                                    │ ║
║  │ └──────────────────────┘                                    │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                    ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ 📍 Shipping Address                                          │ ║
║  │ John Doe                                                     │ ║
║  │ 123 Main Street                                              │ ║
║  │ Apartment 4B                                                 │ ║
║  │ Mumbai, Maharashtra - 400001                                 │ ║
║  │ India                                                        │ ║
║  │ Phone: +91 9876543210                                        │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                    ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ 📦 Ordered Products (3 items)                                │ ║
║  │                                                              │ ║
║  │ ┌──────────────────────────────────────────────────────────┐│ ║
║  │ │ [IMG] Microsoft Office 2021           Qty: 1 × ₹8,999    ││ ║
║  │ │       Professional Plus                        ₹8,999    ││ ║
║  │ └──────────────────────────────────────────────────────────┘│ ║
║  │ ┌──────────────────────────────────────────────────────────┐│ ║
║  │ │ [IMG] Adobe Creative Cloud            Qty: 2 × ₹4,500    ││ ║
║  │ │       All Apps Annual Plan                     ₹9,000    ││ ║
║  │ └──────────────────────────────────────────────────────────┘│ ║
║  │ ┌──────────────────────────────────────────────────────────┐│ ║
║  │ │ [IMG] Autodesk AutoCAD 2024           Qty: 1 × ₹12,500   ││ ║
║  │ │       Professional                             ₹12,500   ││ ║
║  │ └──────────────────────────────────────────────────────────┘│ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                    ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ Order Summary                                                │ ║
║  │                                                              │ ║
║  │ Subtotal                                       ₹30,499      │ ║
║  │ Discount                                      -₹1,500       │ ║
║  │ Shipping                                          ₹0        │ ║
║  │ Tax (18%)                                      ₹5,220       │ ║
║  │ ──────────────────────────────────────────────────────────  │ ║
║  │ Total Amount                                  ₹34,219      │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                    ║
║  ┌─────────────────────────────────────────────────────────────┐ ║
║  │ Payment Details                                              │ ║
║  │ Payment ID: pay_MhG1qgtbQb0bDe1234                          │ ║
║  │ Razorpay Order ID: order_MhG1qgtbQb0bDe                     │ ║
║  └─────────────────────────────────────────────────────────────┘ ║
║                                                                    ║
╠════════════════════════════════════════════════════════════════════╣
║                                                  [ Close ]         ║
╚════════════════════════════════════════════════════════════════════╝
```

## 🎨 Color Scheme

### Order Status Colors
- **🟢 Success/Delivered/Paid** - Green (#10b981)
- **🔵 Processing** - Blue (Primary Theme Color)
- **🟡 Pending** - Orange/Yellow (#f59e0b)
- **🔴 Cancelled/Failed** - Red (#ef4444)

### UI Elements
- **Background**: Theme-aware (Light/Dark)
- **Text Primary**: High contrast
- **Text Secondary**: Muted/Gray
- **Borders**: Subtle, theme-aware
- **Cards**: Slightly elevated background
- **Buttons**: Primary theme color

## 📐 Dimensions

### Desktop View
- **Modal Width**: max-width: 896px (56rem)
- **Modal Height**: max-height: 90vh (scrollable)
- **Padding**: 24px (1.5rem)
- **Gap between sections**: 24px (1.5rem)

### Mobile View
- **Modal Width**: 100% - 16px padding
- **Stacked layout**: Single column
- **Touch-friendly buttons**: Minimum 44px height

## 🎯 Interactive Elements

### View Details Button (in table)
```
┌─────────────────────────┐
│  👁️  View Details       │  ← Hover: Slight opacity change
└─────────────────────────┘
Size: Small
Color: Primary theme color
Icon: Eye (lucide-react)
```

### Close Button (top right)
```
┌───┐
│ ✕ │  ← Hover: Background highlight
└───┘
Size: 24px × 24px
Shape: Rounded square
```

### Close Button (footer)
```
┌──────────┐
│  Close   │  ← Full-width button
└──────────┘
Size: Medium
Color: Primary theme color
```

## 📱 Responsive Breakpoints

### Desktop (1024px+)
- 2-column grid for status cards
- 2-column grid for customer info
- Wide modal with side margins

### Tablet (768px - 1023px)
- 2-column grid maintained
- Narrower modal
- Adjusted padding

### Mobile (<768px)
- Single column layout
- Full-width modal with padding
- Stacked information cards
- Larger touch targets

## 🔄 Animation & Transitions

### Modal Opening
- Fade in overlay (backdrop)
- Scale up modal from 95% to 100%
- Duration: 200ms
- Easing: ease-out

### Hover Effects
- View Details button: opacity 0.9
- Close button: background highlight
- Duration: 200ms

## 📊 Information Hierarchy

### Priority 1 (Most Important)
1. Order Number & ID
2. Order Status
3. Total Amount

### Priority 2 (Important)
1. Customer Name & Contact
2. Products List
3. Shipping Address

### Priority 3 (Supporting Info)
1. Payment Status
2. Order Date
3. Order Summary breakdown
4. Payment IDs

## 🎭 Visual States

### Loading State
```
┌─────────────────────┐
│                     │
│   ⏳ Loading...     │
│                     │
└─────────────────────┘
```

### Empty Products
```
No products in this order
```

### Missing Information
```
N/A or — (em dash)
```

## 🖼️ Product Card Layout

```
┌───────────────────────────────────────────────┐
│ [64×64]  Product Name               ₹XX,XXX  │
│  Image   Qty: X × ₹X,XXX                     │
└───────────────────────────────────────────────┘
```

### With Image
- Image: 64px × 64px, rounded corners
- Object-fit: cover
- Alt text: Product name

### Without Image
- No image placeholder shown
- More space for product name

## 🎨 Theme Examples

### Light Theme
```
Background: #ffffff / #f9fafb
Text: #111827
Borders: #e5e7eb
Accent: #f3f4f6
```

### Dark Theme
```
Background: #1f2937 / #111827
Text: #f9fafb
Borders: #374151
Accent: #374151
```

## ✨ Special Effects

### Card Hover
- Slight background color change
- Smooth transition (200ms)
- No border changes

### Overlay Click
- Click outside modal → Close
- Click inside modal → No action
- Backdrop: rgba(0, 0, 0, 0.5)

### Scroll Behavior
- Sticky header (Order Details title)
- Sticky footer (Close button)
- Scrollable body content
- Smooth scrolling

## 🔧 Accessibility

### Keyboard Navigation
- Tab through interactive elements
- Enter/Space to activate buttons
- Escape key could close modal (optional)

### Screen Readers
- Proper heading hierarchy (h3, h4)
- Icon labels with aria-labels
- Semantic HTML structure

### Focus Management
- Focus trap within modal
- Return focus to trigger button on close
- Visible focus indicators

---

**Component**: Order Details Modal  
**Location**: `frontend/src/ui/admin/Orders.tsx`  
**Status**: ✅ Implemented  
**Last Updated**: November 1, 2025
