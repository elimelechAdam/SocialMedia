import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { fetchData } from "../utils/apiUtils";
// postId, userId, content
export const PostsModal = ({ isOpen, closeModal, userId, postId }) => {
  /* get all data from posts/65352e7021b390dfcdeabac0/comments using fetch*/
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({
    content: "",
  });
  const [currentCommentId, setCurrentCommentId] = useState(null);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const newComment = await addData(`posts/${postId}/comment`, comment);
      setComments((prevComments) => [newComment, ...prevComments]);
      setComment({ content: "" }); // Clear the textarea after posting
    } catch (error) {
      console.log("Error adding comment: ", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      console.log(postId);
      if (!postId) return;
      try {
        const response = await fetchData(`posts/${postId}/comments`);
        console.log("response", response);
        // Fetch user details for each _id
        const userDetailsPromises = response.map((userId) =>
          fetchData(`/users/${userId}`).catch((error) => {
            console.error(
              `Error fetching details for user ID ${userId}:`,
              error
            );
            return null;
          })
        );
        console.log(userDetailsPromises);
        const userDetailsResponses = await Promise.all(userDetailsPromises);
        const usersInfo = userDetailsResponses.map((res) => {
          const { fullname, profilePicture, _id } = res;
          return { fullname, profilePicture, _id };
        });

        console.log(usersInfo);
        // setComments((prevComments) => {
        //   // Filter out any new posts that already exist in the state
        //   const newComments = response.data.filter(
        //     (newComment) =>
        //       !prevComments.some(
        //         (existingComment) => existingComment._id === newComment._id
        //       )
        //   );
        //   console.log(response.data);
        //   return [...prevComments, ...newComments];
        // });
      } catch (error) {
        console.log("Error fetching comments: ", error);
      }
    };
    getData();
  }, [postId]);

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
                <form className="w-full max-w-lg bg-black p-6 border border-white">
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                      <div className="flex align-middle items-center gap-2">
                        <h4 className="text-md cursor-pointer font-bold text-white">
                          fullname
                        </h4>
                        <h4 className="text-xs cursor-pointer font-thin text-white">
                          date
                        </h4>
                      </div>
                      <p className="break-words text-white font-light text-sm leading-6 p-2 border-b mb-2">
                        content
                      </p>
                    </div>
                    <input
                      type="text"
                      placeholder="Post something..."
                      className="border border-gray-200 bg-transparent rounded-sm p-2 w-full text-white
                      focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent
                      text-sm"
                    />
                  </div>
                  <div className="flex justify-center gap-7 p-3">
                    <button
                      className="borderBtnWhite"
                      onClick={(e) => {
                        e.preventDefault();
                        closeModal();
                      }}
                    >
                      Post
                    </button>
                    <button
                      className="borderBtnWhite"
                      onClick={(e) => {
                        e.preventDefault();
                        closeModal();
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
