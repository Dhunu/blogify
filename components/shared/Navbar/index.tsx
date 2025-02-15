import Logo from "@/components/shared/logo";
import Search from "@/components/shared/Navbar/search";
import User from "@/components/shared/Navbar/user";

export default function Navbar() {
    return (
        <div className="flex w-full max-w-screen-xl mx-auto px-10 items-center justify-between py-3  z-40 bg-background border-b transition-all">
            <Logo />
            <Search />
            <User />
        </div>
    );
}
