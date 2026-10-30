import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { useWebsiteContent } from "../../context/useWebsiteContent";

const getItemName = (item) =>
  item.title || item.name || item.label || "Menu";

const getChildren = (item) => {
  if (Array.isArray(item.children) && item.children.length) {
    return item.children;
  }
  if (Array.isArray(item.subMenus) && item.subMenus.length) {
    return item.subMenus;
  }
  if (Array.isArray(item.links) && item.links.length) {
    return item.links.map((link) => ({
      ...link,
      name: link.label || link.name,
    }));
  }
  return [];
};

const getItemUrl = (item) => item.url || "#";

const NavMenu = () => {
  const { navbarHierarchy, isNavigationLoading, setCurrentPage } = useWebsiteContent();
  
  const navigate = useNavigate();

  const [openMenus, setOpenMenus] = useState({});
  const [submenuDirections, setSubmenuDirections] = useState({});
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuRef = useRef(null);
  const directionRefs = useRef({});
  const closeTimerRef = useRef(null);

  const safeNavData = Array.isArray(navbarHierarchy) ? navbarHierarchy : [];

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const closeNavigation = useCallback(() => {
    clearCloseTimer();
    setOpenMenus({});
    setSubmenuDirections({});
    setIsMobileOpen(false);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeNavigation();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeNavigation();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
      clearCloseTimer();
    };
  }, [closeNavigation]);

  const openMenu = (key) => {
    clearCloseTimer();
    setOpenMenus((previous) => {
      const next = { ...previous };
      const parts = key.split("/").filter(Boolean);
      let currentPath = "";
      parts.forEach((part) => {
        currentPath += `/${part}`;
        next[currentPath] = true;
      });
      return next;
    });
  };

  const scheduleClose = (key) => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setOpenMenus((previous) => {
        const next = { ...previous };
        Object.keys(next).forEach((menuKey) => {
          if (menuKey === key || menuKey.startsWith(`${key}/`)) {
            delete next[menuKey];
          }
        });
        return next;
      });
      closeTimerRef.current = null;
    }, 120);
  };

  const updateSubmenuDirection = (key, element) => {
    if (!element) return;
    const submenuWidth = Math.min(260, window.innerWidth - 24);
    const gap = 4;
    const rect = element.getBoundingClientRect();
    const spaceRight = window.innerWidth - rect.right;
    const spaceLeft = rect.left;
    let direction = "right";

    if (spaceRight < submenuWidth + gap) {
      if (spaceLeft >= submenuWidth + gap) {
        direction = "left";
      } else {
        direction = spaceRight >= spaceLeft ? "right" : "left";
      }
    }

    setSubmenuDirections((previous) => ({
      ...previous,
      [key]: direction,
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      Object.entries(directionRefs.current).forEach(([key, element]) => {
        if (element && openMenus[key]) {
          updateSubmenuDirection(key, element);
        }
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openMenus]);

  // ✅ Handle Menu Click (Session Save + Navigate)
  const handleMenuClick = (event, url, item) => {
    // Agar URL '#' hai ya khali hai, toh navigation nahi karni
    if (url === "#" || !url) {
      event.preventDefault();
      return;
    }

    // Default browser reload ko rokenge taaki React Router handle kare
    event.preventDefault();

    // Session mein data save karein
    if (setCurrentPage) {
      setCurrentPage(item);
    }

    // Dropdown band karein
    closeNavigation();

    // React Router se navigate karein
    navigate(url);
  };

  const renderDesktopItems = (items, level = 0, parentKey = "") =>
    items.map((item, index) => {
      const name = getItemName(item);
      const key = `${parentKey}/${name}-${index}`;
      const children = getChildren(item);
      const hasChildren = children.length > 0;
      const isOpen = Boolean(openMenus[key]);
      const url = getItemUrl(item);
      const direction = submenuDirections[key] || "right";

      return (
        <div
          key={key}
          ref={(element) => {
            directionRefs.current[key] = element;
          }}
          className={
            level === 0
              ? "relative flex h-full shrink-0 items-center"
              : "relative w-full"
          }
          onMouseEnter={(event) => {
            if (!hasChildren) return;
            clearCloseTimer();
            if (level > 0) {
              updateSubmenuDirection(key, event.currentTarget);
            }
            openMenu(key);
          }}
          onMouseLeave={() => {
            if (hasChildren) scheduleClose(key);
          }}
        >
          <div
            className={
              level === 0
                ? "flex h-full items-stretch"
                : "flex w-full items-stretch"
            }
          >
            <NavLink
              to={url}
              end
              onClick={(event) => handleMenuClick(event, url, item)}
              className={({ isActive }) =>
                level === 0
                  ? `flex h-full items-center gap-1.5 border-b-[3px]
                     px-3 xl:px-4 text-[14px] font-semibold whitespace-nowrap
                     transition-colors duration-200 ${
                       isActive && url !== "#"
                         ? "border-blue-800 text-blue-800"
                         : "border-transparent text-slate-700 hover:border-blue-800 hover:text-blue-800"
                     }`
                  : `flex min-w-0 flex-1 items-center px-4 py-3 text-left
                     text-[14px] font-medium transition-colors duration-150 ${
                       isOpen
                         ? "bg-blue-800 text-white"
                         : "text-slate-700 hover:bg-blue-50 hover:text-blue-800"
                     }`
              }
            >
              <span className="min-w-0 truncate">{name}</span>

              {/* ✅ Arrow icon ko NavLink ke andar daala hai taaki clickable area bada ho */}
              {hasChildren && (
                <span
                  aria-hidden="true"
                  className={`ml-1 flex items-center justify-center pointer-events-none transition-transform duration-200 ${
                    level === 0
                      ? isOpen
                        ? "rotate-180"
                        : ""
                      : isOpen
                      ? "rotate-90"
                      : ""
                  }`}
                >
                  {level === 0 ? (
                    <ChevronDown size={15} />
                  ) : (
                    <ChevronRight size={15} />
                  )}
                </span>
              )}
            </NavLink>
          </div>

          {hasChildren && isOpen && (
            <div
              role="group"
              onMouseEnter={clearCloseTimer}
              className={
                level === 0
                  ? `absolute left-0 top-full z-50 min-w-60
                     max-w-[calc(100vw-24px)] rounded-b-lg
                     border-t-2 border-blue-800 bg-white py-1
                     shadow-[0_12px_30px_rgba(15,23,42,0.16)]`
                  : `absolute top-0 z-50 min-w-[240px]
                     max-w-[calc(100vw-24px)] rounded-lg
                     border border-slate-200 bg-white py-1
                     shadow-[0_12px_30px_rgba(15,23,42,0.16)]
                     ${
                       direction === "left"
                         ? "right-full mr-1"
                         : "left-full ml-1"
                     }`
              }
              style={
                level === 0
                  ? {
                      left: "auto",
                      right: 0,
                    }
                  : undefined
              }
            >
              {renderDesktopItems(children, level + 1, key)}
            </div>
          )}
        </div>
      );
    });

  const renderMobileItems = (items, level = 0, parentKey = "") =>
    items.map((item, index) => {
      const name = getItemName(item);
      const key = `${parentKey}/${name}-${index}`;
      const children = getChildren(item);
      const hasChildren = children.length > 0;
      const isOpen = Boolean(openMenus[key]);
      const url = getItemUrl(item);

      return (
        <div
          key={key}
          className={level === 0 ? "border-b border-slate-100" : ""}
        >
          <div className="flex items-stretch">
            <NavLink
              to={url}
              onClick={(event) => handleMenuClick(event, url, item)}
              className={({ isActive }) =>
                `flex min-w-0 flex-1 items-center py-3 text-[14px]
                 transition-colors ${
                   level === 0
                     ? "font-semibold text-slate-800"
                     : "font-medium text-slate-700"
                 } ${
                   isActive && url !== "#"
                     ? "text-blue-800"
                     : "hover:text-blue-800"
                 }`
              }
              style={{ paddingLeft: `${16 + level * 16}px` }}
            >
              <span className="truncate">{name}</span>
            </NavLink>

            {hasChildren && (
              <button
                type="button"
                aria-label={`${isOpen ? "Collapse" : "Expand"} ${name}`}
                aria-expanded={isOpen}
                onClick={() => {
                  setOpenMenus((previous) => ({
                    ...previous,
                    [key]: !previous[key],
                  }));
                }}
                className="flex min-w-12 items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-800"
              >
                <ChevronDown
                  size={17}
                  className={`transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>

          {hasChildren && isOpen && (
            <div className="border-l-2 border-blue-100 bg-slate-50">
              {renderMobileItems(children, level + 1, key)}
            </div>
          )}
        </div>
      );
    });

  if (isNavigationLoading) {
    return (
      <nav className="relative z-30 w-full border-t border-slate-200 bg-white">
        <div className="hidden h-13.5 items-center justify-center lg:flex">
          <span className="text-sm text-slate-500">
            Loading navigation...
          </span>
        </div>
        <div className="flex h-12 items-center px-4 lg:hidden">
          <span className="text-sm text-slate-500">
            Loading menu...
          </span>
        </div>
      </nav>
    );
  }

  return (
    <nav
      ref={menuRef}
      aria-label="Main navigation"
      className="relative z-30 w-full border-t border-slate-200 bg-white shadow-sm"
    >
      {/* Desktop navigation */}
      <div className="hidden h-13.5 w-full items-stretch justify-center px-3 lg:flex">
        {safeNavData.length > 0 ? (
          <div className="flex min-w-0 items-stretch justify-center gap-1">
            {renderDesktopItems(safeNavData)}
          </div>
        ) : (
          <div className="flex items-center text-sm text-slate-500">
            No menu available
          </div>
        )}
      </div>

      {/* Mobile header */}
      <div className="flex min-h-12 items-center justify-between px-4 lg:hidden">
        <span className="text-sm font-semibold tracking-wide text-slate-800">
          Navigation
        </span>

        <button
          type="button"
          onClick={() => setIsMobileOpen((previous) => !previous)}
          aria-label={isMobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMobileOpen}
          className="rounded-md p-2 text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-800"
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile accordion */}
      {isMobileOpen && (
        <div className="max-h-[75vh] overflow-y-auto border-t border-slate-200 bg-white px-2 py-1 shadow-lg lg:hidden">
          {safeNavData.length > 0 ? (
            renderMobileItems(safeNavData)
          ) : (
            <p className="px-4 py-5 text-sm text-slate-500">
              No menu available
            </p>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavMenu;