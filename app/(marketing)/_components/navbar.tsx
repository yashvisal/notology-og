import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {
    return (
        <div className="z-50 bg-background fixed top-0 flex items-center w-full p-6">
            Schol
            <div className="justify-end w-full flex items-center gap-x-2">
                <ModeToggle />
            </div>
        </div>       
    );
}
 
export default Navbar;