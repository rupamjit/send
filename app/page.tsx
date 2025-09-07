import Link from "next/link";
import Card from "../components/Card";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { Folder,AlignLeft, LucideIcon } from 'lucide-react';

interface Features {
  icon:LucideIcon,
  title:string,
  href:string
  text:string
}

const features:Features[] = [
  {
    icon: AlignLeft,
    title:"Text Sharing",
    href:"/text-sharing",
    text:"Share your words instantly. No hassle."
  },
  {
    icon:Folder,
    title:"File Sharing",
    href:"/file-sharing",
    text:"The simplest way to share files online."
  }
]

export default function Home() {
  return (
    <Container >
      <div>
        <Navbar />
        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-6xl font-extrabold mb-6`}>
              Your easiest way to share <br /> content on the internet
            </h2>
            <p className={`text-xl`}>Share instantly. No login needed.</p>
            <div className=" mt-10 grid md:flex  items-center justify-center gap-5 md:gap-10">
             {
              features.map((feature,index)=>(
                <Link href={feature.href} key={index}>
                  <Card title={feature.title} icon={feature.icon} text={feature.text} />
                </Link>
              ))
             }
            </div>
          </div>
        </main>
      </div>
    </Container>
  );
}
