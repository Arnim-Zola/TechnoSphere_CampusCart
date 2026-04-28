export const MOCK_PRODUCTS = [
  // Writing Essentials
  {
    id: "1",
    name: "Classic Ballpoint Pen (Blue)",
    category: "Writing Essentials",
    price: 20,
    description: "Reliable blue ballpoint pen for everyday use. Smooth ink flow.",
    image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=600&auto=format&fit=crop",
    inStock: true
  },
  {
    id: "2",
    name: "Premium Gel Pen Set (Pack of 5)",
    category: "Writing Essentials",
    price: 150,
    description: "Vibrant gel pens in black, blue, red, green, and purple. 0.5mm tip.",
    image: "https://images.unsplash.com/photo-1620216790906-8c4d7ec66b04?q=80&w=600&auto=format&fit=crop",
    inStock: true
  },
  {
    id: "3",
    name: "Executive Fountain Pen",
    category: "Writing Essentials",
    price: 850,
    description: "Elegant fountain pen with an iridium nib. Perfect for signatures and gifting.",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600&auto=format&fit=crop",
    inStock: true
  },
  {
    id: "4",
    name: "Mechanical Pencils (Pack of 2)",
    category: "Writing Essentials",
    price: 80,
    description: "0.7mm mechanical pencils with a built-in eraser and extra lead.",
    image: "https://images.unsplash.com/photo-1596484552993-9c7104f128be?q=80&w=600&auto=format&fit=crop",
    inStock: false
  },
  {
    id: "18",
    name: "Whiteboard Markers (Pack of 4)",
    category: "Writing Essentials",
    price: 180,
    description: "Dry-erase markers in Black, Blue, Red, and Green. Easy wipe-off.",
    image: "https://images.unsplash.com/photo-1580130058001-370c8ce75ec6?q=80&w=600&auto=format&fit=crop",
    inStock: true
  },

  // Paper Products
  {
    id: "5",
    name: "A4 Ruled Spiral Notebook",
    category: "Paper Products",
    price: 120,
    description: "200-page spiral notebook with premium 70gsm paper.",
    image: "/images/notebook.png", // Generated image
    inStock: true
  },
  {
    id: "6",
    name: "Pocket Memo Pad",
    category: "Paper Products",
    price: 40,
    description: "Compact memo pad perfect for quick notes on the go.",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=600&auto=format&fit=crop",
    inStock: true
  },
  {
    id: "7",
    name: "Sticky Notes (Neon Colors)",
    category: "Paper Products",
    price: 60,
    description: "Pack of 4 neon colored sticky notes (400 sheets total).",
    image: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=600&auto=format&fit=crop",
    inStock: true
  },
  {
    id: "8",
    name: "Leather Bound Journal",
    category: "Paper Products",
    price: 450,
    description: "Premium synthetic leather journal, unruled, thick 100gsm paper.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    inStock: true
  },
  {
    id: "19",
    name: "Post-it Page Markers",
    category: "Paper Products",
    price: 85,
    description: "Colorful page marker flags for easy referencing and indexing.",
    image: "https://images.unsplash.com/photo-1532153354457-5f2fc7329f1b?q=80&w=600&auto=format&fit=crop",
    inStock: true
  },

  // Correction & Marking
  {
    id: "9",
    name: "Correction Tape Roller",
    category: "Correction & Marking",
    price: 45,
    description: "Smooth application correction tape, 5mm x 8m. Tear-resistant.",
    image: "/images/tape.png", // Generated image
    inStock: true
  },
  {
    id: "10",
    name: "Dust-Free Eraser (Pack of 3)",
    category: "Correction & Marking",
    price: 30,
    description: "High-quality polymer erasers that leave minimal dust.",
    image: "https://images.unsplash.com/photo-1605364850731-8979fc95eb56?q=80&w=600&auto=format&fit=crop",
    inStock: true
  },
  {
    id: "11",
    name: "Pastel Highlighters (Pack of 6)",
    category: "Correction & Marking",
    price: 180,
    description: "Aesthetic pastel highlighters perfect for studying and journaling.",
    image: "https://images.unsplash.com/photo-1568212104593-9c8f0f09aabf?q=80&w=600&auto=format&fit=crop",
    inStock: true
  },

  // Measuring Tools
  {
    id: "12",
    name: "Precision Steel Ruler 30cm",
    category: "Measuring Tools",
    price: 80,
    description: "Stainless steel ruler with both metric and imperial markings.",
    image: "/images/ruler.png", // Generated image
    inStock: true
  },
  {
    id: "13",
    name: "Clear Plastic Protractor",
    category: "Measuring Tools",
    price: 25,
    description: "180-degree clear plastic protractor for accurate angle measurement.",
    image: "https://images.unsplash.com/photo-1623062634351-4122dcc9a3fb?q=80&w=600&auto=format&fit=crop",
    inStock: true
  },
  {
    id: "14",
    name: "Engineering Compass Set",
    category: "Measuring Tools",
    price: 250,
    description: "Professional grade compass with extension bar and spare leads.",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=600&auto=format&fit=crop",
    inStock: false
  },
  {
    id: "20",
    name: "Mathematical Geometry Box",
    category: "Measuring Tools",
    price: 160,
    description: "Complete student geometry set in a durable metal case.",
    image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=600&auto=format&fit=crop",
    inStock: true
  },

  // Office Utility
  {
    id: "15",
    name: "Rose Gold Paperclips (100 pack)",
    category: "Office Utility",
    price: 60,
    description: "Durable and stylish paperclips for organizing documents.",
    image: "/images/paperclips.png", // Generated image
    inStock: true
  },
  {
    id: "16",
    name: "Heavy Duty Stapler",
    category: "Office Utility",
    price: 350,
    description: "Can staple up to 50 pages at once. Ergonomic design.",
    image: "https://images.unsplash.com/photo-1563261314-ecb438b43f11?q=80&w=600&auto=format&fit=crop",
    inStock: true
  },
  {
    id: "17",
    name: "Binder Clips (Assorted Sizes)",
    category: "Office Utility",
    price: 100,
    description: "Pack of 24 black binder clips in small, medium, and large sizes.",
    image: "https://images.unsplash.com/photo-1579298245158-33e8f568f7d3?q=80&w=600&auto=format&fit=crop",
    inStock: true
  },
  {
    id: "21",
    name: "Expanding Document Folder",
    category: "Office Utility",
    price: 220,
    description: "A4 size document organizer with 12 pockets and tabs.",
    image: "https://images.unsplash.com/photo-1618410320928-25228d811631?q=80&w=600&auto=format&fit=crop",
    inStock: true
  }
];
