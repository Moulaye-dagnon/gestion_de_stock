import SpinnerComponent from "../Spinner/SpinnerComponent";
import Quantity from "../../assets/Quantity.svg";
function Card({
  title,
  name1,
  value1,
  color1,
  name2,
  value2,
  color2,
  name3,
  value3,
  color3,
  name4,
  value4,
  color4,
}) {
  return (
    <div className=" flex flex-col bg-white rounded-md py-4  px-3 w-full ">
      <div className="text-my-handing text-xl pb-4">{title}</div>
      <div className=" flex-1 grid grid-cols-2 max-lg:gap-y-2.5  lg:grid-cols-4  lg:divide-x-2 divide-my-border  gap-x-2.5 justify-center   items-center">
        {name1 && value1 && (
          <div className=" flex-1 flex  flex-col items-center gap-y-3">
            <div
              className={` ${
                color1 ? color1 : "bg-white"
              } rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:shadow-lg transition-shadow`}
            >
              <h2 className="text-sm font-semibold text-gray-600 text-center">
                {name1}
              </h2>
              <p className="text-lg font-bold text-gray-800">{value1}</p>
            </div>
          </div>
        )}
        {name2 && value2 && (
          <div className=" flex-1 flex  flex-col items-center gap-y-3">
            <div
              className={` ${
                color2 ? color2 : "bg-white"
              } rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:shadow-lg transition-shadow`}
            >
              <h2 className="text-sm font-semibold text-gray-600 text-center">
                {name2}
              </h2>
              <p className="text-lg font-bold text-gray-800">{value2}</p>
            </div>
          </div>
        )}
        {name3 && value3 && (
          <div className=" flex-1 flex  flex-col items-center gap-y-3">
            <div
              className={` ${
                color3 ? color3 : "bg-white"
              } rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:shadow-lg transition-shadow`}
            >
              <h2 className="text-sm font-semibold text-gray-600 text-center">
                {name3}
              </h2>
              <p className="text-lg font-bold text-gray-800">{value3}</p>
            </div>
          </div>
        )}
        {name4 && value4 && (
          <div className=" flex-1 flex  flex-col items-center gap-y-3">
            <div
              className={` ${
                color4 ? color4 : "bg-white"
              } rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:shadow-lg transition-shadow`}
            >
              <h2 className="text-sm font-semibold text-gray-600 text-center">
                {name4}
              </h2>
              <p className="text-lg font-bold text-gray-800">{value4}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
