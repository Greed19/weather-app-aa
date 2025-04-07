import { useTheme } from "@/context/theme-provider"
import { Link } from "react-router-dom"
import CitySearch from "./city-search";
import ThemeToggle from "./theme-toggle";

const Header = () => {

    const { theme } = useTheme();
    const isDark = theme === 'dark'
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to={'/'}>
                    <img src={isDark ? 'https://greed19.github.io/weather-app-aa/dark.png' : 'https://greed19.github.io/weather-app-aa/light.png'} alt="logo" className="h-14" />
                </Link>

                <div className="flex gap-4">
                    <CitySearch />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}
export default Header