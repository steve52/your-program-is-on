"use client";

import {
  ChangeEventHandler,
  FormEventHandler,
  Suspense,
  useEffect,
  useState,
} from "react";
import MenuIcon from "../Icons/MenuIcon";
import SearchIcon from "../Icons/SearchIcon";
import styles from "./header.module.css";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const title = searchParams.get("title");

  useEffect(() => {
    setSearchTerm(title || "");
  }, [pathname]);

  const handleSearch: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    router.push(`${pathname}?title=${searchTerm}`);
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form className={styles.searchWrapper} onSubmit={handleSearch}>
      <input
        className={styles.searchInput}
        name="title"
        onChange={handleInputChange}
        value={searchTerm}
      />
      <button className={`${styles.button} ${styles.searchButton}`}>
        <SearchIcon className="searchIcon" />
      </button>
    </form>
  );
};

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
        {pathname === "/" && <div className={styles.pageName}>my list</div>}
        {pathname === "/all" && (
          <div className={styles.pageName}>all my movies</div>
        )}
        {pathname === "/search" && (
          <Suspense>
            <SearchBar />
          </Suspense>
        )}
        {showMenu && (
          <nav className={styles.nav}>
            <Link
              href={"/"}
              aria-disabled={pathname === "/"}
              className={`${styles.navLink} ${
                pathname === "/" ? styles.disabledLink : ""
              }`}
              onClick={(e) => {
                if (pathname === "/") e.preventDefault();
              }}
            >
              View My List
            </Link>
            <Link
              href={"/all"}
              aria-disabled={pathname === "/all"}
              className={`${styles.navLink} ${
                pathname === "/all" ? styles.disabledLink : ""
              }`}
              onClick={(e) => {
                if (pathname === "/all") e.preventDefault();
              }}
            >
              View All My Movies
            </Link>
            <Link
              href={"/search"}
              aria-disabled={pathname === "/search"}
              className={`
                ${styles.navLink} ${
                pathname === "/search" ? styles.disabledLink : ""
              }`}
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
