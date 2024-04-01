"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast";
import { TagInput, Tag } from "../ui/tag-input";
import { Label } from "@/components/ui/label";



interface KeywordsProps{
  inputTitle: string;
  inputName: string;
  inputPlaceholder: string;
  tags: Tag[];
  setTags:  React.Dispatch<React.SetStateAction<Tag[]>>
}

const Keywords = ({inputTitle, inputName, inputPlaceholder, tags, setTags} : KeywordsProps) => {

  const FormSchema = z.object({
  [inputTitle]: z.array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    ),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { setValue } = form;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return <>
    <Label>{inputTitle}</Label>
    <TagInput
      placeholder={inputPlaceholder}
      tags={tags}
      className="sm:min-w-[450px]"
      setTags={(newTags) => {
        setTags(newTags);
        setValue(inputName, newTags as [Tag, ...Tag[]]);
      }}
    />
  </>;
};

export default Keywords;