"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { BookingForm } from "./BookingForm";
import { Button } from "@/components/Button";
import type { ButtonProps } from "@/components/Button";
import type { HTMLAttributes } from "react";
import type { Home } from "@prisma/client";
import { Icon } from "@/components/Icon";
import { bookingCreateSchema } from "@/lib/validations/booking";
import superagent from "superagent";
import { toast } from "@/components/Toast";
import { useRouter } from "next/navigation";
import { z } from "zod";

type FormData = z.infer<typeof bookingCreateSchema>;

interface BookingCreateButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    ButtonProps {
  homeId: Home["id"];
}

export function BookingCreateButton({
  className,
  homeId,
  ...props
}: BookingCreateButtonProps) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    try {
      setIsSaving(true);

      await superagent.post(`/api/homes/${homeId}/bookings`).send(data);

      router.refresh();
    } catch (error) {
      toast.error(
        "Something went wrong.",
        "Your booking was not created. Please try again."
      );
    } finally {
      setIsSaving(false);
      closeModal();
    }
  }

  return (
    <>
      <Button {...props} onClick={openModal}>
        New booking
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
                <Dialog.Panel className="w-full max-w-md transform divide-zinc-400/20 rounded-xl bg-white text-left align-middle shadow-xl ring-1 ring-zinc-400/20 transition-all dark:bg-zinc-900">
                  <div className="space-y-4 px-6 pt-6">
                    <div className="flex">
                      <Dialog.Title
                        as="h3"
                        className="flex-auto text-lg font-semibold"
                      >
                        New booking
                      </Dialog.Title>
                      <Icon.Close className="h-4 w-4" onClick={closeModal} />
                    </div>
                    <BookingForm homeId={homeId} onSubmit={onSubmit} />
                  </div>
                  <div className="mt-6 border-t p-6">
                    <div className="flex space-x-3">
                      <Button
                        form="booking-form"
                        loading={isSaving}
                        type="submit"
                      >
                        Create booking
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
