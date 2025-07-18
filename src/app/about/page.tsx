import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground font-headline sm:text-5xl">Our Story</h1>
          <p className="mt-4 text-lg text-muted-foreground">Crafting Nigerian heritage with a modern twist.</p>
        </div>
        
        <div className="mt-12">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src="https://placehold.co/1200x675.png"
              alt="Naija Luxe workshop"
              data-ai-hint="fashion designer workshop"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="prose prose-lg mx-auto mt-12 text-foreground">
          <p>
            Welcome to Naija Luxe, where timeless tradition meets contemporary style. Founded in the heart of Lagos, our brand was born from a desire to celebrate the richness of Nigerian culture and the artistry of its tailoring. We believe that clothing is more than just fabric; it's a statement of identity, a celebration of heritage, and a form of self-expression.
          </p>
          <p>
            Our journey began with a simple mission: to provide discerning gentlemen with impeccably crafted traditional and casual wear that exudes confidence and sophistication. From the majestic flow of a well-made Agbada to the sharp lines of a modern Senator suit, every piece in our collection is a testament to our commitment to quality, detail, and authentic Nigerian craftsmanship.
          </p>
          <p>
            At Naija Luxe, we blend age-old techniques with modern designs and premium fabrics sourced from the best mills. Whether you choose from our ready-to-wear collection or opt for our bespoke tailoring service, you are investing in a piece that is made with passion and precision. We invite you to explore our world and discover the true essence of Nigerian elegance.
          </p>
        </div>
      </div>
    </div>
  );
}
