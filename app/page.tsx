"use client";

import { decrement, increment, reset } from "@/redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetUsersQuery } from "@/redux/services/userApi";

export default function Home() {
  const count = useAppSelector((state) => state.counterReducer.value);
  const dispatch = useAppDispatch();

  const { isLoading, isFetching, data, error } = useGetUsersQuery(null);

  return (
    <main className="max-w-[1200] p-5 mx-auto">
      <div className="mb-[4rem] text-center">
        <h4 className="mb-4">{count}</h4>
        <button onClick={() => dispatch(increment())}>increment</button>
        <button className="mx-[16px]" onClick={() => dispatch(decrement())}>
          decrement
        </button>
        <button onClick={() => dispatch(reset())}>reset</button>
      </div>

      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading ...</p>
      ) : data ? (
        <div className="grid grid-cols-4 gap-5">
          {data.map((user) => (
            <div key={user.id} className="border-[1px] text-center">
              <img
                src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                alt={user.name}
                className="h-[180px] w-[180px]"
              />
              <h3>{user.name}</h3>
            </div>
          ))}
        </div>
      ) : null}
    </main>
  );
}
