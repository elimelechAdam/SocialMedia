import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";

export const Profile = ({ isOpen, closeModal }) => {
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
                  <div className="flex items-center justify-center">
                    <AiOutlineUser size={40} className="text-white" />
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-first-name"
                      >
                        First Name
                      </label>
                      <input
                        className="focus:ring-1 focus:ring-white appearance-none block w-full bg-gray-200 text-white border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-first-name"
                        type="text"
                        placeholder="Doe"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-last-name"
                      >
                        Last Name
                      </label>
                      <input
                        className="focus:ring-1 focus:ring-white appearance-none block w-full bg-gray-200 text-white border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name"
                        type="text"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        className="focus:ring-1 focus:ring-white appearance-none block w-full bg-gray-200 text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-password"
                        type="password"
                        placeholder="******************"
                      />
                    </div>
                    <div className="w-full px-3 mt-4">
                      <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-email"
                      >
                        Email
                      </label>
                      <input
                        className="focus:ring-1 focus:ring-white appearance-none block w-full bg-gray-200 text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-email"
                        type="email"
                        placeholder="email@email.com"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                        htmlFor="grid-city"
                      >
                        Bio
                      </label>
                      <textarea
                        className="focus:ring-1 focus:ring-white resize-none rounded-md w-full"
                        placeholder="About you.."
                      ></textarea>
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
