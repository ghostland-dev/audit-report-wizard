
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  FileText,
  Settings,
  Menu,
  X,
  LogOut,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const mainLinks = [
    { path: "/", label: "Accueil", icon: Home },
    { path: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { path: "/create-audit", label: "Nouvel audit", icon: FileText },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <FileText className="h-8 w-8 text-audit-blue-600 mr-2" />
            <span className="text-xl font-bold text-audit-gray-900">Audit Report Pro</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {mainLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  isActive(link.path)
                    ? "bg-audit-blue-50 text-audit-blue-700"
                    : "text-audit-gray-600 hover:bg-gray-100"
                }`}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {link.label}
              </Link>
            );
          })}
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Settings Button */}
          <Link to="/settings" className="p-2 rounded-md text-audit-gray-600 hover:bg-gray-100 hidden md:flex">
            <Settings className="h-5 w-5" />
          </Link>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-audit-blue-100 text-audit-blue-600">
                    UA
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Paramètres</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-2">
          <div className="space-y-1">
            {mainLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                    isActive(link.path)
                      ? "bg-audit-blue-50 text-audit-blue-700"
                      : "text-audit-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <IconComponent className="h-5 w-5 mr-3" />
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/settings"
              className="block px-3 py-2 rounded-md text-base font-medium flex items-center text-audit-gray-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <Settings className="h-5 w-5 mr-3" />
              Paramètres
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
