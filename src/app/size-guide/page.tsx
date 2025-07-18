import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";

export default function SizeGuidePage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground font-headline sm:text-5xl">Size Guide</h1>
          <p className="mt-4 text-lg text-muted-foreground">Find your perfect fit for our ready-made and custom garments.</p>
        </div>

        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-semibold">How to Measure Yourself</AccordionTrigger>
            <AccordionContent>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                            <li><strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</li>
                            <li><strong>Shoulder:</strong> Measure from the end of one shoulder to the other, across your back.</li>
                            <li><strong>Sleeve:</strong> Measure from your shoulder to just below your wrist bone.</li>
                            <li><strong>Waist:</strong> Measure around your natural waistline, keeping the tape comfortably loose.</li>
                            <li><strong>Inseam:</strong> Measure from your crotch to the bottom of your ankle.</li>
                        </ul>
                    </div>
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                        <Image src="https://placehold.co/500x500.png" alt="How to measure diagram" data-ai-hint="man measurement diagram" fill className="object-cover" />
                    </div>
                </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-semibold">Ready-Made Garments (Tops)</AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Size</TableHead>
                    <TableHead>Chest (inches)</TableHead>
                    <TableHead>Shoulder (inches)</TableHead>
                    <TableHead>Sleeve (inches)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell>S</TableCell><TableCell>36-38</TableCell><TableCell>17</TableCell><TableCell>24</TableCell></TableRow>
                  <TableRow><TableCell>M</TableCell><TableCell>39-41</TableCell><TableCell>18</TableCell><TableCell>25</TableCell></TableRow>
                  <TableRow><TableCell>L</TableCell><TableCell>42-44</TableCell><TableCell>19</TableCell><TableCell>26</TableCell></TableRow>
                  <TableRow><TableCell>XL</TableCell><TableCell>45-47</TableCell><TableCell>20</TableCell><TableCell>27</TableCell></TableRow>
                  <TableRow><TableCell>XXL</TableCell><TableCell>48-50</TableCell><TableCell>21</TableCell><TableCell>28</TableCell></TableRow>
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl font-semibold">Ready-Made Garments (Trousers)</AccordionTrigger>
            <AccordionContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Size</TableHead>
                    <TableHead>Waist (inches)</TableHead>
                    <TableHead>Inseam (inches)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell>30W</TableCell><TableCell>30-31</TableCell><TableCell>32</TableCell></TableRow>
                  <TableRow><TableCell>32W</TableCell><TableCell>32-33</TableCell><TableCell>32</TableCell></TableRow>
                  <TableRow><TableCell>34W</TableCell><TableCell>34-35</TableCell><TableCell>33</TableCell></TableRow>
                  <TableRow><TableCell>36W</TableCell><TableCell>36-37</TableCell><TableCell>33</TableCell></TableRow>
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl font-semibold">Custom Tailoring</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">For our "Made-to-Order" and "Custom" items, we offer a personalized tailoring experience. After placing your inquiry via WhatsApp, we will schedule a virtual or in-person consultation to take your precise measurements. This ensures a flawless fit that is unique to you. Please have your basic measurements (chest, waist) ready for the initial conversation.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
