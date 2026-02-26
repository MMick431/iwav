import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ProductsSection } from '@/components/products-section';
import { AboutSection } from '@/components/about-section';
import { DeliverySection } from '@/components/delivery-section';
import { Footer } from '@/components/footer';
import { WhyUsSection } from '@/components/why-us-section';

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <div id="accueil">
        <HeroSection />
      </div>
      <div id="iphones">
        <ProductsSection />
      </div>
      <WhyUsSection />
      <div id="about">
        <AboutSection />
      </div>
      <div id="delivery">
        <DeliverySection />
      </div>
      <Footer />
    </main>
  );
}