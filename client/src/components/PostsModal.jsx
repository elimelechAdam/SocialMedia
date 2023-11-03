import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";

export const PostsModal = ({ isOpen, closeModal }) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
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
                <form className="w-full max-w-lg bg-black p-6 ">
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                      <div className="flex align-middle items-center gap-2">
                        <div className="">
                          <h4 className="text-md cursor-pointer font-bold text-white">
                            fullname
                          </h4>
                          <h4 className="text-xs cursor-pointer font-thin text-white">
                            posted
                          </h4>
                        </div>
                      </div>
                      <p className="break-words text-white font-light text-md leading-6 p-2 border-b ">
                        content
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-7 p-3">
                    <button
                      className="borderBtnWhite"
                      onClick={(e) => {
                        e.preventDefault(); // Prevents the default action of the button (if it's within a form)
                        closeModal(); // Calls the closeModal function passed as a prop to this component
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="borderBtnWhite"
                      onClick={(e) => {
                        e.preventDefault(); // Prevents the default action of the button (if it's within a form)
                        closeModal(); // Calls the closeModal function passed as a prop to this component
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
