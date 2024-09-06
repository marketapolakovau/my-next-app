import Link from "next/link";
import styles from "./Header.module.css";

type Header = {
    url: string;
    text: string;
};
const Header = ({ url, text }: Header) => {
    return (
        <header className={styles.header}>
            <nav>
                <Link href="/">Home</Link>
            </nav>

            <Link href={url}>
                <div className={styles.button}>{text} </div>
            </Link>
        </header>
    );
};

export default Header;
