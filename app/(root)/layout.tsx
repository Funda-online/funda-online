import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import TopProgressBar from "@/components/TopProgressBar";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <TopProgressBar />
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
