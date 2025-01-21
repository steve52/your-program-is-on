"use client";

import { useEffect, useState } from "react";
import FilterIcon from "../Icons/FIlterIcon";
import MenuIcon from "../Icons/MenuIcon";
import SearchIcon from "../Icons/SearchIcon";
import SortIcon from "../Icons/SortIcon";
import styles from "./header.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  const searchPage = pathname === "/search";

  return (
    <>
      <div
        className={`${styles.header} ${searchPage ? styles.searchMode : ""}`}
      >
        <button
          className={`${styles.button} ${styles.menuButton}`}
          onClick={() => setShowMenu(!showMenu)}
        >
          <MenuIcon />
        </button>
        <div className={styles.pageName}>my list</div>
        {pathname === "/search" && (
          <div className={styles.searchWrapper}>
            <input className={styles.searchInput} />
            <button
              className={`${styles.button} ${styles.searchButton}`}
              onClick={() => {}}
            >
              <SearchIcon />
            </button>
          </div>
        )}
        {showMenu && (
          <nav className={styles.nav}>
            <Link
              href={"/"}
              aria-disabled={pathname === "/"}
              className={pathname === "/" ? styles.disabledLink : ""}
              onClick={(e) => {
                if (pathname === "/") e.preventDefault();
              }}
            >
              View My List
            </Link>
            <Link
              href={"/search"}
              aria-disabled={pathname === "/search"}
              className={pathname === "/search" ? styles.disabledLink : ""}
              onClick={(e) => {
                if (pathname === "/search") e.preventDefault();
              }}
            >
              Search For New Movies
            </Link>
          </nav>
        )}
      </div>
    </>
  );
};

export default Header;
