import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsNavigationProps {
  items?: BreadcrumbItem[];
}

const BreadcrumbsNavigation = ({ items }: BreadcrumbsNavigationProps) => {
  const location = useLocation();

  // Generate breadcrumbs from current path if no items provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ name: 'Home', href: '/' }];

    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      breadcrumbs.push({ name, href: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="py-4 px-6 bg-white/80 backdrop-blur-sm border-b border-gray-200"
    >
      <div className="container mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-700 font-medium" aria-current="page">
                  {index === 0 && <Home className="h-4 w-4 inline mr-1" />}
                  {crumb.name}
                </span>
              ) : (
                <Link
                  to={crumb.href}
                  className="text-gray-500 hover:text-orange transition-colors duration-200 flex items-center"
                >
                  {index === 0 && <Home className="h-4 w-4 mr-1" />}
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default BreadcrumbsNavigation;