import { Button, Group, IconButton } from "ui";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { DateRangePicker } from "@mantine/dates";
import Router from "next/router";
import { XIcon } from "@heroicons/react/outline";
import { isDate } from "lodash";
import { mutate } from "swr";
import superagent from "superagent";

type Props = {
  homeId: string;
};

export const BookingAddButton = ({ homeId }: Props) => {
  const [isOpen, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
  const isValid = range.every((val) => isDate(val));

  const [isBusy, setBusy] = useState(false);

  const onSaveClick = async () => {
    setBusy(true);
    await superagent.post(`/api/homes/${homeId}/bookings`).send({
      endDate: range[1],
      startDate: range[0],
    });
    await mutate(`/api/homes/${homeId}/bookings`);
    await Router.push(`/${homeId}/bookings`, undefined, { shallow: true });
    setBusy(false);
    setRange([null, null]);
    closeModal();
  };

  return (
    <>
      <Button onClick={openModal}>New booking</Button>

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
                <Dialog.Panel className="prose w-full max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all">
                  <div className="space-y-4 px-6 pt-6">
                    <div className="flex">
                      <Dialog.Title as="h3" className="mt-0 flex-auto">
                        New booking
                      </Dialog.Title>
                      <IconButton
                        tabIndex={0}
                        icon={<XIcon />}
                        onClick={closeModal}
                      />
                    </div>
                    {/* TODO: Replace with custom implementation (no Mantine) */}
                    <DateRangePicker
                      description="Period during which your vacation home is unavailable."
                      label="Period"
                      required
                      value={range}
                      onChange={(val) => setRange(val)}
                    />
                  </div>
                  <div className="mt-6 border-t p-6">
                    <Group>
                      <Button
                        disabled={!isValid || isBusy}
                        onClick={onSaveClick}
                      >
                        Create booking
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
};
