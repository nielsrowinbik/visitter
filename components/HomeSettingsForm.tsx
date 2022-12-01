"use client";

import * as z from "zod";

import { Button } from "@/components/Button";
import type { HTMLAttributes } from "react";
import type { Home } from "@prisma/client";
import { Icon } from "./Icon";
import { Input } from "@/components/Input";
import { homePatchSchema } from "@/lib/validations/home";
import superagent from "superagent";
import { toast } from "@/components/Toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

interface HomeSettingsFormProps extends HTMLAttributes<HTMLFormElement> {
  home: Pick<Home, "id" | "name">;
}

type FormData = z.infer<typeof homePatchSchema>;

export function HomeSettingsForm({ home }: HomeSettingsFormProps) {
  const router = useRouter();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(homePatchSchema),
    defaultValues: home,
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    try {
      setIsSaving(true);

      await superagent.patch(`/api/homes/${home.id}`).send({
        name: data.name,
      });

      toast("Settings saved", "Your settings were saved succesfully.");

      router.refresh();
    } catch (error) {
      toast.error(
        "Something went wrong.",
        "Your settings were not saved. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      <div className="space-y-6">
        <Input
          description="Enter a name for your vacation home."
          errorText={errors.name?.message as string}
          id="name"
          type="text"
          label="Name"
          {...register("name")}
        />
      </div>
      <Button disabled={isSaving} type="submit">
        {isSaving ? (
          <Icon.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Save home settings
      </Button>
    </form>
  );
}
