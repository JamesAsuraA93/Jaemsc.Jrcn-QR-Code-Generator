import { QRCodeGenerator } from "@/components/qr-code-generator";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold text-foreground">
            Jaemsc.Jrcn QR Code Generator
          </h1>
          <h2 className="text-lg font-medium text-foreground">
            {`(Follow me on IG : Jaemsc.Jrcn)`}{" "}
            <Link
              href={"https://www.instagram.com/jaemsc.jrcn/"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Click me to find my Instagram !!!
            </Link>
          </h2>

          <p className="text-sm text-muted-foreground">
            Create custom QR codes with logos
          </p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <QRCodeGenerator />
      </main>
    </div>
  );
}
