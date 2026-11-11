import Footer from "@/component/common/Footer";
import Navbar from "@/component/common/Navbar";


export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {


    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900">
            <Navbar />


            <main className="flex-1 overflow-x-hidden min-h-screen">
                {children}
            </main>
            <Footer />
        </div>
    );
}
