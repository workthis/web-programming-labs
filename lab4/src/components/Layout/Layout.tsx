import { NavLink, Outlet } from "react-router";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <span className={styles.logo}>📋 Task Manager</span>
        <nav className={styles.nav}>
          {/* NavLink end */}
          <NavLink
            to="/tasks"
            end
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Всі задачі
          </NavLink>

          {/* NavLink ++*/}
          <NavLink
            to="/tasks/new"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            + Нова задача
          </NavLink>
        </nav>
      </header>
      
      <main className={styles.main}>
        {/* Ренд маршрутів*/}
        <Outlet />
      </main>
    </div>
  );
}