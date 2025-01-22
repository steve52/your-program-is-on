"use client";

import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import MenuIcon from "../Icons/MenuIcon";
import SearchIcon from "../Icons/SearchIcon";
import styles from "./header.module.css";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { useSearchParams } from "next/navigation";

const SearchInput: React.FC = () => {
  return <input className={styles.searchInput} />;
};

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const title = searchParams.get("title");

  useEffect(() => {
    setShowMenu(false);
    setSearchTerm("");
  }, [pathname]);

  const searchPage = pathname === "/search";

  const handleSearch: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    router.push(`${pathname}?title=${searchTerm}`);
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log("handlechange", e.target.value);
    setSearchTerm(e.target.value);
  };

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
          <form className={styles.searchWrapper} onSubmit={handleSearch}>
            <input
              className={styles.searchInput}
              name="title"
              onChange={handleInputChange}
              value={searchTerm || title || ""}
            />
            <button className={`${styles.button} ${styles.searchButton}`}>
              <SearchIcon />
            </button>
          </form>
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
