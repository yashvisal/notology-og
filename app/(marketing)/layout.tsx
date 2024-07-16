import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <>
      {/* <SiteBanner /> */}
      <SiteHeader />
      <main className="mx-auto flex-1 overflow-hidden">{children}</main>
      {/* <SiteFooter /> */}
    </>
  );
}


// import Navbar from "./_components/navbar";

// const MarketingLayout = ({
//     children
// }: {
//     children: React.ReactNode;
// }) => {
//     return (
//         <div className="h-full">
//             <Navbar />
//             <main className="h-full pt-40">
//                 {children}
//             </main>
//         </div>
//     );
// }
 
// export default MarketingLayout;