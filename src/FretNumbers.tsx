export const FretNumbers = () => {
  return (
    <div className="grid grid-cols-12 gap-2">
      {new Array(12).fill(0).map((_, index) => {
        return (
          <div className="border text-center p-2 h-12 cursor-pointer hover:bg-gray-200">
            {index}
          </div>
        );
      })}
    </div>
  );
};
