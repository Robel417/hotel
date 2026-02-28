import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { rooms, mockBookings, menuItems, mockUsers, type Booking, type Room, type MenuItem, type User } from "@/data/mockData";
import { Bed, CalendarCheck, UtensilsCrossed, Users, LogOut, Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

type Tab = "rooms" | "bookings" | "menu" | "users";

const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "rooms", label: "Rooms", icon: Bed },
  { key: "bookings", label: "Bookings", icon: CalendarCheck },
  { key: "menu", label: "Menu", icon: UtensilsCrossed },
  { key: "users", label: "Users", icon: Users },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("rooms");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [roomList, setRoomList] = useState<Room[]>([...rooms]);
  const [bookingList, setBookingList] = useState<Booking[]>([...mockBookings]);
  const [menuList, setMenuList] = useState<MenuItem[]>([...menuItems]);
  const [userList] = useState<User[]>([...mockUsers]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const deleteRoom = (id: string) => {
    setRoomList((prev) => prev.filter((r) => r.id !== id));
    toast.success("Room deleted");
  };

  const deleteBooking = (id: string) => {
    setBookingList((prev) => prev.filter((b) => b.id !== id));
    toast.success("Booking deleted");
  };

  const deleteMenuItem = (id: string) => {
    setMenuList((prev) => prev.filter((m) => m.id !== id));
    toast.success("Menu item deleted");
  };

  const toggleBookingStatus = (id: string) => {
    setBookingList((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: b.status === "confirmed" ? "cancelled" : "confirmed" }
          : b
      )
    );
    toast.success("Booking status updated");
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="pt-16 min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="font-body text-muted-foreground mb-6">Sign in as admin to access the dashboard.</p>
          <Button variant="gold" onClick={() => navigate("/auth")}>Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold">Admin Dashboard</h1>
            <p className="font-body text-sm text-primary-foreground/60">Welcome, {user.name}</p>
          </div>
          <Button variant="heroOutline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" /> Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Rooms", value: roomList.length, icon: Bed },
            { label: "Bookings", value: bookingList.length, icon: CalendarCheck },
            { label: "Menu Items", value: menuList.length, icon: UtensilsCrossed },
            { label: "Users", value: userList.length, icon: Users },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <s.icon className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="font-body text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "gold" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.key)}
              className="font-body whitespace-nowrap"
            >
              <tab.icon className="h-4 w-4 mr-1" /> {tab.label}
            </Button>
          ))}
        </div>

        {/* Rooms Tab */}
        {activeTab === "rooms" && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-body text-sm font-semibold text-foreground">Room</th>
                    <th className="text-left p-3 font-body text-sm font-semibold text-foreground">Price</th>
                    <th className="text-left p-3 font-body text-sm font-semibold text-foreground">Capacity</th>
                    <th className="text-left p-3 font-body text-sm font-semibold text-foreground">Size</th>
                    <th className="text-right p-3 font-body text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roomList.map((room) => (
                    <tr key={room.id} className="border-t border-border">
                      <td className="p-3 font-body text-sm text-foreground">{room.name}</td>
                      <td className="p-3 font-body text-sm text-secondary font-semibold">${room.price}/night</td>
                      <td className="p-3 font-body text-sm text-muted-foreground">{room.capacity} guests</td>
                      <td className="p-3 font-body text-sm text-muted-foreground">{room.size}</td>
                      <td className="p-3 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.info("Edit functionality — connect backend")}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteRoom(room.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-body text-sm font-semibold">ID</th>
                    <th className="text-left p-3 font-body text-sm font-semibold">Guest</th>
                    <th className="text-left p-3 font-body text-sm font-semibold">Dates</th>
                    <th className="text-left p-3 font-body text-sm font-semibold">Total</th>
                    <th className="text-left p-3 font-body text-sm font-semibold">Status</th>
                    <th className="text-right p-3 font-body text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingList.map((b) => (
                    <tr key={b.id} className="border-t border-border">
                      <td className="p-3 font-body text-xs text-muted-foreground">{b.id}</td>
                      <td className="p-3 font-body text-sm">{b.guestName}</td>
                      <td className="p-3 font-body text-xs text-muted-foreground">{b.checkIn} → {b.checkOut}</td>
                      <td className="p-3 font-body text-sm text-secondary font-semibold">${b.total}</td>
                      <td className="p-3">
                        <span className={`text-xs font-body px-2 py-1 rounded-full ${
                          b.status === "confirmed" ? "bg-green-100 text-green-800" :
                          b.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}>{b.status}</span>
                      </td>
                      <td className="p-3 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleBookingStatus(b.id)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteBooking(b.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Menu Tab */}
        {activeTab === "menu" && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-body text-sm font-semibold">Item</th>
                    <th className="text-left p-3 font-body text-sm font-semibold">Category</th>
                    <th className="text-left p-3 font-body text-sm font-semibold">Price</th>
                    <th className="text-right p-3 font-body text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menuList.map((item) => (
                    <tr key={item.id} className="border-t border-border">
                      <td className="p-3 font-body text-sm">{item.name}</td>
                      <td className="p-3 font-body text-xs text-muted-foreground capitalize">{item.category}</td>
                      <td className="p-3 font-body text-sm text-secondary font-semibold">${item.price}</td>
                      <td className="p-3 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.info("Edit functionality — connect backend")}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteMenuItem(item.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-body text-sm font-semibold">Name</th>
                    <th className="text-left p-3 font-body text-sm font-semibold">Email</th>
                    <th className="text-left p-3 font-body text-sm font-semibold">Role</th>
                    <th className="text-left p-3 font-body text-sm font-semibold">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((u) => (
                    <tr key={u.id} className="border-t border-border">
                      <td className="p-3 font-body text-sm">{u.name}</td>
                      <td className="p-3 font-body text-xs text-muted-foreground">{u.email}</td>
                      <td className="p-3">
                        <span className={`text-xs font-body px-2 py-1 rounded-full ${u.role === "admin" ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3 font-body text-xs text-muted-foreground">{u.joinDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
