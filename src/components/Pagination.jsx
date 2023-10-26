import React from "react";

function Pagination() {
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);

  async function getData() {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();
    if (data && data.products) {
      setData(data.products);
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  function togglePage(selectPage) {
    if (
      selectPage >= 1 &&
      selectPage <= data.length / 10 &&
      selectPage != page
    ) {
      setPage(selectPage);
    }
  }

  return (
    <>
    <h1 className="text-red-500 text-4xl text-center font-mono">Pagination</h1>
      {data.length > 0 ? (
        <div className="w-full flex flex-wrap justify-center items-center mx-auto">
          {data.slice(page * 10 - 10, page * 10).map((item) => {
            return (
              <div
                key={item.id}
                className="w-[50%] lg:w-[30%] my-2 px-2 lg:m-5 border border-black h-[200px] flex flex-col justify-center items-center rounded-md"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-[80%] h-40 object-contain mx-auto"
                />
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>
      ) : <p className="text-xl mt-10">Loading....</p>}

      {data.length > 0 && <div className="flex justify-center items-center">
        <button
          onClick={() => {
            togglePage(page - 1);
          }}
          className={page === 1 ? "invisible font-bold" : "font-bold"}
        >
          Prev
        </button>

        {[...Array(data.length / 10)].map((_, i) => {
          return (
            <button
              key={i}
              onClick={() => {
                togglePage(i + 1);
              }}
              className={page === i + 1 ? "text-blue-700 px-2 underline" : "px-2"}
            >
              {i + 1}
            </button>
          );
        })}

        <button
          onClick={() => {
            togglePage(page + 1);
          }}
          className={page === data.length / 10 ? "invisible font-bold" : "font-bold"}
        >
          Next
        </button>
      </div>}
    </>
  );
}

export default Pagination;
