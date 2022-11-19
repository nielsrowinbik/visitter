"use client";

import * as z from "zod";

import { Button } from "@/components/Button";
import type { HTMLAttributes } from "react";
import { Icon } from "./Icon";
import { Input } from "@/components/Input";
import type { User } from "database";
import superagent from "superagent";
import toast from "@/components/Toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { userPatchSchema } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserSettingsFormProps extends HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "id" | "name" | "email" | "phone">;
}

type FormData = z.infer<typeof userPatchSchema>;

export function UserSetttingsForm({ user }: UserSettingsFormProps) {
  const router = useRouter();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(userPatchSchema),
    defaultValues: user,
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    try {
      setIsSaving(true);

      await superagent.patch(`/api/users/${user.id}`).send(data);

      toast({
        title: "Settings saved successfully",
        message: "Your settings were saved.",
      });

      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        message: "Your settings were not saved. Please try again.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      <div className="space-y-6">
        <Input
          autoComplete="name"
          description="Enter your full name or a display name you are comfortable with."
          errorText={errors.name?.message as string}
          type="text"
          label="Name"
          {...register("name")}
        />
        <Input
          autoComplete="email"
          description="Support for changing your e-mail address is coming soon. For now, this field is read-only."
          errorText={errors.email?.message as string}
          disabled
          label="Email address"
          placeholder="name@domain.com"
          readOnly
          required
          type="email"
          {...register("email")}
        />
        <Input
          autoComplete="tel"
          description="Enter your phone number including country code. We will never share your phone number without your permission."
          errorText={errors.phone?.message as string}
          label="Phone number"
          type="text"
          {...register("phone")}
        />
      </div>
      <Button disabled={isSaving} type="submit">
        {isSaving ? (
          <Icon.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Save account settings
      </Button>
    </form>
  );
}
