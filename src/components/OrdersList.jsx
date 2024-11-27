import dayjs from "dayjs";
import React from "react";
import { useLoaderData } from "react-router-dom";

const OrdersList = () => {
  const { orders } = useLoaderData();
  return (
    <section
      className="w-full border-[1px] border-tom-500 rounded-2xl overflow-hidden
        flex flex-col gap-[1px] text-tom-900 font-light text-sm divide-y p-2"
    >
      <table>
        <thead className="overflow-hidden rounded-lg">
          <tr className="font-mirage bg-serenade-200 uppercase [&>th]:p-4 text-tom-950 ">
            <th className="rounded-[10px_0_0_10px]">Order No.</th>
            <th>Name</th>
            <th className="hidden sm:block">Products</th>
            <th>Address</th>
            <th className="hidden sm:block">Date</th>
            <th className="rounded-[0_10px_10px_0]">Cost</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-y-text-tom-500">
          {orders.map((order) => {
            const id = order.id;
            const { name, address, numItemsInCart, orderTotal, createdAt } =
              order.attributes;
            const date = dayjs(createdAt).format("hh:mm a - MMM D, YYYY");
            return (
              <tr key={order.id} className="text-wrap [&>td]:p-2 text-center">
                <td>#{id}</td>
                <td>{name}</td>
                <td className="hidden sm:block">{numItemsInCart}</td>
                <td>{address}</td>
                <td className="hidden sm:block">{date}</td>
                <td>{orderTotal}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default OrdersList;
