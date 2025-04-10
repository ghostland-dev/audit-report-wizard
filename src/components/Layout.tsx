
import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">{children}</main>
      <footer className="bg-audit-gray-950 text-white py-8">
        <div className="audit-container">
          <div className="text-center">
            <p className="text-audit-gray-400 text-sm">
              © {new Date().getFullYear()} Audit Report Wizard. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
