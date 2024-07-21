import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";

export default function MarketingLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SiteHeader />
            <main className="mx-auto flex-1 overflow-hidden">
                {children}
            </main>
            <SiteFooter />
        </>
    );
}