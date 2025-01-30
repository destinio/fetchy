"use client";

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
import { useDogsSearch } from "@/hooks/useDogsSearch";
import { MultiSelect } from "./ui/multi-select";

const DogSearchSchema = z.object({
  breeds: z.array(z.string()).optional(),
  zipCodes: z.string().optional(),
  ageMin: z.string().optional(),
  ageMax: z.string().optional(),
  size: z.string().optional(),
  sort: z.string().optional(),
});

export function DogSearchForm() {
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

  const { data, isLoading, error, refetch } = useDogsSearch({
    breeds: form.watch("breeds")?.length ? form.watch("breeds") : undefined,
    zipCodes: form.watch("zipCodes")
      ? form.watch("zipCodes")?.split(",")
      : undefined,
    ageMin: form.watch("ageMin") ? Number(form.watch("ageMin")) : undefined,
    ageMax: form.watch("ageMax") ? Number(form.watch("ageMax")) : undefined,
    size: form.watch("size") ? Number(form.watch("size")) : undefined,
    sort: form.watch("sort") || undefined,
  });

  function onSubmit(data: z.infer<typeof DogSearchSchema>) {
    console.log(data);
    refetch();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="breeds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Breeds</FormLabel>
              <FormControl>
                <MultiSelect
                  options={[
                    { label: "Labrador", value: "labrador" },
                    { label: "Beagle", value: "beagle" },
                    { label: "Poodle", value: "poodle" },
                  ]}
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
