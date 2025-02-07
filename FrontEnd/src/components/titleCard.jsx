export const TitleCard = ({ Title, onClick }) => {
  return (
    <div
      className="flex flex-col  items-center cursor-pointer justify-center  border-[.2rem] border-border p-[1rem] rounded-lg"
      onClick={onClick}
    >
      <h1 className="text-lg font-medium place-self-start">{Title}</h1>
    </div>
  );
};
