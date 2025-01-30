import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DogSearchForm } from "./DogSearchForm";

export default function SearchBox() {
  return (
    <Accordion
      className="mb-8"
      type="single"
      collapsible
      defaultValue="search-box"
    >
      <AccordionItem value="search-box">
        <AccordionTrigger>Search Options</AccordionTrigger>
        <AccordionContent>
          <DogSearchForm />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
