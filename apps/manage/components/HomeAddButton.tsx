import { Button, Group, IconButton, Input } from "ui";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import Router from "next/router";
import { getErrorMessage } from "@lib/errors";
import superagent from "superagent";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
};

export const HomeAddButton = () => {
  const [isOpen, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm<FormValues>({ mode: "onChange" });

  const onSubmit = handleSubmit(async ({ name }) => {
    try {
      const { body: home } = await superagent.post("/api/homes").send({
        name,
      });
      Router.replace(`/${home.id}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  });

  const isPayingCustomer = true;

  if (isPayingCustomer)
    return (
      <>
        <Button onClick={openModal}>New vacation home</Button>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" onClose={closeModal} open={isOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 z-40 bg-black/75 backdrop-blur transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-0 z-40 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all">
                    <div className="space-y-4 px-6 pt-6">
                      <div className="flex">
                        <Dialog.Title
                          as="h3"
                          className="flex-auto text-lg font-semibold"
                        >
                          New vacation home
                        </Dialog.Title>
                        <IconButton
                          tabIndex={0}
                          icon={<XIcon />}
                          onClick={closeModal}
                        />
                      </div>
                      <form id="create-home-form" onSubmit={onSubmit}>
                        <Input
                          {...register("name", {
                            required: "Please give your vacation home a name.",
                          })}
                          autoFocus
                          id="name"
                          label="Name"
                          type="text"
                        />
                      </form>
                    </div>
                    <div className="mt-6 border-t p-6">
                      <Group>
                        <Button form="create-home-form" type="submit">
                          Create vacation home
                        </Button>
                        <Button onClick={closeModal} variant="outline">
                          Cancel
                        </Button>
                      </Group>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            as={Button}
            rightIcon={
              open ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )
            }
          >
            New vaction home
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel className="absolute right-0 z-40 mt-2 w-full origin-top-right space-y-4 rounded-md bg-white p-4 text-sm shadow-lg ring-1 ring-gray-400/20 dark:bg-zinc-900 dark:shadow-black md:w-[390px]">
              <p className="font-semibold">
                You are already using your one free vacation home
              </p>
              <p>
                Signing up for a paid plan will unlock the ability to create
                unlimited vacation homes.
              </p>
              <Button compact>Upgrade now</Button>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
