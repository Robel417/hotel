import roomSuite from "@/assets/room-suite.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomStandard from "@/assets/room-standard.jpg";

export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  capacity: number;
  size: string;
  amenities: string[];
  rating: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "breakfast" | "lunch" | "dinner" | "drinks";
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface Booking {
  id: string;
  guestName: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: "confirmed" | "pending" | "cancelled";
  total: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "guest" | "admin";
  joinDate: string;
}

export const rooms: Room[] = [
  {
    id: "1",
    name: "Royal Suite",
    description: "Experience unparalleled luxury in our flagship suite featuring panoramic city views, a private balcony, and bespoke furnishings.",
    price: 450,
    image: roomSuite,
    capacity: 4,
    size: "85 m²",
    amenities: ["King Bed", "City View", "Balcony", "Mini Bar", "Jacuzzi", "Living Room"],
    rating: 4.9,
  },
  {
    id: "2",
    name: "Deluxe Room",
    description: "Elegant comfort meets modern design in our spacious deluxe room with premium amenities and sophisticated décor.",
    price: 280,
    image: roomDeluxe,
    capacity: 3,
    size: "55 m²",
    amenities: ["Queen Bed", "Garden View", "Mini Bar", "Work Desk", "Rain Shower"],
    rating: 4.7,
  },
  {
    id: "3",
    name: "Standard Room",
    description: "A beautifully appointed room offering all the essentials for a comfortable and memorable stay.",
    price: 150,
    image: roomStandard,
    capacity: 2,
    size: "35 m²",
    amenities: ["Double Bed", "City View", "Wi-Fi", "Smart TV", "Coffee Maker"],
    rating: 4.5,
  },
  {
    id: "4",
    name: "Presidential Suite",
    description: "The epitome of luxury — a sprawling suite with dining area, private study, and butler service.",
    price: 750,
    image: roomSuite,
    capacity: 4,
    size: "120 m²",
    amenities: ["King Bed", "Panoramic View", "Dining Area", "Butler Service", "Spa Bath", "Private Bar"],
    rating: 5.0,
  },
];

export const menuItems: MenuItem[] = [
  { id: "b1", name: "Eggs Benedict Royale", description: "Poached eggs on brioche with smoked salmon and hollandaise", price: 18, category: "breakfast" },
  { id: "b2", name: "Belgian Waffles", description: "Fresh berries, maple syrup, and whipped cream", price: 15, category: "breakfast" },
  { id: "b3", name: "Avocado Toast", description: "Sourdough, poached eggs, chili flakes, microgreens", price: 14, category: "breakfast" },
  { id: "b4", name: "Continental Platter", description: "Croissants, jams, cheese, cold cuts, and fresh fruit", price: 22, category: "breakfast" },
  { id: "l1", name: "Grilled Sea Bass", description: "Mediterranean vegetables, lemon butter, herb rice", price: 32, category: "lunch" },
  { id: "l2", name: "Wagyu Burger", description: "Truffle aioli, aged cheddar, caramelized onions", price: 28, category: "lunch" },
  { id: "l3", name: "Caesar Salad", description: "Romaine hearts, parmesan, croutons, anchovy dressing", price: 16, category: "lunch" },
  { id: "l4", name: "Lobster Bisque", description: "Cream soup with lobster chunks, brandy, fresh herbs", price: 24, category: "lunch" },
  { id: "d1", name: "Filet Mignon", description: "8oz prime beef, truffle mash, red wine jus", price: 55, category: "dinner" },
  { id: "d2", name: "Pan-Seared Duck", description: "Cherry glaze, roasted vegetables, fondant potato", price: 42, category: "dinner" },
  { id: "d3", name: "Seafood Platter", description: "Lobster, prawns, oysters, crab with saffron aioli", price: 65, category: "dinner" },
  { id: "d4", name: "Lamb Rack", description: "Herb-crusted lamb, mint pesto, dauphinoise potatoes", price: 48, category: "dinner" },
  { id: "dr1", name: "Signature Martini", description: "Premium gin, dry vermouth, olive garnish", price: 16, category: "drinks" },
  { id: "dr2", name: "Aged Whiskey Sour", description: "12-year bourbon, fresh lemon, egg white foam", price: 18, category: "drinks" },
  { id: "dr3", name: "Tropical Sunset", description: "Mango, passion fruit, rum, coconut cream", price: 15, category: "drinks" },
  { id: "dr4", name: "Fine Wine Selection", description: "Curated glass from our premium wine cellar", price: 22, category: "drinks" },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "Travel Blogger",
    content: "Robel Hotel redefined luxury for me. The attention to detail, impeccable service, and stunning rooms made our anniversary unforgettable.",
    rating: 5,
    avatar: "SM",
  },
  {
    id: "2",
    name: "James Korren",
    role: "Business Executive",
    content: "I've stayed at five-star hotels worldwide, and Robel stands among the very best. The dining experience alone is worth the visit.",
    rating: 5,
    avatar: "JK",
  },
  {
    id: "3",
    name: "Amira Hassan",
    role: "Interior Designer",
    content: "The architectural beauty and interior design of Robel Hotel is breathtaking. Every corner tells a story of elegance and craftsmanship.",
    rating: 5,
    avatar: "AH",
  },
];

export const mockBookings: Booking[] = [
  { id: "BK001", guestName: "John Smith", roomId: "1", checkIn: "2026-03-05", checkOut: "2026-03-08", guests: 2, status: "confirmed", total: 1350 },
  { id: "BK002", guestName: "Emily Davis", roomId: "2", checkIn: "2026-03-10", checkOut: "2026-03-12", guests: 1, status: "pending", total: 560 },
  { id: "BK003", guestName: "Michael Chen", roomId: "4", checkIn: "2026-03-15", checkOut: "2026-03-20", guests: 3, status: "confirmed", total: 3750 },
  { id: "BK004", guestName: "Lisa Brown", roomId: "3", checkIn: "2026-03-01", checkOut: "2026-03-03", guests: 2, status: "cancelled", total: 300 },
];

export const mockUsers: User[] = [
  { id: "U001", name: "Admin User", email: "admin@robelhotel.com", role: "admin", joinDate: "2024-01-15" },
  { id: "U002", name: "John Smith", email: "john@example.com", role: "guest", joinDate: "2025-06-20" },
  { id: "U003", name: "Emily Davis", email: "emily@example.com", role: "guest", joinDate: "2025-09-10" },
  { id: "U004", name: "Michael Chen", email: "michael@example.com", role: "guest", joinDate: "2025-11-05" },
];
