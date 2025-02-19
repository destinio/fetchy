import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "./ui/multi-select";
import { useBreeds } from "@/hooks/useBreeds";
import { useDogs } from "@/hooks/useDogs";

export const DogSearchSchema = z.object({
  breeds: z.array(z.string()).optional(),
  zipCodes: z.string().optional(),
  ageMin: z.string().optional(),
  ageMax: z.string().optional(),
  size: z.string().optional(),
  sort: z.string().optional(),
});

export function DogSearchForm() {
  const { data: breeds } = useBreeds();

  const { onSubmit } = useDogs();

  const form = useForm<z.infer<typeof DogSearchSchema>>({
    resolver: zodResolver(DogSearchSchema),
    defaultValues: {
      breeds: [],
      zipCodes: "",
      ageMin: "",
      ageMax: "",
      size: "",
      sort: "",
    },
  });

  if (!breeds) {
    return <div>Error loading breeds</div>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="breeds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Breeds</FormLabel>
              <FormControl>
                <MultiSelect
                  options={breeds.map((breed) => {
                    return { label: breed, value: breed };
                  })}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Select breeds"
                  variant="inverted"
                  animation={2}
                  maxCount={3}
                />
              </FormControl>
              <FormDescription>Select one or more breeds.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zipCodes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip Codes</FormLabel>
              <FormControl>
                <Input placeholder="90210,10001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="ageMin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Age</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ageMax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Age</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Results Size</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="25" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="sort"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sort</FormLabel>
              <FormControl>
                <Input placeholder="age:asc,breed:desc" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Search</Button>
      </form>
    </Form>
  );
}
