"use client";

import * as z from "zod";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { Button } from "@/components/Button";
import type { ButtonProps } from "@/components/Button";
import type { HTMLAttributes } from "react";
import type { Home } from "database";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { homeCreateSchema } from "@/lib/validations/home";
import superagent from "superagent";
import { toast } from "@/components/Toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = z.infer<typeof homeCreateSchema>;

interface HomeCreateButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    ButtonProps {}

export function HomeCreateButton({
  className,
  ...props
}: HomeCreateButtonProps) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(homeCreateSchema),
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    try {
      setIsSaving(true);

      const res = await superagent.post(`/api/homes`).send(data);
      const { id } = res.body as Pick<Home, "id">;

      router.push(`/home/${id}`);
      router.refresh();
    } catch (error) {
      toast.error(
        "Something went wrong.",
        "Your vacation home was not created. Please try again."
      );
    } finally {
      setIsSaving(false);
      closeModal();
    }
  }

  return (
    <>
      <Button {...props} onClick={openModal}>
        New vacation home
      </Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal} open={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-40 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform divide-zinc-400/20 overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl ring-1 ring-zinc-400/20 transition-all dark:bg-zinc-900">
                  <div className="space-y-4 px-6 pt-6">
                    <div className="flex">
                      <Dialog.Title
                        as="h3"
                        className="flex-auto text-lg font-semibold"
                      >
                        New vacation home
                      </Dialog.Title>
                      <Icon.Close className="h-4 w-4" onClick={closeModal} />
                    </div>
                    <form
                      id="create-home-form"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <Input
                        {...register("name")}
                        autoFocus
                        id="name"
                        label="Name"
                        placeholder="Fanta Sea"
                        required
                        type="text"
                      />
                    </form>
                  </div>
                  <hr className="mt-6" />
                  <div className="p-6">
                    <div className="flex space-x-2">
                      <Button form="create-home-form" type="submit">
                        {isSaving ? (
                          <Icon.Spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Create vacation home
                      </Button>
                      <Button onClick={closeModal} variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
