import { SendHorizontal, Search, X } from "lucide-react";
import { useState } from "react";
import Modal from "../../components/Modal";
import {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useUpdateGenreMutation,
  useFetchGenresQuery,
} from "../../redux/api/genre";

import { toast } from "react-toastify";

const GenreLists = () => {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [selectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [updateName, setUpdateName] = useState("");

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Name is required");
    } else {
      try {
        const results = await createGenre({ name }).unwrap();

        if (results.error) {
          toast.error(results.error);
        } else {
          setName("");
          toast.success(`${results.name} is created successfully`);
          refetch();
        }
      } catch (err) {
        toast.error("Failed to create genre");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!updateName) {
      toast.error("Name is required");
    } else {
      try {
        console.log("Selected Genre:", selectedGenre);

        if (!selectedGenre || !selectedGenre._id) {
          toast.error("Invalid genre selected for update");
          return;
        }

        const results = await updateGenre({
          id: selectedGenre._id,
          updateGenre: {
            name: updateName,
          },
        }).unwrap();

        if (results) {
          setUpdateName("");
          toast.success(`${results.name} is updated successfully`);
          refetch();
          setModal(false);
        }
      } catch (error) {
        toast.error("Failed to update genre");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const results = await deleteGenre(id).unwrap();
      if (results.error) {
        toast.error(results.error);
      } else {
        setName("");
        toast.success(`${results.name} is deleted successfully`);
        refetch();
      }
    } catch (err) {
      toast.error("Failed to delete genre");
    }
  };

  const toggleModal = () => {
    setModal(!modal);   
  };

  const filteredGenres = genres?.filter((genre) =>
    genre.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  return (
    <div>
      <div className="container px-4 md:px-4 lg:px-4 xl:px-0 mx-auto py-8 text-zinc-800">
        <h1 className="text-2xl font-medium">Manage Genres</h1>
        <p className="mt-2 text-zinc-500">
          Here, you can manage your genre list. Create, update and delete
        </p>

        <div className="my-10 flex gap-y-3 md:gap-y-3 flex-col md:flex-row lg:flex-row justify-between items-center">
          <form onSubmit={handleCreate} className="flex items-center gap-3 ">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-[1px] border-zinc-300 outline-none px-2 py-2 rounded-md w-[25rem] md:w-[20rem] text-sm text-zinc-700"
              placeholder="Create genre"
            />
            <button
              type="submit"
              className="bg-blue-500 px-3 py-2 rounded-md text-white hover:bg-blue-600"
            >
              <SendHorizontal size={16} />
            </button>
          </form>
          <div>
            <div className="relative">
              <input
                className="border-[1px] border-zinc-300 outline-none px-2 py-2 rounded-md w-[28rem] md:w-[20rem] text-sm text-zinc-700"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
              />
              <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>

        <hr />

        <div className="text-wrap flex-wrap justify-center flex items-center gap-4 my-5 text-center">
          {filteredGenres?.map((genre) => (
            <div
              key={genre._id}
              className="bg-zinc-100 cursor-pointer text-sm font-medium w-[7rem] rounded-lg py-2 px-3 flex items-center justify-between"
            >
              <span onClick={toggleModal}>{genre.name}</span>
              <button onClick={() => handleDelete(genre._id)}>
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        <Modal isOpen={modal} onClose={() => toggleModal(null)}>
          <div className="text-center">
            <h1 className="text-md font-medium">Update Genre</h1>
            <p className="mt-2 text-sm text-zinc-500">
              Here you can update the genre
            </p>

            <form onSubmit={handleUpdate} className="flex flex-col gap-y-5">
              <input
                type="text"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
                className="border-[1px] border-zinc-300 outline-none rounded-md px-2 py-1 mt-4"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Update
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default GenreLists;
