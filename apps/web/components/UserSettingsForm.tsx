"use client";

import * as z from "zod";

import { Button } from "@/components/Button";
import type { HTMLAttributes } from "react";
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
  user: Pick<User, "id" | "name" | "email">;
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
    setIsSaving(true);

    try {
      await superagent.patch(`/api/users/${user.id}`).send({
        name: data.name,
      });

      toast({
        title: "Settings saved successfully",
        message: "Your settings were saved.",
      });

      router.refresh();
    } catch (error) {
      return toast({
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
          description="Enter your full name or a display name you are comfortable with."
          errorText={errors.name?.message}
          id="name"
          type="text"
          label="Name"
          {...register("name")}
        />
        <Input
          description="Support for changing your e-mail address is coming soon. For now, this field is read-only."
          // errorText={errors.email?.message}
          disabled
          id="email"
          label="Email"
          readOnly
          required
          type="text"
          value={user.email}
          // {...register("email")}
        />
      </div>
      <Button disabled={isSaving} type="submit">
        Save account settings
      </Button>
    </form>
  );
}
