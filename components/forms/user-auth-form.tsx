"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import GoogleSignInButton from "../github-auth-button";
import axios from "axios";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    username: "",
    password: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { toast } = useToast();

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      const isLoggedin = await signIn("credentials", {
        ...data,
        redirect: true,
        callbackUrl: "/dashboard"
      });
      if (isLoggedin!.error !== null) {
        toast({
          variant: "destructive",
          title: "Wrong credentials",
          description: "Incorrect Login Details!!",
        });
      }
    } catch (e: any) {
      console.error(e);
      if (e.response.status !== 200) {
        toast({
          variant: "destructive",
          title: "Wrong credentials",
          description: "Check your username and password please",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Something wrong happened, please try again",
          description: "There was a problem with your request.",
        });
      }
    }
    finally{
      setLoading(false);
    }
  };

  const userSubmit = async (e: any) => {
    e.preventDefault();
    await form.handleSubmit(onSubmit)(e);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={userSubmit}
          className="space-y-0 w-full"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your username..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            {" "}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="py-3"></div>
          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </>
  );
}
