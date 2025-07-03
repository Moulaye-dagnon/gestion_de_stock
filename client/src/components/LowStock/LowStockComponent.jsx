function LowStockComponent({ handleOnclick, data }) {
  return (
    <div className=" flex flex-col bg-white rounded-md py-4  px-3 w-full ">
      <div className="text-my-handing text-xl pb-4 flex justify-center items-center">
        <span className="flex-1"> Stock de faible quantité</span>
        <span
          onClick={handleOnclick}
          className=" text-xs flex-none cursor-pointer underline text-blue-200 "
        >
          Voir plus
        </span>
      </div>
      <div className="flex justify-between flex-wrap divide-x-2 divide-my-border gap-x-2.5   items-center">
        <div className=" flex-1 flex  flex-col items-center divide-y divide-my-body gap-y-3">
          {data?.map((item, index) => (
            <div
              key={index}
              className=" flex-none w-full  bg-white   px-2 py-1 flex  items-center justify-between hover:bg-gray-50"
            >
              <div className=" flex-1 flex  flex-col items-start justify-center">
                <div className="text-start text-base">{item?.produit}</div>
                <small className="text-sm">
                  Quantité restante: {item?.quantiteStock}{" "}
                </small>
              </div>
              <span className="flex-none w-13 text-center rounded-md bg-yellow-100">
                Faible
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LowStockComponent;
