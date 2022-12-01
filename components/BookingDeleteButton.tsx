"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { Booking } from "@prisma/client";
import { Button } from "@/components/Button";
import type { ButtonProps } from "@/components/Button";
import type { HTMLAttributes } from "react";
import { Icon } from "@/components/Icon";
import superagent from "superagent";
import { toast } from "@/components/Toast";
import { useRouter } from "next/navigation";

interface BookingDeleteButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    ButtonProps {
  bookingId: Booking["id"];
}

export function BookingDeleteButton({
  className,
  bookingId,
  ...props
}: BookingDeleteButtonProps) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  async function deleteBooking() {
    try {
      setIsSaving(true);

      await superagent.delete(`/api/bookings/${bookingId}`);

      router.refresh();
    } catch (error) {
      toast.error(
        "Something went wrong.",
        "Your booking was not deleted. Please try again."
      );
    } finally {
      setIsSaving(false);
      closeModal();
    }
  }

  return (
    <>
      <Button square variant="subtle" {...props} onClick={openModal}>
        <Icon.Trash className="h-4 w-4" />
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
                        Are you sure?
                      </Dialog.Title>
                      <Icon.Close className="h-4 w-4" onClick={closeModal} />
                    </div>
                  </div>
                  <Dialog.Description className="mt-6 px-6">
                    Deleting a booking cannot cannot be undone.
                  </Dialog.Description>
                  <div className="mt-6 border-t p-6">
                    <div className="flex space-x-3">
                      <Button onClick={deleteBooking} variant="danger">
                        {isSaving ? (
                          <Icon.Spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Delete booking
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
